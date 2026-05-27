import path from "node:path";
import { fileURLToPath } from "node:url";

import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const DESKTOP = path.join(root, "design/design_desktop.png");
const MOBILE = path.join(root, "design/design_mobile.png");
const OUT = path.join(root, "public/decor");

/** @param {string} src @param {{ left: number, top: number, width: number, height: number }} region @param {string} name */
async function crop(src, region, name) {
  const outPath = path.join(OUT, `${name}.png`);
  await sharp(src)
    .extract(region)
    .png({ compressionLevel: 9 })
    .toFile(outPath);
  const meta = await sharp(outPath).metadata();
  console.log(`wrote ${name}.png (${meta.width}x${meta.height})`);
}

const crops = [
  [DESKTOP, { left: 0, top: 0, width: 240, height: 200 }, "corner-tl"],
  [DESKTOP, { left: 1136, top: 0, width: 240, height: 200 }, "corner-tr"],
  [DESKTOP, { left: 0, top: 568, width: 280, height: 200 }, "corner-bl"],
  [DESKTOP, { left: 1096, top: 568, width: 280, height: 200 }, "corner-br"],
  [DESKTOP, { left: 468, top: 540, width: 440, height: 228 }, "palette-hands"],
  [MOBILE, { left: 60, top: 1180, width: 648, height: 196 }, "mobile-bottom"],
];

await Promise.all(crops.map(([src, region, name]) => crop(src, region, name)));
console.log("Done — decor PNGs in public/decor/");
