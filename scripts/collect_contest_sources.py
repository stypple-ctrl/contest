#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Collect additional contest/activity candidates from public aggregator pages.

This collector is deliberately conservative:
- raw source pages are preserved in _workspace for audit
- only youth/student-looking records are collected
- official organizer URLs are extracted only when an external link is visible
"""
import argparse
import json
import re
import ssl
import time
import urllib.parse
import urllib.request
from datetime import date
from pathlib import Path

from bs4 import BeautifulSoup

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "_workspace"
CTX = ssl._create_unverified_context()
UA = "Mozilla/5.0 (contest-harvest multi-source collector)"

YOUTH_HINTS = [
    "초등",
    "초·중·고",
    "초중고",
    "중학생",
    "고등학생",
    "고교",
    "청소년",
    "어린이",
    "아동",
    "학생",
]
AGGREGATOR_HOSTS = {
    "www.contestkorea.com",
    "contestkorea.com",
    "www.all-con.co.kr",
    "all-con.co.kr",
    "www.thinkcontest.com",
    "thinkcontest.com",
}
SOCIAL_HOST_HINTS = ("youtube.com", "youtu.be", "instagram.com", "facebook.com", "blog.naver.com")


def fetch(url):
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=20, context=CTX) as response:
        final_url = response.geturl()
        body = response.read().decode("utf-8", "ignore")
    return body, final_url


def host(url):
    return urllib.parse.urlparse(url or "").netloc.lower()


def is_aggregator_host(value):
    h = (value or "").lower()
    return h in AGGREGATOR_HOSTS or h.endswith(".contestkorea.com") or h.endswith(".all-con.co.kr") or h.endswith(".thinkcontest.com")


def abs_url(base, href):
    return urllib.parse.urljoin(base, href)


def clean_text(value):
    return re.sub(r"\s+", " ", value or "").strip()


def meta(soup, *names):
    for name in names:
        node = soup.find("meta", attrs={"property": name}) or soup.find("meta", attrs={"name": name})
        if node and node.get("content"):
            return clean_text(node["content"])
    return None


def page_title(soup):
    og = meta(soup, "og:title", "twitter:title", "facebook:title")
    if og:
        return og
    if soup.title:
        return clean_text(soup.title.get_text(" ", strip=True))
    return ""


def external_official_url(soup, base):
    candidates = []
    for a in soup.find_all("a", href=True):
        href = abs_url(base, a["href"])
        text = clean_text(a.get_text(" ", strip=True))
        h = host(href)
        if not h or is_aggregator_host(h):
            continue
        if any(social in h for social in SOCIAL_HOST_HINTS):
            continue
        score = 0
        if any(k in text for k in ["홈페이지", "바로가기", "접수", "공식", "신청", "원문"]):
            score += 3
        if any(k in href.lower() for k in ["apply", "contest", "event", "notice", "form"]):
            score += 1
        if score > 0:
            candidates.append((score, href))
    if not candidates:
        return None
    candidates.sort(reverse=True)
    return candidates[0][1]


def detail_scope(raw_text, title):
    if not title:
        return raw_text
    idx = raw_text.find(title)
    if idx == -1:
        return raw_text
    return raw_text[idx:]


def target_text_from_scope(scope):
    patterns = [
        r"참가대상\s*(.*?)\s*(?:접수기간|심사기간|대회지역|활동지역|시상내역|활동내용|홈페이지|접수방법|참가비용)",
        r"대상\s*[.:]?\s*(.*?)\s*(?:접수|심사|발표|D-\d+|마감|진행)",
        r"참가자격\s*(.*?)\s*(?:접수|제출|공모|시상|문의)",
    ]
    for pattern in patterns:
        found = re.search(pattern, scope)
        if found:
            return clean_text(found.group(1))
    return ""


def source_id_from_url(url):
    parsed = urllib.parse.urlparse(url)
    qs = urllib.parse.parse_qs(parsed.query)
    for key in ["str_no", "seq", "articleNo"]:
        if qs.get(key):
            return qs[key][0]
    m = re.search(r"/(?:view|hit)/contest/(\d+)", parsed.path)
    if m:
        return m.group(1)
    return re.sub(r"\W+", "-", url)[-80:]


def detail_record(source_site, source_url, target_filter, activity_type_hint):
    html, final_url = fetch(source_url)
    soup = BeautifulSoup(html, "html.parser")
    raw_text = clean_text(soup.get_text(" ", strip=True))
    title = page_title(soup)
    if source_site == "contestkorea":
        title = re.sub(r"\s*-\s*콘테스트코리아.*$", "", title).strip()
    if source_site == "allcon":
        title = title.replace("&middot;", "·")
    scoped_text = detail_scope(raw_text, title)
    target_text = target_text_from_scope(scoped_text)
    official = external_official_url(soup, final_url)
    keywords = meta(soup, "keywords") or ""
    description = meta(soup, "description", "og:description", "facebook:description") or ""
    return {
        "source_site": source_site,
        "source_id": source_id_from_url(final_url),
        "source_url": final_url,
        "target_filter": target_filter,
        "title": title,
        "target_text": target_text,
        "raw_text": scoped_text[:12000],
        "raw_keywords": keywords,
        "raw_description": description,
        "official_url": official,
        "activity_type_hint": activity_type_hint,
        "collected_at": date.today().isoformat(),
    }


def youth_like(record):
    text = " ".join(
        [
            record.get("title") or "",
            record.get("target_text") or "",
            record.get("raw_keywords") or "",
            record.get("raw_description") or "",
        ]
    )
    return any(hint in text for hint in YOUTH_HINTS)


def collect_contestkorea(limit):
    base_urls = [
        ("contest", "청소년 대회·공모전", "https://www.contestkorea.com/sub/list.php?int_gbn=1&Txt_code1[0]=98&Txt_code1[1]=27&Txt_code1[2]=28&Txt_code1[3]=29"),
        ("activity", "청소년 대외활동", "https://www.contestkorea.com/sub/list.php?int_gbn=2&Txt_code1[0]=98&Txt_code1[1]=27&Txt_code1[2]=28&Txt_code1[3]=29"),
    ]
    records, errors = [], []
    for activity, label, url in base_urls:
        try:
            html, final_url = fetch(url)
            soup = BeautifulSoup(html, "html.parser")
            links = []
            for a in soup.find_all("a", href=True):
                href = abs_url(final_url, a["href"])
                if "/sub/view.php" in href and href not in links:
                    links.append(href)
            for href in links[:limit]:
                try:
                    rec = detail_record("contestkorea", href, label, activity)
                    if youth_like(rec):
                        records.append(rec)
                    time.sleep(0.4)
                except Exception as exc:
                    errors.append({"url": href, "error": f"{type(exc).__name__}: {exc}"})
        except Exception as exc:
            errors.append({"url": url, "error": f"{type(exc).__name__}: {exc}"})
    return records, errors


def collect_allcon(limit):
    seed_urls = [
        ("contest", "청소년 공모전", "https://www.all-con.co.kr/list/contest/3"),
        ("activity", "청소년 대외활동", "https://www.all-con.co.kr/list/contest/4"),
        ("contest", "메인 청소년 후보", "https://www.all-con.co.kr/"),
    ]
    records, errors, seen = [], [], set()
    for activity, label, url in seed_urls:
        try:
            html, final_url = fetch(url)
            soup = BeautifulSoup(html, "html.parser")
            links = []
            for a in soup.find_all("a", href=True):
                href = abs_url(final_url, a["href"])
                if "/hit/contest/" in href and href not in links:
                    links.append(href)
            for href in links[: max(limit * 2, limit)]:
                if href in seen:
                    continue
                seen.add(href)
                try:
                    rec = detail_record("allcon", href, label, activity)
                    if youth_like(rec):
                        records.append(rec)
                    if len(records) >= limit:
                        break
                    time.sleep(0.4)
                except Exception as exc:
                    errors.append({"url": href, "error": f"{type(exc).__name__}: {exc}"})
        except Exception as exc:
            errors.append({"url": url, "error": f"{type(exc).__name__}: {exc}"})
    return records, errors


def collect_thinkcontest(limit):
    url = "https://www.thinkcontest.com/thinkgood/user/contest/index.do"
    records, errors = [], []
    try:
        html, final_url = fetch(url)
        soup = BeautifulSoup(html, "html.parser")
        links = []
        for a in soup.find_all("a", href=True):
            href = abs_url(final_url, a["href"])
            if "mode=view" in href and "thinkgood-talk" not in href and "/lab/" not in href and href not in links:
                links.append(href)
        for href in links[:limit]:
            try:
                rec = detail_record("thinkcontest", href, "공모전 목록", "contest")
                if youth_like(rec):
                    records.append(rec)
                time.sleep(0.4)
            except Exception as exc:
                errors.append({"url": href, "error": f"{type(exc).__name__}: {exc}"})
        if not links:
            errors.append({"url": url, "error": "no server-rendered contest detail links found"})
    except Exception as exc:
        errors.append({"url": url, "error": f"{type(exc).__name__}: {exc}"})
    return records, errors


def write_json(name, rows):
    OUT.mkdir(parents=True, exist_ok=True)
    path = OUT / name
    path.write_text(json.dumps(rows, ensure_ascii=False, indent=2), encoding="utf-8")
    return path


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--limit", type=int, default=30, help="max detail pages per source section")
    args = parser.parse_args()

    jobs = [
        ("contestkorea", collect_contestkorea),
        ("allcon", collect_allcon),
        ("thinkcontest", collect_thinkcontest),
    ]
    report_lines = ["# Multi-source Contest Collector Report", ""]
    total = 0
    for name, fn in jobs:
        records, errors = fn(args.limit)
        total += len(records)
        path = write_json(f"01_collector_{name}_raw.json", records)
        report_lines.append(f"- {name}: 수집 {len(records)}건 / 오류 {len(errors)}건 -> `{path.name}`")
        for error in errors[:20]:
            report_lines.append(f"  - {error['url']}: {error['error']}")
    report_lines.append("")
    report_lines.append(f"총 추가 수집 후보: {total}건")
    (OUT / "01_collector_multi_report.md").write_text("\n".join(report_lines) + "\n", encoding="utf-8")
    print(f"collected {total} additional contest candidates")


if __name__ == "__main__":
    main()
