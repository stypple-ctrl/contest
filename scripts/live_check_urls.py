#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Live-check official URLs for contest and culture records.

Successful checks are reported but do not pollute verification_notes.
Failures are marked as conflict because user-facing "원본 공고/예매" links
must not silently point to broken pages.
"""
import argparse
import sqlite3
import ssl
import urllib.error
import urllib.parse
import urllib.request
from datetime import datetime
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DB = ROOT / "data" / "contests.db"
OUT = ROOT / "_workspace" / "07_url_live_check.md"
CTX = ssl._create_unverified_context()
UA = "Mozilla/5.0 (contest-harvest url checker)"
AGGREGATORS = {
    "www.wevity.com",
    "wevity.com",
    "www.contestkorea.com",
    "contestkorea.com",
    "www.all-con.co.kr",
    "all-con.co.kr",
    "www.thinkcontest.com",
    "thinkcontest.com",
}


def host(url):
    return urllib.parse.urlparse(url or "").netloc.lower()


def request_url(url):
    parsed = urllib.parse.urlparse(url)
    if not parsed.netloc:
        return url
    try:
        netloc = parsed.netloc.encode("idna").decode("ascii")
    except UnicodeError:
        return url
    return urllib.parse.urlunparse(parsed._replace(netloc=netloc))


def is_aggregator_host(value):
    h = (value or "").lower()
    return h in AGGREGATORS or h.endswith(".contestkorea.com") or h.endswith(".all-con.co.kr") or h.endswith(".thinkcontest.com")


def append_note(existing, note):
    existing = existing or ""
    if note in existing:
        return existing
    return f"{existing} | {note}".strip(" |")


def check(url):
    if not url:
        return False, "missing"
    h = host(url)
    if is_aggregator_host(h):
        return False, "official_url points to aggregator"
    request = urllib.request.Request(request_url(url), headers={"User-Agent": UA})
    try:
        with urllib.request.urlopen(request, timeout=15, context=CTX) as response:
            code = response.getcode()
            if 200 <= code < 400:
                return True, f"HTTP {code}"
            return False, f"HTTP {code}"
    except urllib.error.HTTPError as exc:
        if exc.code in (301, 302, 303, 307, 308, 401, 403, 405, 429):
            return True, f"HTTP {exc.code} reachable but restricted"
        return False, f"HTTP {exc.code}"
    except Exception as exc:
        return False, f"{type(exc).__name__}: {exc}"


def contest_rows(con, limit):
    sql = "SELECT id, title, official_url, verification_notes FROM contests ORDER BY application_deadline IS NULL, application_deadline, title"
    rows = con.execute(sql).fetchall()
    return rows[:limit] if limit else rows


def culture_rows(con, limit):
    sql = "SELECT id, title, official_url, verification_notes FROM culture_events ORDER BY start_date IS NULL, start_date, title"
    rows = con.execute(sql).fetchall()
    return rows[:limit] if limit else rows


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--limit", type=int, default=0, help="limit rows per table; 0 means all")
    parser.add_argument("--table", choices=["all", "contests", "culture"], default="all")
    args = parser.parse_args()

    con = sqlite3.connect(DB)
    con.row_factory = sqlite3.Row
    checked = []
    if args.table in ("all", "contests"):
        for row in contest_rows(con, args.limit):
            ok, reason = check(row["official_url"])
            checked.append(("contests", row["id"], row["title"], ok, reason, row["official_url"]))
            if not ok:
                con.execute(
                    "UPDATE contests SET verification_status='conflict', verification_notes=? WHERE id=?",
                    (append_note(row["verification_notes"], f"official_url live check failed: {reason}"), row["id"]),
                )
    if args.table in ("all", "culture"):
        for row in culture_rows(con, args.limit):
            ok, reason = check(row["official_url"])
            checked.append(("culture_events", row["id"], row["title"], ok, reason, row["official_url"]))
            if not ok:
                con.execute(
                    "UPDATE culture_events SET verification_status='conflict', verification_notes=? WHERE id=?",
                    (append_note(row["verification_notes"], f"official_url live check failed: {reason}"), row["id"]),
                )
    con.commit()
    con.close()

    failures = [row for row in checked if not row[3]]
    lines = [
        "# URL Live Check",
        "",
        f"- checked_at: {datetime.now().isoformat(timespec='seconds')}",
        f"- checked: {len(checked)}",
        f"- ok: {len(checked) - len(failures)}",
        f"- failed: {len(failures)}",
        "",
        "| table | id | ok | reason | url | title |",
        "|---|---|---:|---|---|---|",
    ]
    for table, row_id, title, ok, reason, url in checked:
        if ok and len(checked) > 80:
            continue
        lines.append(
            "| %s | %s | %s | %s | %s | %s |"
            % (
                table,
                row_id,
                "Y" if ok else "N",
                reason.replace("|", "/"),
                (url or "").replace("|", "/"),
                (title or "").replace("|", "/"),
            )
        )
    OUT.write_text("\n".join(lines) + "\n", encoding="utf-8")
    print(f"url live check: checked={len(checked)} failed={len(failures)}")


if __name__ == "__main__":
    main()
