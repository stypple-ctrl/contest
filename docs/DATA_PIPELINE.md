# 데이터 갱신 파이프라인

웹앱 실행과 데이터 갱신은 다릅니다. 앱을 보는 데는 `web/`만 필요하지만, 최신 공모전·문화행사를 반영하려면 저장소 전체와 Python 환경이 필요합니다. 수집은 외부 사이트와 API에 요청을 보내고 `data/contests.db`, `_workspace/`, 웹 데이터 파일을 바꾸므로, 내용을 이해한 뒤 실행하세요.

## 준비

프로젝트 최상위 폴더에서 Python 가상환경을 만들고 의존성을 설치합니다.

```bash
python3 -m venv .venv
.venv/bin/python -m pip install -r requirements.txt
```

Windows PowerShell에서는 가상환경 실행 파일이 `.venv\Scripts\python.exe`입니다. 이후 예시의 `.venv/bin/python`을 그 경로로 바꿉니다.

문화행사 API를 쓰려면 `.env.example`을 참고하여 프로젝트 최상위에 `.env.local`을 만들고 필요한 키를 넣습니다. 지원하는 변수는 다음 네 가지입니다.

- `KOPIS_API_KEY`
- `CULTUREINFO_API_KEY`
- `KCISA_MUSEUM_API_KEY`
- `KCISA_MUSEUM_API_URL`

키는 소스 코드, 문서, Git 커밋에 넣지 마세요. 키가 없어도 공모전 수집과 기존 웹 스냅샷 실행은 가능합니다. 다만 해당 문화행사 수집 단계는 건너뜁니다.

## 전체 흐름

```text
1. 집계 사이트에서 청소년 관련 공모전 후보 수집
2. 참가 등급·지역·날짜·분야를 표준 형태로 정규화
3. 필수값·날짜·공식 URL·출처 간 중복을 검수
4. SQLite DB에 upsert하고 상태를 갱신
5. DB를 웹앱용 TypeScript 정적 데이터로 내보내기
```

공모전은 `contestkorea`, `all-con`, `thinkcontest` 등 공개 집계 페이지에서 후보를 찾는 스크립트를 제공합니다. 집계 정보는 후보 발견용이며, 주최측 공식 URL을 찾아 `official_url`로 보관합니다. `source_url`은 수집 출처와 감사용입니다. 수집 전에 대상 사이트의 정책과 robots 규칙을 확인하고, 차단·약관 위반 우려가 있으면 중지해야 합니다.

## 한 번에 갱신하기

기본 명령은 다음입니다.

```bash
.venv/bin/python scripts/weekly_refresh.py
```

이 명령은 순서대로 공모전 수집, 공모전 정규화·교차검수·참가대상 감사, 선택적 문화 API 수집, 문화행사 교차검수, URL 확인, 공모전·문화행사 웹 데이터 내보내기를 실행합니다.

기본값은 문화행사를 오늘부터 90일 범위로 보고, 공모전 출처 섹션마다 상세 페이지 40개를 대상으로 합니다. 실행량을 줄여 먼저 확인하려면 다음처럼 제한할 수 있습니다.

```bash
.venv/bin/python scripts/weekly_refresh.py --contest-limit 5 --culture-rows 10 --culture-pages 1 --skip-live-check
```

`--skip-live-check`은 공식 URL 접속 점검을 건너뜁니다. 선택적 API 수집 실패도 실패로 처리하려면 `--strict-optional`을 추가합니다. 기본 동작에서는 API 키가 없거나 선택적 수집이 실패해도 다른 단계를 계속 시도합니다.

KCISA 박물관 수집기는 날짜 범위 옵션을 받지 않고 API가 제공하는 페이지를 `--rows`와 `--max-pages` 범위에서 읽습니다. 따라서 다른 문화 API와 동일한 날짜 범위가 적용된다고 가정하면 안 됩니다. KCISA만 수집할 때는 아래의 개별 명령과 `--help`를 사용하세요.

## 단계별로 실행하기

문제가 난 위치를 좁히거나 학습할 때는 개별 도구를 실행할 수 있습니다.

```bash
# 공모전 후보 수집 (출처 섹션별 상세 페이지 수 제한)
.venv/bin/python scripts/collect_contest_sources.py --limit 10

# 수집 결과를 DB에 정규화·upsert
.venv/bin/python scripts/normalize_multi_contests.py

# 출처 간 공모전 대조 및 참가대상 감사
.venv/bin/python scripts/verify_contest_cross_sources.py
.venv/bin/python scripts/audit_contest_target_eligibility.py

# 공식 URL 접속 점검
.venv/bin/python scripts/live_check_urls.py --table contests

# 웹앱이 읽을 정적 데이터 생성
.venv/bin/python scripts/export_web_data.py
.venv/bin/python scripts/export_culture_web_data.py
```

문화행사 테이블이 없는 새 DB라면 먼저 아래를 실행합니다.

```bash
.venv/bin/python scripts/init_culture_db.py
```

문화 API 수집기는 API 키와 날짜 범위를 요구할 수 있습니다. 예를 들어 KOPIS는 다음과 같이 실행합니다.

```bash
.venv/bin/python scripts/collect_kopis_culture.py --start 2026-08-05 --end 2026-11-03 --kid-only
```

날짜는 실행하려는 시점에 맞게 `YYYY-MM-DD` 형식으로 바꾸세요. 다른 수집기의 모든 선택지는 `--help`로 확인할 수 있습니다.

```bash
.venv/bin/python scripts/collect_cultureinfo.py --help
.venv/bin/python scripts/collect_kcisa_museum.py --help
```

## 산출물과 확인 방법

| 산출물 | 의미 |
| --- | --- |
| `_workspace/01_collector_*_raw.json` | 수집한 원시 후보와 출처 정보 |
| `_workspace/06_culture_cross_verify.md` | 문화행사 출처 간 대조 보고서 |
| `data/contests.db` | 공모전과 문화행사의 SQLite 데이터베이스 |
| `web/src/lib/contest-data.ts` | 공모전 웹 스냅샷 |
| `web/src/lib/culture-data.ts` | 문화행사 웹 스냅샷 |

공모전 표준 레코드의 기준은 `.agents/skills/contest-normalizing/references/record-schema.md`입니다. 핵심 필드는 참가 등급, 지역, 접수 시작·마감일, 행사일, 공식 URL, 검수 상태입니다. `verified`는 필수 정보와 공식 URL 등의 조건을 통과했다는 상태이고, `conflict`는 정보 충돌·누락·추가 확인 필요를 뜻합니다. `verified`가 모든 사실의 영구 정확성을 보장하지는 않습니다. 게시하거나 안내하기 전에는 반드시 원본 공고를 다시 확인하세요.

내보내기 뒤에는 `web/`에서 `npm run build` 또는 `npm run dev`를 실행하여 변경된 스냅샷이 화면에 반영되는지 확인합니다.
