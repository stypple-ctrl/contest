# 교육정보 찾기

초·중·고 학생에게 맞는 공모전·대외활동·문화행사를 학년, 지역, 일정으로 찾고 안내문 초안까지 만드는 학원장용 검색 서비스입니다.

이 저장소는 완성된 코드만 보여주는 예제가 아닙니다. 여러 출처의 정보를 수집하고, 같은 형태로 정리하고, 검증하고, SQLite에 저장한 뒤 Next.js 검색 화면으로 전달하는 전체 과정을 공부할 수 있는 학습자료입니다.

## 누구를 위한 자료인가요?

- 코딩 경험은 거의 없지만 AI 도구로 실제 서비스를 만들어보고 싶은 사람
- 화면뿐 아니라 데이터가 들어오고 검증되는 과정까지 이해하고 싶은 사람
- 이 구조를 채용정보, 지원사업, 행사, 부동산 등 다른 검색 서비스에 응용하고 싶은 사람

## 먼저 알아둘 두 가지 실행 범위

### 1. 웹앱만 실행하기

`web/`은 기존 홈페이지, 로그인 서버, 별도 API 서버 없이 독립 실행됩니다. 저장소에 포함된 데이터 스냅샷을 사용하므로 API 키도 필요하지 않습니다.

```bash
git clone https://github.com/stypple-ctrl/contest.git
cd contest
npm run setup
npm run dev
```

브라우저에서 `http://localhost:3000`을 엽니다.

### 2. 데이터를 직접 갱신하기

새 데이터를 수집하려면 Python, SQLite DB, 루트 `scripts/`가 필요합니다. 공모전 수집은 기본적으로 API 키 없이 가능하지만, 일부 문화행사 수집에는 별도 공공 API 키가 필요합니다.

```bash
python3 -m venv .venv
source .venv/bin/activate
python3 -m pip install -r requirements.txt
python3 scripts/weekly_refresh.py
```

키가 없는 문화 API 단계는 건너뛰며, 기존 데이터로 웹앱을 실행하는 데는 문제가 없습니다. 운영체제별 설치법과 Windows 명령은 [시작 안내](docs/GETTING_STARTED.md)를 참고하세요.

### API 키는 저장소에 포함하지 않습니다

이 공개 저장소와 GitHub Actions에는 실제 API 키를 보관하지 않습니다. 포함된 데이터 스냅샷으로 웹앱을 실행할 때는 키가 필요하지 않습니다.

문화행사 데이터를 직접 갱신하려는 학습자는 KOPIS·공공데이터포털·문화데이터광장에서 자신의 키를 발급받아 로컬 `.env.local`에 설정하세요. 자동 갱신을 운영하려면 같은 값을 본인 저장소의 GitHub Actions Secrets에 별도로 등록해야 합니다. 키가 없으면 해당 수집 단계만 안전하게 건너뜁니다.

## 전체 구조

```text
외부 공고·공공 API
        ↓ 수집
원시 후보 데이터
        ↓ 정규화
공통 레코드
        ↓ 교차검증
SQLite 데이터베이스
        ↓ 내보내기
TypeScript 데이터 스냅샷
        ↓
Next.js 검색 웹앱
```

웹앱은 운영 중 SQLite나 외부 API를 직접 호출하지 않습니다. 빌드에 포함된 정적 데이터 파일을 읽기 때문에 배포 구조가 단순하고 API 키가 브라우저에 노출되지 않습니다. 대신 데이터를 갱신한 뒤에는 정적 파일을 다시 만들고 재배포해야 합니다.

## 기술 스택

| 영역 | 기술 | 선택한 이유 |
|---|---|---|
| 웹 | Next.js, React, TypeScript | 페이지·컴포넌트·타입을 한 프로젝트에서 학습하기 쉬움 |
| 스타일 | Tailwind CSS | 컴포넌트 가까이에서 화면 규칙을 확인 가능 |
| 수집·가공 | Python | 웹 문서와 공공 API 데이터를 다루기 쉬움 |
| 저장 | SQLite | 별도 DB 서버 없이 파일 하나로 시작 가능 |
| 자동화 | GitHub Actions | 주기적 갱신 과정을 코드로 기록 가능 |
| 배포 | Railway 설정 예시 | 저장소 단위 빌드와 실행 명령을 보여줌 |

## 폴더 지도

```text
contest/
├── web/                 # 독립 실행되는 Next.js 웹앱
├── scripts/             # 수집·정규화·검증·내보내기
├── data/                # SQLite 데이터베이스
├── .agents/skills/      # 공모전 데이터 작업을 위한 AI 스킬
├── .github/workflows/   # 주간 데이터 갱신 자동화
└── docs/                # 단계별 학습 문서
```

## 추천 학습 순서

1. [처음 실행하기](docs/GETTING_STARTED.md)
2. [아키텍처 이해하기](docs/ARCHITECTURE.md)
3. [데이터 파이프라인 따라가기](docs/DATA_PIPELINE.md)
4. [시행착오 읽기](docs/BUILD_JOURNAL.md)
5. [AI 작업 방식과 스킬 평가](docs/AI_WORKFLOW.md)
6. [다른 주제로 응용하기](docs/ADAPTATION_GUIDE.md)
7. [보안과 데이터 사용 주의사항](docs/SECURITY_AND_DATA.md)

다른 저장소도 같은 방식의 수업자료로 바꾸려면 [공개 학습자료 전환 프롬프트](docs/REPOSITORY_TEACHING_PROMPT.md)를 사용하세요.

## 확인 명령

```bash
npm run lint
npm test
npm run build
```

## 데이터와 라이선스

이 저장소 작성자가 만든 소스 코드와 문서는 [MIT License](LICENSE)로 공개합니다. 공모전 원문, 문화행사 정보, 외부 포스터, 기관 로고와 링크는 각 원출처의 권리가 적용될 수 있습니다. 학습·재배포 전에 [보안과 데이터 안내](docs/SECURITY_AND_DATA.md)를 확인하세요.

공모전이나 행사 정보는 변경될 수 있으므로 실제 신청 전 반드시 공식 공고를 다시 확인해야 합니다.
