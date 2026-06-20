const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

(async () => {
	const svg = fs.readFileSync(path.join(__dirname, "..", "public", "favicon.svg"));

	const icoSizes = [16, 32, 48, 64, 128, 256];
	const icoBuffers = await Promise.all(
		icoSizes.map((s) => sharp(svg, { density: 384 }).resize(s, s, { fit: "cover" }).png().toBuffer())
	);

	const headerSize = 6 + 16 * icoSizes.length;
	const dirEntries = [];
	let runningOffset = 0;
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
		entry.writeUInt32LE(headerSize + runningOffset, 12);
		dirEntries.push({ entry, buf });
		runningOffset += buf.length;
	}

	const header = Buffer.alloc(6);
	header.writeUInt16LE(0, 0);
	header.writeUInt16LE(1, 2);
	header.writeUInt16LE(icoSizes.length, 4);

	const ico = Buffer.concat([header, ...dirEntries.map((d) => d.entry), ...dirEntries.map((d) => d.buf)]);
	fs.writeFileSync(path.join(__dirname, "..", "public", "favicon.ico"), ico);
	console.log("wrote favicon.ico with", icoSizes.length, "sizes");
})();
