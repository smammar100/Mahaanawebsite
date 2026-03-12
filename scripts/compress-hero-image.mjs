/**
 * One-off script: compress public/images/invest/DSC00031.jpg to WebP for hero.
 * Run: node scripts/compress-hero-image.mjs
 */
import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";
import { stat } from "fs/promises";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const inputPath = path.join(root, "public", "images", "invest", "DSC00031.jpg");
const outputPath = path.join(root, "public", "images", "invest", "hero-team.webp");

await sharp(inputPath)
  .resize(2560, null, { fit: "inside", withoutEnlargement: true })
  .webp({ quality: 82 })
  .toFile(outputPath);

const outStat = await stat(outputPath);
console.log(`Written ${(outStat.size / 1024 / 1024).toFixed(2)} MB -> ${path.basename(outputPath)}`);
