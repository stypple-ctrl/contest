---
name: contest-data-service
description: 검수된 공모전 레코드를 DB에 적재하고 학원장용 검색 서비스를 구축·운영하는 절차. DB 스키마 설계, 멱등 적재(upsert), 참가연령·지역·마감일 기반 검색/필터 UI 구축을 다룬다. DB·데이터베이스·적재·"검색 서비스"·스키마·"학원장 검색"·"서비스 구성"·"화면 만들기" 작업 시 반드시 이 스킬을 사용할 것. 스키마 변경·서비스 개선에도 사용.
---

# Contest Data Service — DB & 검색 서비스 절차

data-architect 에이전트가 사용한다. 목표: 검수된 데이터를 전국 학원장이 **1분 안에 검색**할 수 있는 서비스로 만든다.

## MVP 우선 원칙 (Why)
데이터가 얼마나 쌓일지 검증되기 전에는 거창한 인프라가 낭비다. **SQLite(파일 DB) + 가벼운 검색 UI**로 동작하는 것을 먼저 만들고, 데이터·사용자가 늘면 PostgreSQL/웹서버로 확장한다. 마이그레이션 경로만 열어두면 된다.

## DB 스키마 (SQLite, MVP)
`contests` 테이블 — 컬럼은 `references/record-schema.md`의 표준 레코드와 1:1 대응.
- `target_grades`, `region`은 다중값 → 검색 편의를 위해 JSON 문자열 컬럼 + 불리언 파생 컬럼 권장:
  `is_elem, is_mid, is_high`(초/중/고) 와 region은 별도 `contest_regions(contest_id, region)` 매핑 테이블.
- **인덱스(검색 4대 축)**: `application_deadline`, `is_elem/is_mid/is_high`, `category`, 그리고 `contest_regions.region`.
- `id`는 PRIMARY KEY → **upsert**(있으면 갱신, 없으면 삽입)로 재실행 시 중복 방지.

## 적재 절차
1. `_workspace/03_verifier_records.json` 로드.
2. 스키마 검증 — 불일치 레코드는 적재 막지 말고 격리 로그로, report에 명시.
3. `INSERT ... ON CONFLICT(id) DO UPDATE` 로 upsert. `updated_at` 갱신.
4. 마감 지난 항목 status를 `마감`으로 일괄 갱신(오늘 날짜 기준).
5. `_workspace/04_data_report.md`에 신규/갱신/격리 건수 기록.

## 검색 서비스 (학원장 관점)
MVP는 **Streamlit** 또는 **간단한 FastAPI + 정적 프론트** 권장(초기엔 Streamlit이 가장 빠름).
필수 검색/필터 UI:
- **참가연령**: 초등 / 중등 / 고등 (체크박스)
- **지역**: 17개 시도 + 전국 + 온라인 (드롭다운/다중선택)
- **마감일**: "마감 임박순" 기본 정렬 + "마감 지난 것 숨기기" 토글
- **분야**, **키워드 검색**(제목/주최)
결과 카드: 제목·주최·대상등급·지역·접수마감일(D-day)·행사일·**원본 링크**(source_url/official_url).
학원장 편의: "이번 주 마감", "우리 지역 초등" 같은 **빠른 프리셋** 제공. 결과를 CSV/엑셀로 내보내 학부모 안내에 쓰도록 한다.

## 운영 (Why)
- 매 수집 실행 후 자동으로 status를 갱신해야 "마감"이 정확하다. 정기 실행(예: 매일/주 2회)을 권장하되, 자동 스케줄은 사용자 승인 후 설정한다.
- 스키마 변경 시 마이그레이션 스크립트로 기존 데이터를 보존한다.
