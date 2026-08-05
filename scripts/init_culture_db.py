#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""문화행사 저장 테이블을 생성한다."""
import sqlite3
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DB = ROOT / "data" / "contests.db"


def main():
    DB.parent.mkdir(parents=True, exist_ok=True)
    con = sqlite3.connect(DB)
    con.executescript(
        """
        CREATE TABLE IF NOT EXISTS culture_events (
          id TEXT PRIMARY KEY,
          source TEXT NOT NULL,
          source_event_id TEXT NOT NULL,
          source_url TEXT,
          official_url TEXT,
          title TEXT NOT NULL,
          event_type TEXT,
          category TEXT,
          target_grades TEXT,
          age_text TEXT,
          region TEXT,
          venue_name TEXT,
          venue_address TEXT,
          start_date TEXT,
          end_date TEXT,
          runtime TEXT,
          price_text TEXT,
          free INTEGER DEFAULT 0,
          poster_url TEXT,
          summary TEXT,
          status TEXT,
          verification_status TEXT DEFAULT 'conflict',
          verification_notes TEXT,
          collected_at TEXT,
          updated_at TEXT,
          UNIQUE(source, source_event_id)
        );

        CREATE TABLE IF NOT EXISTS culture_recommendations (
          event_id TEXT PRIMARY KEY,
          subject_tags TEXT,
          use_case_tags TEXT,
          confidence TEXT,
          confidence_score INTEGER,
          reasons_json TEXT,
          evidence_json TEXT,
          warnings_json TEXT,
          program_ideas_json TEXT,
          FOREIGN KEY(event_id) REFERENCES culture_events(id)
        );

        CREATE INDEX IF NOT EXISTS idx_culture_dates ON culture_events(start_date, end_date);
        CREATE INDEX IF NOT EXISTS idx_culture_region ON culture_events(region);
        CREATE INDEX IF NOT EXISTS idx_culture_type ON culture_events(event_type);
        CREATE INDEX IF NOT EXISTS idx_culture_status ON culture_events(status);
        """
    )
    con.commit()
    con.close()
    print(f"culture tables ready -> {DB}")


if __name__ == "__main__":
    main()
