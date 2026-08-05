#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""문화정보원 한눈에보는문화정보 API를 수집해 culture_events에 적재한다.

환경변수:
  CULTUREINFO_API_KEY: 공공데이터포털 일반 인증키(Decoding 권장)

공지 반영:
  2026년 변경 URL은 http://apis.data.go.kr/B553457/cultureinfo/{period2,area2,realm2,detail2,livelihood2}
  이며 area2에는 sigungu 요청 파라미터가 추가되었다. 응답 sigungu는 venue_address 보강에 사용한다.
"""
import argparse
import os
import ssl
import sqlite3
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
from datetime import datetime
from pathlib import Path

from culture_env import load_env, sanitize_url

ROOT = Path(__file__).resolve().parents[1]
DB = ROOT / "data" / "contests.db"
BASE = "http://apis.data.go.kr/B553457/cultureinfo"


def node_text(node, names):
    for name in names:
        found = node.find(name)
        if found is not None and found.text:
            return found.text.strip()
    return None


def fetch_xml(path, params):
    url = f"{BASE}{path}?{urllib.parse.urlencode(params)}"
    context = ssl._create_unverified_context()
    with urllib.request.urlopen(url, timeout=20, context=context) as response:
        body = response.read()
    return ET.fromstring(body), sanitize_url(url)


def find_items(root):
    candidates = root.findall(".//item")
    if candidates:
        return candidates
    return root.findall(".//cultureInfo")


def detail_item(service_key, seq):
    if not seq:
        return None
    root, _ = fetch_xml("/detail2", {"serviceKey": service_key, "seq": seq})
    return root.find(".//item")


def source_prefix(mode):
    return "cultureinfo" if mode == "period" else f"cultureinfo_{mode}"


def infer_event_type(realm, title):
    text = f"{realm or ''} {title or ''}"
    if "전시" in text:
        return "전시"
    if "공연" in text or "음악" in text or "콘서트" in text:
        return "공연"
    if "교육" in text or "체험" in text:
        return "교육/체험"
    if "축제" in text or "행사" in text:
        return "축제/행사"
    if "도서" in text:
        return "도서"
    return realm or "문화행사"


def infer_grades(title, age_text):
    text = f"{title or ''} {age_text or ''}"
    if "청소년관람불가" in text or "19세" in text or "성인" in text:
        return ""
    if any(k in text for k in ["어린이", "아동", "초등", "가족", "전체"]):
        return "초등"
    if "청소년" in text:
        return "중등,고등"
    return ""


def clean_date(value):
    if not value:
        return None
    v = value.strip().replace(".", "-").replace("/", "-")
    if len(v) >= 10:
        return v[:10]
    if len(v) == 8 and v.isdigit():
        return f"{v[:4]}-{v[4:6]}-{v[6:8]}"
    return v


def verify(row):
    notes = []
    if not row["title"]:
        notes.append("title missing")
    if not (row["start_date"] or row["end_date"]):
        notes.append("date missing")
    if not (row["region"] or row["venue_name"]):
        notes.append("region/venue missing")
    if not row["official_url"]:
        notes.append("official url missing")
    return ("verified" if not notes else "conflict", "; ".join(notes))


def upsert(con, row):
    row["verification_status"], row["verification_notes"] = verify(row)
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
    service_key = os.environ.get("CULTUREINFO_API_KEY")
    if not service_key:
        raise SystemExit("CULTUREINFO_API_KEY is required. Put it in your shell env, not in source code.")

    con = sqlite3.connect(DB)
    now = datetime.now().isoformat(timespec="seconds")
    total = 0
    page = 1
    path = {
        "period": "/period2",
        "area": "/area2",
        "realm": "/realm2",
        "livelihood": "/livelihood2",
    }[args.mode]
    while True:
        params = {
            "serviceKey": service_key,
            "numOfRows": args.rows,
            "pageNo": page,
        }
        if args.start:
            params["from"] = args.start.replace("-", "")
        if args.end:
            params["to"] = args.end.replace("-", "")
        if args.region or args.mode == "area":
            params["area"] = args.region
        if args.sigungu:
            params["sigungu"] = args.sigungu
        if args.realm:
            params["realmCode"] = args.realm
        root, source_url = fetch_xml(path, params)
        items = find_items(root)
        if not items:
            break
        for item in items:
            source_event_id = node_text(item, ["seq", "contentid", "id", "title"]) or f"{page}-{total}"
            detail = detail_item(service_key, source_event_id)
            merged = detail if detail is not None else item
            title = node_text(item, ["title", "titleNm", "subject"]) or "제목 확인 필요"
            realm = node_text(merged, ["realmName", "realmNm", "category"])
            region = node_text(merged, ["area", "areaName", "region"])
            sigungu = node_text(merged, ["sigungu", "sigunguName", "signgu", "district"])
            venue = node_text(merged, ["place", "placeNm", "venue"])
            age = node_text(merged, ["useTarget", "age", "target"])
            official_url = node_text(merged, ["url", "homepage", "orgLink", "placeUrl"])
            start_date = clean_date(node_text(merged, ["startDate", "startDt", "sDate"]))
            end_date = clean_date(node_text(merged, ["endDate", "endDt", "eDate"]))
            price = node_text(merged, ["price", "fee", "useFee"])
            prefix = source_prefix(args.mode)
            row = {
                "id": f"{prefix}-{source_event_id}",
                "source": prefix,
                "source_event_id": source_event_id,
                "source_url": source_url,
                "official_url": official_url,
                "title": title,
                "event_type": infer_event_type(realm, title),
                "category": realm or "문화행사",
                "target_grades": infer_grades(title, age),
                "age_text": age,
                "region": region or "확인필요",
                "venue_name": venue,
                "venue_address": node_text(merged, ["placeAddr", "addr", "address"]) or sigungu,
                "start_date": start_date,
                "end_date": end_date,
                "runtime": None,
                "price_text": price,
                "free": 1 if "무료" in (price or "") else 0,
                "poster_url": node_text(merged, ["thumbnail", "imgUrl", "image"]),
                # Do not republish provider descriptions verbatim. Build a short
                # factual sentence from normalized fields instead.
                "summary": f"{title} 문화행사 정보입니다.",
                "status": "예정/진행",
                "verification_status": "conflict",
                "verification_notes": "",
                "collected_at": now,
                "updated_at": now,
            }
            upsert(con, row)
            total += 1
        con.commit()
        if len(items) < args.rows:
            break
        page += 1
        if args.max_pages and page > args.max_pages:
            break
    con.close()
    print(f"collected/upserted {total} cultureinfo events")


def parse_args():
    parser = argparse.ArgumentParser()
    parser.add_argument("--mode", choices=["period", "area", "realm", "livelihood"], default="period")
    parser.add_argument("--start", help="YYYY-MM-DD")
    parser.add_argument("--end", help="YYYY-MM-DD")
    parser.add_argument("--rows", type=int, default=50)
    parser.add_argument("--max-pages", type=int, default=2)
    parser.add_argument("--region")
    parser.add_argument("--sigungu")
    parser.add_argument("--realm")
    args = parser.parse_args()
    if args.mode in ("period", "livelihood") and not (args.start and args.end):
        parser.error("--start and --end are required for period/livelihood mode")
    if args.mode == "area" and not args.region:
        parser.error("--region is required for area mode")
    if args.mode == "realm" and not args.realm:
        parser.error("--realm is required for realm mode")
    return args


if __name__ == "__main__":
    collect(parse_args())
