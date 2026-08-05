import { chromium } from "playwright";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const outDir = path.resolve("qa-screenshots");
await mkdir(outDir, { recursive: true });

const dataSource = await readFile(path.resolve("src/lib/contest-data.ts"), "utf8");
const ids = Array.from(dataSource.matchAll(/"id": "([^"]+)"/g), (m) => m[1]);
const detailId = ids[0];
const blogId = ids[1] ?? detailId;
const cultureSource = await readFile(path.resolve("src/lib/culture-data.ts"), "utf8");
const cultureIds = Array.from(cultureSource.matchAll(/"id": "([^"]+)"/g), (m) => m[1]);
const cultureDetailId = cultureIds[0];

const browser = await chromium.launch({
  headless: true,
  executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
});

const pages = [
  { name: "search-desktop", url: "http://localhost:3010/search", width: 1440, height: 1100 },
  { name: "main-desktop", url: "http://localhost:3010/contest", width: 1440, height: 1100 },
  { name: "culture-desktop", url: "http://localhost:3010/culture", width: 1440, height: 1100 },
  { name: "culture-detail-desktop", url: `http://localhost:3010/culture/${cultureDetailId}`, width: 1440, height: 1100 },
  { name: "detail-desktop", url: `http://localhost:3010/contest/${detailId}`, width: 1440, height: 1100 },
  { name: "blog-desktop", url: `http://localhost:3010/contest/blog?event=${blogId}`, width: 1440, height: 1100 },
  { name: "search-mobile", url: "http://localhost:3010/search", width: 390, height: 1000 },
  { name: "main-mobile", url: "http://localhost:3010/contest", width: 390, height: 1000 },
  { name: "culture-mobile", url: "http://localhost:3010/culture", width: 390, height: 1000 },
  { name: "culture-detail-mobile", url: `http://localhost:3010/culture/${cultureDetailId}`, width: 390, height: 1000 },
  { name: "detail-mobile", url: `http://localhost:3010/contest/${detailId}`, width: 390, height: 1000 },
  { name: "blog-mobile", url: `http://localhost:3010/contest/blog?event=${blogId}`, width: 390, height: 1000 },
];

const results = [];

for (const item of pages) {
  const page = await browser.newPage({
    viewport: { width: item.width, height: item.height },
    deviceScaleFactor: 1,
  });
  const logs = [];
  page.on("console", (msg) => {
    if (["error", "warning"].includes(msg.type())) logs.push(`${msg.type()}: ${msg.text()}`);
  });
  page.on("pageerror", (err) => logs.push(`pageerror: ${err.message}`));

  const response = await page.goto(item.url, { waitUntil: "networkidle", timeout: 30000 });
  const bodyText = await page.locator("body").innerText({ timeout: 5000 });
  const overflow = await page.evaluate(() => ({
    scrollW: document.documentElement.scrollWidth,
    clientW: document.documentElement.clientWidth,
    scrollH: document.documentElement.scrollHeight,
    clientH: document.documentElement.clientHeight,
  }));
  const screenshot = path.join(outDir, `${item.name}.png`);
  await page.screenshot({ path: screenshot, fullPage: false });

  results.push({
    name: item.name,
    status: response?.status(),
    hasExpectedText: /공모전|문화행사|블로그|시네마그린틴|넥슨/.test(bodyText),
    overflowX: overflow.scrollW > overflow.clientW + 2,
    overflow,
    screenshot,
    logs: logs.slice(0, 8),
  });
  await page.close();
}

await browser.close();

await writeFile(path.join(outDir, "report.json"), JSON.stringify(results, null, 2));
console.log(JSON.stringify(results, null, 2));
