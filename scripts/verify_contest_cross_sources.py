#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Detect duplicate/overlapping contest records across aggregator sources."""
import re
import sqlite3
from datetime import datetime
from difflib import SequenceMatcher
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DB = ROOT / "data" / "contests.db"
OUT = ROOT / "_workspace" / "06_contest_cross_verify.md"


def norm(value):
    text = re.sub(r"\[[^\]]+\]|\([^)]*\)", " ", value or "")
    text = re.sub(r"[^0-9A-Za-z가-힣]+", "", text).lower()
    for noise in ["공모전", "대회", "모집", "개최안내", "참가자"]:
        text = text.replace(noise, "")
    return text


def similarity(a, b):
    na, nb = norm(a), norm(b)
    if not na or not nb:
        return 0.0
    if na in nb or nb in na:
        return 0.95
    return SequenceMatcher(None, na, nb).ratio()


def append_note(existing, note):
    existing = existing or ""
    if note in existing:
        return existing
    return f"{existing} | {note}".strip(" |")


def main():
    con = sqlite3.connect(DB)
    con.row_factory = sqlite3.Row
    rows = con.execute(
        """
        SELECT id, source_site, source_url, official_url, title, organizer,
               application_deadline, target_grades, region, verification_status, verification_notes
        FROM contests
        ORDER BY application_deadline IS NULL, application_deadline, title
        """
    ).fetchall()

    duplicates, conflicts = [], []
    for i, left in enumerate(rows):
        for right in rows[i + 1 :]:
            if left["source_site"] == right["source_site"]:
                continue
            score = similarity(left["title"], right["title"])
            if score < 0.88:
                continue
            same_deadline = bool(left["application_deadline"] and left["application_deadline"] == right["application_deadline"])
            same_official = bool(left["official_url"] and right["official_url"] and left["official_url"] == right["official_url"])
            if not (same_deadline or same_official or score >= 0.94):
                continue
            duplicates.append((left, right, score, same_deadline, same_official))
            con.execute(
                "UPDATE contests SET verification_notes=? WHERE id=?",
                (
                    append_note(
                        left["verification_notes"],
                        f"cross-source duplicate candidate: {right['source_site']}:{right['id']}",
                    ),
                    left["id"],
                ),
            )
            con.execute(
                "UPDATE contests SET verification_notes=? WHERE id=?",
                (
                    append_note(
                        right["verification_notes"],
                        f"cross-source duplicate candidate: {left['source_site']}:{left['id']}",
                    ),
                    right["id"],
                ),
            )
            if left["application_deadline"] and right["application_deadline"] and left["application_deadline"] != right["application_deadline"]:
                conflicts.append((left, right, "deadline mismatch"))
                for row, other in [(left, right), (right, left)]:
                    con.execute(
                        "UPDATE contests SET verification_status='conflict', verification_notes=? WHERE id=?",
                        (
                            append_note(
                                row["verification_notes"],
                                f"cross-source deadline mismatch with {other['source_site']}:{other['id']}",
                            ),
                            row["id"],
                        ),
                    )
    con.commit()
    lines = [
        "# Contest Cross-source Verification",
        "",
        f"- checked_at: {datetime.now().isoformat(timespec='seconds')}",
        f"- total records: {len(rows)}",
        f"- duplicate candidates: {len(duplicates)}",
        f"- conflicts: {len(conflicts)}",
        "",
    ]
    if duplicates:
        lines.extend(["## Duplicate candidates", ""])
        for left, right, score, same_deadline, same_official in duplicates[:100]:
            lines.append(
                f"- {score:.2f} deadline={same_deadline} official={same_official}: "
                f"{left['source_site']}:{left['title']} <-> {right['source_site']}:{right['title']}"
            )
    if conflicts:
        lines.extend(["", "## Conflicts", ""])
        for left, right, reason in conflicts[:100]:
            lines.append(f"- {reason}: {left['id']} <-> {right['id']}")
    OUT.write_text("\n".join(lines) + "\n", encoding="utf-8")
    print(f"contest cross verify: duplicates={len(duplicates)} conflicts={len(conflicts)}")


if __name__ == "__main__":
    main()
