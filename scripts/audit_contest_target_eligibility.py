#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Quarantine contest records that look adult-only after normalization."""
import re
import sqlite3
from datetime import datetime
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DB = ROOT / "data" / "contests.db"
OUT = ROOT / "_workspace" / "08_contest_target_eligibility.md"

YOUTH_RE = re.compile(r"초등|초등학생|초등부|초[1-6]|중등|중학생|중등부|중[1-3]|고등|고등학생|고교|고등부|고[1-3]|초·중·고|초중고|청소년|어린이|아동")
ADULT_RE = re.compile(r"청년|대학생|대학원생|일반인|성인|직장인|구직자|취업|면접|인턴|재직자|패널")


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
        SELECT id, title, target_grade_detail, summary, verification_notes
        FROM contests
        """
    ).fetchall()
    quarantined = []
    for row in rows:
        # Existing rows may already contain polluted target_grade_detail values
        # such as "청소년 대외활동" copied from an aggregator category. Do not let
        # that legacy field rescue an otherwise adult-only title.
        text = " ".join([row["title"] or "", row["summary"] or ""])
        if ADULT_RE.search(text) and not YOUTH_RE.search(text):
            quarantined.append(row)
            con.execute(
                """
                UPDATE contests
                SET target_grades='',
                    is_elem=0,
                    is_mid=0,
                    is_high=0,
                    target_grade_detail='원본 참가대상 재확인 필요',
                    verification_status='conflict',
                    verification_notes=?
                WHERE id=?
                """,
                (append_note(row["verification_notes"], "성인/청년 대상 후보로 초중고 추천 제외"), row["id"]),
            )
    con.commit()
    con.close()

    lines = [
        "# Contest Target Eligibility Audit",
        "",
        f"- checked_at: {datetime.now().isoformat(timespec='seconds')}",
        f"- quarantined: {len(quarantined)}",
        "",
    ]
    for row in quarantined:
        lines.append(f"- {row['id']}: {row['title']}")
    OUT.write_text("\n".join(lines) + "\n", encoding="utf-8")
    print(f"contest target eligibility audit: quarantined={len(quarantined)}")


if __name__ == "__main__":
    main()
