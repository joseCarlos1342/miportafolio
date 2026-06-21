// Optimize README screenshots: downscale 2x -> 1x and re-encode as PNG (zlib 9).
// Runs once on demand; not part of the build pipeline.
import { readFile, writeFile, mkdir } from "node:fs/promises";
import sharp from "sharp";
import { existsSync } from "node:fs";

const SRC = "/tmp/opencode/screenshots";
const OUT = "docs/assets/readme";

// Final files we want: dark theme by default (matches the site branding), plus
// a light-theme banner for the <picture> prefers-color-scheme fallback.
const targets = [
  { src: "03-hero-dark.png", out: "banner-dark.png" },
  { src: "01-hero-light.png", out: "banner-light.png" },
  { src: "04-projects-dark.png", out: "projects-dark.png" },
  { src: "05-skills-dark.png", out: "skills-dark.png" },
  { src: "07-contact-dark.png", out: "contact-dark.png" },
];

async function main() {
  if (!existsSync(OUT)) await mkdir(OUT, { recursive: true });

  for (const t of targets) {
    const inPath = `${SRC}/${t.src}`;
    const outPath = `${OUT}/${t.out}`;
    // Captures are already 1440x900 (1x). We just re-encode with max zlib
    // effort to shrink file size; sharp re-encoding typically wins 10-30%
    // over the source PNG.
    const buf = await readFile(inPath);
    const out = await sharp(buf)
      .png({ compressionLevel: 9, palette: false, effort: 10 })
      .toBuffer();
    await writeFile(outPath, out);
    const { size } = await import("node:fs/promises").then((m) => m.stat(outPath));
    console.log(`  ${t.out.padEnd(22)} ${(size / 1024).toFixed(1).padStart(7)} KB`);
  }
  console.log("OK");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
