import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import assert from "node:assert/strict";

const root = resolve(process.cwd());
const gradeUtils = readFileSync(resolve(root, "src/lib/grade-utils.ts"), "utf8");
const unifiedSearch = readFileSync(resolve(root, "src/components/search/unified-search.tsx"), "utf8");
const contestSearch = readFileSync(resolve(root, "src/components/contest/contest-search.tsx"), "utf8");

for (const label of ["초등", "중등", "고등"]) {
  assert.match(gradeUtils, new RegExp(`includes\\(\"${label}\"\\)`), `grade utils must normalize ${label}`);
}

assert.match(unifiedSearch, /matchesGradeFilter\(item\.gradeValues, grades\)/, "unified search must use normalized grade matching");
assert.match(contestSearch, /matchesGradeFilter\(e\.grades, grades\)/, "contest page must use normalized grade matching");
