import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import assert from "node:assert/strict";

const root = resolve(process.cwd());
const gridPath = resolve(root, "src/components/search/result-grid.tsx");
assert.equal(existsSync(gridPath), true, "shared ResultGrid component must exist");

const listFiles = [
  "src/components/search/unified-search.tsx",
  "src/components/contest/contest-search.tsx",
  "src/components/culture/culture-search.tsx",
];

for (const file of listFiles) {
  const source = readFileSync(resolve(root, file), "utf8");
  assert.match(source, /@\/components\/search\/result-grid/, `${file} must import ResultGrid`);
  assert.match(source, /<ResultGrid\b/, `${file} must render results through ResultGrid`);
}

const cardFiles = [
  "src/components/contest/contest-card.tsx",
  "src/components/culture/culture-search.tsx",
  "src/components/search/unified-search.tsx",
];

for (const file of cardFiles) {
  const source = readFileSync(resolve(root, file), "utf8");
  assert.match(source, /group-hover|group-focus-within/, `${file} cards must react on hover or focus`);
  assert.match(source, /transition-\[|transition-all|duration-300|duration-500/, `${file} cards must animate state changes`);
}
