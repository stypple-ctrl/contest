#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""normalizer. 원시 데이터를 표준 레코드로 재가공한다.
참가연령(초/중/고)·지역(17시도)·접수기간 날짜·분야·status·자체요약.
규칙 출처: ../references/record-schema.md"""
import json, re, os, sys
from datetime import date

WS = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "..", "..", "_workspace"))
TODAY = date(2026, 6, 24)

SIDO = ["서울","부산","대구","인천","광주","대전","울산","세종","경기","강원",
        "충북","충남","전북","전남","경북","경남","제주"]
SIDO_LONG = {"서울특별시":"서울","부산광역시":"부산","대구광역시":"대구","인천광역시":"인천",
    "광주광역시":"광주","대전광역시":"대전","울산광역시":"울산","세종특별자치시":"세종",
    "경기도":"경기","강원도":"강원","강원특별자치도":"강원","충청북도":"충북","충청남도":"충남",
    "전라북도":"전북","전북특별자치도":"전북","전라남도":"전남","경상북도":"경북","경상남도":"경남",
    "제주특별자치도":"제주","제주도":"제주"}

CATEGORY_MAP = [
    (["과학","공학","수학","발명","논문","코딩","SW","소프트","프로그래","IT","웹","모바일","AI","데이터"], "과학·SW·창의"),
    (["미술","사진","디자인","웹툰","만화","그림","사생","영상","UCC","뷰티"], "미술·디자인·영상"),
    (["독후감","글쓰기","문학","백일장","독서","에세이","수필","시","글짓기"], "글쓰기·독서"),
    (["음악","노래","연주","합창","뮤직"], "음악·예술"),
    (["봉사","인성","나눔","환경","생명","캠페인"], "봉사·인성·환경"),
    (["창업","아이디어","경제","진로","마케팅","광고"], "진로·경제·아이디어"),
    (["영어","외국어","어학"], "영어·외국어"),
]

def classify_grade(raw_target, title):
    grades, note = set(), []
    t = (raw_target or "") + " " + (title or "")
    # 1) 제목 명시 우선
    if re.search(r"고교|고등학생|고등부|고1|고2|고3", title): grades.add("고등")
    if re.search(r"중학생|중등부|중1|중2|중3", title): grades.add("중등")
    if re.search(r"초등|초등학생|초등부|초[1-6]", title): grades.add("초등")
    # 2) 응모대상 토큰
    if not grades:
        if "어린이" in (raw_target or ""): grades.add("초등")
        if "청소년" in (raw_target or ""):
            grades.update(["중등","고등"]); note.append("청소년=중·고 추정")
        if re.search(r"전\s*연령|제한없음|누구나", raw_target or ""):
            grades.update(["초등","중등","고등"])
    status = "verified"
    if not grades:
        # 어린이/청소년 필터에서 왔으므로 최소 추정
        grades.update(["초등","중등","고등"]); note.append("대상 불명 - 필터기반 광범위 추정"); status="conflict"
    return sorted(grades), "; ".join(note), status

def map_region(title, organizer):
    text = (title or "") + " " + (organizer or "")
    found = set()
    for long, short in SIDO_LONG.items():
        if long in text: found.add(short)
    for s in SIDO:
        if re.search(s + r"(특별시|광역시|특별자치시|특별자치도|도|시교육청|교육청|시|권)?", text):
            if s in text: found.add(s)
    region = sorted(found) if found else ["전국"]
    if re.search(r"온라인|비대면|온택트", text): region = sorted(set(region) | {"온라인"})
    return region

def parse_period(raw):
    if not raw: return None, None
    ds = re.findall(r"(\d{4})[.\-/](\d{1,2})[.\-/](\d{1,2})", raw)
    def fmt(t): return "%04d-%02d-%02d" % (int(t[0]), int(t[1]), int(t[2]))
    if len(ds) >= 2: return fmt(ds[0]), fmt(ds[1])
    if len(ds) == 1: return None, fmt(ds[0])
    return None, None

def map_category(text):
    for keys, label in CATEGORY_MAP:
        if any(k.lower() in (text or "").lower() for k in keys): return label
    return "기타"

def activity_type(title):
    for k, v in [("봉사","봉사"),("캠프","캠프"),("대외활동","대외활동"),("서포터즈","대외활동"),
                 ("경진","경진대회"),("올림피아드","경진대회")]:
        if k in (title or ""): return v
    return "공모전"

def status_of(start, deadline, list_day):
    if deadline:
        d = date.fromisoformat(deadline)
        if start and TODAY < date.fromisoformat(start): return "접수예정"
        if TODAY > d: return "마감"
        return "마감임박" if (d - TODAY).days <= 7 else "접수중"
    return "접수중" if "접수중" in (list_day or "") else "마감"

def make_summary(r, grades, region):
    org = r.get("raw_organizer") or r.get("list_organ") or "주최 미상"
    g = "·".join(grades)
    reg = "·".join(region)
    return "%s 주최. 참가대상 %s. 대상지역 %s. 자세한 내용은 원본 공고 확인." % (org.split("/")[0].strip(), g, reg)

def main():
    recs = json.load(open(os.path.join(WS, "01_collector_wevity_raw.json"), encoding="utf-8"))
    out, report = [], []
    for r in recs:
        title = r.get("title", "")
        grades, gnote, gstatus = classify_grade(r.get("raw_target",""), title)
        region = map_region(title, r.get("raw_organizer","") or r.get("list_organ",""))
        start, deadline = parse_period(r.get("raw_period",""))
        cat = map_category((r.get("list_category","") + " " + title))
        rec = {
            "id": "wevity-%s" % r.get("source_id"),
            "source_site": "wevity",
            "source_url": r.get("source_url"),
            "official_url": r.get("official_url","") or None,
            "title": title,
            "organizer": r.get("raw_organizer","") or r.get("list_organ",""),
            "category": cat,
            "activity_type": activity_type(title),
            "target_grades": grades,
            "target_grade_detail": r.get("raw_target","") or "(원문없음)",
            "region": region,
            "region_detail": "",
            "application_start": start,
            "application_deadline": deadline,
            "event_date_start": None,   # wevity 미제공
            "event_date_end": None,
            "prize": r.get("detail_fields",{}).get("1등 상금") or r.get("detail_fields",{}).get("총 상금"),
            "entry_fee": "무료",
            "summary": make_summary(r, grades, region),
            "status": status_of(start, deadline, r.get("list_day","")),
            "collected_at": r.get("collected_at"),
            "updated_at": TODAY.isoformat(),
            "verification_status": "unverified" if gstatus=="verified" else "conflict",
            "verification_notes": gnote or None,
        }
        if "detail_error" in r:
            rec["verification_status"]="conflict"
            rec["verification_notes"]=(rec["verification_notes"] or "")+" | 상세수집 실패(원문 미확보)"
        out.append(rec)
        report.append("- %s [%s/%s] %s"%(rec["title"][:30], "·".join(grades), "·".join(region), rec["application_deadline"]))
    json.dump(out, open(os.path.join(WS,"02_normalizer_records.json"),"w",encoding="utf-8"), ensure_ascii=False, indent=2)
    with open(os.path.join(WS,"02_normalizer_report.md"),"w",encoding="utf-8") as f:
        f.write("# Normalizer Report\n\n총 %d건\n\n"%len(out))
        f.write("\n".join(report))
    nconf=sum(1 for x in out if x["verification_status"]=="conflict")
    print("정규화 %d건 (conflict %d건) -> 02_normalizer_records.json"%(len(out), nconf))

if __name__=="__main__":
    main()
