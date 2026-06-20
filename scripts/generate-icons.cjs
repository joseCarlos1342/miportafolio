const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const svg = fs.readFileSync(path.join(__dirname, "..", "public", "favicon.svg"));

const targets = [
	{ file: "public/apple-touch-icon.png", size: 180 },
	{ file: "public/icon-192.png", size: 192 },
	{ file: "public/icon-512.png", size: 512 },
];

(async () => {
	for (const t of targets) {
		const out = path.join(__dirname, "..", t.file);
		await sharp(svg, { density: 384 })
			.resize(t.size, t.size, { fit: "cover" })
			.png({ compressionLevel: 9 })
			.toFile(out);
		console.log("wrote", out, t.size);
	}

	const icoSizes = [16, 32, 48, 64];
	const icoBuffers = await Promise.all(
		icoSizes.map((s) => sharp(svg, { density: 384 }).resize(s, s, { fit: "cover" }).png().toBuffer())
	);

	const dir = path.join(__dirname, "..", "public");
	const header = Buffer.alloc(6 + 16 * icoSizes.length);
	header.writeUInt16LE(0, 0);
	header.writeUInt16LE(1, 2);
	header.writeUInt16LE(icoSizes.length, 4);

	let offset = header.length;
	const entries = [];
	for (let i = 0; i < icoSizes.length; i++) {
		const s = icoSizes[i];
		const buf = icoBuffers[i];
		const entry = Buffer.alloc(16);
		entry.writeUInt8(s === 256 ? 0 : s, 0);
		entry.writeUInt8(s === 256 ? 0 : s, 1);
		entry.writeUInt8(0, 2);
		entry.writeUInt8(0, 3);
		entry.writeUInt16LE(1, 4);
		entry.writeUInt16LE(32, 6);
		entry.writeUInt32LE(buf.length, 8);
		entry.writeUInt32LE(offset, 12);
		entries.push(entry);
		offset += buf.length;
	}
	header.writeUInt32LE(offset, header.length - 4);

	const ico = Buffer.concat([header, ...entries, ...icoBuffers]);
	fs.writeFileSync(path.join(dir, "favicon.ico"), ico);
	console.log("wrote favicon.ico");
})();
