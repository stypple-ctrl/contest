#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Cross-check culture_events across API sources and mark duplicate/conflict hints."""
import re
import sqlite3
from datetime import datetime
from difflib import SequenceMatcher
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DB = ROOT / "data" / "contests.db"
OUT = ROOT / "_workspace" / "06_culture_cross_verify.md"


def norm(value):
    text = re.sub(r"\[[^\]]+\]|\([^)]*\)", " ", value or "")
    text = re.sub(r"[^0-9A-Za-z가-힣]+", "", text).lower()
    return text


def similar(a, b):
    na, nb = norm(a), norm(b)
    if not na or not nb:
        return 0.0
    if na in nb or nb in na:
        return 0.96
    return SequenceMatcher(None, na, nb).ratio()


def append_note(existing, note):
    existing = existing or ""
    if note in existing:
        return existing
    return f"{existing} | {note}".strip(" |")


def main():
    con = sqlite3.connect(DB)
    con.row_factory = sqlite3.Row
    rows = con.execute("SELECT * FROM culture_events ORDER BY source, start_date, title").fetchall()
    matches, conflicts = [], []
    for i, left in enumerate(rows):
        for right in rows[i + 1 :]:
            if left["source"] == right["source"]:
                continue
            score = similar(left["title"], right["title"])
            if score < 0.9:
                continue
            same_date = (left["start_date"], left["end_date"]) == (right["start_date"], right["end_date"])
            same_place = bool(left["venue_name"] and right["venue_name"] and norm(left["venue_name"]) == norm(right["venue_name"]))
            if same_date or same_place or score >= 0.96:
                matches.append((left, right, score, same_date, same_place))
                note = f"cross-source duplicate candidate: {right['source']}:{right['source_event_id']}"
                con.execute(
                    "UPDATE culture_events SET verification_notes=? WHERE id=?",
                    (append_note(left["verification_notes"], note), left["id"]),
                )
                note = f"cross-source duplicate candidate: {left['source']}:{left['source_event_id']}"
                con.execute(
                    "UPDATE culture_events SET verification_notes=? WHERE id=?",
                    (append_note(right["verification_notes"], note), right["id"]),
                )
                if not same_date and left["start_date"] and right["start_date"]:
                    conflicts.append((left, right, "date mismatch"))
                    for row, other in [(left, right), (right, left)]:
                        con.execute(
                            "UPDATE culture_events SET verification_status='conflict', verification_notes=? WHERE id=?",
                            (
                                append_note(
                                    row["verification_notes"],
                                    f"cross-source date mismatch with {other['source']}:{other['source_event_id']}",
                                ),
                                row["id"],
                            ),
                        )
    con.commit()
    lines = [
        "# Culture Cross-source Verification",
        "",
        f"- checked_at: {datetime.now().isoformat(timespec='seconds')}",
        f"- total records: {len(rows)}",
        f"- duplicate candidates: {len(matches)}",
        f"- conflicts: {len(conflicts)}",
        "",
    ]
    if matches:
        lines.extend(["## Duplicate candidates", ""])
        for left, right, score, same_date, same_place in matches[:100]:
            lines.append(
                f"- {score:.2f} date={same_date} place={same_place}: "
                f"{left['source']}:{left['title']} <-> {right['source']}:{right['title']}"
            )
    if conflicts:
        lines.extend(["", "## Conflicts", ""])
        for left, right, reason in conflicts[:100]:
            lines.append(f"- {reason}: {left['id']} <-> {right['id']}")
    OUT.write_text("\n".join(lines) + "\n", encoding="utf-8")
    print(f"culture cross verify: matches={len(matches)} conflicts={len(conflicts)}")


if __name__ == "__main__":
    main()
