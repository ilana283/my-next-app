/**
 * Enlarges only the tagline on a copy of the logo (original → logo-original.png).
 * Run: node scripts/optimize-logo-tagline.mjs
 */
import { copyFile, access } from "node:fs/promises";
import { constants } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const backup = resolve(root, "public", "logo-original.png");
const output = resolve(root, "public", "logo.png");

const WIDTH = 634;
const TAGLINE_TOP = 406;
const TAGLINE_HEIGHT = 34;
const TAGLINE_OUT_HEIGHT = 48;
/** Y position for enlarged tagline (clears old line, below the name) */
const TAGLINE_Y = 396;

async function main() {
  try {
    await access(backup, constants.F_OK);
  } catch {
    await copyFile(output, backup);
  }

  const taglineBuf = await sharp(backup)
    .extract({ left: 0, top: TAGLINE_TOP, width: WIDTH, height: TAGLINE_HEIGHT })
    .resize({ width: WIDTH, height: TAGLINE_OUT_HEIGHT, kernel: "lanczos3" })
    .toBuffer();

  await sharp(backup)
    .composite([{ input: taglineBuf, top: TAGLINE_Y, left: 0 }])
    .png()
    .toFile(output);

  console.log(`Wrote ${output}`);
  console.log(`Backup: ${backup}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
