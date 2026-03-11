/**
 * One-off: compress all PNG/JPG under public/images to WebP (quality 80).
 * Run: npx tsx scripts/compress-images.ts
 * After running, update codebase references from .png/.jpg to .webp where converted.
 */

import * as fs from "fs";
import * as path from "path";

const PUBLIC_IMAGES = path.join(process.cwd(), "public", "images");
const QUALITY = 80;

async function compressImages() {
  const sharpMod = await import("sharp").catch(() => null);
  if (!sharpMod?.default) {
    console.error("Run: npm i -D sharp");
    process.exit(1);
  }
  const sharp = sharpMod.default;

  const extensions = [".png", ".jpg", ".jpeg"];
  const converted: { from: string; to: string }[] = [];

  function walk(dir: string) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const e of entries) {
      const full = path.join(dir, e.name);
      if (e.isDirectory()) {
        walk(full);
        continue;
      }
      const ext = path.extname(e.name).toLowerCase();
      if (!extensions.includes(ext)) continue;
      const outPath = full.replace(/\.(png|jpeg|jpg)$/i, ".webp");
      if (outPath === full) continue;
      try {
        sharp(full).webp({ quality: QUALITY }).toFile(outPath);
        converted.push({ from: full, to: outPath });
        console.log(`${path.relative(process.cwd(), full)} -> ${path.relative(process.cwd(), outPath)}`);
      } catch (err) {
        console.error("Error:", full, err);
      }
    }
  }

  walk(PUBLIC_IMAGES);
  console.log(`Done. Converted ${converted.length} files. Update codebase to use .webp and remove originals.`);
}

compressImages();
