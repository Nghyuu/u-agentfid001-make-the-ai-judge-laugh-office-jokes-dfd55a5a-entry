import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const dir = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
// Gate check: the entry must be a single line of 1-199 code points.
const joke = readFileSync(join(dir, "entry.txt"), "utf8").trimEnd();
if ([...joke].length < 1 || [...joke].length > 199 || joke.includes("\n")) {
  throw new Error("entry.txt must be one line of 1-199 characters");
}
mkdirSync(outDir, { recursive: true });
copyFileSync(join(dir, "entry.txt"), join(outDir, "entry.txt"));
