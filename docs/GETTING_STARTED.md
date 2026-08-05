# 처음 실행하기

이 문서는 코드를 처음 만지는 사람을 위한 실행 안내입니다. 이 프로젝트의 `web/` 폴더는 예전 홈페이지나 별도 API 서버에 연결하지 않는 독립 Next.js 앱입니다. 따라서 **현재 들어 있는 데이터로 화면을 보는 일**에는 Python, SQLite, API 키가 필요하지 않습니다.

## 먼저 알아둘 두 가지

| 하고 싶은 일 | 필요한 범위 | 결과 |
| --- | --- | --- |
| 검색 화면을 실행하고 학습하기 | `web/` 폴더만 | 저장소에 포함된 공모전·문화행사 정적 스냅샷 |
| 최신 정보를 다시 모아 반영하기 | 저장소 전체 | 수집·검수·SQLite DB·웹 데이터 내보내기 |

`web/`만 복사할 때는 `web` 폴더 전체를 복사하세요. `src/lib/contest-data.ts`, `src/lib/culture-data.ts`가 빌드에 포함되는 데이터 스냅샷입니다. 이 데이터는 서버에서 매번 읽는 DB가 아니므로, 새 데이터로 바꾸려면 전체 저장소의 갱신 과정을 실행해야 합니다.

## 준비물

- Node.js 22 이상 25 미만 (`node --version`으로 확인)
- 터미널: macOS는 Terminal, Windows는 PowerShell 등
- 인터넷 연결: 처음 `npm ci`로 패키지를 받을 때 필요

## 5분 실행

저장소 최상위 폴더에 있을 때 아래를 실행합니다. 경로에 공백이 있어도 따옴표를 유지하면 됩니다.

```bash
cd "web"
npm ci
npm run dev
```

터미널에 표시되는 주소(보통 `http://localhost:3000`)를 브라우저에서 엽니다. 다음 경로를 확인해 보세요.

- `/` — 통합 검색
- `/contest` — 공모전·대외활동 검색
- `/culture` — 문화행사 검색
- `/contest/blog` — 선택한 공모전으로 안내문 초안 만들기

`npm run dev`를 멈추려면 실행 중인 터미널에서 `Ctrl+C`를 누릅니다.

## 설치가 잘 되었는지 확인

별도 터미널에서 `web/` 폴더를 기준으로 다음 명령을 실행할 수 있습니다.

```bash
npm run lint
npm run test:filters
npm run test:current-date
npm run test:cards
npm run test:cards-click
npm run test:security
npm run test:grades
npm run build
```

개발 서버 대신 빌드된 앱을 실행하려면 먼저 빌드한 뒤 시작합니다.

```bash
npm run build
npm run start
```

기본 포트 3000이 이미 사용 중이면 `PORT=3001 npm run start`처럼 다른 포트를 지정할 수 있습니다. Windows PowerShell에서는 `$env:PORT=3001; npm run start`를 사용합니다.

## 자주 만나는 문제

### `npm` 또는 `node`를 찾을 수 없음

Node.js가 설치되지 않았거나 터미널을 다시 열지 않은 경우입니다. Node.js 버전이 22 이상 25 미만인지 `node --version`으로 먼저 확인하세요.

### 설치 뒤 화면이 열리지 않음

`npm run dev`가 계속 실행 중인지와 터미널에 표시된 주소를 확인하세요. 다른 프로그램이 3000번 포트를 쓰는 경우 Next.js가 다른 포트를 제안할 수 있습니다.

### 화면의 행사가 최신이 아님

정상 동작일 수 있습니다. 웹앱은 빌드 시점의 `src/lib/contest-data.ts`, `src/lib/culture-data.ts` 스냅샷을 사용합니다. 최신화는 [DATA_PIPELINE.md](DATA_PIPELINE.md)의 전체 저장소 절차를 따르세요.

### 저장 목록이 다른 기기에서 보이지 않음

저장 기능은 브라우저의 로컬 저장소를 사용합니다. 서버 계정이나 기기 간 동기화 기능은 현재 포함되어 있지 않습니다.

## 다음 읽을 문서

- [ARCHITECTURE.md](ARCHITECTURE.md): 화면, 데이터, 수집 도구가 어떻게 나뉘는지
- [DATA_PIPELINE.md](DATA_PIPELINE.md): 실제 데이터를 갱신하는 방법과 주의점
- [ADAPTATION_GUIDE.md](ADAPTATION_GUIDE.md): 다른 주제의 검색 서비스로 바꾸는 방법
