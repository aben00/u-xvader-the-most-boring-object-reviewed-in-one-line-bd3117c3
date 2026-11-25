// The Most Boring Object, Reviewed in One Line — make.fun entry
// Writes exactly one line: a one-star review of the elevator's
// close-door button. Deterministic: no randomness, no clock, no
// network, no input.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "The elevator's close-door button has never once closed a door, but I press it every single time like it owes me money.";

// Guard the competition's format: one line, under 200 characters.
if (ENTRY.length > 200 || ENTRY.length < 1 || ENTRY.includes("\n")) {
  throw new Error("Entry must be a single line of 1 to 200 characters.");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY + "\n", "utf8");
