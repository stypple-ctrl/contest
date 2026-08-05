import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import assert from "node:assert/strict";

const root = resolve(process.cwd());
const shared = resolve(root, "src/components/search/search-filter-panel.tsx");
assert.equal(existsSync(shared), true, "shared search-filter-panel component must exist");

const files = [
  "src/components/search/unified-search.tsx",
  "src/components/contest/contest-search.tsx",
  "src/components/culture/culture-search.tsx",
];

for (const file of files) {
  const source = readFileSync(resolve(root, file), "utf8");
  assert.match(source, /@\/components\/search\/search-filter-panel/, `${file} must import the shared search/filter component`);
  assert.match(source, /<SearchHero\b/, `${file} must render the shared SearchHero`);
  assert.match(source, /<SearchFilterCard\b/, `${file} must render the shared SearchFilterCard`);
  assert.match(source, /지역 전체/, `${file} must use the same region button label`);
  assert.match(source, /분야\/종류/, `${file} must use the same type button label`);
  assert.match(source, /학원 활용/, `${file} must use the same academy-use button label`);
  assert.match(source, /지난 일정 숨기기/, `${file} must use the same closed-event toggle label`);
  assert.match(source, /무료만 보기/, `${file} must use the same free-only toggle label`);

  const filterOrder = file.includes("/culture/")
    ? ["지역 전체", "분야/종류", "학원 활용"]
    : ["<SearchGradeFilter", "지역 전체", "분야/종류", "학원 활용"];
  let cursor = -1;
  for (const label of filterOrder) {
    const next = source.indexOf(label, cursor + 1);
    assert.notEqual(next, -1, `${file} must include ${label}`);
    assert.ok(next > cursor, `${file} must order filters as ${filterOrder.join(" → ")}`);
    cursor = next;
  }
}

for (const file of ["src/components/search/unified-search.tsx", "src/components/contest/contest-search.tsx"]) {
  const source = readFileSync(resolve(root, file), "utf8");
  assert.match(source, /<SearchGradeFilter\b/, `${file} must expose the grade filter`);
}

const cultureSource = readFileSync(resolve(root, "src/components/culture/culture-search.tsx"), "utf8");
assert.doesNotMatch(cultureSource, /<SearchGradeFilter\b/, "culture search must not expose a grade filter");

const sharedSource = readFileSync(shared, "utf8");
for (const exportName of ["SearchHero", "SearchFilterCard", "SearchFilterButton", "SearchFilterPanel", "SearchFilterToggle", "SearchGradeFilter"]) {
  assert.match(sharedSource, new RegExp(`export function ${exportName}\\b`), `shared component must export ${exportName}`);
}
