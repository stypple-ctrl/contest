import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import assert from "node:assert/strict";

const root = resolve(process.cwd());
const files = [
  "src/components/culture/culture-search.tsx",
  "src/components/search/unified-search.tsx",
  "src/app/culture/page.tsx",
  "src/app/search/page.tsx",
];

const forbidden = [
  /API\s*키/i,
  /API_KEY/,
  /KOPIS_API_KEY/,
  /CULTUREINFO_API_KEY/,
  /python3\s+scripts\//,
  /\.env(?:\.local)?/,
  /환경변수/,
  /수집 스크립트/,
];

for (const file of files) {
  const source = readFileSync(resolve(root, file), "utf8");
  for (const pattern of forbidden) {
    assert.doesNotMatch(source, pattern, `${file} must not expose internal API key or collection instructions: ${pattern}`);
  }
}
