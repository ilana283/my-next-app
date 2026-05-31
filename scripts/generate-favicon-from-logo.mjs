/**
 * Optional: auto-crop flower preview from full logo (does NOT overwrite app/icon.png).
 * Your tab favicon should stay as the hand-tuned file: app/icon.png
 * Output: app/icon.preview-from-logo.png (compare, then copy manually if you want).
 *
 * Run: npm run generate:icon
 */
import sharp from "sharp";
import { existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const candidates = [resolve(root, "public", "logo.png"), resolve(root, "app", "Logo.png")];

let src = candidates.find(existsSync);
if (!src) {
  console.error("No logo found at public/logo.png or app/Logo.png");
  process.exit(1);
}

const meta = await sharp(src).metadata();
const { width: w, height: h } = meta;
if (!w || !h) {
  console.error("Could not read image dimensions");
  process.exit(1);
}

// Gentler crop: larger square from top (more padding around flower).
const topFraction = 0.62;
const side = Math.min(w, Math.round(h * topFraction));
const left = Math.round((w - side) / 2);
const top = Math.round(h * 0.01);

const out = resolve(root, "app", "icon.preview-from-logo.png");

await sharp(src)
  .extract({
    left,
    top,
    width: side,
    height: side,
  })
  .resize(512, 512, {
    fit: "contain",
    background: { r: 255, g: 255, b: 255, alpha: 0 },
  })
  .png()
  .toFile(out);

console.log(`Wrote ${out} from ${src} (${w}x${h}).`);
console.log("Edit/replace app/icon.png yourself — that file is what the site uses in the tab.");
