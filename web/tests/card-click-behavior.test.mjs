import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import assert from "node:assert/strict";

const root = resolve(process.cwd());
const contestCard = readFileSync(resolve(root, "src/components/contest/contest-card.tsx"), "utf8");
const unifiedSearch = readFileSync(resolve(root, "src/components/search/unified-search.tsx"), "utf8");
const cultureSearch = readFileSync(resolve(root, "src/components/culture/culture-search.tsx"), "utf8");
const contestDetail = readFileSync(resolve(root, "src/components/contest/contest-detail.tsx"), "utf8");
const cultureDetail = readFileSync(resolve(root, "src/app/culture/[id]/page.tsx"), "utf8");
const savedButton = readFileSync(resolve(root, "src/components/search/saved-item-button.tsx"), "utf8");

assert.match(contestCard, /useRouter/, "contest cards must use router navigation for whole-card detail access");
assert.match(contestCard, /role="link"/, "contest card shell must behave as a detail link");
assert.match(contestCard, /router\.push\(detailHref\)/, "contest card click must open the detail page");
assert.match(contestCard, /onToggle\(event\.id\)/, "contest cards must keep an explicit save action");
assert.doesNotMatch(contestCard, /onClick=\{\(\) => onToggle\(event\.id\)\}/, "contest card shell must not toggle saved state");

assert.match(unifiedSearch, /useRouter/, "unified cards must use router navigation for whole-card detail access");
assert.match(unifiedSearch, /role="link"/, "unified card shell must behave as a detail link");
assert.match(unifiedSearch, /router\.push\(item\.href\)/, "unified card click must open the detail page");
assert.match(unifiedSearch, /SavedItemButton/, "unified cards must expose the shared save action");
assert.match(unifiedSearch, /stopPropagation/, "unified save action must not trigger whole-card navigation");

assert.doesNotMatch(cultureSearch, /SearchGradeFilter/, "culture search must not render or import the grade filter");
assert.match(cultureSearch, /new Set\(events\.map\(\(event\) => event\.eventType\)/, "culture type filters must come from collected event types");

assert.match(contestDetail, /SavedItemButton/, "contest detail save button must write to shared saved-items storage");
assert.match(cultureDetail, /SavedItemButton/, "culture detail must provide the shared saved-items action");
assert.match(savedButton, /writeSavedItems/, "shared save button must persist to localStorage");
assert.match(savedButton, /subscribeSavedItems/, "shared save button must stay in sync with blog draft state");
