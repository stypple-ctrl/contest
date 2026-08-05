#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""문화행사 DB를 Next.js 정적 데이터 모듈로 내보낸다."""
import json
import sqlite3
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DB = ROOT / "data" / "contests.db"
OUT = ROOT / "web" / "src" / "lib" / "culture-data.ts"
DATA_DATE = date.today()


def safe_date(value):
    if not value:
        return None
    try:
        return date.fromisoformat(value)
    except ValueError:
        return None


def event_dday(start_value, end_value):
    start = safe_date(start_value)
    end = safe_date(end_value)
    if start and start > DATA_DATE:
        return (start - DATA_DATE).days
    if end and end < DATA_DATE:
        return (end - DATA_DATE).days
    if start or end:
        return 0
    return None


def split_csv(value):
    return [x for x in (value or "").split(",") if x]


def recommendation(row):
    title = row["title"] or ""
    event_type = row["event_type"] or "문화행사"
    category = row["category"] or "문화행사"
    age = row["age_text"] or ""
    grades = split_csv(row["target_grades"])
    days = event_dday(row["start_date"], row["end_date"])
    verified = row["verification_status"] == "verified"
    free = bool(row["free"])
    has_place = bool(row["venue_name"] and row["region"] != "확인필요")
    start = safe_date(row["start_date"])
    end = safe_date(row["end_date"])
    duration = (end - start).days + 1 if start and end and end >= start else None
    text = f"{title} {event_type} {category} {row['venue_name'] or ''}"
    is_child_friendly = "초등" in grades or "전체" in age or "아동" in age or "개월" in age
    is_museum = any(k in text for k in ["미술관", "박물관", "전시관", "갤러리"])
    is_weekend_window = False
    if start and end:
        cur = start
        while cur <= end and (cur - start).days < 14:
            if cur.weekday() >= 5:
                is_weekend_window = True
                break
            cur = date.fromordinal(cur.toordinal() + 1)

    subject_tags = []
    if event_type in ("공연", "전시") or any(k in title for k in ["연극", "뮤지컬", "음악", "클래식", "국악"]):
        subject_tags.extend(["국어/논술", "예술"])
    if any(k in title + category for k in ["미술", "전시", "디자인"]):
        subject_tags.append("미술/디자인")
    if any(k in title + category for k in ["역사", "박물관", "문화재"]):
        subject_tags.append("역사/사회")
    if any(k in title + category for k in ["과학", "환경", "생태"]):
        subject_tags.append("과학/환경")
    subject_tags = list(dict.fromkeys(subject_tags)) or ["문화교양"]

    use_case_tags = []
    if event_type == "공연" and is_child_friendly:
        use_case_tags.append("아동공연")
    if event_type == "전시" and free:
        use_case_tags.append("무료전시")
    if event_type == "전시" and duration is not None and duration >= 30:
        use_case_tags.append("장기전시")
    if days is not None and 0 <= days <= 7:
        use_case_tags.append("이번주관람")
    if is_weekend_window:
        use_case_tags.append("주말관람")
    if is_museum:
        use_case_tags.append("박물관/미술관")
    if verified and row["official_url"]:
        use_case_tags.append("원본확인")

    evidence = [f"유형: {event_type}", f"분야: {category}"]
    if age:
        evidence.append(f"관람연령: {age}")
    if grades:
        evidence.append(f"학생대상 후보: {'·'.join(grades)}")
    if row["region"]:
        evidence.append(f"지역: {row['region']}")
    if days is not None:
        evidence.append(f"시작까지 {days}일")
    if free:
        evidence.append("가격: 무료")
    if verified:
        evidence.append("원본/예매 링크 확인")

    warnings = []
    if not age and not grades:
        warnings.append("관람연령 또는 학생대상 확인 필요")
    if not row["official_url"]:
        warnings.append("기관/예매처 원본 링크 확인 필요")
    if not has_place:
        warnings.append("장소 또는 지역 확인 필요")

    reasons = []
    if "아동공연" in use_case_tags:
        reasons.append(f"{age or '아동 관람'} 기준이라 초등 학생 안내 후보로 검토할 수 있습니다.")
    if "무료전시" in use_case_tags:
        reasons.append("무료 전시라 학부모 안내 시 비용 부담이 낮습니다.")
    if "장기전시" in use_case_tags:
        reasons.append("운영 기간이 길어 학원 일정에 맞춰 안내하기 쉽습니다.")
    if "이번주관람" in use_case_tags:
        reasons.append("이번 주 바로 안내할 수 있는 가까운 일정입니다.")
    if "주말관람" in use_case_tags:
        reasons.append("주말 관람 가능성이 있어 가족 참여 안내 후보입니다.")
    if "박물관/미술관" in use_case_tags:
        reasons.append("박물관·미술관 장소 특성상 사전 배경지식 수업과 연결하기 좋습니다.")
    if not reasons:
        reasons.append("세부 활용 방식은 원본 안내와 학원 수업 목적을 함께 보고 판단하세요.")

    score = 0
    score += 18 if row["title"] else 0
    score += 16 if row["start_date"] or row["end_date"] else 0
    score += 14 if has_place else 0
    score += 14 if age or grades else 0
    score += 14 if verified else 0
    score += 10 if row["official_url"] else 0
    score += 8 if subject_tags else 0
    score += 6 if use_case_tags else 0
    confidence = "높음" if score >= 76 and len(warnings) <= 1 else "중간" if score >= 52 else "낮음"

    return {
        "subjectTags": subject_tags[:4],
        "useCaseTags": use_case_tags,
        "confidence": confidence,
        "confidenceScore": min(score, 100),
        "reasons": reasons[:3],
        "evidence": evidence[:6],
        "warnings": warnings[:3],
        "programIdeas": [
            "관람 전 배경지식 10분 브리핑",
            "관람 후 한 문단 감상 기록",
            "학부모 주말 문화체험 안내",
        ],
    }


def main():
    con = sqlite3.connect(DB)
    con.row_factory = sqlite3.Row
    rows = con.execute(
        """
        SELECT *
        FROM culture_events
        ORDER BY start_date IS NULL, start_date, title
        """
    ).fetchall()
    events = []
    for row in rows:
        events.append(
            {
                "id": row["id"],
                "source": row["source"],
                "title": row["title"],
                "eventType": row["event_type"] or "문화행사",
                "category": row["category"] or "문화행사",
                "grades": split_csv(row["target_grades"]),
                "ageText": row["age_text"],
                "region": row["region"] or "확인필요",
                "venueName": row["venue_name"],
                "venueAddress": row["venue_address"],
                "startDate": row["start_date"],
                "endDate": row["end_date"],
                "dday": event_dday(row["start_date"], row["end_date"]),
                "runtime": row["runtime"],
                "priceText": row["price_text"],
                "free": bool(row["free"]),
                "posterUrl": row["poster_url"],
                "officialUrl": row["official_url"],
                "summary": row["summary"] or "문화행사 정보입니다.",
                "status": row["status"] or "확인필요",
                "conflict": row["verification_status"] != "verified",
                "recommendation": recommendation(row),
            }
        )

    body = """import type { CultureEvent } from "@/types/culture";

export const CULTURE_DATA_DATE = "%s";

export const CULTURE_EVENTS: CultureEvent[] = %s;

export function getCultureEvent(id: string): CultureEvent | undefined {
  return CULTURE_EVENTS.find((e) => e.id === id);
}

function parseLocalDate(value: string | null): Date | null {
  if (!value) return null;
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function startOfToday(): Date {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

export function currentCultureDday(startDate: string | null, endDate: string | null): number | null {
  const start = parseLocalDate(startDate);
  const end = parseLocalDate(endDate);
  const today = startOfToday();
  if (start && start > today) return Math.round((start.getTime() - today.getTime()) / 86400000);
  if (end && end < today) return Math.round((end.getTime() - today.getTime()) / 86400000);
  if (start || end) return 0;
  return null;
}

export function isCultureEnded(event: Pick<CultureEvent, "startDate" | "endDate" | "status">): boolean {
  const days = currentCultureDday(event.startDate, event.endDate);
  return days != null ? days < 0 : event.status === "종료";
}

export function cultureDateLabel(start: string | null, end: string | null): string {
  if (!start && !end) return "일정 확인 필요";
  const fmt = (v: string) => {
    const [, m, d] = v.split("-");
    return `${m}.${d}`;
  };
  if (start && end && start !== end) return `${fmt(start)} - ${fmt(end)}`;
  return fmt(start || end || "");
}
""" % (
        DATA_DATE.isoformat(),
        json.dumps(events, ensure_ascii=False, indent=2),
    )
    OUT.write_text(body, encoding="utf-8")
    print(f"exported {len(events)} culture events -> {OUT}")


if __name__ == "__main__":
    main()
