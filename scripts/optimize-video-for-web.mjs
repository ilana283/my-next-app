/**
 * Re-encodes MP4 for web: H.264, 720p, faststart (browser-compatible).
 * Run: node scripts/optimize-video-for-web.mjs [input.mp4]
 */
import { spawn } from "node:child_process";
import { access, rename, unlink } from "node:fs/promises";
import { constants } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import ffmpegPath from "ffmpeg-static";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const input = resolve(root, process.argv[2] ?? "public/projects/lalaland-detection.mp4");
const temp = `${input}.web-optimized.mp4`;

if (!ffmpegPath) {
  console.error("ffmpeg-static binary not found");
  process.exit(1);
}

await access(input, constants.R_OK);

await new Promise((resolvePromise, reject) => {
  const proc = spawn(
    ffmpegPath,
    [
      "-y",
      "-i",
      input,
      "-an",
      "-vf",
      "scale=1280:-2",
      "-c:v",
      "libx264",
      "-preset",
      "medium",
      "-crf",
      "28",
      "-pix_fmt",
      "yuv420p",
      "-movflags",
      "+faststart",
      temp,
    ],
    { stdio: "inherit" },
  );
  proc.on("error", reject);
  proc.on("close", (code) => {
    if (code === 0) resolvePromise(undefined);
    else reject(new Error(`ffmpeg exited with code ${code}`));
  });
});

await unlink(input);
await rename(temp, input);
console.log(`Re-encoded for web (H.264 720p): ${input}`);
