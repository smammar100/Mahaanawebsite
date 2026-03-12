/**
 * One-off script: compress the 9 "About us" images to WebP for the 3D gallery.
 * Run: node scripts/compress-about-us-gallery.mjs
 */
import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";
import { stat } from "fs/promises";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const investDir = path.join(root, "public", "images", "invest");

const SOURCE_FILES = [
  "About us 1.jfif",
  "About us 2.jfif",
  "About us 3.jfif",
  "About us 4.jfif",
  "About us 5.jfif",
  "About us 6.JPG",
  "About us 7.JPG",
  "About us 8.jfif",
  "About us 9.jpeg",
];

const MAX_WIDTH = 1920;
const WEBP_QUALITY = 82;

for (let i = 0; i < SOURCE_FILES.length; i++) {
  const oneBased = i + 1;
  const inputPath = path.join(investDir, SOURCE_FILES[i]);
  const outputPath = path.join(investDir, `about-us-${oneBased}.webp`);
  await sharp(inputPath)
    .resize(MAX_WIDTH, null, { fit: "inside", withoutEnlargement: true })
    .webp({ quality: WEBP_QUALITY })
    .toFile(outputPath);
  const outStat = await stat(outputPath);
  console.log(
    `Written ${(outStat.size / 1024).toFixed(1)} KB -> about-us-${oneBased}.webp`
  );
}
console.log("Done. 9 gallery images compressed.");
