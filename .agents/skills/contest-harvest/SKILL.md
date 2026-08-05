---
name: contest-harvest
description: 초·중·고 공모전/대외활동 수집-검수-재가공-검색 파이프라인 전체를 조율하는 오케스트레이터. collector·normalizer·verifier·data-architect 에이전트 팀을 구성해 출처 사이트에서 데이터를 모아 표준 레코드로 가공하고 학원장용 검색 DB/서비스에 적재한다. "공모전 수집", "대외활동 모아줘", "콘테스트 데이터 갱신", "학원장 서비스 만들어/돌려줘", "전체 파이프라인 실행", "다시 실행/재실행/업데이트/보완", "특정 단계만 다시" 요청 시 반드시 이 스킬을 사용할 것. 단순 질문은 직접 응답 가능.
---

# Contest Harvest — 오케스트레이터

초·중·고 공모전/대외활동 데이터를 **추출 → 재가공 → 검수 → 검색서비스**로 잇는 파이프라인을 조율한다.
최종 사용자는 전국의 학원장이며, 핵심 검색 축은 **참가연령(초/중/고)·지역(17개 시도)·접수마감일·행사일**이다.

## 실행 모드: 에이전트 팀 (파이프라인 패턴)
팀원: `collector`(수집) → `normalizer`(재가공) → `verifier`(검수) → `data-architect`(DB/검색).
순차 의존이지만, collector는 사이트별 병렬 수집 가능, verifier는 배치 단위 점진 검수.
모든 Agent 호출 시 `model: "opus"`를 명시한다.

## Phase 0: 컨텍스트 확인
1. `_workspace/` 존재 여부와 내용을 확인한다.
2. 실행 모드 판별:
   - `_workspace/` 없음 → **초기 실행** (전체 파이프라인).
   - `_workspace/` 있음 + 사용자가 "○○단계만/특정 사이트만" 요청 → **부분 재실행** (해당 에이전트만 호출).
   - `_workspace/` 있음 + 새 수집 요청 → **증분 실행** (collector가 신규만 수집, 하류로 병합 전파).
3. DB(`data/contests.db`) 존재 시: 마감 지난 status 갱신은 항상 포함.

## Phase 1: 수집 (collector)
- 입력: 출처 사이트 목록(기본: wevity, contestkorea / 보강: all-con, thinkcontest, 교육청·공공기관) + 대상 필터(어린이·청소년).
- `contest-collecting` 스킬 절차에 따라 `_workspace/01_collector_*_raw.json` 생성.
- **착수 전 사용자 승인**: 실제 외부 크롤링은 비용·트래픽이 발생하므로, 첫 실행 시 대상 사이트와 범위를 사용자에게 확인받고 시작한다.

## Phase 2: 재가공 (normalizer)
- 입력: `01_collector_*`. `contest-normalizing` + `record-schema.md`로 표준 레코드화.
- 출력: `_workspace/02_normalizer_records.json`. 참가연령·지역·날짜·분야 채움, 모호 항목은 conflict.

## Phase 3: 검수 (verifier)
- 입력: `02_normalizer_records.json`. `contest-verifying`로 교차 대조·중복제거·논리검증.
- 출력: `_workspace/03_verifier_records.json` (verified/conflict). 분류 오류 패턴은 normalizer에 피드백.

## Phase 4: 적재 & 검색 서비스 (data-architect)
- 입력: `03_verifier_records.json`. `contest-data-service`로 SQLite upsert + 검색 UI.
- 출력: `data/contests.db` + 검색 서비스 코드 + `_workspace/04_data_report.md`.

## 데이터 전달 프로토콜
- **파일 기반**(주): `_workspace/{phase}_{agent}_{artifact}` 컨벤션. 중간 산출물 보존(감사 추적).
- **메시지 기반**: 각 단계 완료 시 다음 에이전트에 산출물 경로 전달.
- **태스크 기반**: `TaskCreate`로 단계 의존성 관리.
- 최종 산출물만 사용자 경로(`data/`, `app/`)에 출력. `_workspace/`는 보존.

## 에러 핸들링
- 각 단계 실패: 1회 재시도 후 재실패 시 해당 결과 없이 진행하고 최종 보고서에 **누락을 명시**.
- 출처 간 충돌 데이터: 삭제하지 않고 출처 병기(verifier가 conflict 처리).
- robots/ToS 차단: collector가 즉시 중단·보고 → 리더가 사용자에게 확인.

## 완료 보고
파이프라인 종료 시 사용자에게 보고: 수집 N건 / 적격(초중고) N건 / verified N건 / conflict N건 / 중복제거 N건 / DB 적재 N건, 그리고 검색 서비스 실행 방법.

## 테스트 시나리오
- **정상 흐름**: "wevity에서 초중고 공모전 수집해서 검색 DB 만들어줘" → Phase1~4 순차 → DB+서비스 산출 + 통계 보고.
- **부분 재실행**: "contestkorea만 다시 수집해서 갱신해줘" → collector(해당 사이트)→normalizer→verifier→upsert.
- **에러 흐름**: all-con 접속 차단 → collector 중단·보고 → 나머지 사이트로 진행, 보고서에 all-con 누락 명시.

## Phase 7: 실행 후 피드백
실행 완료 후 "분류 기준/검색 UI/대상 사이트에 바꾸고 싶은 점이 있나요?"를 묻는다. 피드백은 유형별로 반영:
분류 품질→normalizing 스킬 / 검색 UX→data-service 스킬 / 출처 추가→collecting 스킬·sources.md / 워크플로우 순서→이 오케스트레이터. 공개 학습에 영향을 주는 변경은 `docs/BUILD_JOURNAL.md`에 이유와 함께 기록.
