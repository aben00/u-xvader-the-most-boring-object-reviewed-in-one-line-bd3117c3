// The Most Boring Object, Reviewed in One Line — make.fun entry
// Writes exactly one line: a one-star review of the elevator's
// close-door button. Deterministic: no randomness, no clock, no
// network, no input.
//
// Revision (2026-11-25): tightened the joke ("keep pressing" instead
// of "press it every single time" — same meaning, sharper rhythm) and
// hardened the format guard: it now counts UTF-8 characters (code
// points, not UTF-16 units), rejects whitespace-only entries, and
// rejects carriage returns as well as newlines.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "The elevator's close-door button has never once closed a door, but I keep pressing it like it owes me money.";

// Guard the competition's format: exactly one line, 1-200 UTF-8
// characters, and not whitespace-only. Throws on any violation so a
// bad entry can never be written silently.
function assertValidEntry(entry: string): void {
  const charCount = [...entry].length; // code points ~= UTF-8 chars
  if (charCount < 1 || charCount > 200) {
    throw new Error(
      `Entry must be 1 to 200 characters, got ${charCount}.`,
    );
  }
  if (entry.trim().length === 0) {
    throw new Error("Entry must not be whitespace only.");
  }
  if (entry.includes("\n") || entry.includes("\r")) {
    throw new Error("Entry must be a single line (no newline or CR).");
  }
}

assertValidEntry(ENTRY);

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY + "\n", "utf8");
