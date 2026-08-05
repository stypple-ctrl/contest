# 구조 이해하기

이 프로젝트는 학원장이 초·중·고 학생에게 맞는 공모전·대외활동과 문화행사를 찾도록 돕는 검색 앱입니다. 화면을 빨리 실행하는 부분과, 데이터를 조심스럽게 갱신하는 부분을 분리했습니다.

```text
공개 출처·공공 API
        ↓ (수집)
scripts/ + _workspace/ 원시·감사 산출물
        ↓ (정규화·검수)
data/contests.db  ← SQLite 데이터베이스
        ↓ (내보내기)
web/src/lib/*-data.ts  ← 정적 데이터 스냅샷
        ↓ (빌드)
Next.js 웹앱
```

## 독립 실행 경계

`web/`은 독립 실행 단위입니다. 기존 홈페이지의 로그인, 도메인, API 서버, 환경변수에 의존하지 않습니다. 복사한 `web/` 폴더 안에서 패키지를 설치하고 실행하면 검색, 상세 보기, 저장 목록, 블로그 안내문 초안을 사용할 수 있습니다.

그 대신 웹앱은 SQLite를 실시간으로 읽지 않습니다. `contest-data.ts`와 `culture-data.ts`에 포함된 값이 브라우저용 번들에 들어갑니다. 이 선택은 작은 프로젝트를 별도 백엔드 없이 배포·학습하기 쉽게 만들지만, 데이터가 자동으로 최신화되지는 않는다는 뜻입니다.

전체 저장소는 데이터 갱신용입니다. `scripts/`, `data/contests.db`, `requirements.txt`, `.env.example`와 수집 절차 문서가 있어야 수집 결과를 DB에 넣고 웹 스냅샷을 다시 만들 수 있습니다.

## 폴더 지도

| 위치 | 책임 |
| --- | --- |
| `web/src/app/` | 페이지 주소와 화면 뼈대. `/`, `/contest`, `/culture`, 상세·블로그 경로를 정의합니다. |
| `web/src/components/` | 검색창, 필터, 결과 카드, 상세 화면처럼 재사용하는 UI입니다. |
| `web/src/lib/contest-data.ts` | 공모전 정적 데이터와 날짜 계산 도우미입니다. |
| `web/src/lib/culture-data.ts` | 문화행사 정적 데이터와 날짜 계산 도우미입니다. |
| `web/src/types/` | 화면과 데이터가 공유하는 TypeScript 자료형입니다. |
| `web/src/lib/saved-items.ts` | 브라우저 로컬 저장소 기반 저장 목록 처리입니다. |
| `scripts/` | 수집, DB 생성·검수, 웹 데이터 내보내기 도구입니다. |
| `data/contests.db` | 공모전 `contests`와 문화행사 `culture_events`를 담는 SQLite 파일입니다. |
| `_workspace/` | 수집 원문과 검수 보고서를 남기는 작업 공간입니다. 실행 결과에 따라 생기거나 갱신됩니다. |
| `.agents/skills/contest-*/` | 공모전 수집·정규화·검수·적재의 기준과 표준 레코드 정의입니다. |

## 화면 계층

Next.js의 `src/app/`이 URL을 화면으로 연결하고, `src/components/`가 검색·필터·카드 UI를 담당합니다. 데이터는 `src/lib/`에서 가져오며, 자료형은 `src/types/`로 고정합니다. 그래서 실제 DB나 API를 나중에 도입하더라도 `ContestEvent`, `CultureEvent` 형태를 유지하면 UI 변경을 줄일 수 있습니다.

현재 저장 목록은 `localStorage`에 저장됩니다. 즉 같은 브라우저에서는 유지될 수 있지만 사용자 계정, 클라우드 동기화, 공동 편집 기능은 아닙니다.

## 데이터 계층과 신뢰 표시

공모전 레코드는 수집 출처 URL(`source_url`)과 주최 기관 원본 공고 URL(`official_url`)을 구분합니다. 웹 화면의 원본 공고 링크에는 기관·주최측 URL을 사용하도록 설계되어 있으며, 집계 사이트 URL은 감사와 검수에 남깁니다. 자세한 원칙은 [SECURITY_AND_DATA.md](SECURITY_AND_DATA.md)를 참고하세요.

문화행사도 `verification_status`와 검수 메모를 DB에 보관합니다. 내보내기 과정에서 검수되지 않은 행사는 웹 데이터의 `conflict` 값으로 전달됩니다. 이는 오류를 자동으로 고쳤다는 표시가 아니라, 원본 확인이 더 필요할 수 있다는 신호입니다.

## 기술 선택의 범위

- **Next.js / React / TypeScript**: 검색 UI와 페이지를 구성합니다.
- **SQLite**: 한 파일로 보관·조회할 수 있는 초기 데이터 저장소입니다.
- **Python + Beautiful Soup**: 공개 HTML 수집과 데이터 처리 스크립트에 사용합니다.
- **정적 TypeScript 데이터**: 웹앱을 DB 서버 없이 단독 실행하게 합니다.

이 구조는 규모가 작고 학습 목적일 때의 선택입니다. 여러 사용자가 동시에 데이터를 편집하거나 실시간 갱신이 필요하면 API와 서버형 데이터베이스를 별도로 설계해야 합니다.
