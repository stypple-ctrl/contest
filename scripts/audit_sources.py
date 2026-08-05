#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""현재 DB의 수집경로/기관 원본 URL/검증상태를 감사 리포트로 출력한다."""
import sqlite3
from pathlib import Path
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parents[1]
DB = ROOT / "data" / "contests.db"
OUT = ROOT / "_workspace" / "05_source_audit.md"

AGGREGATORS = {"www.wevity.com", "wevity.com", "www.contestkorea.com", "contestkorea.com", "www.all-con.co.kr", "all-con.co.kr", "www.thinkcontest.com", "thinkcontest.com"}
SHORTENERS = {"vo.la", "bit.ly", "url.kr", "me2.kr", "han.gl", "naver.me", "forms.gle"}


def host(url):
    return (urlparse(url or "").netloc or "").lower()


def risk(row):
    official = row["official_url"]
    h = host(official)
    if not official:
        return "기관 원본 URL 없음"
    if h in AGGREGATORS:
        return "기관 URL이 집계 사이트"
    if h in SHORTENERS:
        return "단축/중간 URL"
    if row["verification_status"] != "verified":
        return "검수 conflict"
    return "기관URL 확보(단일출처)"


def main():
    con = sqlite3.connect(DB)
    con.row_factory = sqlite3.Row
    rows = con.execute(
        """
        SELECT id, title, source_site, source_url, official_url,
               application_deadline, target_grades, region,
               verification_status, verification_notes
        FROM contests
        ORDER BY verification_status != 'verified' DESC,
                 application_deadline IS NULL,
                 application_deadline,
                 title
        """
    ).fetchall()

    verified = sum(1 for r in rows if r["verification_status"] == "verified")
    official = sum(1 for r in rows if r["official_url"])
    missing = len(rows) - official
    short = sum(1 for r in rows if host(r["official_url"]) in SHORTENERS)
    aggregator_official = sum(1 for r in rows if host(r["official_url"]) in AGGREGATORS)

    lines = [
        "# Source Audit",
        "",
        f"- 총 레코드: {len(rows)}",
        f"- verified: {verified} / conflict: {len(rows) - verified}",
        f"- 기관 원본 URL 확보: {official}",
        f"- 기관 원본 URL 미확보: {missing}",
        f"- 단축/중간 URL: {short}",
        f"- official_url이 집계 사이트인 항목: {aggregator_official}",
        "",
        "## 원칙",
        "",
        "- `source_url`: wevity 등 후보를 발견한 집계 사이트 상세 URL",
        "- `official_url`: 기관/주최측 원본 공고 또는 접수 페이지",
        "- 사용자-facing `원본 공고` 버튼은 `official_url`만 사용한다.",
        "- `source_url`은 감사 추적/수집출처로만 표시한다.",
        "",
        "## 항목별 감사",
        "",
        "| 위험 | 상태 | 마감 | 제목 | 기관 원본 | 수집출처 | notes |",
        "|---|---|---:|---|---|---|---|",
    ]

    for r in rows:
        lines.append(
            "| %s | %s | %s | %s | %s | %s | %s |"
            % (
                risk(r),
                r["verification_status"],
                r["application_deadline"] or "",
                (r["title"] or "").replace("|", "/"),
                r["official_url"] or "",
                r["source_url"] or "",
                (r["verification_notes"] or "").replace("|", "/"),
            )
        )

    OUT.write_text("\n".join(lines) + "\n", encoding="utf-8")
    print(f"wrote {OUT}")


if __name__ == "__main__":
    main()
