#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Collect KCISA museum exhibition data into culture_events.

Required env:
  KCISA_MUSEUM_API_KEY     service key issued by 문화데이터광장

Optional env:
  KCISA_MUSEUM_API_URL     full API endpoint URL. If omitted, pass --endpoint.

The API catalog for "국립지방박물관 통합 전시 정보" can expose slightly
different field names by version, so this collector accepts XML or JSON and
maps common exhibition fields conservatively.
"""
import argparse
import json
import os
import sqlite3
import ssl
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
from datetime import datetime
from pathlib import Path

from culture_env import load_env, sanitize_url

ROOT = Path(__file__).resolve().parents[1]
DB = ROOT / "data" / "contests.db"
CTX = ssl._create_unverified_context()


def text_from_dict(obj, names):
    lowered = {str(k).lower(): v for k, v in obj.items()}
    for name in names:
        value = obj.get(name)
        if value in (None, ""):
            value = lowered.get(name.lower())
        if value not in (None, ""):
            return str(value).strip()
    return None


def text_from_xml(node, names):
    for name in names:
        found = node.find(name) or node.find(f".//{name}")
        if found is not None and found.text:
            return found.text.strip()
    lower_names = {name.lower() for name in names}
    for child in list(node):
        if child.tag.lower() in lower_names and child.text:
            return child.text.strip()
    return None


def clean_date(value):
    if not value:
        return None
    value = value.strip().replace(".", "-").replace("/", "-")
    if len(value) >= 10:
        return value[:10]
    if len(value) == 8 and value.isdigit():
        return f"{value[:4]}-{value[4:6]}-{value[6:8]}"
    return value


def build_url(endpoint, params):
    separator = "&" if "?" in endpoint else "?"
    return f"{endpoint}{separator}{urllib.parse.urlencode(params)}"


def fetch(endpoint, key, page, rows):
    params = {
        "serviceKey": key,
        "serviceKey1": key,
        "numOfRows": rows,
        "pageNo": page,
        "page": page,
        "rows": rows,
    }
    url = build_url(endpoint, params)
    with urllib.request.urlopen(url, timeout=25, context=CTX) as response:
        body = response.read()
        content_type = response.headers.get("content-type", "")
    return body, content_type, sanitize_url(url)


def xml_items(body):
    root = ET.fromstring(body)
    for path in [".//item", ".//row", ".//data", ".//record"]:
        items = root.findall(path)
        if items:
            return items
    return root.findall(".//*")


def json_items(body):
    payload = json.loads(body.decode("utf-8"))
    stack = [payload]
    while stack:
        cur = stack.pop(0)
        if isinstance(cur, list) and (not cur or isinstance(cur[0], dict)):
            return cur
        if isinstance(cur, dict):
            for key in ["items", "item", "data", "list", "records", "result"]:
                value = cur.get(key)
                if isinstance(value, list):
                    return value
                if isinstance(value, dict):
                    stack.append(value)
            stack.extend(v for v in cur.values() if isinstance(v, (dict, list)))
    return []


def parse_items(body, content_type):
    if "json" in content_type.lower() or body.lstrip().startswith((b"{", b"[")):
        return ("json", json_items(body))
    return ("xml", xml_items(body))


def item_text(kind, item, names):
    if kind == "json":
        return text_from_dict(item, names)
    return text_from_xml(item, names)


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
    updates = ",".join(f"{key}=excluded.{key}" for key in keys if key != "id")
    con.execute(
        f"""
        INSERT INTO culture_events ({",".join(keys)})
        VALUES ({placeholders})
        ON CONFLICT(id) DO UPDATE SET {updates}
        """,
        [row[key] for key in keys],
    )


def collect(args):
    load_env()
    key = os.environ.get("KCISA_MUSEUM_API_KEY")
    endpoint = args.endpoint or os.environ.get("KCISA_MUSEUM_API_URL")
    if not key:
        raise SystemExit("KCISA_MUSEUM_API_KEY is required. Put it in .env/.env.local or shell env, not source code.")
    if not endpoint:
        raise SystemExit("KCISA_MUSEUM_API_URL or --endpoint is required for the museum API catalog URL.")

    con = sqlite3.connect(DB)
    now = datetime.now().isoformat(timespec="seconds")
    total = 0
    for page in range(1, args.max_pages + 1):
        body, content_type, source_url = fetch(endpoint, key, page, args.rows)
        kind, items = parse_items(body, content_type)
        if not items:
            break
        for item in items:
            source_id = item_text(kind, item, ["id", "seq", "sn", "exhId", "exhNo", "cntntsNo", "title", "subject"]) or f"{page}-{total}"
            title = item_text(kind, item, ["title", "subject", "exhTitle", "exhNm", "exhibitionTitle", "name"]) or "제목 확인 필요"
            museum = item_text(kind, item, ["museum", "museumNm", "insttNm", "orgNm", "fcltyNm", "place", "venue"])
            region = item_text(kind, item, ["area", "region", "sido", "ctprvn", "addr1"])
            sigungu = item_text(kind, item, ["sigungu", "signgu", "district", "addr2"])
            address = item_text(kind, item, ["address", "addr", "placeAddr", "addr1"])
            official_url = item_text(kind, item, ["url", "homepage", "link", "detailUrl", "orgLink"])
            start_date = clean_date(item_text(kind, item, ["startDate", "startDt", "sDate", "from", "beginDe", "exhStartDate"]))
            end_date = clean_date(item_text(kind, item, ["endDate", "endDt", "eDate", "to", "endDe", "exhEndDate"]))
            price = item_text(kind, item, ["price", "fee", "useFee", "charge"])
            image = item_text(kind, item, ["image", "imgUrl", "thumbnail", "poster", "mainImage"])
            # Do not republish provider descriptions verbatim. Build a short
            # factual sentence from normalized fields instead.
            summary = f"{title} 전시 정보입니다."
            row = {
                "id": f"kcisa_museum-{source_id}",
                "source": "kcisa_museum",
                "source_event_id": source_id,
                "source_url": source_url,
                "official_url": official_url,
                "title": title,
                "event_type": "전시",
                "category": "박물관/전시",
                "target_grades": "",
                "age_text": item_text(kind, item, ["age", "target", "useTarget"]),
                "region": region or "확인필요",
                "venue_name": museum,
                "venue_address": address or sigungu,
                "start_date": start_date,
                "end_date": end_date,
                "runtime": None,
                "price_text": price,
                "free": 1 if "무료" in (price or "") else 0,
                "poster_url": image,
                "summary": summary,
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
    con.close()
    print(f"collected/upserted {total} KCISA museum events")


def parse_args():
    parser = argparse.ArgumentParser()
    parser.add_argument("--endpoint", help="KCISA museum exhibition API endpoint URL")
    parser.add_argument("--rows", type=int, default=50)
    parser.add_argument("--max-pages", type=int, default=2)
    return parser.parse_args()


if __name__ == "__main__":
    collect(parse_args())
