#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""data-architect. 검수본을 SQLite에 멱등 적재(upsert)한다.
검색 4대 축: 참가연령(is_elem/is_mid/is_high) · 지역 · 마감일 · 분야."""
import json, os, sqlite3
from datetime import date
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "..", ".."))
WS = os.path.join(ROOT, "_workspace")
DB = os.path.join(ROOT, "data", "contests.db")
TODAY = date(2026, 6, 24)

SCHEMA = """
CREATE TABLE IF NOT EXISTS contests (
  id TEXT PRIMARY KEY,
  source_site TEXT, source_url TEXT, official_url TEXT,
  title TEXT, organizer TEXT, category TEXT, activity_type TEXT,
  target_grades TEXT,
  is_elem INTEGER, is_mid INTEGER, is_high INTEGER,
  target_grade_detail TEXT,
  region TEXT, region_detail TEXT,
  application_start TEXT, application_deadline TEXT,
  event_date_start TEXT, event_date_end TEXT,
  prize TEXT, entry_fee TEXT, summary TEXT,
  status TEXT, collected_at TEXT, updated_at TEXT,
  verification_status TEXT, verification_notes TEXT
);
CREATE TABLE IF NOT EXISTS contest_regions (contest_id TEXT, region TEXT);
CREATE INDEX IF NOT EXISTS idx_deadline ON contests(application_deadline);
CREATE INDEX IF NOT EXISTS idx_grade ON contests(is_elem, is_mid, is_high);
CREATE INDEX IF NOT EXISTS idx_cat ON contests(category);
CREATE INDEX IF NOT EXISTS idx_region ON contest_regions(region);
"""

UPSERT = """
INSERT INTO contests VALUES (:id,:source_site,:source_url,:official_url,:title,:organizer,
  :category,:activity_type,:target_grades,:is_elem,:is_mid,:is_high,:target_grade_detail,
  :region,:region_detail,:application_start,:application_deadline,:event_date_start,:event_date_end,
  :prize,:entry_fee,:summary,:status,:collected_at,:updated_at,:verification_status,:verification_notes)
ON CONFLICT(id) DO UPDATE SET
  title=excluded.title, organizer=excluded.organizer, category=excluded.category,
  target_grades=excluded.target_grades, is_elem=excluded.is_elem, is_mid=excluded.is_mid,
  is_high=excluded.is_high, region=excluded.region, application_start=excluded.application_start,
  application_deadline=excluded.application_deadline, status=excluded.status,
  prize=excluded.prize, summary=excluded.summary, updated_at=excluded.updated_at,
  verification_status=excluded.verification_status, verification_notes=excluded.verification_notes;
"""

def main():
    os.makedirs(os.path.dirname(DB), exist_ok=True)
    recs = json.load(open(os.path.join(WS, "03_verifier_records.json"), encoding="utf-8"))
    con = sqlite3.connect(DB); con.executescript(SCHEMA)
    n_new = n_upd = 0
    for r in recs:
        grades = r.get("target_grades", [])
        regions = r.get("region", [])
        row = dict(r)
        row["target_grades"] = ",".join(grades)
        row["region"] = ",".join(regions)
        row["is_elem"] = 1 if "초등" in grades else 0
        row["is_mid"] = 1 if "중등" in grades else 0
        row["is_high"] = 1 if "고등" in grades else 0
        exists = con.execute("SELECT 1 FROM contests WHERE id=?", (r["id"],)).fetchone()
        con.execute(UPSERT, row)
        con.execute("DELETE FROM contest_regions WHERE contest_id=?", (r["id"],))
        for reg in regions:
            con.execute("INSERT INTO contest_regions VALUES (?,?)", (r["id"], reg))
        n_upd += 1 if exists else 0
        n_new += 0 if exists else 1
    # 마감 지난 항목 status 갱신
    con.execute("UPDATE contests SET status='마감' WHERE application_deadline IS NOT NULL AND application_deadline < ?",
                (TODAY.isoformat(),))
    con.commit()
    total = con.execute("SELECT COUNT(*) FROM contests").fetchone()[0]
    by_grade = {g: con.execute("SELECT COUNT(*) FROM contests WHERE is_%s=1" % col).fetchone()[0]
                for g, col in [("초등","elem"),("중등","mid"),("고등","high")]}
    con.close()
    with open(os.path.join(WS, "04_data_report.md"), "w", encoding="utf-8") as f:
        f.write("# Data Load Report\n\n- 신규 %d / 갱신 %d / 총 %d건\n- 등급별: %s\n- DB: %s\n"
                % (n_new, n_upd, total, by_grade, DB))
    print("적재 완료: 신규 %d, 갱신 %d, 총 %d건 -> %s" % (n_new, n_upd, total, DB))
    print("등급별 건수:", by_grade)

if __name__ == "__main__":
    main()
