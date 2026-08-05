# 웹앱

이 폴더는 기존 홈페이지나 별도 백엔드 없이 실행되는 독립 Next.js 애플리케이션입니다.

저장소 루트에서 실행하는 방법은 [시작 안내](../docs/GETTING_STARTED.md)를 참고하세요. `web/` 폴더만 복사했다면 다음 명령을 사용합니다.

```bash
npm ci
npm run dev
```

브라우저에서 `http://localhost:3000`을 엽니다.

웹앱은 `src/lib/contest-data.ts`와 `src/lib/culture-data.ts`에 포함된 데이터 스냅샷을 사용합니다. 이 폴더만으로 화면은 실행되지만, 데이터를 새로 수집하려면 저장소 루트의 Python 스크립트와 SQLite DB가 필요합니다.
