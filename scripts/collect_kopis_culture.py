#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""KOPIS 공연 데이터를 수집해 culture_events에 적재한다.

환경변수:
  KOPIS_API_KEY: KOPIS OpenAPI 인증키

예:
  KOPIS_API_KEY=... python3 scripts/collect_kopis_culture.py --start 2026-07-01 --end 2026-07-31 --kid-only
"""
import argparse
import os
import sqlite3
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
from datetime import date, datetime, timedelta
from pathlib import Path

from culture_env import load_env

ROOT = Path(__file__).resolve().parents[1]
DB = ROOT / "data" / "contests.db"
BASE = "http://www.kopis.or.kr/openApi/restful"

GENRE_MAP = {
    "AAAA": "연극",
    "BBBC": "무용",
    "CCCA": "클래식",
    "CCCC": "국악",
    "CCCD": "대중음악",
    "EEEB": "서커스/마술",
    "GGGA": "뮤지컬",
}


def text(node, name):
    if node is None:
        return None
    found = node.find(f".//{name}")
    return (found.text or "").strip() if found is not None and found.text else None


def ymd(value):
    if not value:
        return None
    value = value.strip().replace(".", "-")
    if len(value) == 8 and value.isdigit():
        return f"{value[:4]}-{value[4:6]}-{value[6:8]}"
    return value


def daterange_chunks(start, end, days=31):
    cur = start
    while cur <= end:
        chunk_end = min(end, cur + timedelta(days=days - 1))
        yield cur, chunk_end
        cur = chunk_end + timedelta(days=1)


def fetch_xml(path, params):
    url = f"{BASE}/{path}?{urllib.parse.urlencode(params)}"
    with urllib.request.urlopen(url, timeout=20) as response:
        body = response.read()
    return ET.fromstring(body), url


def public_kopis_url(source_event_id):
    return f"https://www.kopis.or.kr/por/db/pblprfr/pblprfrView.do?mt20Id={urllib.parse.quote(source_event_id)}"


def infer_target_grades(age_text, kidstate):
    age = age_text or ""
    if "청소년관람불가" in age or "18세" in age or "19세" in age:
        return ""
    if kidstate == "Y" or "전체" in age or "5세" in age or "7세" in age or "8세" in age:
        return "초등"
    if "12세" in age or "13세" in age or "14세" in age:
        return "중등,고등"
    if "15세" in age or "16세" in age:
        return "고등"
    return ""


def infer_region(venue):
    if not venue:
        return "확인필요"
    # KOPIS 목록 응답은 주소가 없어 시설명 기반으로만 보수적으로 추정한다.
    for region in ["서울", "부산", "대구", "인천", "광주", "대전", "울산", "세종", "경기", "강원", "충북", "충남", "전북", "전남", "경북", "경남", "제주"]:
        if region in venue:
            return region
    return "확인필요"


def infer_status(start_date, end_date, prfstate):
    today = date.today()
    start = date.fromisoformat(start_date) if start_date else None
    end = date.fromisoformat(end_date) if end_date else None
    if end and end < today:
        return "종료"
    if start and start > today:
        return "예정"
    if prfstate:
        return prfstate
    return "진행중"


def verification(row):
    notes = []
    if not row["title"]:
        notes.append("title missing")
    if not (row["start_date"] or row["end_date"]):
        notes.append("date missing")
    if row["region"] == "확인필요" and not row["venue_name"]:
        notes.append("region/venue missing")
    if not row["age_text"] and not row["target_grades"]:
        notes.append("age missing")
    if not row["official_url"]:
        notes.append("official/ticket url missing")
    return ("verified" if not notes else "conflict", "; ".join(notes))


def upsert_event(con, row):
    row["verification_status"], row["verification_notes"] = verification(row)
    keys = list(row.keys())
    placeholders = ",".join("?" for _ in keys)
    updates = ",".join(f"{k}=excluded.{k}" for k in keys if k != "id")
    con.execute(
        f"""
        INSERT INTO culture_events ({",".join(keys)})
        VALUES ({placeholders})
        ON CONFLICT(id) DO UPDATE SET {updates}
        """,
        [row[k] for k in keys],
    )


def collect(args):
    load_env()
    service = os.environ.get("KOPIS_API_KEY")
    if not service:
        raise SystemExit("KOPIS_API_KEY is required. Put it in your shell env, not in source code.")

    con = sqlite3.connect(DB)
    con.row_factory = sqlite3.Row
    now = datetime.now().isoformat(timespec="seconds")
    total = 0

    for start, end in daterange_chunks(args.start, args.end):
        page = 1
        while True:
            params = {
                "service": service,
                "stdate": start.strftime("%Y%m%d"),
                "eddate": end.strftime("%Y%m%d"),
                "cpage": page,
                "rows": args.rows,
            }
            if args.kid_only:
                params["kidstate"] = "Y"
            if args.genre:
                params["shcate"] = args.genre
            root, source_url = fetch_xml("pblprfr", params)
            items = root.findall(".//db")
            if not items:
                break
            for item in items:
                source_event_id = text(item, "mt20id")
                if not source_event_id:
                    continue
                try:
                    detail_root, _ = fetch_xml(f"pblprfr/{source_event_id}", {"service": service})
                    detail = detail_root.find(".//db")
                except Exception:
                    detail = None
                age = text(detail, "prfage") if detail is not None else None
                price = text(detail, "pcseguidance") if detail is not None else None
                runtime = text(detail, "prfruntime") if detail is not None else None
                official_url = public_kopis_url(source_event_id)
                start_date = ymd(text(item, "prfpdfrom"))
                end_date = ymd(text(item, "prfpdto"))
                venue = text(item, "fcltynm")
                title = text(item, "prfnm") or "제목 확인 필요"
                category = GENRE_MAP.get(args.genre or "", text(item, "genrenm") or "공연")
                row = {
                    "id": f"kopis-{source_event_id}",
                    "source": "kopis",
                    "source_event_id": source_event_id,
                    "source_url": public_kopis_url(source_event_id),
                    "official_url": official_url,
                    "title": title,
                    "event_type": "공연",
                    "category": category,
                    "target_grades": infer_target_grades(age, "Y" if args.kid_only else None),
                    "age_text": age,
                    "region": infer_region(venue),
                    "venue_name": venue,
                    "venue_address": None,
                    "start_date": start_date,
                    "end_date": end_date,
                    "runtime": runtime,
                    "price_text": price,
                    "free": 1 if price and "무료" in price else 0,
                    "poster_url": text(item, "poster"),
                    "summary": f"{title}은(는) {venue or '장소 확인 필요'}에서 진행되는 {category} 행사입니다.",
                    "status": infer_status(start_date, end_date, text(item, "prfstate")),
                    "verification_status": "conflict",
                    "verification_notes": "",
                    "collected_at": now,
                    "updated_at": now,
                }
                upsert_event(con, row)
                total += 1
            con.commit()
            if len(items) < args.rows:
                break
            page += 1
    con.close()
    print(f"collected/upserted {total} KOPIS events")


def parse_args():
    parser = argparse.ArgumentParser()
    parser.add_argument("--start", type=lambda s: datetime.strptime(s, "%Y-%m-%d").date(), required=True)
    parser.add_argument("--end", type=lambda s: datetime.strptime(s, "%Y-%m-%d").date(), required=True)
    parser.add_argument("--rows", type=int, default=30)
    parser.add_argument("--kid-only", action="store_true")
    parser.add_argument("--genre", choices=sorted(GENRE_MAP), help="KOPIS genre code")
    return parser.parse_args()


if __name__ == "__main__":
    collect(parse_args())
