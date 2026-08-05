---
name: contest-collecting
description: 초·중·고 공모전/대외활동 원시 데이터를 출처 사이트에서 수집(크롤링/추출)하는 절차. wevity·contestkorea·all-con·thinkcontest와 교육청·공공기관 공고에서 원본을 긁어온다. 데이터 수집·크롤링·추출·"사이트에서 가져오기" 작업 시 반드시 이 스킬을 사용할 것. 재수집·증분 수집·특정 사이트만 다시 긁기에도 사용.
---

# Contest Collecting — 정보 추출 절차

collector 에이전트가 사용한다. 목표: 출처를 보존하며, 예의 바르게, 빠짐없이 원시 데이터를 모은다.

## 왜 이렇게 하는가
이 단계에서 해석·요약을 하면 원본과의 대조가 불가능해지고 오류가 굳어진다. 그래서 수집 단계는 **판단하지 않고 원문을 그대로 담는다.** 분류·정제는 normalizer의 책임이다.

## 절차
1. **대상·필터 확정** — 출처별로 "대상=어린이/청소년" 또는 초중고 관련 카테고리로 좁힌다. 출처별 진입 URL·필터는 `references/sources.md` 참조.
2. **robots/예절 확인** — 출처별 robots.txt와 요청 간격을 지킨다. 사이트별 규칙은 `references/sources.md`.
3. **목록 수집** — 페이지네이션을 끝까지 돌며 목록의 제목·상세 링크·표시된 마감/대상 텍스트를 수집.
4. **상세 진입** — 각 상세 페이지에서 참가자격·지역·날짜·시상 **원문 텍스트를 그대로** `raw_text`에 담는다.
5. **원시 레코드 저장** — `_workspace/01_collector_{site}_raw.json`. 최소 필드: `source_site, source_url, title, raw_text` + 추출되는 모든 원시 값.
6. **리포트** — 수집 건수·실패·차단 여부를 `_workspace/01_collector_report.md`에 남긴다.

## 기술 권장 (MVP)
- 대부분의 출처는 **서버 렌더링 HTML**이라 `requests + BeautifulSoup`로 충분하다(확인된 사실: wevity 목록은 정적 HTML).
- JS로 렌더되는 페이지만 예외적으로 `playwright`를 쓴다.
- 요청 사이에 1~3초 `sleep`. User-Agent를 명시하고, 동일 페이지 15분 캐시 권장.
- 재실행 시 `source_url` 기준으로 기존 데이터와 병합(증분 수집).

## 하지 말 것 (Why)
- 출처의 **편집·요약문을 그대로 복사하지 않는다** → 저작권(데이터베이스제작자 권리) 위험. 사실만 raw로 보존하고, 재구성은 normalizer가 한다.
- robots가 막거나 ToS 위반 소지가 있으면 **멈추고 보고**한다. 차단당하면 수집 자체가 끝난다.
- 빈 값을 임의로 채우지 않는다. 모르면 비워두고 report에 남긴다.
