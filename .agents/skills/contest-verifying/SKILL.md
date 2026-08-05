---
name: contest-verifying
description: 재가공된 공모전 레코드를 검수하는 QA 절차. 원본 출처 교차 대조, 중복 제거, 날짜·필수필드·논리 검증, 출처 간 충돌 표시를 수행한다. 검수·검증·QA·중복제거·"원본 대조"·"데이터 품질 확인" 작업 시 반드시 이 스킬을 사용할 것. 재검수·conflict 항목 재확인에도 사용.
---

# Contest Verifying — 검수/QA 절차

verifier 에이전트가 사용한다. 목표: 학원장에게 **틀린 마감일/틀린 참가연령**이 전달되는 사고를 막는다.

## 핵심 철학 — "존재 확인"이 아니라 "교차 대조"
필드가 채워져 있는지 보는 건 검수가 아니다. 진짜 검수는 **두 출처(또는 원본과 레코드)를 나란히 놓고 값이 일치하는지 비교**하는 것이다. 특히 마감일과 참가연령은 직접 원본을 재확인한다.

## 검수 체크리스트
1. **필수 필드** — `title, source_url, application_deadline` 존재. 없으면 제외 + report.
2. **날짜 논리** — `application_start ≤ application_deadline ≤ event_date_start`. 위반 시 conflict.
3. **status 정합** — 마감일이 과거인데 "접수중"이면 status 재계산.
4. **참가연령 원본 대조** — `conflict` 또는 의심 항목은 `source_url`을 실제 재방문해 `target_grade_detail`과 비교.
5. **지역 정합** — region 표준값이 record-schema 목록에 있는지, region_detail과 모순 없는지.
6. **중복 제거** — `title`+`organizer`+`application_deadline` 유사도로 묶고, 정보가 더 완전한 것을 대표로. 제거한 중복의 `source_url`은 대표 레코드 notes에 병기.
7. **충돌 병기** — 출처 간 값이 다르면 삭제하지 말고 두 값 모두 `verification_notes`에 기록 + `conflict`.

## 출력
- `_workspace/03_verifier_records.json` — `verification_status`(verified/conflict) + `verification_notes` 채움.
- `_workspace/03_verifier_report.md` — 검증 N건 / 충돌 N건 / 중복제거 N건 / 발견 이슈.

## 원칙 (Why)
- **추측으로 verified 처리 금지.** 원본 확인 불가면 conflict로 둔다. 거짓 확신이 잘못된 정보보다 위험하다.
- **점진 검수.** normalizer가 배치를 끝낼 때마다 즉시 검수한다(전체 완료 후 1회 X). 오류 패턴을 일찍 잡아 normalizer에 피드백한다.
- **반복되는 분류 오류는 normalizer 스킬 수정으로 이어져야 한다** — 개별 레코드만 고치면 다음 실행에 또 발생한다.
