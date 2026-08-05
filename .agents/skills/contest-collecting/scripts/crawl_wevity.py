#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""wevity 수집기 (collector). 대상=청소년(cidx=30)·어린이(cidx=31) 목록을 긁어
상세페이지의 응모대상/주최/접수기간/홈페이지 원문을 보존해 원시 JSON으로 저장한다.
판단·분류는 하지 않는다(그건 normalizer). 출처(source_url)는 가공하지 않는다."""
import urllib.request, ssl, json, time, re, sys, os
from datetime import date
from bs4 import BeautifulSoup

CTX = ssl.create_default_context(); CTX.check_hostname=False; CTX.verify_mode=ssl.CERT_NONE
BASE = "https://www.wevity.com/"
TARGETS = {30: "청소년", 31: "어린이"}
OUT = os.path.join(os.path.dirname(__file__), "..", "..", "..", "..", "_workspace")
OUT = os.path.abspath(OUT)

def get(url):
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 (contest-harvest pilot)"})
    return urllib.request.urlopen(req, timeout=20, context=CTX).read().decode("utf-8", "ignore")

def detail_fields(html):
    """상세페이지의 라벨-값(li > span.tit) 원문을 dict로."""
    soup = BeautifulSoup(html, "html.parser")
    fields = {}
    for li in soup.find_all("li"):
        tit = li.find("span", class_="tit")
        if not tit:
            continue
        label = tit.get_text(strip=True)
        full = li.get_text(" ", strip=True)
        val = full.replace(label, "", 1).strip()
        if label and val:
            fields[label] = val
    return fields

def crawl():
    seen, records = set(), []
    for cidx, name in TARGETS.items():
        list_url = "%s?c=find&s=1&gub=2&cidx=%d" % (BASE, cidx)
        soup = BeautifulSoup(get(list_url), "html.parser")
        items = [li for li in soup.select("ul.list li") if "top" not in (li.get("class") or [])]
        for li in items:
            a = li.select_one(".tit a")
            if not a:
                continue
            m = re.search(r"ix=(\d+)", a["href"])
            if not m:
                continue
            ix = m.group(1)
            if ix in seen:
                continue
            seen.add(ix)
            sub = li.select_one(".sub-tit")
            rec = {
                "source_site": "wevity",
                "source_id": ix,
                "source_url": "%s?c=find&s=1&gub=2&cidx=%d&gbn=view&ix=%s" % (BASE, cidx, ix),
                "wevity_target_filter": name,  # 어느 대상 필터에서 나왔는지(힌트)
                "title": a.get_text(" ", strip=True),
                "list_category": sub.get_text(" ", strip=True).replace("분야 :", "").strip() if sub else "",
                "list_organ": (li.select_one(".organ").get_text(strip=True) if li.select_one(".organ") else ""),
                "list_day": (li.select_one(".day").get_text(" ", strip=True) if li.select_one(".day") else ""),
            }
            # 상세 진입(원문 보존)
            try:
                df = detail_fields(get(rec["source_url"]))
                rec["detail_fields"] = df
                rec["raw_target"] = df.get("응모대상", "")
                rec["raw_organizer"] = df.get("주최/주관", "")
                rec["raw_period"] = df.get("접수기간", "")
                rec["official_url"] = df.get("홈페이지", "")
                rec["raw_region"] = df.get("응모지역", df.get("지역", ""))
                rec["raw_prize"] = df.get("시상내역", df.get("시상", ""))
            except Exception as e:
                rec["detail_error"] = "%s: %s" % (type(e).__name__, e)
            rec["collected_at"] = date.today().isoformat()
            records.append(rec)
            time.sleep(0.7)  # 예절: 요청 간격
    return records

def main():
    os.makedirs(OUT, exist_ok=True)
    recs = crawl()
    path = os.path.join(OUT, "01_collector_wevity_raw.json")
    with open(path, "w", encoding="utf-8") as f:
        json.dump(recs, f, ensure_ascii=False, indent=2)
    errs = [r for r in recs if "detail_error" in r]
    rep = os.path.join(OUT, "01_collector_report.md")
    with open(rep, "w", encoding="utf-8") as f:
        f.write("# Collector Report (wevity)\n\n")
        f.write("- 수집 건수: %d\n- 상세 실패: %d\n- 대상 필터: 청소년(30)+어린이(31), 각 1페이지\n" % (len(recs), len(errs)))
        for r in errs:
            f.write("  - 실패 ix=%s: %s\n" % (r["source_id"], r["detail_error"]))
    print("수집 %d건 -> %s" % (len(recs), path))
    print("상세 실패 %d건" % len(errs))

if __name__ == "__main__":
    main()
