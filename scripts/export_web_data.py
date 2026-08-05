#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""SQLite 검수본을 contest/web 정적 데이터 모듈로 내보낸다.

UI는 officialUrl(기관/주최측 원본)을 "원본 공고"로 사용한다.
source_url(wevity 등 집계 사이트)은 DB/감사 리포트에만 남기고 프론트 번들에는 내보내지 않는다.
"""
import json
import sqlite3
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DB = ROOT / "data" / "contests.db"
OUT = ROOT / "web" / "src" / "lib" / "contest-data.ts"
DATA_DATE = date.today()

GRADE_MAP = {"초등": "초", "중등": "중", "고등": "고"}

SUBJECT_BY_CATEGORY = {
    "과학·SW·창의": ["과학", "코딩/SW"],
    "미술·디자인·영상": ["미술/디자인", "영상/미디어"],
    "글쓰기·독서": ["국어/논술"],
    "음악·예술": ["미술/디자인"],
    "봉사·인성·환경": ["사회/환경"],
    "진로·경제·아이디어": ["진로/경제"],
    "영어·외국어": ["영어"],
    "기타": [],
}

CAREER_BY_CATEGORY = {
    "과학·SW·창의": ["이공계", "IT/SW"],
    "미술·디자인·영상": ["디자인", "미디어"],
    "글쓰기·독서": ["인문사회"],
    "음악·예술": ["문화예술"],
    "봉사·인성·환경": ["환경/공공", "인문사회"],
    "진로·경제·아이디어": ["창업/경제", "인문사회"],
    "영어·외국어": ["인문사회"],
    "기타": [],
}

LOW_BURDEN_KEYWORDS = [
    "독후감", "글쓰기", "감상문", "수기", "포스터", "그림", "표어", "슬로건",
    "아이디어", "사진", "캘리그라피",
]

HIGH_BURDEN_KEYWORDS = [
    "프로그래머", "코딩", "알고리즘", "앱", "웹툰", "영상", "숏폼", "창업",
    "멘토링", "권리화", "발표", "논문", "연구", "보고서", "해커톤", "프로젝트",
]

GROUP_KEYWORDS = ["팀", "단체", "캠페인", "봉사", "동아리", "학교"]

SUBJECT_KEYWORDS = [
    ("국어/논술", ["독후감", "독서", "글쓰기", "문학", "시", "수필", "논술"]),
    ("영어", ["영어", "외국어", "스피치", "말하기"]),
    ("수학", ["수학", "통계", "데이터"]),
    ("과학", ["과학", "탐구", "환경", "생명", "기후", "에너지"]),
    ("코딩/SW", ["코딩", "프로그래머", "SW", "AI", "인공지능", "앱", "로봇", "소프트웨어"]),
    ("미술/디자인", ["미술", "그림", "디자인", "포스터", "만화", "웹툰", "아트"]),
    ("영상/미디어", ["영상", "숏폼", "미디어", "사진", "콘텐츠"]),
    ("진로/경제", ["진로", "경제", "창업", "아이디어", "비즈니스", "멘토링"]),
    ("사회/환경", ["환경", "봉사", "사회", "인성", "공공", "캠페인"]),
]


def uniq(items):
    out = []
    for item in items:
        if item and item not in out:
            out.append(item)
    return out


def dday(deadline):
    if not deadline:
        return None
    return (date.fromisoformat(deadline) - DATA_DATE).days


def map_grades(text):
    return [short for full, short in GRADE_MAP.items() if full in (text or "")]


def clean_summary(row):
    if row["summary"]:
        return row["summary"]
    grades = "·".join(map_grades(row["target_grades"])) or "학생"
    regions = row["region"] or "전국"
    return f"{row['organizer']} 주최. 참가대상 {grades}. 대상지역 {regions}. 자세한 내용은 기관 원본 공고에서 확인하세요."


def contains_any(text, keywords):
    return any(k.lower() in text.lower() for k in keywords)


def academy_recommendation(row):
    title = row["title"] or ""
    category = row["category"] or "기타"
    grades = map_grades(row["target_grades"])
    regions = [x for x in (row["region"] or "전국").split(",") if x]
    text = " ".join([title, category, row["summary"] or "", row["organizer"] or ""])
    days = dday(row["application_deadline"])
    verified = row["verification_status"] == "verified" and bool(row["official_url"])
    free = (row["entry_fee"] or "").strip() == "무료"
    national_or_online = any(r in ("전국", "온라인") for r in regions)
    regional = regions and not national_or_online
    low_burden = contains_any(text, LOW_BURDEN_KEYWORDS)
    high_burden = contains_any(text, HIGH_BURDEN_KEYWORDS)
    group_hint = contains_any(text, GROUP_KEYWORDS)
    output_hint = low_burden or high_burden or category != "기타"
    enough_time_for_class = days is not None and days >= 21
    enough_time_for_beginner = days is not None and days >= 14

    subject_tags = list(SUBJECT_BY_CATEGORY.get(category, []))
    for subject, keywords in SUBJECT_KEYWORDS:
        if contains_any(text, keywords):
            subject_tags.append(subject)
    subject_tags = uniq(subject_tags)

    career_tags = list(CAREER_BY_CATEGORY.get(category, []))
    if "코딩/SW" in subject_tags:
        career_tags.extend(["IT/SW", "이공계"])
    if "영상/미디어" in subject_tags:
        career_tags.append("미디어")
    if "사회/환경" in subject_tags:
        career_tags.append("환경/공공")
    career_tags = uniq(career_tags)

    use_case_tags = []
    if subject_tags:
        use_case_tags.append("수업연계")
    if output_hint:
        use_case_tags.append("결과물있음")
    if enough_time_for_class and output_hint:
        use_case_tags.append("특강가능")
    if (free or verified) and (national_or_online or regional) and verified:
        use_case_tags.append("학부모안내")
    if group_hint:
        use_case_tags.append("단체참여")
    if career_tags and (len(subject_tags) <= 2 or high_burden):
        use_case_tags.append("개별추천")
    if grades and enough_time_for_beginner and national_or_online and free and low_burden and not high_burden:
        use_case_tags.append("초보도전")
    if high_burden or category in ("과학·SW·창의", "진로·경제·아이디어"):
        use_case_tags.append("심화도전")
    use_case_tags = uniq(use_case_tags)

    evidence = []
    if grades:
        evidence.append(f"참가대상: {'·'.join(grades)}")
    else:
        evidence.append("참가대상: 확인 필요")
    evidence.append(f"분야: {category}")
    if days is not None:
        evidence.append(f"마감까지 {days}일")
    else:
        evidence.append("마감일: 확인 필요")
    if national_or_online:
        evidence.append("지역/방식: 전국 또는 온라인")
    elif regional:
        evidence.append(f"지역: {'·'.join(regions)}")
    if free:
        evidence.append("참가비: 무료")
    if verified:
        evidence.append("기관 원본 공고 확인")
    if low_burden:
        evidence.append("제출물 단서: 글/그림/아이디어 등 비교적 가벼운 산출물")
    if high_burden:
        evidence.append("제출물 단서: 영상/SW/보고서/창업 등 준비 부담 가능")

    warnings = []
    if not verified:
        warnings.append("기관 원본 링크 또는 검수상태 확인 필요")
    if not grades:
        warnings.append("참가 학년 세부 범위 확인 필요")
    if days is None:
        warnings.append("마감일 확인 필요")
    if not (low_burden or high_burden):
        warnings.append("제출 형식은 원본 공고에서 확인 필요")
    if "초보도전" not in use_case_tags and low_burden and high_burden:
        warnings.append("가벼운 산출물 단서와 고난도 단서가 함께 있어 난이도 확인 필요")

    reasons = []
    if "초보도전" in use_case_tags:
        reasons.append("참가대상·마감여유·무료/전국 조건과 가벼운 제출물 단서가 있어 첫 도전 후보로 검토할 수 있습니다.")
    if "특강가능" in use_case_tags:
        reasons.append("마감까지 3주 이상 남아 결과물 제작형 수업이나 단기 특강으로 연결하기 좋습니다.")
    if "수업연계" in use_case_tags and subject_tags:
        reasons.append(f"{'·'.join(subject_tags[:2])} 수업과 연결해 학생별 결과물 제작 과제로 활용할 수 있습니다.")
    if "학부모안내" in use_case_tags:
        reasons.append("기관 원본 공고가 확인되어 학부모 안내 자료로 사용하기 전 검토 부담이 낮습니다.")
    if "심화도전" in use_case_tags:
        reasons.append("준비 부담이 있는 산출물 또는 전문 분야 단서가 있어 관심 학생의 심화 프로젝트 후보로 적합합니다.")
    if not reasons:
        reasons.append("현재 확보된 기본 정보 기준으로 활용 후보를 분류했으며, 세부 요강 확인 후 안내하는 것이 좋습니다.")

    program_ideas = []
    if "국어/논술" in subject_tags:
        program_ideas.append("독서·글쓰기 수업의 2~4주 결과물 프로젝트")
    if "코딩/SW" in subject_tags:
        program_ideas.append("SW 심화반 문제풀이 또는 미니 프로젝트")
    if "미술/디자인" in subject_tags:
        program_ideas.append("포스터·웹툰·디자인 작품 제작 특강")
    if "영상/미디어" in subject_tags:
        program_ideas.append("기획안 작성부터 촬영·편집까지 이어지는 영상 제작 특강")
    if "사회/환경" in subject_tags:
        program_ideas.append("환경·사회 이슈 탐구 후 캠페인 산출물 만들기")
    if "진로/경제" in subject_tags:
        program_ideas.append("아이디어 발굴과 발표자료 제작 진로 프로젝트")
    if not program_ideas:
        program_ideas.append("관심 학생 개별 안내 후 원본 요강을 확인하는 탐색형 과제")

    score = 0
    score += 20 if grades else 0
    score += 16 if days is not None else 0
    score += 14 if verified else 0
    score += 10 if subject_tags else 0
    score += 10 if output_hint else 0
    score += 8 if free else 0
    score += 8 if national_or_online else 5 if regional else 0
    score += 8 if low_burden or high_burden else 0
    score += 6 if use_case_tags else 0
    confidence = "높음" if score >= 76 and len(warnings) <= 1 else "중간" if score >= 52 else "낮음"

    return {
        "subjectTags": subject_tags[:4],
        "careerTags": career_tags[:4],
        "useCaseTags": use_case_tags,
        "confidence": confidence,
        "confidenceScore": min(score, 100),
        "reasons": reasons[:3],
        "evidence": evidence[:6],
        "warnings": warnings[:3],
        "programIdeas": program_ideas[:3],
    }


def main():
    con = sqlite3.connect(DB)
    con.row_factory = sqlite3.Row
    rows = con.execute(
        """
        SELECT id, official_url, title, organizer, category, target_grades,
               region, application_start, application_deadline, prize, entry_fee,
               summary, status, verification_status
        FROM contests
        ORDER BY application_deadline IS NULL, application_deadline, title
        """
    ).fetchall()

    events = []
    for row in rows:
        grades = map_grades(row["target_grades"])
        if not grades:
            continue
        events.append(
            {
                "id": row["id"],
                "title": row["title"],
                "organizer": row["organizer"] or "주최 정보 확인중",
                "grades": grades,
                "regions": [x for x in (row["region"] or "전국").split(",") if x],
                "category": row["category"] or "기타",
                "start": row["application_start"],
                "deadline": row["application_deadline"],
                "dday": dday(row["application_deadline"]),
                "status": row["status"],
                "prize": row["prize"],
                "free": (row["entry_fee"] or "").strip() == "무료",
                "officialUrl": row["official_url"] or None,
                "summary": clean_summary(row).replace("자세한 내용은 원본 공고 확인.", "자세한 내용은 기관 원본 공고 확인."),
                "conflict": row["verification_status"] != "verified" or not row["official_url"],
                "academyRecommendation": academy_recommendation(row),
            }
        )

    body = """import type { ContestEvent } from "@/types/contest";

// 데이터 기준일 — dday/status 스냅샷의 기준. 수집 파이프라인 재실행 후 scripts/export_web_data.py로 갱신한다.
export const DATA_DATE = "%s";

export const SAMPLE_EVENTS: ContestEvent[] = %s;

export function getEvent(id: string): ContestEvent | undefined {
  return SAMPLE_EVENTS.find((e) => e.id === id);
}

const WD = ["일", "월", "화", "수", "목", "금", "토"];

function parseLocalDate(value: string | null): Date | null {
  if (!value) return null;
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function startOfToday(): Date {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

export function currentDday(date: string | null): number | null {
  const target = parseLocalDate(date);
  if (!target) return null;
  return Math.round((target.getTime() - startOfToday().getTime()) / 86400000);
}

export function isContestExpired(event: Pick<ContestEvent, "deadline" | "status">): boolean {
  const days = currentDday(event.deadline);
  return days != null ? days < 0 : event.status === "마감";
}

/** "2026-06-30" → "06.30(화)" */
export function deadlineLabel(date: string | null): string {
  if (!date) return "마감 미정";
  const d = new Date(date + "T00:00:00");
  const [, m, day] = date.split("-");
  return `${m}.${day}(${WD[d.getDay()]})`;
}

/** "2026-06-30" → "06.30" */
export function shortDate(date: string | null): string {
  if (!date) return "미정";
  const [, m, day] = date.split("-");
  return `${m}.${day}`;
}
""" % (
        DATA_DATE.isoformat(),
        json.dumps(events, ensure_ascii=False, indent=2),
    )
    OUT.write_text(body, encoding="utf-8")
    print(f"exported {len(events)} events -> {OUT}")


if __name__ == "__main__":
    main()
