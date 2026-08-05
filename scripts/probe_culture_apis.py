#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""승인받은 문화 API의 최소 호출을 검증한다.

출력에는 인증키를 표시하지 않는다.
"""
import os
import ssl
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
from datetime import date, timedelta

from culture_env import load_env


def fetch(url):
    context = None
    if "apis.data.go.kr" in url:
        # Some macOS Python installs miss the public CA chain used by data.go.kr.
        context = ssl._create_unverified_context()
    with urllib.request.urlopen(url, timeout=20, context=context) as response:
        body = response.read()
        return response.status, response.headers.get("content-type"), body


def summarize_xml(body):
    root = ET.fromstring(body)
    dbs = root.findall(".//db")
    items = root.findall(".//item")
    err = root.find(".//errMsg")
    result_msg = root.find(".//resultMsg")
    return {
        "root": root.tag,
        "db_count": len(dbs),
        "item_count": len(items),
        "err": err.text.strip() if err is not None and err.text else None,
        "result": result_msg.text.strip() if result_msg is not None and result_msg.text else None,
        "first_title": first_text(dbs[0] if dbs else items[0] if items else None, ["prfnm", "title", "titleNm", "subject"]),
    }


def first_text(node, names):
    if node is None:
        return None
    for name in names:
        found = node.find(name)
        if found is not None and found.text:
            return found.text.strip()
    return None


def main():
    load_env()
    kopis_key = os.environ.get("KOPIS_API_KEY")
    culture_key = os.environ.get("CULTUREINFO_API_KEY")
    museum_key = os.environ.get("KCISA_MUSEUM_API_KEY")
    museum_url = os.environ.get("KCISA_MUSEUM_API_URL")
    print(f"KOPIS_API_KEY={'SET' if kopis_key else 'UNSET'}")
    print(f"CULTUREINFO_API_KEY={'SET' if culture_key else 'UNSET'}")
    print(f"KCISA_MUSEUM_API_KEY={'SET' if museum_key else 'UNSET'}")
    print(f"KCISA_MUSEUM_API_URL={'SET' if museum_url else 'UNSET'}")

    today = date.today()
    start = today.strftime("%Y%m%d")
    end = (today + timedelta(days=7)).strftime("%Y%m%d")

    if kopis_key:
        params = urllib.parse.urlencode({
            "service": kopis_key,
            "stdate": start,
            "eddate": end,
            "cpage": 1,
            "rows": 3,
            "kidstate": "Y",
        })
        url = f"http://www.kopis.or.kr/openApi/restful/pblprfr?{params}"
        status, content_type, body = fetch(url)
        print("KOPIS probe", {"status": status, "content_type": content_type, **summarize_xml(body)})
    else:
        print("KOPIS probe skipped: key missing")

    if culture_key:
        params = urllib.parse.urlencode({
            "serviceKey": culture_key,
            "numOfRows": 3,
            "pageNo": 1,
            "from": start,
            "to": end,
        })
        url = f"http://apis.data.go.kr/B553457/cultureinfo/period2?{params}"
        status, content_type, body = fetch(url)
        print("CultureInfo probe", {"status": status, "content_type": content_type, **summarize_xml(body)})
    else:
        print("CultureInfo probe skipped: key missing")

    if museum_key and museum_url:
        params = urllib.parse.urlencode({
            "serviceKey": museum_key,
            "numOfRows": 3,
            "pageNo": 1,
        })
        sep = "&" if "?" in museum_url else "?"
        status, content_type, body = fetch(f"{museum_url}{sep}{params}")
        print("KCISA museum probe", {"status": status, "content_type": content_type, "bytes": len(body)})
    else:
        print("KCISA museum probe skipped: key or URL missing")


if __name__ == "__main__":
    main()
