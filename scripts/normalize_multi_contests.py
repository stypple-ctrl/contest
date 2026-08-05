#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Normalize additional contest collector output and upsert it into contests DB."""
import json
import re
import sqlite3
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
WS = ROOT / "_workspace"
DB = ROOT / "data" / "contests.db"
TODAY = date.today()

SIDO = [
    "서울",
    "부산",
    "대구",
    "인천",
    "광주",
    "대전",
    "울산",
    "세종",
    "경기",
    "강원",
    "충북",
    "충남",
    "전북",
    "전남",
    "경북",
    "경남",
    "제주",
]
SIDO_LONG = {
    "서울특별시": "서울",
    "부산광역시": "부산",
    "대구광역시": "대구",
    "인천광역시": "인천",
    "광주광역시": "광주",
    "대전광역시": "대전",
    "울산광역시": "울산",
    "세종특별자치시": "세종",
    "경기도": "경기",
    "강원도": "강원",
    "강원특별자치도": "강원",
    "충청북도": "충북",
    "충청남도": "충남",
    "전라북도": "전북",
    "전북특별자치도": "전북",
    "전라남도": "전남",
    "경상북도": "경북",
    "경상남도": "경남",
    "제주특별자치도": "제주",
    "제주도": "제주",
}

CATEGORY_MAP = [
    (["과학", "공학", "수학", "발명", "코딩", "SW", "소프트", "프로그래", "IT", "AI", "데이터", "해커톤"], "과학·SW·창의"),
    (["미술", "사진", "디자인", "웹툰", "만화", "그림", "사생", "영상", "UCC", "포스터"], "미술·디자인·영상"),
    (["독후감", "글쓰기", "문학", "백일장", "독서", "에세이", "수필", "시", "편지", "웹소설"], "글쓰기·독서"),
    (["음악", "노래", "연주", "합창", "콩쿠르", "댄스"], "음악·예술"),
    (["봉사", "인성", "나눔", "환경", "생명", "캠페인", "기후"], "봉사·인성·환경"),
    (["창업", "아이디어", "경제", "진로", "마케팅", "광고", "정책"], "진로·경제·아이디어"),
    (["영어", "외국어", "어학"], "영어·외국어"),
]

ADULT_ONLY_HINTS = [
    "청년",
    "대학생",
    "대학원생",
    "일반인",
    "성인",
    "직장인",
    "구직자",
    "취업",
    "면접",
    "인턴",
    "재직자",
]

UPSERT = """
INSERT INTO contests VALUES (:id,:source_site,:source_url,:official_url,:title,:organizer,
  :category,:activity_type,:target_grades,:is_elem,:is_mid,:is_high,:target_grade_detail,
  :region,:region_detail,:application_start,:application_deadline,:event_date_start,:event_date_end,
  :prize,:entry_fee,:summary,:status,:collected_at,:updated_at,:verification_status,:verification_notes)
ON CONFLICT(id) DO UPDATE SET
  source_url=excluded.source_url,
  official_url=excluded.official_url,
  title=excluded.title,
  organizer=excluded.organizer,
  category=excluded.category,
  activity_type=excluded.activity_type,
  target_grades=excluded.target_grades,
  is_elem=excluded.is_elem,
  is_mid=excluded.is_mid,
  is_high=excluded.is_high,
  target_grade_detail=excluded.target_grade_detail,
  region=excluded.region,
  region_detail=excluded.region_detail,
  application_start=excluded.application_start,
  application_deadline=excluded.application_deadline,
  event_date_start=excluded.event_date_start,
  event_date_end=excluded.event_date_end,
  prize=excluded.prize,
  entry_fee=excluded.entry_fee,
  summary=excluded.summary,
  status=excluded.status,
  updated_at=excluded.updated_at,
  verification_status=excluded.verification_status,
  verification_notes=excluded.verification_notes;
"""


def compact(value):
    return re.sub(r"\s+", " ", value or "").strip()


def host(value):
    from urllib.parse import urlparse

    return urlparse(value or "").netloc.lower()


def is_aggregator_url(value):
    h = host(value)
    return (
        h in {"www.contestkorea.com", "contestkorea.com", "www.all-con.co.kr", "all-con.co.kr", "www.thinkcontest.com", "thinkcontest.com"}
        or h.endswith(".contestkorea.com")
        or h.endswith(".all-con.co.kr")
        or h.endswith(".thinkcontest.com")
    )


def source_records():
    for path in sorted(WS.glob("01_collector_*_raw.json")):
        if path.name == "01_collector_wevity_raw.json":
            continue
        rows = json.loads(path.read_text(encoding="utf-8"))
        for row in rows:
            yield path.name, row


def has_youth_specific(text):
    return bool(re.search(r"초등|초등학생|초등부|초[1-6]|중등|중학생|중등부|중[1-3]|고등|고등학생|고교|고등부|고[1-3]|초·중·고|초중고|청소년|어린이|아동", text))


def adult_only_candidate(text):
    return any(hint in text for hint in ADULT_ONLY_HINTS) and not has_youth_specific(text)


def classify_grades(text):
    grades, notes = set(), []
    if adult_only_candidate(text):
        notes.append("성인/청년 대상 후보")
        return [], "; ".join(notes)
    if re.search(r"초등|초등학생|초등부|초[1-6]|어린이|아동", text):
        grades.add("초등")
    if re.search(r"중등|중학생|중등부|중[1-3]", text):
        grades.add("중등")
    if re.search(r"고등|고등학생|고교|고등부|고[1-3]", text):
        grades.add("고등")
    if "초·중·고" in text or "초중고" in text:
        grades.update(["초등", "중등", "고등"])
    if "청소년" in text and not grades:
        grades.update(["중등", "고등"])
        notes.append("청소년=중·고 추정")
    if re.search(r"전\s*연령|제한없음|누구나|(?<!대)학생", text) and not grades:
        grades.update(["초등", "중등", "고등"])
        notes.append("광범위 학생대상 추정")
    return sorted(grades), "; ".join(notes)


def map_region(text):
    found = set()
    for long, short in SIDO_LONG.items():
        if long in text:
            found.add(short)
    for sido in SIDO:
        if sido in text:
            found.add(sido)
    if "온라인" in text or "비대면" in text:
        found.add("온라인")
    return sorted(found) if found else ["전국"]


def parse_dates(text):
    matches = re.findall(r"(20\d{2})[.\-/년 ]+(\d{1,2})[.\-/월 ]+(\d{1,2})", text)

    def fmt(match):
        return f"{int(match[0]):04d}-{int(match[1]):02d}-{int(match[2]):02d}"

    if len(matches) >= 2:
        return fmt(matches[0]), fmt(matches[1])
    if len(matches) == 1:
        return None, fmt(matches[0])
    return None, None


def map_category(text):
    lower = text.lower()
    for keys, label in CATEGORY_MAP:
        if any(key.lower() in lower for key in keys):
            return label
    return "기타"


def activity_type(row, text):
    hint = row.get("activity_type_hint")
    if hint == "activity":
        return "대외활동"
    for key, value in [("봉사", "봉사"), ("캠프", "캠프"), ("해커톤", "경진대회"), ("경진", "경진대회"), ("대외활동", "대외활동"), ("서포터즈", "대외활동")]:
        if key in text:
            return value
    return "공모전"


def status_of(start, deadline):
    if not deadline:
        return "접수중"
    due = date.fromisoformat(deadline)
    if start and TODAY < date.fromisoformat(start):
        return "접수예정"
    if TODAY > due:
        return "마감"
    return "마감임박" if (due - TODAY).days <= 7 else "접수중"


def normalize(row):
    text = compact(" ".join([row.get("title") or "", row.get("raw_keywords") or "", row.get("raw_description") or "", row.get("raw_text") or ""]))
    target_text = compact(row.get("target_text") or "")
    grade_source_text = target_text or compact(" ".join([row.get("title") or "", row.get("raw_keywords") or "", row.get("raw_description") or ""]))
    title = compact(row.get("title") or "")
    title = re.sub(r"\s*-\s*(콘테스트코리아|올콘).*?$", "", title).strip()
    grades, grade_note = classify_grades(grade_source_text)
    start, deadline = parse_dates(text)
    regions = map_region(text)
    category = map_category(text)
    official_url = row.get("official_url")
    verification_notes = []
    if official_url and is_aggregator_url(official_url):
        official_url = None
        verification_notes.append("기관 원본 URL이 집계 사이트라 노출 제외")
    if grade_note:
        verification_notes.append(grade_note)
    if not target_text:
        verification_notes.append("참가대상 영역 자동 추출 실패")
    if not grades:
        verification_notes.append("참가학년 단서 없음")
    if not deadline:
        verification_notes.append("마감일 자동 추출 실패")
    if not official_url:
        verification_notes.append("기관 원본 URL 자동 추출 실패")
    status = "conflict" if verification_notes else "verified"
    source_site = row.get("source_site") or "unknown"
    return {
        "id": f"{source_site}-{row.get('source_id')}",
        "source_site": source_site,
        "source_url": row.get("source_url"),
        "official_url": official_url,
        "title": title or "제목 확인 필요",
        "organizer": "원본 확인 필요",
        "category": category,
        "activity_type": activity_type(row, text),
        "target_grades": ",".join(grades),
        "is_elem": 1 if "초등" in grades else 0,
        "is_mid": 1 if "중등" in grades else 0,
        "is_high": 1 if "고등" in grades else 0,
        "target_grade_detail": " / ".join([x for x in [target_text, grade_note] if x]) or "원문 확인 필요",
        "region": ",".join(regions),
        "region_detail": "",
        "application_start": start,
        "application_deadline": deadline,
        "event_date_start": None,
        "event_date_end": None,
        "prize": None,
        "entry_fee": "무료" if "무료" in text else None,
        "summary": f"{title or '해당 공모전'} 후보입니다. 참가대상·마감일·접수방법은 기관 원본 공고에서 확인하세요.",
        "status": status_of(start, deadline),
        "collected_at": row.get("collected_at") or TODAY.isoformat(),
        "updated_at": TODAY.isoformat(),
        "verification_status": status,
        "verification_notes": " | ".join(verification_notes) if verification_notes else None,
    }


def main():
    DB.parent.mkdir(parents=True, exist_ok=True)
    con = sqlite3.connect(DB)
    records, skipped = [], []
    for path_name, row in source_records():
        rec = normalize(row)
        if rec["title"] == "제목 확인 필요" or not rec["source_url"]:
            skipped.append({"source": path_name, "reason": "title/source_url missing"})
            continue
        records.append(rec)
        con.execute(UPSERT, rec)
    con.commit()
    con.close()
    report = [
        "# Multi-source Contest Normalize/Load Report",
        "",
        f"- upsert: {len(records)}건",
        f"- skipped: {len(skipped)}건",
        f"- verified: {sum(1 for r in records if r['verification_status'] == 'verified')}건",
        f"- conflict: {sum(1 for r in records if r['verification_status'] != 'verified')}건",
    ]
    (WS / "02_04_multi_contest_report.md").write_text("\n".join(report) + "\n", encoding="utf-8")
    print(f"upserted {len(records)} additional contests")


if __name__ == "__main__":
    main()
