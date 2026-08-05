import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import assert from "node:assert/strict";

const root = resolve(process.cwd());
const files = {
  contestData: readFileSync(resolve(root, "src/lib/contest-data.ts"), "utf8"),
  cultureData: readFileSync(resolve(root, "src/lib/culture-data.ts"), "utf8"),
  contestSearch: readFileSync(resolve(root, "src/components/contest/contest-search.tsx"), "utf8"),
  cultureSearch: readFileSync(resolve(root, "src/components/culture/culture-search.tsx"), "utf8"),
  unifiedSearch: readFileSync(resolve(root, "src/components/search/unified-search.tsx"), "utf8"),
};

assert.match(files.contestData, /export function currentDday\b/);
assert.match(files.contestData, /export function isContestExpired\b/);
assert.match(files.cultureData, /export function currentCultureDday\b/);
assert.match(files.cultureData, /export function isCultureEnded\b/);

assert.match(files.contestSearch, /hideExpired && isContestExpired\(e\)/);
assert.doesNotMatch(files.contestSearch, /hideExpired && e\.status === "마감"/);

assert.match(files.cultureSearch, /hideEnded && isCultureEnded\(e\)/);
assert.doesNotMatch(files.cultureSearch, /hideEnded && e\.status === "종료"/);

assert.match(files.unifiedSearch, /hideClosed && item\.closed/);
assert.doesNotMatch(files.unifiedSearch, /hideClosed && item\.dday != null && item\.dday < 0/);
