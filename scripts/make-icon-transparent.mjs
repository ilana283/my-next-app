/**
 * Remove near-white background from app/icon.png (favicon tab icon).
 * Run: node scripts/make-icon-transparent.mjs
 */
import sharp from "sharp";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const iconPath = resolve(__dirname, "..", "app", "icon.png");

const WHITE_THRESHOLD = 238;

const { data, info } = await sharp(iconPath)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

for (let i = 0; i < data.length; i += 4) {
  const r = data[i];
  const g = data[i + 1];
  const b = data[i + 2];
  if (r >= WHITE_THRESHOLD && g >= WHITE_THRESHOLD && b >= WHITE_THRESHOLD) {
    data[i + 3] = 0;
  }
}

await sharp(data, {
  raw: { width: info.width, height: info.height, channels: 4 },
})
  .png()
  .toFile(iconPath);

console.log(`Updated ${iconPath} — white background made transparent.`);
