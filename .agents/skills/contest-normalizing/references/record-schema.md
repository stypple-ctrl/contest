# 표준 공모전 레코드 스키마 (Canonical Record)

이 스키마는 하네스 전체의 척추다. collector·normalizer·verifier·data-architect 모두 이 필드 정의를 공유한다.
필드를 추가/변경하면 이 파일을 먼저 고치고, 그다음 각 스킬·DB 스키마를 맞춘다.

## 레코드 (JSON)

```json
{
  "id": "string  // `{source_site}-{source_id}` 또는 (title+organizer+deadline) 해시. 중복 판정 키",
  "source_site": "wevity | contestkorea | allcon | thinkcontest | <기관명>",
  "source_url": "string  // 수집한 원본 상세 페이지 URL (절대 가공 금지)",
  "official_url": "string|null  // 주최측 공식 공고 URL (있으면 우선 노출)",

  "title": "string  // 행사 제목",
  "organizer": "string  // 주최/주관 기관",
  "category": "string  // 분야: 과학·수학 | 미술·디자인 | 글쓰기·독서 | 음악·예술 | 코딩·SW | 발명·창의 | 영어·외국어 | 체육 | 봉사·인성 | 진로·경제 | 기타",
  "activity_type": "공모전 | 경진대회 | 대외활동 | 캠프 | 봉사 | 체험 | 기타",

  "target_grades": ["초등", "중등", "고등"],   // 다중 선택. 우리 서비스 핵심 축
  "target_grade_detail": "string  // 참가자격 원문 (예: '초3~중3', '만 9~13세')",

  "region": ["전국"],                            // 표준값만. 아래 '지역 표준값' 참조
  "region_detail": "string  // 지역 원문 (예: '서울특별시 소재 학교 재학생')",

  "application_start": "YYYY-MM-DD|null",
  "application_deadline": "YYYY-MM-DD|null",     // 핵심 축. 학원장이 가장 자주 거는 필터
  "event_date_start": "YYYY-MM-DD|null",
  "event_date_end": "YYYY-MM-DD|null",

  "prize": "string|null  // 시상 내역 요약",
  "entry_fee": "무료 | 유료 | null",
  "summary": "string  // 사실만 추출해 자체 문장으로 재구성한 2~3줄 요약 (원문 복붙 금지)",

  "status": "접수예정 | 접수중 | 마감임박 | 마감",  // 마감임박 = D-7 이내
  "collected_at": "YYYY-MM-DD",
  "updated_at": "YYYY-MM-DD",
  "verification_status": "unverified | verified | conflict",
  "verification_notes": "string|null  // 충돌 시 두 출처 값을 모두 병기"
}
```

## 지역 표준값 (region)
17개 시도 + 특수값. `region`에는 아래 값만 들어간다. 원문은 `region_detail`에 보존.

```
전국, 온라인,
서울, 부산, 대구, 인천, 광주, 대전, 울산, 세종,
경기, 강원, 충북, 충남, 전북, 전남, 경북, 경남, 제주
```
- "○○시 소재 학교"처럼 특정 지역 한정 → 해당 시도만.
- 지역 제한 없음/언급 없음 → `전국`.
- 온라인 진행/제출 → `온라인` (오프라인 지역과 병기 가능).

## 참가연령 분류 규칙 (target_grades)
`target_grade_detail` 원문을 근거로 다중 태깅한다. 근거가 모호하면 단정하지 말고 conflict 처리.

| 원문 단서 | 분류 |
|---|---|
| 초등, 초등학생, 어린이, 초1~6, 만 7~12세 | 초등 |
| 중등, 중학생, 중1~3 | 중등 |
| 고등, 고교, 고등학생, 고1~3 | 고등 |
| 청소년 (단독) | 중등 + 고등 (note: '청소년=중·고 추정') |
| 전 연령 / 제한없음 / 누구나 | 초등 + 중등 + 고등 (단, 실질적으로 초등 부적합하면 note) |
| 대학생·일반인 **전용** (초중고 불가) | 제외 대상 → 레코드 드롭, report에 사유 기록 |
| 초·중·고 + 대학생 혼합 | 해당 초중고 등급만 태깅 |

## status 산출 규칙
- 오늘 < application_start → `접수예정`
- application_start ≤ 오늘 ≤ application_deadline → `접수중` (마감 7일 이내면 `마감임박`)
- 오늘 > application_deadline → `마감`
- 날짜 불명(null) → 원문 status 텍스트를 따르되 `verification_notes`에 명시.
