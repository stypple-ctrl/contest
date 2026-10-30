import type { ContestEvent } from "@/types/contest";

// 데이터 기준일 — dday/status 스냅샷의 기준. 수집 파이프라인 재실행 후 scripts/export_web_data.py로 갱신한다.
export const DATA_DATE = "2026-10-30";

export const SAMPLE_EVENTS: ContestEvent[] = [
  {
    "id": "contestkorea-202604290082",
    "title": "아시아 스토리 개발 및 웹툰 제작 개발 파트너즈 모집",
    "organizer": "원본 확인 필요",
    "grades": [
      "초",
      "중",
      "고"
    ],
    "regions": [
      "강원",
      "경기",
      "광주",
      "대구",
      "대전",
      "부산",
      "서울",
      "온라인",
      "전남",
      "충남"
    ],
    "category": "과학·SW·창의",
    "start": "2026-12-04",
    "deadline": "2026-06-01",
    "dday": -151,
    "status": "접수예정",
    "prize": null,
    "free": true,
    "officialUrl": "https://eventworld.co.kr/acc_story?utm_source=contestkorea&utm_medium=da&utm_campaign=accf&utm_content=01",
    "summary": "아시아 스토리 개발 및 웹툰 제작 개발 파트너즈 모집 후보입니다. 참가대상·마감일·접수방법은 기관 원본 공고에서 확인하세요.",
    "conflict": false,
    "academyRecommendation": {
      "subjectTags": [
        "과학",
        "코딩/SW",
        "국어/논술",
        "미술/디자인"
      ],
      "careerTags": [
        "이공계",
        "IT/SW"
      ],
      "useCaseTags": [
        "수업연계",
        "결과물있음",
        "학부모안내",
        "개별추천",
        "심화도전"
      ],
      "confidence": "높음",
      "confidenceScore": 100,
      "reasons": [
        "과학·코딩/SW 수업과 연결해 학생별 결과물 제작 과제로 활용할 수 있습니다.",
        "기관 원본 공고가 확인되어 학부모 안내 자료로 사용하기 전 검토 부담이 낮습니다.",
        "준비 부담이 있는 산출물 또는 전문 분야 단서가 있어 관심 학생의 심화 프로젝트 후보로 적합합니다."
      ],
      "evidence": [
        "참가대상: 초·중·고",
        "분야: 과학·SW·창의",
        "마감까지 -151일",
        "지역/방식: 전국 또는 온라인",
        "참가비: 무료",
        "기관 원본 공고 확인"
      ],
      "warnings": [],
      "programIdeas": [
        "독서·글쓰기 수업의 2~4주 결과물 프로젝트",
        "SW 심화반 문제풀이 또는 미니 프로젝트",
        "포스터·웹툰·디자인 작품 제작 특강"
      ]
    }
  },
  {
    "id": "contestkorea-202606260043",
    "title": "제2회 세종사이버대학교 산업안전공학과 안전사진 공모전",
    "organizer": "원본 확인 필요",
    "grades": [
      "초",
      "중",
      "고"
    ],
    "regions": [
      "강원",
      "경기",
      "대구",
      "대전",
      "부산",
      "서울",
      "세종",
      "충남"
    ],
    "category": "과학·SW·창의",
    "start": "2026-06-01",
    "deadline": "2026-06-01",
    "dday": -151,
    "status": "마감",
    "prize": null,
    "free": true,
    "officialUrl": null,
    "summary": "제2회 세종사이버대학교 산업안전공학과 안전사진 공모전 후보입니다. 참가대상·마감일·접수방법은 기관 원본 공고에서 확인하세요.",
    "conflict": true,
    "academyRecommendation": {
      "subjectTags": [
        "과학",
        "코딩/SW",
        "영상/미디어"
      ],
      "careerTags": [
        "이공계",
        "IT/SW",
        "미디어"
      ],
      "useCaseTags": [
        "수업연계",
        "결과물있음",
        "단체참여",
        "심화도전"
      ],
      "confidence": "높음",
      "confidenceScore": 83,
      "reasons": [
        "과학·코딩/SW 수업과 연결해 학생별 결과물 제작 과제로 활용할 수 있습니다.",
        "준비 부담이 있는 산출물 또는 전문 분야 단서가 있어 관심 학생의 심화 프로젝트 후보로 적합합니다."
      ],
      "evidence": [
        "참가대상: 초·중·고",
        "분야: 과학·SW·창의",
        "마감까지 -151일",
        "지역: 강원·경기·대구·대전·부산·서울·세종·충남",
        "참가비: 무료",
        "제출물 단서: 글/그림/아이디어 등 비교적 가벼운 산출물"
      ],
      "warnings": [
        "기관 원본 링크 또는 검수상태 확인 필요"
      ],
      "programIdeas": [
        "SW 심화반 문제풀이 또는 미니 프로젝트",
        "기획안 작성부터 촬영·편집까지 이어지는 영상 제작 특강"
      ]
    }
  },
  {
    "id": "allcon-538340",
    "title": "2026 대한민국 환경사랑공모전",
    "organizer": "원본 확인 필요",
    "grades": [
      "초",
      "고"
    ],
    "regions": [
      "서울",
      "온라인"
    ],
    "category": "과학·SW·창의",
    "start": null,
    "deadline": "2026-06-08",
    "dday": -144,
    "status": "마감",
    "prize": null,
    "free": true,
    "officialUrl": "https://xn--289a5d925ap8c64jnzlpiz.kr/",
    "summary": "2026 대한민국 환경사랑공모전 후보입니다. 참가대상·마감일·접수방법은 기관 원본 공고에서 확인하세요.",
    "conflict": true,
    "academyRecommendation": {
      "subjectTags": [
        "과학",
        "코딩/SW",
        "사회/환경"
      ],
      "careerTags": [
        "이공계",
        "IT/SW",
        "환경/공공"
      ],
      "useCaseTags": [
        "수업연계",
        "결과물있음",
        "심화도전"
      ],
      "confidence": "중간",
      "confidenceScore": 78,
      "reasons": [
        "과학·코딩/SW 수업과 연결해 학생별 결과물 제작 과제로 활용할 수 있습니다.",
        "준비 부담이 있는 산출물 또는 전문 분야 단서가 있어 관심 학생의 심화 프로젝트 후보로 적합합니다."
      ],
      "evidence": [
        "참가대상: 초·고",
        "분야: 과학·SW·창의",
        "마감까지 -144일",
        "지역/방식: 전국 또는 온라인",
        "참가비: 무료"
      ],
      "warnings": [
        "기관 원본 링크 또는 검수상태 확인 필요",
        "제출 형식은 원본 공고에서 확인 필요"
      ],
      "programIdeas": [
        "SW 심화반 문제풀이 또는 미니 프로젝트",
        "환경·사회 이슈 탐구 후 캠페인 산출물 만들기"
      ]
    }
  },
  {
    "id": "allcon-538919",
    "title": "관세청 AI 관세행정 캐릭터 공모전",
    "organizer": "원본 확인 필요",
    "grades": [
      "중",
      "고"
    ],
    "regions": [
      "서울"
    ],
    "category": "과학·SW·창의",
    "start": null,
    "deadline": "2026-06-08",
    "dday": -144,
    "status": "마감",
    "prize": null,
    "free": true,
    "officialUrl": "https://blog.naver.com/k_customs/224309207603",
    "summary": "관세청 AI 관세행정 캐릭터 공모전 후보입니다. 참가대상·마감일·접수방법은 기관 원본 공고에서 확인하세요.",
    "conflict": true,
    "academyRecommendation": {
      "subjectTags": [
        "과학",
        "코딩/SW"
      ],
      "careerTags": [
        "이공계",
        "IT/SW"
      ],
      "useCaseTags": [
        "수업연계",
        "결과물있음",
        "개별추천",
        "심화도전"
      ],
      "confidence": "중간",
      "confidenceScore": 75,
      "reasons": [
        "과학·코딩/SW 수업과 연결해 학생별 결과물 제작 과제로 활용할 수 있습니다.",
        "준비 부담이 있는 산출물 또는 전문 분야 단서가 있어 관심 학생의 심화 프로젝트 후보로 적합합니다."
      ],
      "evidence": [
        "참가대상: 중·고",
        "분야: 과학·SW·창의",
        "마감까지 -144일",
        "지역: 서울",
        "참가비: 무료"
      ],
      "warnings": [
        "기관 원본 링크 또는 검수상태 확인 필요",
        "제출 형식은 원본 공고에서 확인 필요"
      ],
      "programIdeas": [
        "SW 심화반 문제풀이 또는 미니 프로젝트"
      ]
    }
  },
  {
    "id": "contestkorea-202606250062",
    "title": "2026 제4회 해양레저관광 사진 공모전",
    "organizer": "원본 확인 필요",
    "grades": [
      "초",
      "중",
      "고"
    ],
    "regions": [
      "강원",
      "경기",
      "대구",
      "대전",
      "부산",
      "서울",
      "온라인",
      "충남"
    ],
    "category": "과학·SW·창의",
    "start": "2026-06-15",
    "deadline": "2026-06-16",
    "dday": -136,
    "status": "마감",
    "prize": null,
    "free": true,
    "officialUrl": "https://kibs.gcontest.co.kr/template/m/frame/accept1/34046",
    "summary": "2026 제4회 해양레저관광 사진 공모전 후보입니다. 참가대상·마감일·접수방법은 기관 원본 공고에서 확인하세요.",
    "conflict": true,
    "academyRecommendation": {
      "subjectTags": [
        "과학",
        "코딩/SW",
        "영상/미디어"
      ],
      "careerTags": [
        "이공계",
        "IT/SW",
        "미디어"
      ],
      "useCaseTags": [
        "수업연계",
        "결과물있음",
        "심화도전"
      ],
      "confidence": "높음",
      "confidenceScore": 86,
      "reasons": [
        "과학·코딩/SW 수업과 연결해 학생별 결과물 제작 과제로 활용할 수 있습니다.",
        "준비 부담이 있는 산출물 또는 전문 분야 단서가 있어 관심 학생의 심화 프로젝트 후보로 적합합니다."
      ],
      "evidence": [
        "참가대상: 초·중·고",
        "분야: 과학·SW·창의",
        "마감까지 -136일",
        "지역/방식: 전국 또는 온라인",
        "참가비: 무료",
        "제출물 단서: 글/그림/아이디어 등 비교적 가벼운 산출물"
      ],
      "warnings": [
        "기관 원본 링크 또는 검수상태 확인 필요"
      ],
      "programIdeas": [
        "SW 심화반 문제풀이 또는 미니 프로젝트",
        "기획안 작성부터 촬영·편집까지 이어지는 영상 제작 특강"
      ]
    }
  },
  {
    "id": "contestkorea-202606260019",
    "title": "제2회 화성시 양성평등 실천 공모전",
    "organizer": "원본 확인 필요",
    "grades": [
      "초",
      "중",
      "고"
    ],
    "regions": [
      "강원",
      "경기",
      "대구",
      "대전",
      "부산",
      "서울",
      "온라인",
      "충남"
    ],
    "category": "과학·SW·창의",
    "start": "2026-08-21",
    "deadline": "2026-06-22",
    "dday": -130,
    "status": "접수예정",
    "prize": null,
    "free": true,
    "officialUrl": null,
    "summary": "제2회 화성시 양성평등 실천 공모전 후보입니다. 참가대상·마감일·접수방법은 기관 원본 공고에서 확인하세요.",
    "conflict": true,
    "academyRecommendation": {
      "subjectTags": [
        "과학",
        "코딩/SW",
        "국어/논술"
      ],
      "careerTags": [
        "이공계",
        "IT/SW"
      ],
      "useCaseTags": [
        "수업연계",
        "결과물있음",
        "심화도전"
      ],
      "confidence": "중간",
      "confidenceScore": 78,
      "reasons": [
        "과학·코딩/SW 수업과 연결해 학생별 결과물 제작 과제로 활용할 수 있습니다.",
        "준비 부담이 있는 산출물 또는 전문 분야 단서가 있어 관심 학생의 심화 프로젝트 후보로 적합합니다."
      ],
      "evidence": [
        "참가대상: 초·중·고",
        "분야: 과학·SW·창의",
        "마감까지 -130일",
        "지역/방식: 전국 또는 온라인",
        "참가비: 무료"
      ],
      "warnings": [
        "기관 원본 링크 또는 검수상태 확인 필요",
        "제출 형식은 원본 공고에서 확인 필요"
      ],
      "programIdeas": [
        "독서·글쓰기 수업의 2~4주 결과물 프로젝트",
        "SW 심화반 문제풀이 또는 미니 프로젝트"
      ]
    }
  },
  {
    "id": "contestkorea-202606250014",
    "title": "제57회 한국현대문학번역상 공모",
    "organizer": "원본 확인 필요",
    "grades": [
      "초",
      "중",
      "고"
    ],
    "regions": [
      "강원",
      "경기",
      "대구",
      "대전",
      "부산",
      "서울",
      "온라인",
      "충남"
    ],
    "category": "과학·SW·창의",
    "start": "2026-08-31",
    "deadline": "2026-06-25",
    "dday": -127,
    "status": "접수예정",
    "prize": null,
    "free": true,
    "officialUrl": null,
    "summary": "제57회 한국현대문학번역상 공모 후보입니다. 참가대상·마감일·접수방법은 기관 원본 공고에서 확인하세요.",
    "conflict": true,
    "academyRecommendation": {
      "subjectTags": [
        "과학",
        "코딩/SW",
        "국어/논술"
      ],
      "careerTags": [
        "이공계",
        "IT/SW"
      ],
      "useCaseTags": [
        "수업연계",
        "결과물있음",
        "심화도전"
      ],
      "confidence": "중간",
      "confidenceScore": 78,
      "reasons": [
        "과학·코딩/SW 수업과 연결해 학생별 결과물 제작 과제로 활용할 수 있습니다.",
        "준비 부담이 있는 산출물 또는 전문 분야 단서가 있어 관심 학생의 심화 프로젝트 후보로 적합합니다."
      ],
      "evidence": [
        "참가대상: 초·중·고",
        "분야: 과학·SW·창의",
        "마감까지 -127일",
        "지역/방식: 전국 또는 온라인",
        "참가비: 무료"
      ],
      "warnings": [
        "기관 원본 링크 또는 검수상태 확인 필요",
        "제출 형식은 원본 공고에서 확인 필요"
      ],
      "programIdeas": [
        "독서·글쓰기 수업의 2~4주 결과물 프로젝트",
        "SW 심화반 문제풀이 또는 미니 프로젝트"
      ]
    }
  },
  {
    "id": "contestkorea-202606260005",
    "title": "2026 시민참여형 자원봉사 해커톤 대회",
    "organizer": "원본 확인 필요",
    "grades": [
      "초",
      "중",
      "고"
    ],
    "regions": [
      "강원",
      "경기",
      "대구",
      "대전",
      "부산",
      "서울",
      "충남"
    ],
    "category": "과학·SW·창의",
    "start": "2026-07-10",
    "deadline": "2026-06-26",
    "dday": -126,
    "status": "접수예정",
    "prize": null,
    "free": true,
    "officialUrl": null,
    "summary": "2026 시민참여형 자원봉사 해커톤 대회 후보입니다. 참가대상·마감일·접수방법은 기관 원본 공고에서 확인하세요.",
    "conflict": true,
    "academyRecommendation": {
      "subjectTags": [
        "과학",
        "코딩/SW",
        "국어/논술",
        "사회/환경"
      ],
      "careerTags": [
        "이공계",
        "IT/SW",
        "환경/공공"
      ],
      "useCaseTags": [
        "수업연계",
        "결과물있음",
        "단체참여",
        "개별추천",
        "심화도전"
      ],
      "confidence": "높음",
      "confidenceScore": 83,
      "reasons": [
        "과학·코딩/SW 수업과 연결해 학생별 결과물 제작 과제로 활용할 수 있습니다.",
        "준비 부담이 있는 산출물 또는 전문 분야 단서가 있어 관심 학생의 심화 프로젝트 후보로 적합합니다."
      ],
      "evidence": [
        "참가대상: 초·중·고",
        "분야: 과학·SW·창의",
        "마감까지 -126일",
        "지역: 강원·경기·대구·대전·부산·서울·충남",
        "참가비: 무료",
        "제출물 단서: 영상/SW/보고서/창업 등 준비 부담 가능"
      ],
      "warnings": [
        "기관 원본 링크 또는 검수상태 확인 필요"
      ],
      "programIdeas": [
        "독서·글쓰기 수업의 2~4주 결과물 프로젝트",
        "SW 심화반 문제풀이 또는 미니 프로젝트",
        "환경·사회 이슈 탐구 후 캠페인 산출물 만들기"
      ]
    }
  },
  {
    "id": "contestkorea-202606190044",
    "title": "2026 제21회 부산국제매직페스티벌",
    "organizer": "원본 확인 필요",
    "grades": [
      "초",
      "중",
      "고"
    ],
    "regions": [
      "경기",
      "대구",
      "대전",
      "부산",
      "서울",
      "충남"
    ],
    "category": "과학·SW·창의",
    "start": "2026-06-26",
    "deadline": "2026-06-26",
    "dday": -126,
    "status": "마감",
    "prize": null,
    "free": true,
    "officialUrl": null,
    "summary": "2026 제21회 부산국제매직페스티벌 후보입니다. 참가대상·마감일·접수방법은 기관 원본 공고에서 확인하세요.",
    "conflict": true,
    "academyRecommendation": {
      "subjectTags": [
        "과학",
        "코딩/SW"
      ],
      "careerTags": [
        "이공계",
        "IT/SW"
      ],
      "useCaseTags": [
        "수업연계",
        "결과물있음",
        "개별추천",
        "심화도전"
      ],
      "confidence": "중간",
      "confidenceScore": 75,
      "reasons": [
        "과학·코딩/SW 수업과 연결해 학생별 결과물 제작 과제로 활용할 수 있습니다.",
        "준비 부담이 있는 산출물 또는 전문 분야 단서가 있어 관심 학생의 심화 프로젝트 후보로 적합합니다."
      ],
      "evidence": [
        "참가대상: 초·중·고",
        "분야: 과학·SW·창의",
        "마감까지 -126일",
        "지역: 경기·대구·대전·부산·서울·충남",
        "참가비: 무료"
      ],
      "warnings": [
        "기관 원본 링크 또는 검수상태 확인 필요",
        "제출 형식은 원본 공고에서 확인 필요"
      ],
      "programIdeas": [
        "SW 심화반 문제풀이 또는 미니 프로젝트"
      ]
    }
  },
  {
    "id": "contestkorea-202606260020",
    "title": "[무료 이벤트] MSI 승부예측하고 게이밍 PC·RTX 5070·백화점 상품권 받기",
    "organizer": "원본 확인 필요",
    "grades": [
      "초",
      "중",
      "고"
    ],
    "regions": [
      "강원",
      "경기",
      "대구",
      "대전",
      "부산",
      "서울",
      "온라인",
      "충남"
    ],
    "category": "과학·SW·창의",
    "start": "2026-07-12",
    "deadline": "2026-06-26",
    "dday": -126,
    "status": "접수예정",
    "prize": null,
    "free": true,
    "officialUrl": "https://playlimitless.games?utm_source=contestkorea",
    "summary": "[무료 이벤트] MSI 승부예측하고 게이밍 PC·RTX 5070·백화점 상품권 받기 후보입니다. 참가대상·마감일·접수방법은 기관 원본 공고에서 확인하세요.",
    "conflict": false,
    "academyRecommendation": {
      "subjectTags": [
        "과학",
        "코딩/SW"
      ],
      "careerTags": [
        "이공계",
        "IT/SW"
      ],
      "useCaseTags": [
        "수업연계",
        "결과물있음",
        "학부모안내",
        "개별추천",
        "심화도전"
      ],
      "confidence": "높음",
      "confidenceScore": 92,
      "reasons": [
        "과학·코딩/SW 수업과 연결해 학생별 결과물 제작 과제로 활용할 수 있습니다.",
        "기관 원본 공고가 확인되어 학부모 안내 자료로 사용하기 전 검토 부담이 낮습니다.",
        "준비 부담이 있는 산출물 또는 전문 분야 단서가 있어 관심 학생의 심화 프로젝트 후보로 적합합니다."
      ],
      "evidence": [
        "참가대상: 초·중·고",
        "분야: 과학·SW·창의",
        "마감까지 -126일",
        "지역/방식: 전국 또는 온라인",
        "참가비: 무료",
        "기관 원본 공고 확인"
      ],
      "warnings": [
        "제출 형식은 원본 공고에서 확인 필요"
      ],
      "programIdeas": [
        "SW 심화반 문제풀이 또는 미니 프로젝트"
      ]
    }
  },
  {
    "id": "contestkorea-202606240018",
    "title": "[4주 완성] 투자자산운용사 딱풀 스터디 모집",
    "organizer": "원본 확인 필요",
    "grades": [
      "초",
      "중",
      "고"
    ],
    "regions": [
      "경기",
      "대구",
      "대전",
      "부산",
      "서울",
      "온라인",
      "충남"
    ],
    "category": "과학·SW·창의",
    "start": "2026-06-24",
    "deadline": "2026-06-28",
    "dday": -124,
    "status": "마감",
    "prize": null,
    "free": true,
    "officialUrl": "https://form.naver.com/response/c5z8kt0tkq9rROjZ-27CgQ",
    "summary": "[4주 완성] 투자자산운용사 딱풀 스터디 모집 후보입니다. 참가대상·마감일·접수방법은 기관 원본 공고에서 확인하세요.",
    "conflict": false,
    "academyRecommendation": {
      "subjectTags": [
        "과학",
        "코딩/SW"
      ],
      "careerTags": [
        "이공계",
        "IT/SW"
      ],
      "useCaseTags": [
        "수업연계",
        "결과물있음",
        "학부모안내",
        "개별추천",
        "심화도전"
      ],
      "confidence": "높음",
      "confidenceScore": 92,
      "reasons": [
        "과학·코딩/SW 수업과 연결해 학생별 결과물 제작 과제로 활용할 수 있습니다.",
        "기관 원본 공고가 확인되어 학부모 안내 자료로 사용하기 전 검토 부담이 낮습니다.",
        "준비 부담이 있는 산출물 또는 전문 분야 단서가 있어 관심 학생의 심화 프로젝트 후보로 적합합니다."
      ],
      "evidence": [
        "참가대상: 초·중·고",
        "분야: 과학·SW·창의",
        "마감까지 -124일",
        "지역/방식: 전국 또는 온라인",
        "참가비: 무료",
        "기관 원본 공고 확인"
      ],
      "warnings": [
        "제출 형식은 원본 공고에서 확인 필요"
      ],
      "programIdeas": [
        "SW 심화반 문제풀이 또는 미니 프로젝트"
      ]
    }
  },
  {
    "id": "wevity-108542",
    "title": "서울특별시교육청과 함께하는 시네마그린틴 우수 학생 공모전",
    "organizer": "환경재단",
    "grades": [
      "초",
      "중",
      "고"
    ],
    "regions": [
      "서울"
    ],
    "category": "글쓰기·독서",
    "start": "2026-06-08",
    "deadline": "2026-06-30",
    "dday": -122,
    "status": "마감임박",
    "prize": "1천만원이하",
    "free": true,
    "officialUrl": "https://sieff.kr/",
    "summary": "환경재단 주최. 참가대상 고등·중등·초등. 대상지역 서울. 자세한 내용은 기관 원본 공고 확인.",
    "conflict": true,
    "academyRecommendation": {
      "subjectTags": [
        "국어/논술",
        "과학",
        "사회/환경"
      ],
      "careerTags": [
        "인문사회",
        "환경/공공"
      ],
      "useCaseTags": [
        "수업연계",
        "결과물있음"
      ],
      "confidence": "높음",
      "confidenceScore": 83,
      "reasons": [
        "국어/논술·과학 수업과 연결해 학생별 결과물 제작 과제로 활용할 수 있습니다."
      ],
      "evidence": [
        "참가대상: 초·중·고",
        "분야: 글쓰기·독서",
        "마감까지 -122일",
        "지역: 서울",
        "참가비: 무료",
        "제출물 단서: 글/그림/아이디어 등 비교적 가벼운 산출물"
      ],
      "warnings": [
        "기관 원본 링크 또는 검수상태 확인 필요"
      ],
      "programIdeas": [
        "독서·글쓰기 수업의 2~4주 결과물 프로젝트",
        "환경·사회 이슈 탐구 후 캠페인 산출물 만들기"
      ]
    }
  },
  {
    "id": "wevity-108541",
    "title": "전북특별자치도교육청과 함께하는 시네마그린틴 감상문 공모전",
    "organizer": "환경재단",
    "grades": [
      "초",
      "중",
      "고"
    ],
    "regions": [
      "전북"
    ],
    "category": "글쓰기·독서",
    "start": "2026-06-08",
    "deadline": "2026-06-30",
    "dday": -122,
    "status": "마감임박",
    "prize": "1천만원이하",
    "free": true,
    "officialUrl": "https://sieff.kr/",
    "summary": "환경재단 주최. 참가대상 고등·중등·초등. 대상지역 전북. 자세한 내용은 기관 원본 공고 확인.",
    "conflict": true,
    "academyRecommendation": {
      "subjectTags": [
        "국어/논술",
        "과학",
        "사회/환경"
      ],
      "careerTags": [
        "인문사회",
        "환경/공공"
      ],
      "useCaseTags": [
        "수업연계",
        "결과물있음"
      ],
      "confidence": "높음",
      "confidenceScore": 83,
      "reasons": [
        "국어/논술·과학 수업과 연결해 학생별 결과물 제작 과제로 활용할 수 있습니다."
      ],
      "evidence": [
        "참가대상: 초·중·고",
        "분야: 글쓰기·독서",
        "마감까지 -122일",
        "지역: 전북",
        "참가비: 무료",
        "제출물 단서: 글/그림/아이디어 등 비교적 가벼운 산출물"
      ],
      "warnings": [
        "기관 원본 링크 또는 검수상태 확인 필요"
      ],
      "programIdeas": [
        "독서·글쓰기 수업의 2~4주 결과물 프로젝트",
        "환경·사회 이슈 탐구 후 캠페인 산출물 만들기"
      ]
    }
  },
  {
    "id": "wevity-108521",
    "title": "제4회 마리안느·마가렛 청소년 희망더하기 공모전",
    "organizer": "고흥군",
    "grades": [
      "중",
      "고"
    ],
    "regions": [
      "전국"
    ],
    "category": "기타",
    "start": "2026-05-01",
    "deadline": "2026-06-30",
    "dday": -122,
    "status": "마감임박",
    "prize": "500만원",
    "free": true,
    "officialUrl": "https://www.goheung.go.kr/index.do",
    "summary": "고흥군 주최. 참가대상 고등·중등. 대상지역 전국. 자세한 내용은 기관 원본 공고 확인.",
    "conflict": false,
    "academyRecommendation": {
      "subjectTags": [],
      "careerTags": [],
      "useCaseTags": [
        "학부모안내"
      ],
      "confidence": "중간",
      "confidenceScore": 72,
      "reasons": [
        "기관 원본 공고가 확인되어 학부모 안내 자료로 사용하기 전 검토 부담이 낮습니다."
      ],
      "evidence": [
        "참가대상: 중·고",
        "분야: 기타",
        "마감까지 -122일",
        "지역/방식: 전국 또는 온라인",
        "참가비: 무료",
        "기관 원본 공고 확인"
      ],
      "warnings": [
        "제출 형식은 원본 공고에서 확인 필요"
      ],
      "programIdeas": [
        "관심 학생 개별 안내 후 원본 요강을 확인하는 탐색형 과제"
      ]
    }
  },
  {
    "id": "contestkorea-202606260013",
    "title": "제6회 DMZ 문학상 공모전",
    "organizer": "원본 확인 필요",
    "grades": [
      "초",
      "중",
      "고"
    ],
    "regions": [
      "강원",
      "경기",
      "대구",
      "대전",
      "부산",
      "서울",
      "온라인",
      "충남"
    ],
    "category": "과학·SW·창의",
    "start": "2026-07-01",
    "deadline": "2026-07-01",
    "dday": -121,
    "status": "접수예정",
    "prize": null,
    "free": true,
    "officialUrl": "http://www.dmzfesta.kr/bbs/write.php?bo_table=apply_3",
    "summary": "제6회 DMZ 문학상 공모전 후보입니다. 참가대상·마감일·접수방법은 기관 원본 공고에서 확인하세요.",
    "conflict": true,
    "academyRecommendation": {
      "subjectTags": [
        "과학",
        "코딩/SW",
        "국어/논술"
      ],
      "careerTags": [
        "이공계",
        "IT/SW"
      ],
      "useCaseTags": [
        "수업연계",
        "결과물있음",
        "심화도전"
      ],
      "confidence": "중간",
      "confidenceScore": 78,
      "reasons": [
        "과학·코딩/SW 수업과 연결해 학생별 결과물 제작 과제로 활용할 수 있습니다.",
        "준비 부담이 있는 산출물 또는 전문 분야 단서가 있어 관심 학생의 심화 프로젝트 후보로 적합합니다."
      ],
      "evidence": [
        "참가대상: 초·중·고",
        "분야: 과학·SW·창의",
        "마감까지 -121일",
        "지역/방식: 전국 또는 온라인",
        "참가비: 무료"
      ],
      "warnings": [
        "기관 원본 링크 또는 검수상태 확인 필요",
        "제출 형식은 원본 공고에서 확인 필요"
      ],
      "programIdeas": [
        "독서·글쓰기 수업의 2~4주 결과물 프로젝트",
        "SW 심화반 문제풀이 또는 미니 프로젝트"
      ]
    }
  },
  {
    "id": "contestkorea-202606230057",
    "title": "[4기 모집] 픽크닉 서포터즈 함께 빛날 분들을 찾아요!",
    "organizer": "원본 확인 필요",
    "grades": [
      "초",
      "중",
      "고"
    ],
    "regions": [
      "경기",
      "대구",
      "대전",
      "부산",
      "서울",
      "온라인",
      "충남"
    ],
    "category": "과학·SW·창의",
    "start": "2026-06-23",
    "deadline": "2026-07-02",
    "dday": -120,
    "status": "마감임박",
    "prize": null,
    "free": true,
    "officialUrl": "https://forms.gle/R5MSq7UMYMifQ6bx8",
    "summary": "[4기 모집] 픽크닉 서포터즈 함께 빛날 분들을 찾아요! 후보입니다. 참가대상·마감일·접수방법은 기관 원본 공고에서 확인하세요.",
    "conflict": false,
    "academyRecommendation": {
      "subjectTags": [
        "과학",
        "코딩/SW"
      ],
      "careerTags": [
        "이공계",
        "IT/SW"
      ],
      "useCaseTags": [
        "수업연계",
        "결과물있음",
        "학부모안내",
        "개별추천",
        "심화도전"
      ],
      "confidence": "높음",
      "confidenceScore": 92,
      "reasons": [
        "과학·코딩/SW 수업과 연결해 학생별 결과물 제작 과제로 활용할 수 있습니다.",
        "기관 원본 공고가 확인되어 학부모 안내 자료로 사용하기 전 검토 부담이 낮습니다.",
        "준비 부담이 있는 산출물 또는 전문 분야 단서가 있어 관심 학생의 심화 프로젝트 후보로 적합합니다."
      ],
      "evidence": [
        "참가대상: 초·중·고",
        "분야: 과학·SW·창의",
        "마감까지 -120일",
        "지역/방식: 전국 또는 온라인",
        "참가비: 무료",
        "기관 원본 공고 확인"
      ],
      "warnings": [
        "제출 형식은 원본 공고에서 확인 필요"
      ],
      "programIdeas": [
        "SW 심화반 문제풀이 또는 미니 프로젝트"
      ]
    }
  },
  {
    "id": "wevity-108411",
    "title": "2026 반려동물사랑 어린이 사생대회 참가자 모집",
    "organizer": "마이스진흥재단",
    "grades": [
      "초"
    ],
    "regions": [
      "전국"
    ],
    "category": "미술·디자인·영상",
    "start": "2026-06-01",
    "deadline": "2026-07-03",
    "dday": -119,
    "status": "접수중",
    "prize": "30만원",
    "free": true,
    "officialUrl": "https://koreapetcance.co.kr/notice/?idx=171863792&bmode=view",
    "summary": "마이스진흥재단 주최. 참가대상 초등. 대상지역 전국. 자세한 내용은 기관 원본 공고 확인.",
    "conflict": false,
    "academyRecommendation": {
      "subjectTags": [
        "미술/디자인",
        "영상/미디어"
      ],
      "careerTags": [
        "디자인",
        "미디어"
      ],
      "useCaseTags": [
        "수업연계",
        "결과물있음",
        "학부모안내",
        "개별추천",
        "심화도전"
      ],
      "confidence": "높음",
      "confidenceScore": 100,
      "reasons": [
        "미술/디자인·영상/미디어 수업과 연결해 학생별 결과물 제작 과제로 활용할 수 있습니다.",
        "기관 원본 공고가 확인되어 학부모 안내 자료로 사용하기 전 검토 부담이 낮습니다.",
        "준비 부담이 있는 산출물 또는 전문 분야 단서가 있어 관심 학생의 심화 프로젝트 후보로 적합합니다."
      ],
      "evidence": [
        "참가대상: 초",
        "분야: 미술·디자인·영상",
        "마감까지 -119일",
        "지역/방식: 전국 또는 온라인",
        "참가비: 무료",
        "기관 원본 공고 확인"
      ],
      "warnings": [],
      "programIdeas": [
        "포스터·웹툰·디자인 작품 제작 특강",
        "기획안 작성부터 촬영·편집까지 이어지는 영상 제작 특강"
      ]
    }
  },
  {
    "id": "wevity-108505",
    "title": "2026 대한민국 청소년 창업경진대회",
    "organizer": "교육부, 17개 시·도교육청",
    "grades": [
      "초",
      "중",
      "고"
    ],
    "regions": [
      "전국"
    ],
    "category": "진로·경제·아이디어",
    "start": "2026-05-19",
    "deadline": "2026-07-07",
    "dday": -115,
    "status": "접수중",
    "prize": "200만원",
    "free": true,
    "officialUrl": "https://yeep.go.kr/noti/notiBbsDetail.do?bltnNo=97639",
    "summary": "교육부, 17개 시·도교육청 주최. 참가대상 고등·중등·초등. 대상지역 전국. 자세한 내용은 기관 원본 공고 확인.",
    "conflict": false,
    "academyRecommendation": {
      "subjectTags": [
        "진로/경제",
        "국어/논술"
      ],
      "careerTags": [
        "창업/경제",
        "인문사회"
      ],
      "useCaseTags": [
        "수업연계",
        "결과물있음",
        "학부모안내",
        "개별추천",
        "심화도전"
      ],
      "confidence": "높음",
      "confidenceScore": 100,
      "reasons": [
        "진로/경제·국어/논술 수업과 연결해 학생별 결과물 제작 과제로 활용할 수 있습니다.",
        "기관 원본 공고가 확인되어 학부모 안내 자료로 사용하기 전 검토 부담이 낮습니다.",
        "준비 부담이 있는 산출물 또는 전문 분야 단서가 있어 관심 학생의 심화 프로젝트 후보로 적합합니다."
      ],
      "evidence": [
        "참가대상: 초·중·고",
        "분야: 진로·경제·아이디어",
        "마감까지 -115일",
        "지역/방식: 전국 또는 온라인",
        "참가비: 무료",
        "기관 원본 공고 확인"
      ],
      "warnings": [
        "가벼운 산출물 단서와 고난도 단서가 함께 있어 난이도 확인 필요"
      ],
      "programIdeas": [
        "독서·글쓰기 수업의 2~4주 결과물 프로젝트",
        "아이디어 발굴과 발표자료 제작 진로 프로젝트"
      ]
    }
  },
  {
    "id": "contestkorea-202606260015",
    "title": "[AI 영상 콘텐츠 제작] 실무 경험 60일 완성, 데마완 서포터즈 22기 모집",
    "organizer": "원본 확인 필요",
    "grades": [
      "초",
      "중",
      "고"
    ],
    "regions": [
      "경기",
      "대구",
      "대전",
      "부산",
      "서울",
      "온라인",
      "충남"
    ],
    "category": "과학·SW·창의",
    "start": "2026-06-26",
    "deadline": "2026-07-08",
    "dday": -114,
    "status": "접수중",
    "prize": null,
    "free": true,
    "officialUrl": "https://forms.gle/yiUV1iMtiDDSLK8D6",
    "summary": "[AI 영상 콘텐츠 제작] 실무 경험 60일 완성, 데마완 서포터즈 22기 모집 후보입니다. 참가대상·마감일·접수방법은 기관 원본 공고에서 확인하세요.",
    "conflict": false,
    "academyRecommendation": {
      "subjectTags": [
        "과학",
        "코딩/SW",
        "영상/미디어"
      ],
      "careerTags": [
        "이공계",
        "IT/SW",
        "미디어"
      ],
      "useCaseTags": [
        "수업연계",
        "결과물있음",
        "학부모안내",
        "개별추천",
        "심화도전"
      ],
      "confidence": "높음",
      "confidenceScore": 100,
      "reasons": [
        "과학·코딩/SW 수업과 연결해 학생별 결과물 제작 과제로 활용할 수 있습니다.",
        "기관 원본 공고가 확인되어 학부모 안내 자료로 사용하기 전 검토 부담이 낮습니다.",
        "준비 부담이 있는 산출물 또는 전문 분야 단서가 있어 관심 학생의 심화 프로젝트 후보로 적합합니다."
      ],
      "evidence": [
        "참가대상: 초·중·고",
        "분야: 과학·SW·창의",
        "마감까지 -114일",
        "지역/방식: 전국 또는 온라인",
        "참가비: 무료",
        "기관 원본 공고 확인"
      ],
      "warnings": [],
      "programIdeas": [
        "SW 심화반 문제풀이 또는 미니 프로젝트",
        "기획안 작성부터 촬영·편집까지 이어지는 영상 제작 특강"
      ]
    }
  },
  {
    "id": "contestkorea-202606260016",
    "title": "[디지털 마케터] 실무 경험 60일 완성, 데마완 서포터즈 23기 모집",
    "organizer": "원본 확인 필요",
    "grades": [
      "초",
      "중",
      "고"
    ],
    "regions": [
      "경기",
      "대구",
      "대전",
      "부산",
      "서울",
      "온라인",
      "충남"
    ],
    "category": "과학·SW·창의",
    "start": "2026-06-26",
    "deadline": "2026-07-08",
    "dday": -114,
    "status": "접수중",
    "prize": null,
    "free": true,
    "officialUrl": "https://forms.gle/dc5Z6rcvGm4MDRWY6",
    "summary": "[디지털 마케터] 실무 경험 60일 완성, 데마완 서포터즈 23기 모집 후보입니다. 참가대상·마감일·접수방법은 기관 원본 공고에서 확인하세요.",
    "conflict": false,
    "academyRecommendation": {
      "subjectTags": [
        "과학",
        "코딩/SW"
      ],
      "careerTags": [
        "이공계",
        "IT/SW"
      ],
      "useCaseTags": [
        "수업연계",
        "결과물있음",
        "학부모안내",
        "개별추천",
        "심화도전"
      ],
      "confidence": "높음",
      "confidenceScore": 92,
      "reasons": [
        "과학·코딩/SW 수업과 연결해 학생별 결과물 제작 과제로 활용할 수 있습니다.",
        "기관 원본 공고가 확인되어 학부모 안내 자료로 사용하기 전 검토 부담이 낮습니다.",
        "준비 부담이 있는 산출물 또는 전문 분야 단서가 있어 관심 학생의 심화 프로젝트 후보로 적합합니다."
      ],
      "evidence": [
        "참가대상: 초·중·고",
        "분야: 과학·SW·창의",
        "마감까지 -114일",
        "지역/방식: 전국 또는 온라인",
        "참가비: 무료",
        "기관 원본 공고 확인"
      ],
      "warnings": [
        "제출 형식은 원본 공고에서 확인 필요"
      ],
      "programIdeas": [
        "SW 심화반 문제풀이 또는 미니 프로젝트"
      ]
    }
  },
  {
    "id": "contestkorea-202606190050",
    "title": "2026 대한민국 펫캉스",
    "organizer": "원본 확인 필요",
    "grades": [
      "초",
      "중",
      "고"
    ],
    "regions": [
      "경기",
      "대구",
      "대전",
      "부산",
      "서울",
      "온라인",
      "충남"
    ],
    "category": "과학·SW·창의",
    "start": "2026-07-10",
    "deadline": "2026-07-10",
    "dday": -112,
    "status": "접수예정",
    "prize": null,
    "free": true,
    "officialUrl": "https://www.ticketlink.co.kr/product/63372",
    "summary": "2026 대한민국 펫캉스 후보입니다. 참가대상·마감일·접수방법은 기관 원본 공고에서 확인하세요.",
    "conflict": false,
    "academyRecommendation": {
      "subjectTags": [
        "과학",
        "코딩/SW"
      ],
      "careerTags": [
        "이공계",
        "IT/SW"
      ],
      "useCaseTags": [
        "수업연계",
        "결과물있음",
        "학부모안내",
        "개별추천",
        "심화도전"
      ],
      "confidence": "높음",
      "confidenceScore": 92,
      "reasons": [
        "과학·코딩/SW 수업과 연결해 학생별 결과물 제작 과제로 활용할 수 있습니다.",
        "기관 원본 공고가 확인되어 학부모 안내 자료로 사용하기 전 검토 부담이 낮습니다.",
        "준비 부담이 있는 산출물 또는 전문 분야 단서가 있어 관심 학생의 심화 프로젝트 후보로 적합합니다."
      ],
      "evidence": [
        "참가대상: 초·중·고",
        "분야: 과학·SW·창의",
        "마감까지 -112일",
        "지역/방식: 전국 또는 온라인",
        "참가비: 무료",
        "기관 원본 공고 확인"
      ],
      "warnings": [
        "제출 형식은 원본 공고에서 확인 필요"
      ],
      "programIdeas": [
        "SW 심화반 문제풀이 또는 미니 프로젝트"
      ]
    }
  },
  {
    "id": "allcon-538987",
    "title": "2026 세종문화아카데미 서포터즈 모집",
    "organizer": "원본 확인 필요",
    "grades": [
      "중",
      "고"
    ],
    "regions": [
      "서울",
      "세종"
    ],
    "category": "과학·SW·창의",
    "start": "2026-06-22",
    "deadline": "2026-07-10",
    "dday": -112,
    "status": "접수중",
    "prize": null,
    "free": true,
    "officialUrl": "https://forms.gle/WzkL5Gvber7TQxZ27",
    "summary": "2026 세종문화아카데미 서포터즈 모집 후보입니다. 참가대상·마감일·접수방법은 기관 원본 공고에서 확인하세요.",
    "conflict": true,
    "academyRecommendation": {
      "subjectTags": [
        "과학",
        "코딩/SW"
      ],
      "careerTags": [
        "이공계",
        "IT/SW"
      ],
      "useCaseTags": [
        "수업연계",
        "결과물있음",
        "개별추천",
        "심화도전"
      ],
      "confidence": "중간",
      "confidenceScore": 75,
      "reasons": [
        "과학·코딩/SW 수업과 연결해 학생별 결과물 제작 과제로 활용할 수 있습니다.",
        "준비 부담이 있는 산출물 또는 전문 분야 단서가 있어 관심 학생의 심화 프로젝트 후보로 적합합니다."
      ],
      "evidence": [
        "참가대상: 중·고",
        "분야: 과학·SW·창의",
        "마감까지 -112일",
        "지역: 서울·세종",
        "참가비: 무료"
      ],
      "warnings": [
        "기관 원본 링크 또는 검수상태 확인 필요",
        "제출 형식은 원본 공고에서 확인 필요"
      ],
      "programIdeas": [
        "SW 심화반 문제풀이 또는 미니 프로젝트"
      ]
    }
  },
  {
    "id": "contestkorea-202606240006",
    "title": "춘천인형극제 홍보 서포터즈 코코메이트 3기",
    "organizer": "원본 확인 필요",
    "grades": [
      "초",
      "중",
      "고"
    ],
    "regions": [
      "경기",
      "대구",
      "대전",
      "부산",
      "서울",
      "온라인",
      "충남"
    ],
    "category": "과학·SW·창의",
    "start": "2026-06-17",
    "deadline": "2026-07-11",
    "dday": -111,
    "status": "접수중",
    "prize": null,
    "free": true,
    "officialUrl": "https://forms.gle/7skWeUBxq5Q683HW7",
    "summary": "춘천인형극제 홍보 서포터즈 코코메이트 3기 후보입니다. 참가대상·마감일·접수방법은 기관 원본 공고에서 확인하세요.",
    "conflict": false,
    "academyRecommendation": {
      "subjectTags": [
        "과학",
        "코딩/SW"
      ],
      "careerTags": [
        "이공계",
        "IT/SW"
      ],
      "useCaseTags": [
        "수업연계",
        "결과물있음",
        "학부모안내",
        "개별추천",
        "심화도전"
      ],
      "confidence": "높음",
      "confidenceScore": 92,
      "reasons": [
        "과학·코딩/SW 수업과 연결해 학생별 결과물 제작 과제로 활용할 수 있습니다.",
        "기관 원본 공고가 확인되어 학부모 안내 자료로 사용하기 전 검토 부담이 낮습니다.",
        "준비 부담이 있는 산출물 또는 전문 분야 단서가 있어 관심 학생의 심화 프로젝트 후보로 적합합니다."
      ],
      "evidence": [
        "참가대상: 초·중·고",
        "분야: 과학·SW·창의",
        "마감까지 -111일",
        "지역/방식: 전국 또는 온라인",
        "참가비: 무료",
        "기관 원본 공고 확인"
      ],
      "warnings": [
        "제출 형식은 원본 공고에서 확인 필요"
      ],
      "programIdeas": [
        "SW 심화반 문제풀이 또는 미니 프로젝트"
      ]
    }
  },
  {
    "id": "contestkorea-202603270033",
    "title": "제8회 유니버설디자인 국제 아이디어 대전",
    "organizer": "원본 확인 필요",
    "grades": [
      "초",
      "중",
      "고"
    ],
    "regions": [
      "강원",
      "경기",
      "대구",
      "대전",
      "부산",
      "서울",
      "온라인",
      "충남"
    ],
    "category": "과학·SW·창의",
    "start": "2026-03-19",
    "deadline": "2026-07-13",
    "dday": -109,
    "status": "마감",
    "prize": null,
    "free": true,
    "officialUrl": "https://www.koddi.or.kr/ud/sub2_1",
    "summary": "제8회 유니버설디자인 국제 아이디어 대전 후보입니다. 참가대상·마감일·접수방법은 기관 원본 공고에서 확인하세요.",
    "conflict": false,
    "academyRecommendation": {
      "subjectTags": [
        "과학",
        "코딩/SW",
        "미술/디자인",
        "진로/경제"
      ],
      "careerTags": [
        "이공계",
        "IT/SW"
      ],
      "useCaseTags": [
        "수업연계",
        "결과물있음",
        "학부모안내",
        "심화도전"
      ],
      "confidence": "높음",
      "confidenceScore": 100,
      "reasons": [
        "과학·코딩/SW 수업과 연결해 학생별 결과물 제작 과제로 활용할 수 있습니다.",
        "기관 원본 공고가 확인되어 학부모 안내 자료로 사용하기 전 검토 부담이 낮습니다.",
        "준비 부담이 있는 산출물 또는 전문 분야 단서가 있어 관심 학생의 심화 프로젝트 후보로 적합합니다."
      ],
      "evidence": [
        "참가대상: 초·중·고",
        "분야: 과학·SW·창의",
        "마감까지 -109일",
        "지역/방식: 전국 또는 온라인",
        "참가비: 무료",
        "기관 원본 공고 확인"
      ],
      "warnings": [],
      "programIdeas": [
        "SW 심화반 문제풀이 또는 미니 프로젝트",
        "포스터·웹툰·디자인 작품 제작 특강",
        "아이디어 발굴과 발표자료 제작 진로 프로젝트"
      ]
    }
  },
  {
    "id": "contestkorea-202606250050",
    "title": "패딧 의류 제작 콘테스트 : FADDIT CREATOR CREW 패크크 1기 모집",
    "organizer": "원본 확인 필요",
    "grades": [
      "초",
      "중",
      "고"
    ],
    "regions": [
      "강원",
      "경기",
      "대구",
      "대전",
      "부산",
      "서울",
      "온라인",
      "충남"
    ],
    "category": "과학·SW·창의",
    "start": "2026-06-25",
    "deadline": "2026-07-13",
    "dday": -109,
    "status": "접수중",
    "prize": null,
    "free": true,
    "officialUrl": "https://airtable.com/appqx6KZd2e3ytizl/paglBjmK3htrYG8rI/form",
    "summary": "패딧 의류 제작 콘테스트 : FADDIT CREATOR CREW 패크크 1기 모집 후보입니다. 참가대상·마감일·접수방법은 기관 원본 공고에서 확인하세요.",
    "conflict": false,
    "academyRecommendation": {
      "subjectTags": [
        "과학",
        "코딩/SW"
      ],
      "careerTags": [
        "이공계",
        "IT/SW"
      ],
      "useCaseTags": [
        "수업연계",
        "결과물있음",
        "학부모안내",
        "개별추천",
        "심화도전"
      ],
      "confidence": "높음",
      "confidenceScore": 92,
      "reasons": [
        "과학·코딩/SW 수업과 연결해 학생별 결과물 제작 과제로 활용할 수 있습니다.",
        "기관 원본 공고가 확인되어 학부모 안내 자료로 사용하기 전 검토 부담이 낮습니다.",
        "준비 부담이 있는 산출물 또는 전문 분야 단서가 있어 관심 학생의 심화 프로젝트 후보로 적합합니다."
      ],
      "evidence": [
        "참가대상: 초·중·고",
        "분야: 과학·SW·창의",
        "마감까지 -109일",
        "지역/방식: 전국 또는 온라인",
        "참가비: 무료",
        "기관 원본 공고 확인"
      ],
      "warnings": [
        "제출 형식은 원본 공고에서 확인 필요"
      ],
      "programIdeas": [
        "SW 심화반 문제풀이 또는 미니 프로젝트"
      ]
    }
  },
  {
    "id": "contestkorea-202606250011",
    "title": "CINE-YOUTH (청소년단편영화제작프로그램) 청소년 멘티 모집",
    "organizer": "원본 확인 필요",
    "grades": [
      "초",
      "중",
      "고"
    ],
    "regions": [
      "경기",
      "대구",
      "대전",
      "부산",
      "서울",
      "온라인",
      "충남"
    ],
    "category": "과학·SW·창의",
    "start": "2026-05-27",
    "deadline": "2026-07-15",
    "dday": -107,
    "status": "접수중",
    "prize": null,
    "free": true,
    "officialUrl": "https://docs.google.com/forms/d/1poWYv3exPG_75gnljwYrdBkaja1-Ve0H6vo9fFPaoUs/edit",
    "summary": "CINE-YOUTH (청소년단편영화제작프로그램) 청소년 멘티 모집 후보입니다. 참가대상·마감일·접수방법은 기관 원본 공고에서 확인하세요.",
    "conflict": false,
    "academyRecommendation": {
      "subjectTags": [
        "과학",
        "코딩/SW"
      ],
      "careerTags": [
        "이공계",
        "IT/SW"
      ],
      "useCaseTags": [
        "수업연계",
        "결과물있음",
        "학부모안내",
        "개별추천",
        "심화도전"
      ],
      "confidence": "높음",
      "confidenceScore": 92,
      "reasons": [
        "과학·코딩/SW 수업과 연결해 학생별 결과물 제작 과제로 활용할 수 있습니다.",
        "기관 원본 공고가 확인되어 학부모 안내 자료로 사용하기 전 검토 부담이 낮습니다.",
        "준비 부담이 있는 산출물 또는 전문 분야 단서가 있어 관심 학생의 심화 프로젝트 후보로 적합합니다."
      ],
      "evidence": [
        "참가대상: 초·중·고",
        "분야: 과학·SW·창의",
        "마감까지 -107일",
        "지역/방식: 전국 또는 온라인",
        "참가비: 무료",
        "기관 원본 공고 확인"
      ],
      "warnings": [
        "제출 형식은 원본 공고에서 확인 필요"
      ],
      "programIdeas": [
        "SW 심화반 문제풀이 또는 미니 프로젝트"
      ]
    }
  },
  {
    "id": "wevity-108572",
    "title": "2026년 대전광역시 생명사랑 숏폼 영상 공모전",
    "organizer": "대전광역자살예방센터",
    "grades": [
      "중",
      "고"
    ],
    "regions": [
      "대전"
    ],
    "category": "미술·디자인·영상",
    "start": "2026-06-22",
    "deadline": "2026-07-17",
    "dday": -105,
    "status": "접수중",
    "prize": "70만원",
    "free": true,
    "officialUrl": "https://djpmhc.or.kr/notice/1150",
    "summary": "대전광역자살예방센터 주최. 참가대상 고등·중등. 대상지역 대전. 자세한 내용은 기관 원본 공고 확인.",
    "conflict": false,
    "academyRecommendation": {
      "subjectTags": [
        "미술/디자인",
        "영상/미디어",
        "국어/논술",
        "과학"
      ],
      "careerTags": [
        "디자인",
        "미디어"
      ],
      "useCaseTags": [
        "수업연계",
        "결과물있음",
        "학부모안내",
        "개별추천",
        "심화도전"
      ],
      "confidence": "높음",
      "confidenceScore": 97,
      "reasons": [
        "미술/디자인·영상/미디어 수업과 연결해 학생별 결과물 제작 과제로 활용할 수 있습니다.",
        "기관 원본 공고가 확인되어 학부모 안내 자료로 사용하기 전 검토 부담이 낮습니다.",
        "준비 부담이 있는 산출물 또는 전문 분야 단서가 있어 관심 학생의 심화 프로젝트 후보로 적합합니다."
      ],
      "evidence": [
        "참가대상: 중·고",
        "분야: 미술·디자인·영상",
        "마감까지 -105일",
        "지역: 대전",
        "참가비: 무료",
        "기관 원본 공고 확인"
      ],
      "warnings": [],
      "programIdeas": [
        "독서·글쓰기 수업의 2~4주 결과물 프로젝트",
        "포스터·웹툰·디자인 작품 제작 특강",
        "기획안 작성부터 촬영·편집까지 이어지는 영상 제작 특강"
      ]
    }
  },
  {
    "id": "wevity-108532",
    "title": "CNDC 혁신 AI 아이디어 제안 공모전",
    "organizer": "충청남도개발공사",
    "grades": [
      "중",
      "고"
    ],
    "regions": [
      "충남"
    ],
    "category": "과학·SW·창의",
    "start": "2026-06-22",
    "deadline": "2026-07-17",
    "dday": -105,
    "status": "접수중",
    "prize": "100만원",
    "free": true,
    "officialUrl": "https://www.cndc.kr/bbs/view.do?pstSn=26064433",
    "summary": "충청남도개발공사 주최. 참가대상 고등·중등. 대상지역 충남. 자세한 내용은 기관 원본 공고 확인.",
    "conflict": false,
    "academyRecommendation": {
      "subjectTags": [
        "과학",
        "코딩/SW",
        "진로/경제"
      ],
      "careerTags": [
        "이공계",
        "IT/SW"
      ],
      "useCaseTags": [
        "수업연계",
        "결과물있음",
        "학부모안내",
        "심화도전"
      ],
      "confidence": "높음",
      "confidenceScore": 97,
      "reasons": [
        "과학·코딩/SW 수업과 연결해 학생별 결과물 제작 과제로 활용할 수 있습니다.",
        "기관 원본 공고가 확인되어 학부모 안내 자료로 사용하기 전 검토 부담이 낮습니다.",
        "준비 부담이 있는 산출물 또는 전문 분야 단서가 있어 관심 학생의 심화 프로젝트 후보로 적합합니다."
      ],
      "evidence": [
        "참가대상: 중·고",
        "분야: 과학·SW·창의",
        "마감까지 -105일",
        "지역: 충남",
        "참가비: 무료",
        "기관 원본 공고 확인"
      ],
      "warnings": [],
      "programIdeas": [
        "SW 심화반 문제풀이 또는 미니 프로젝트",
        "아이디어 발굴과 발표자료 제작 진로 프로젝트"
      ]
    }
  },
  {
    "id": "wevity-108510",
    "title": "KBHR 뷰티 페스타 공모전 2026",
    "organizer": "한국뷰티인적자원연구협회",
    "grades": [
      "중",
      "고"
    ],
    "regions": [
      "전국"
    ],
    "category": "미술·디자인·영상",
    "start": "2026-05-20",
    "deadline": "2026-07-19",
    "dday": -103,
    "status": "접수중",
    "prize": "다양한 혜택",
    "free": true,
    "officialUrl": "https://kbhr.or.kr/bbs/board.php?bo_table=B18",
    "summary": "한국뷰티인적자원연구협회 주최. 참가대상 고등·중등. 대상지역 전국. 자세한 내용은 기관 원본 공고 확인.",
    "conflict": true,
    "academyRecommendation": {
      "subjectTags": [
        "미술/디자인",
        "영상/미디어"
      ],
      "careerTags": [
        "디자인",
        "미디어"
      ],
      "useCaseTags": [
        "수업연계",
        "결과물있음",
        "개별추천",
        "심화도전"
      ],
      "confidence": "높음",
      "confidenceScore": 86,
      "reasons": [
        "미술/디자인·영상/미디어 수업과 연결해 학생별 결과물 제작 과제로 활용할 수 있습니다.",
        "준비 부담이 있는 산출물 또는 전문 분야 단서가 있어 관심 학생의 심화 프로젝트 후보로 적합합니다."
      ],
      "evidence": [
        "참가대상: 중·고",
        "분야: 미술·디자인·영상",
        "마감까지 -103일",
        "지역/방식: 전국 또는 온라인",
        "참가비: 무료",
        "제출물 단서: 영상/SW/보고서/창업 등 준비 부담 가능"
      ],
      "warnings": [
        "기관 원본 링크 또는 검수상태 확인 필요"
      ],
      "programIdeas": [
        "포스터·웹툰·디자인 작품 제작 특강",
        "기획안 작성부터 촬영·편집까지 이어지는 영상 제작 특강"
      ]
    }
  },
  {
    "id": "wevity-107947",
    "title": "넥슨 영 프로그래머스 컵 (NEXON Young Programmers Cup) SPECIAL",
    "organizer": "넥슨",
    "grades": [
      "중",
      "고"
    ],
    "regions": [
      "전국"
    ],
    "category": "과학·SW·창의",
    "start": "2026-06-04",
    "deadline": "2026-07-19",
    "dday": -103,
    "status": "접수중",
    "prize": "1,000만원",
    "free": true,
    "officialUrl": "https://vo.la/7ADCFZZ",
    "summary": "넥슨 주최. 참가대상 고등·중등. 대상지역 전국. 자세한 내용은 기관 원본 공고 확인.",
    "conflict": true,
    "academyRecommendation": {
      "subjectTags": [
        "과학",
        "코딩/SW"
      ],
      "careerTags": [
        "이공계",
        "IT/SW"
      ],
      "useCaseTags": [
        "수업연계",
        "결과물있음",
        "개별추천",
        "심화도전"
      ],
      "confidence": "높음",
      "confidenceScore": 86,
      "reasons": [
        "과학·코딩/SW 수업과 연결해 학생별 결과물 제작 과제로 활용할 수 있습니다.",
        "준비 부담이 있는 산출물 또는 전문 분야 단서가 있어 관심 학생의 심화 프로젝트 후보로 적합합니다."
      ],
      "evidence": [
        "참가대상: 중·고",
        "분야: 과학·SW·창의",
        "마감까지 -103일",
        "지역/방식: 전국 또는 온라인",
        "참가비: 무료",
        "제출물 단서: 영상/SW/보고서/창업 등 준비 부담 가능"
      ],
      "warnings": [
        "기관 원본 링크 또는 검수상태 확인 필요"
      ],
      "programIdeas": [
        "SW 심화반 문제풀이 또는 미니 프로젝트"
      ]
    }
  },
  {
    "id": "wevity-108591",
    "title": "제 3회 2025 K-키니어 아트 작품 공모전 신규",
    "organizer": "K-키니어 아트 연구원 / 경희대학교 미술대학",
    "grades": [
      "초",
      "중",
      "고"
    ],
    "regions": [
      "전국"
    ],
    "category": "미술·디자인·영상",
    "start": "2026-06-22",
    "deadline": "2026-07-20",
    "dday": -102,
    "status": "접수중",
    "prize": "다양한 혜택",
    "free": true,
    "officialUrl": "https://k-kinior.cargo.site/",
    "summary": "K-키니어 아트 연구원 주최. 참가대상 고등·중등·초등. 대상지역 전국. 자세한 내용은 기관 원본 공고 확인.",
    "conflict": false,
    "academyRecommendation": {
      "subjectTags": [
        "미술/디자인",
        "영상/미디어"
      ],
      "careerTags": [
        "디자인",
        "미디어"
      ],
      "useCaseTags": [
        "수업연계",
        "결과물있음",
        "학부모안내",
        "단체참여",
        "개별추천",
        "심화도전"
      ],
      "confidence": "높음",
      "confidenceScore": 100,
      "reasons": [
        "미술/디자인·영상/미디어 수업과 연결해 학생별 결과물 제작 과제로 활용할 수 있습니다.",
        "기관 원본 공고가 확인되어 학부모 안내 자료로 사용하기 전 검토 부담이 낮습니다.",
        "준비 부담이 있는 산출물 또는 전문 분야 단서가 있어 관심 학생의 심화 프로젝트 후보로 적합합니다."
      ],
      "evidence": [
        "참가대상: 초·중·고",
        "분야: 미술·디자인·영상",
        "마감까지 -102일",
        "지역/방식: 전국 또는 온라인",
        "참가비: 무료",
        "기관 원본 공고 확인"
      ],
      "warnings": [],
      "programIdeas": [
        "포스터·웹툰·디자인 작품 제작 특강",
        "기획안 작성부터 촬영·편집까지 이어지는 영상 제작 특강"
      ]
    }
  },
  {
    "id": "wevity-108402",
    "title": "제5회 장한상 수상자 스토리 창작물 공모",
    "organizer": "(사)장보고글로벌재단 / 장보고한상 수상자 협의회",
    "grades": [
      "초",
      "중",
      "고"
    ],
    "regions": [
      "전국"
    ],
    "category": "글쓰기·독서",
    "start": "2026-06-15",
    "deadline": "2026-07-24",
    "dday": -98,
    "status": "접수중",
    "prize": "3천만원~1천만원",
    "free": true,
    "officialUrl": "https://www.changpogo.net/",
    "summary": "(사)장보고글로벌재단 주최. 참가대상 고등·중등·초등. 대상지역 전국. 자세한 내용은 기관 원본 공고 확인.",
    "conflict": false,
    "academyRecommendation": {
      "subjectTags": [
        "국어/논술"
      ],
      "careerTags": [
        "인문사회"
      ],
      "useCaseTags": [
        "수업연계",
        "결과물있음",
        "학부모안내",
        "개별추천"
      ],
      "confidence": "높음",
      "confidenceScore": 100,
      "reasons": [
        "국어/논술 수업과 연결해 학생별 결과물 제작 과제로 활용할 수 있습니다.",
        "기관 원본 공고가 확인되어 학부모 안내 자료로 사용하기 전 검토 부담이 낮습니다."
      ],
      "evidence": [
        "참가대상: 초·중·고",
        "분야: 글쓰기·독서",
        "마감까지 -98일",
        "지역/방식: 전국 또는 온라인",
        "참가비: 무료",
        "기관 원본 공고 확인"
      ],
      "warnings": [],
      "programIdeas": [
        "독서·글쓰기 수업의 2~4주 결과물 프로젝트"
      ]
    }
  },
  {
    "id": "contestkorea-202604170072",
    "title": "대교 50주년 사진 공모전 - 당신을 배웁니다",
    "organizer": "원본 확인 필요",
    "grades": [
      "초",
      "중",
      "고"
    ],
    "regions": [
      "강원",
      "경기",
      "대구",
      "대전",
      "부산",
      "서울",
      "온라인",
      "충남"
    ],
    "category": "과학·SW·창의",
    "start": "2026-04-27",
    "deadline": "2026-07-27",
    "dday": -95,
    "status": "마감",
    "prize": null,
    "free": true,
    "officialUrl": "https://member.daekyo.com/auth/login?client_id=W6GlNfkLRfrdYW9AKTvNwvMrY0Cl-AoG-wIhnOja-p8",
    "summary": "대교 50주년 사진 공모전 - 당신을 배웁니다 후보입니다. 참가대상·마감일·접수방법은 기관 원본 공고에서 확인하세요.",
    "conflict": false,
    "academyRecommendation": {
      "subjectTags": [
        "과학",
        "코딩/SW",
        "영상/미디어"
      ],
      "careerTags": [
        "이공계",
        "IT/SW",
        "미디어"
      ],
      "useCaseTags": [
        "수업연계",
        "결과물있음",
        "학부모안내",
        "심화도전"
      ],
      "confidence": "높음",
      "confidenceScore": 100,
      "reasons": [
        "과학·코딩/SW 수업과 연결해 학생별 결과물 제작 과제로 활용할 수 있습니다.",
        "기관 원본 공고가 확인되어 학부모 안내 자료로 사용하기 전 검토 부담이 낮습니다.",
        "준비 부담이 있는 산출물 또는 전문 분야 단서가 있어 관심 학생의 심화 프로젝트 후보로 적합합니다."
      ],
      "evidence": [
        "참가대상: 초·중·고",
        "분야: 과학·SW·창의",
        "마감까지 -95일",
        "지역/방식: 전국 또는 온라인",
        "참가비: 무료",
        "기관 원본 공고 확인"
      ],
      "warnings": [],
      "programIdeas": [
        "SW 심화반 문제풀이 또는 미니 프로젝트",
        "기획안 작성부터 촬영·편집까지 이어지는 영상 제작 특강"
      ]
    }
  },
  {
    "id": "wevity-108362",
    "title": "제13회 안전한 학교 공모전",
    "organizer": "학교안전공제중앙회",
    "grades": [
      "초",
      "중",
      "고"
    ],
    "regions": [
      "전국"
    ],
    "category": "미술·디자인·영상",
    "start": "2026-06-17",
    "deadline": "2026-07-27",
    "dday": -95,
    "status": "접수중",
    "prize": "200만원",
    "free": true,
    "officialUrl": "https://www.안전한학교공모전.com",
    "summary": "학교안전공제중앙회 주최. 참가대상 고등·중등·초등. 대상지역 전국. 자세한 내용은 기관 원본 공고 확인.",
    "conflict": true,
    "academyRecommendation": {
      "subjectTags": [
        "미술/디자인",
        "영상/미디어"
      ],
      "careerTags": [
        "디자인",
        "미디어"
      ],
      "useCaseTags": [
        "수업연계",
        "결과물있음",
        "단체참여",
        "개별추천",
        "심화도전"
      ],
      "confidence": "높음",
      "confidenceScore": 86,
      "reasons": [
        "미술/디자인·영상/미디어 수업과 연결해 학생별 결과물 제작 과제로 활용할 수 있습니다.",
        "준비 부담이 있는 산출물 또는 전문 분야 단서가 있어 관심 학생의 심화 프로젝트 후보로 적합합니다."
      ],
      "evidence": [
        "참가대상: 초·중·고",
        "분야: 미술·디자인·영상",
        "마감까지 -95일",
        "지역/방식: 전국 또는 온라인",
        "참가비: 무료",
        "제출물 단서: 영상/SW/보고서/창업 등 준비 부담 가능"
      ],
      "warnings": [
        "기관 원본 링크 또는 검수상태 확인 필요"
      ],
      "programIdeas": [
        "포스터·웹툰·디자인 작품 제작 특강",
        "기획안 작성부터 촬영·편집까지 이어지는 영상 제작 특강"
      ]
    }
  },
  {
    "id": "wevity-108580",
    "title": "2026 정화 뷰티 온라인 공모전 (고등학생 대상)",
    "organizer": "정화예술대학교 / 뷰티예술학부",
    "grades": [
      "고"
    ],
    "regions": [
      "온라인",
      "전국"
    ],
    "category": "미술·디자인·영상",
    "start": "2026-07-01",
    "deadline": "2026-07-30",
    "dday": -92,
    "status": "접수예정",
    "prize": "다양한 혜택",
    "free": true,
    "officialUrl": "https://jb.ac.kr/?m1=page_board_detail%25&menu_id=424%25&board_content_id=401821%25",
    "summary": "정화예술대학교 주최. 참가대상 고등. 대상지역 온라인·전국. 자세한 내용은 기관 원본 공고 확인.",
    "conflict": false,
    "academyRecommendation": {
      "subjectTags": [
        "미술/디자인",
        "영상/미디어"
      ],
      "careerTags": [
        "디자인",
        "미디어"
      ],
      "useCaseTags": [
        "수업연계",
        "결과물있음",
        "학부모안내",
        "단체참여",
        "개별추천",
        "심화도전"
      ],
      "confidence": "높음",
      "confidenceScore": 100,
      "reasons": [
        "미술/디자인·영상/미디어 수업과 연결해 학생별 결과물 제작 과제로 활용할 수 있습니다.",
        "기관 원본 공고가 확인되어 학부모 안내 자료로 사용하기 전 검토 부담이 낮습니다.",
        "준비 부담이 있는 산출물 또는 전문 분야 단서가 있어 관심 학생의 심화 프로젝트 후보로 적합합니다."
      ],
      "evidence": [
        "참가대상: 고",
        "분야: 미술·디자인·영상",
        "마감까지 -92일",
        "지역/방식: 전국 또는 온라인",
        "참가비: 무료",
        "기관 원본 공고 확인"
      ],
      "warnings": [],
      "programIdeas": [
        "포스터·웹툰·디자인 작품 제작 특강",
        "기획안 작성부터 촬영·편집까지 이어지는 영상 제작 특강"
      ]
    }
  },
  {
    "id": "wevity-108581",
    "title": "[정화예술대학교] 2026 정화만화경 웹툰 공모전 (고교생) 신규",
    "organizer": "정화예술대학교 / 웹툰애니메이션전공",
    "grades": [
      "고"
    ],
    "regions": [
      "전국"
    ],
    "category": "과학·SW·창의",
    "start": "2026-07-01",
    "deadline": "2026-07-30",
    "dday": -92,
    "status": "접수예정",
    "prize": "다양한 혜택",
    "free": true,
    "officialUrl": "https://jb.ac.kr/?m1=page_board_detail%25&menu_id=424%25&board_content_id=401825%25",
    "summary": "정화예술대학교 주최. 참가대상 고등. 대상지역 전국. 자세한 내용은 기관 원본 공고 확인.",
    "conflict": false,
    "academyRecommendation": {
      "subjectTags": [
        "과학",
        "코딩/SW",
        "미술/디자인"
      ],
      "careerTags": [
        "이공계",
        "IT/SW"
      ],
      "useCaseTags": [
        "수업연계",
        "결과물있음",
        "학부모안내",
        "단체참여",
        "개별추천",
        "심화도전"
      ],
      "confidence": "높음",
      "confidenceScore": 100,
      "reasons": [
        "과학·코딩/SW 수업과 연결해 학생별 결과물 제작 과제로 활용할 수 있습니다.",
        "기관 원본 공고가 확인되어 학부모 안내 자료로 사용하기 전 검토 부담이 낮습니다.",
        "준비 부담이 있는 산출물 또는 전문 분야 단서가 있어 관심 학생의 심화 프로젝트 후보로 적합합니다."
      ],
      "evidence": [
        "참가대상: 고",
        "분야: 과학·SW·창의",
        "마감까지 -92일",
        "지역/방식: 전국 또는 온라인",
        "참가비: 무료",
        "기관 원본 공고 확인"
      ],
      "warnings": [],
      "programIdeas": [
        "SW 심화반 문제풀이 또는 미니 프로젝트",
        "포스터·웹툰·디자인 작품 제작 특강"
      ]
    }
  },
  {
    "id": "wevity-108501",
    "title": "2026 유쓰 AI 쇼츠 페스티벌",
    "organizer": "LG유플러스",
    "grades": [
      "중",
      "고"
    ],
    "regions": [
      "전국"
    ],
    "category": "과학·SW·창의",
    "start": "2026-06-08",
    "deadline": "2026-07-31",
    "dday": -91,
    "status": "접수중",
    "prize": "다양한 혜택",
    "free": true,
    "officialUrl": "https://www.lguplus.com/uth",
    "summary": "LG유플러스 주최. 참가대상 고등·중등. 대상지역 전국. 자세한 내용은 기관 원본 공고 확인.",
    "conflict": false,
    "academyRecommendation": {
      "subjectTags": [
        "과학",
        "코딩/SW"
      ],
      "careerTags": [
        "이공계",
        "IT/SW"
      ],
      "useCaseTags": [
        "수업연계",
        "결과물있음",
        "학부모안내",
        "개별추천",
        "심화도전"
      ],
      "confidence": "높음",
      "confidenceScore": 92,
      "reasons": [
        "과학·코딩/SW 수업과 연결해 학생별 결과물 제작 과제로 활용할 수 있습니다.",
        "기관 원본 공고가 확인되어 학부모 안내 자료로 사용하기 전 검토 부담이 낮습니다.",
        "준비 부담이 있는 산출물 또는 전문 분야 단서가 있어 관심 학생의 심화 프로젝트 후보로 적합합니다."
      ],
      "evidence": [
        "참가대상: 중·고",
        "분야: 과학·SW·창의",
        "마감까지 -91일",
        "지역/방식: 전국 또는 온라인",
        "참가비: 무료",
        "기관 원본 공고 확인"
      ],
      "warnings": [
        "제출 형식은 원본 공고에서 확인 필요"
      ],
      "programIdeas": [
        "SW 심화반 문제풀이 또는 미니 프로젝트"
      ]
    }
  },
  {
    "id": "contestkorea-202606010096",
    "title": "2026 전국 고교 웹소설 슈퍼루키전 공모전",
    "organizer": "원본 확인 필요",
    "grades": [
      "초",
      "중",
      "고"
    ],
    "regions": [
      "강원",
      "경기",
      "대구",
      "대전",
      "부산",
      "서울",
      "온라인",
      "충남"
    ],
    "category": "과학·SW·창의",
    "start": "2026-06-01",
    "deadline": "2026-07-31",
    "dday": -91,
    "status": "접수중",
    "prize": null,
    "free": true,
    "officialUrl": "https://www.gling.co.kr/contest/detail/SUPERROOKIE2026/?utm_source=contestkorea&utm_campaign=20260511_contest&utm_medium=community_post",
    "summary": "2026 전국 고교 웹소설 슈퍼루키전 공모전 후보입니다. 참가대상·마감일·접수방법은 기관 원본 공고에서 확인하세요.",
    "conflict": true,
    "academyRecommendation": {
      "subjectTags": [
        "과학",
        "코딩/SW"
      ],
      "careerTags": [
        "이공계",
        "IT/SW"
      ],
      "useCaseTags": [
        "수업연계",
        "결과물있음",
        "개별추천",
        "심화도전"
      ],
      "confidence": "중간",
      "confidenceScore": 78,
      "reasons": [
        "과학·코딩/SW 수업과 연결해 학생별 결과물 제작 과제로 활용할 수 있습니다.",
        "준비 부담이 있는 산출물 또는 전문 분야 단서가 있어 관심 학생의 심화 프로젝트 후보로 적합합니다."
      ],
      "evidence": [
        "참가대상: 초·중·고",
        "분야: 과학·SW·창의",
        "마감까지 -91일",
        "지역/방식: 전국 또는 온라인",
        "참가비: 무료"
      ],
      "warnings": [
        "기관 원본 링크 또는 검수상태 확인 필요",
        "제출 형식은 원본 공고에서 확인 필요"
      ],
      "programIdeas": [
        "SW 심화반 문제풀이 또는 미니 프로젝트"
      ]
    }
  },
  {
    "id": "wevity-106999",
    "title": "2026 제15회 협성독서왕 독후감 공모전 SPECIAL IDEA",
    "organizer": "협성문화재단•북두칠성도서관",
    "grades": [
      "초",
      "중",
      "고"
    ],
    "regions": [
      "전국"
    ],
    "category": "글쓰기·독서",
    "start": "2026-07-01",
    "deadline": "2026-07-31",
    "dday": -91,
    "status": "접수예정",
    "prize": "500만원",
    "free": true,
    "officialUrl": "https://hscf.co.kr/kor/sub6_01.php?wr_id=15789",
    "summary": "협성문화재단•북두칠성도서관 주최. 참가대상 고등·중등·초등. 대상지역 전국. 자세한 내용은 기관 원본 공고 확인.",
    "conflict": false,
    "academyRecommendation": {
      "subjectTags": [
        "국어/논술"
      ],
      "careerTags": [
        "인문사회"
      ],
      "useCaseTags": [
        "수업연계",
        "결과물있음",
        "학부모안내",
        "개별추천"
      ],
      "confidence": "높음",
      "confidenceScore": 100,
      "reasons": [
        "국어/논술 수업과 연결해 학생별 결과물 제작 과제로 활용할 수 있습니다.",
        "기관 원본 공고가 확인되어 학부모 안내 자료로 사용하기 전 검토 부담이 낮습니다."
      ],
      "evidence": [
        "참가대상: 초·중·고",
        "분야: 글쓰기·독서",
        "마감까지 -91일",
        "지역/방식: 전국 또는 온라인",
        "참가비: 무료",
        "기관 원본 공고 확인"
      ],
      "warnings": [],
      "programIdeas": [
        "독서·글쓰기 수업의 2~4주 결과물 프로젝트"
      ]
    }
  },
  {
    "id": "contestkorea-202601220053",
    "title": "2026 제1회 국군사랑 전국 초·중·고등학생 글짓기 공모전",
    "organizer": "원본 확인 필요",
    "grades": [
      "초",
      "중",
      "고"
    ],
    "regions": [
      "강원",
      "경기",
      "대구",
      "대전",
      "부산",
      "서울",
      "온라인",
      "충남"
    ],
    "category": "과학·SW·창의",
    "start": "2026-06-10",
    "deadline": "2026-07-31",
    "dday": -91,
    "status": "마감",
    "prize": null,
    "free": true,
    "officialUrl": "http://www.thankyousoldiers.com/",
    "summary": "2026 제1회 국군사랑 전국 초·중·고등학생 글짓기 공모전 후보입니다. 참가대상·마감일·접수방법은 기관 원본 공고에서 확인하세요.",
    "conflict": false,
    "academyRecommendation": {
      "subjectTags": [
        "과학",
        "코딩/SW"
      ],
      "careerTags": [
        "이공계",
        "IT/SW"
      ],
      "useCaseTags": [
        "수업연계",
        "결과물있음",
        "학부모안내",
        "개별추천",
        "심화도전"
      ],
      "confidence": "높음",
      "confidenceScore": 92,
      "reasons": [
        "과학·코딩/SW 수업과 연결해 학생별 결과물 제작 과제로 활용할 수 있습니다.",
        "기관 원본 공고가 확인되어 학부모 안내 자료로 사용하기 전 검토 부담이 낮습니다.",
        "준비 부담이 있는 산출물 또는 전문 분야 단서가 있어 관심 학생의 심화 프로젝트 후보로 적합합니다."
      ],
      "evidence": [
        "참가대상: 초·중·고",
        "분야: 과학·SW·창의",
        "마감까지 -91일",
        "지역/방식: 전국 또는 온라인",
        "참가비: 무료",
        "기관 원본 공고 확인"
      ],
      "warnings": [
        "제출 형식은 원본 공고에서 확인 필요"
      ],
      "programIdeas": [
        "SW 심화반 문제풀이 또는 미니 프로젝트"
      ]
    }
  },
  {
    "id": "wevity-108592",
    "title": "2026년 미래여성경제인육성사업 창업아이디어 멘토링•IP권리화 프로그램 참가자 모집 신규 SPECIAL",
    "organizer": "중소벤처기업부 / 한국여성경제인협회",
    "grades": [
      "중",
      "고"
    ],
    "regions": [
      "전국"
    ],
    "category": "과학·SW·창의",
    "start": "2026-06-24",
    "deadline": "2026-07-31",
    "dday": -91,
    "status": "접수중",
    "prize": "다양한 혜택",
    "free": true,
    "officialUrl": "https://kwbiz.or.kr/idea/main",
    "summary": "중소벤처기업부 주최. 참가대상 고등·중등. 대상지역 전국. 자세한 내용은 기관 원본 공고 확인.",
    "conflict": true,
    "academyRecommendation": {
      "subjectTags": [
        "과학",
        "코딩/SW",
        "진로/경제"
      ],
      "careerTags": [
        "이공계",
        "IT/SW"
      ],
      "useCaseTags": [
        "수업연계",
        "결과물있음",
        "개별추천",
        "심화도전"
      ],
      "confidence": "중간",
      "confidenceScore": 86,
      "reasons": [
        "과학·코딩/SW 수업과 연결해 학생별 결과물 제작 과제로 활용할 수 있습니다.",
        "준비 부담이 있는 산출물 또는 전문 분야 단서가 있어 관심 학생의 심화 프로젝트 후보로 적합합니다."
      ],
      "evidence": [
        "참가대상: 중·고",
        "분야: 과학·SW·창의",
        "마감까지 -91일",
        "지역/방식: 전국 또는 온라인",
        "참가비: 무료",
        "제출물 단서: 글/그림/아이디어 등 비교적 가벼운 산출물"
      ],
      "warnings": [
        "기관 원본 링크 또는 검수상태 확인 필요",
        "가벼운 산출물 단서와 고난도 단서가 함께 있어 난이도 확인 필요"
      ],
      "programIdeas": [
        "SW 심화반 문제풀이 또는 미니 프로젝트",
        "아이디어 발굴과 발표자료 제작 진로 프로젝트"
      ]
    }
  },
  {
    "id": "wevity-108452",
    "title": "2026년 지역학 콘텐츠 공모전",
    "organizer": "인천광역시서구문화원",
    "grades": [
      "초"
    ],
    "regions": [
      "인천"
    ],
    "category": "미술·디자인·영상",
    "start": "2026-06-22",
    "deadline": "2026-07-31",
    "dday": -91,
    "status": "접수중",
    "prize": "다양한 혜택",
    "free": true,
    "officialUrl": "https://www.inscc.kr/user/business/view.php?sq=85&search=",
    "summary": "인천광역시서구문화원 주최. 참가대상 초등. 대상지역 인천. 자세한 내용은 기관 원본 공고 확인.",
    "conflict": true,
    "academyRecommendation": {
      "subjectTags": [
        "미술/디자인",
        "영상/미디어",
        "국어/논술"
      ],
      "careerTags": [
        "디자인",
        "미디어"
      ],
      "useCaseTags": [
        "수업연계",
        "결과물있음",
        "개별추천",
        "심화도전"
      ],
      "confidence": "높음",
      "confidenceScore": 83,
      "reasons": [
        "미술/디자인·영상/미디어 수업과 연결해 학생별 결과물 제작 과제로 활용할 수 있습니다.",
        "준비 부담이 있는 산출물 또는 전문 분야 단서가 있어 관심 학생의 심화 프로젝트 후보로 적합합니다."
      ],
      "evidence": [
        "참가대상: 초",
        "분야: 미술·디자인·영상",
        "마감까지 -91일",
        "지역: 인천",
        "참가비: 무료",
        "제출물 단서: 영상/SW/보고서/창업 등 준비 부담 가능"
      ],
      "warnings": [
        "기관 원본 링크 또는 검수상태 확인 필요"
      ],
      "programIdeas": [
        "독서·글쓰기 수업의 2~4주 결과물 프로젝트",
        "포스터·웹툰·디자인 작품 제작 특강",
        "기획안 작성부터 촬영·편집까지 이어지는 영상 제작 특강"
      ]
    }
  },
  {
    "id": "wevity-108355",
    "title": "전국 어린이 에너지 절약 그림·포스터 공모전",
    "organizer": "한국가스공사",
    "grades": [
      "초"
    ],
    "regions": [
      "전국"
    ],
    "category": "미술·디자인·영상",
    "start": "2026-06-05",
    "deadline": "2026-07-31",
    "dday": -91,
    "status": "접수중",
    "prize": "50만원",
    "free": true,
    "officialUrl": "http://kogascontest.co.kr",
    "summary": "한국가스공사 주최. 참가대상 초등. 대상지역 전국. 자세한 내용은 기관 원본 공고 확인.",
    "conflict": false,
    "academyRecommendation": {
      "subjectTags": [
        "미술/디자인",
        "영상/미디어",
        "과학"
      ],
      "careerTags": [
        "디자인",
        "미디어"
      ],
      "useCaseTags": [
        "수업연계",
        "결과물있음",
        "학부모안내",
        "개별추천",
        "심화도전"
      ],
      "confidence": "높음",
      "confidenceScore": 100,
      "reasons": [
        "미술/디자인·영상/미디어 수업과 연결해 학생별 결과물 제작 과제로 활용할 수 있습니다.",
        "기관 원본 공고가 확인되어 학부모 안내 자료로 사용하기 전 검토 부담이 낮습니다.",
        "준비 부담이 있는 산출물 또는 전문 분야 단서가 있어 관심 학생의 심화 프로젝트 후보로 적합합니다."
      ],
      "evidence": [
        "참가대상: 초",
        "분야: 미술·디자인·영상",
        "마감까지 -91일",
        "지역/방식: 전국 또는 온라인",
        "참가비: 무료",
        "기관 원본 공고 확인"
      ],
      "warnings": [
        "가벼운 산출물 단서와 고난도 단서가 함께 있어 난이도 확인 필요"
      ],
      "programIdeas": [
        "포스터·웹툰·디자인 작품 제작 특강",
        "기획안 작성부터 촬영·편집까지 이어지는 영상 제작 특강"
      ]
    }
  },
  {
    "id": "allcon-538904",
    "title": "제29회 경상북도 관광기념품 공모전",
    "organizer": "원본 확인 필요",
    "grades": [
      "중",
      "고"
    ],
    "regions": [
      "경북",
      "서울"
    ],
    "category": "미술·디자인·영상",
    "start": "2026-07-23",
    "deadline": "2026-08-06",
    "dday": -85,
    "status": "접수예정",
    "prize": null,
    "free": true,
    "officialUrl": "https://www.gb.go.kr/Main/page.do?mnu_uid=6789&BD_CODE=gosi_notice&cmd=2&B_NUM=508561301&B_STEP=508561300",
    "summary": "제29회 경상북도 관광기념품 공모전 후보입니다. 참가대상·마감일·접수방법은 기관 원본 공고에서 확인하세요.",
    "conflict": true,
    "academyRecommendation": {
      "subjectTags": [
        "미술/디자인",
        "영상/미디어"
      ],
      "careerTags": [
        "디자인",
        "미디어"
      ],
      "useCaseTags": [
        "수업연계",
        "결과물있음",
        "개별추천",
        "심화도전"
      ],
      "confidence": "높음",
      "confidenceScore": 83,
      "reasons": [
        "미술/디자인·영상/미디어 수업과 연결해 학생별 결과물 제작 과제로 활용할 수 있습니다.",
        "준비 부담이 있는 산출물 또는 전문 분야 단서가 있어 관심 학생의 심화 프로젝트 후보로 적합합니다."
      ],
      "evidence": [
        "참가대상: 중·고",
        "분야: 미술·디자인·영상",
        "마감까지 -85일",
        "지역: 경북·서울",
        "참가비: 무료",
        "제출물 단서: 영상/SW/보고서/창업 등 준비 부담 가능"
      ],
      "warnings": [
        "기관 원본 링크 또는 검수상태 확인 필요"
      ],
      "programIdeas": [
        "포스터·웹툰·디자인 작품 제작 특강",
        "기획안 작성부터 촬영·편집까지 이어지는 영상 제작 특강"
      ]
    }
  },
  {
    "id": "contestkorea-202606250002",
    "title": "푸르메재단 넥슨어린이재활병원 기금 조성 참여형 자선전시 《제3회 마음으로 연결된 우리》",
    "organizer": "원본 확인 필요",
    "grades": [
      "초",
      "중",
      "고"
    ],
    "regions": [
      "경기",
      "대구",
      "대전",
      "부산",
      "서울",
      "온라인",
      "충남"
    ],
    "category": "과학·SW·창의",
    "start": "2026-06-09",
    "deadline": "2026-08-08",
    "dday": -83,
    "status": "접수중",
    "prize": null,
    "free": true,
    "officialUrl": "https://forms.gle/dQucUiCitQNb2zZ26",
    "summary": "푸르메재단 넥슨어린이재활병원 기금 조성 참여형 자선전시 《제3회 마음으로 연결된 우리》 후보입니다. 참가대상·마감일·접수방법은 기관 원본 공고에서 확인하세요.",
    "conflict": true,
    "academyRecommendation": {
      "subjectTags": [
        "과학",
        "코딩/SW",
        "국어/논술"
      ],
      "careerTags": [
        "이공계",
        "IT/SW"
      ],
      "useCaseTags": [
        "수업연계",
        "결과물있음",
        "심화도전"
      ],
      "confidence": "중간",
      "confidenceScore": 78,
      "reasons": [
        "과학·코딩/SW 수업과 연결해 학생별 결과물 제작 과제로 활용할 수 있습니다.",
        "준비 부담이 있는 산출물 또는 전문 분야 단서가 있어 관심 학생의 심화 프로젝트 후보로 적합합니다."
      ],
      "evidence": [
        "참가대상: 초·중·고",
        "분야: 과학·SW·창의",
        "마감까지 -83일",
        "지역/방식: 전국 또는 온라인",
        "참가비: 무료"
      ],
      "warnings": [
        "기관 원본 링크 또는 검수상태 확인 필요",
        "제출 형식은 원본 공고에서 확인 필요"
      ],
      "programIdeas": [
        "독서·글쓰기 수업의 2~4주 결과물 프로젝트",
        "SW 심화반 문제풀이 또는 미니 프로젝트"
      ]
    }
  },
  {
    "id": "wevity-108442",
    "title": "2026 무주램프 어린이 미술공모전 - 자연특별시 무주에서 소원을 그려봐요!",
    "organizer": "중소기업벤처기업부, 전북특별자치도, 무주군 / 무주읍 상권활성화 추진단",
    "grades": [
      "초"
    ],
    "regions": [
      "전북"
    ],
    "category": "미술·디자인·영상",
    "start": "2026-06-20",
    "deadline": "2026-08-10",
    "dday": -81,
    "status": "접수중",
    "prize": "다양한 혜택",
    "free": true,
    "officialUrl": "https://blog.naver.com/muju_tm",
    "summary": "중소기업벤처기업부, 전북특별자치도, 무주군 주최. 참가대상 초등. 대상지역 전북. 자세한 내용은 기관 원본 공고 확인.",
    "conflict": false,
    "academyRecommendation": {
      "subjectTags": [
        "미술/디자인",
        "영상/미디어",
        "국어/논술"
      ],
      "careerTags": [
        "디자인",
        "미디어"
      ],
      "useCaseTags": [
        "수업연계",
        "결과물있음",
        "학부모안내",
        "개별추천",
        "심화도전"
      ],
      "confidence": "높음",
      "confidenceScore": 97,
      "reasons": [
        "미술/디자인·영상/미디어 수업과 연결해 학생별 결과물 제작 과제로 활용할 수 있습니다.",
        "기관 원본 공고가 확인되어 학부모 안내 자료로 사용하기 전 검토 부담이 낮습니다.",
        "준비 부담이 있는 산출물 또는 전문 분야 단서가 있어 관심 학생의 심화 프로젝트 후보로 적합합니다."
      ],
      "evidence": [
        "참가대상: 초",
        "분야: 미술·디자인·영상",
        "마감까지 -81일",
        "지역: 전북",
        "참가비: 무료",
        "기관 원본 공고 확인"
      ],
      "warnings": [],
      "programIdeas": [
        "독서·글쓰기 수업의 2~4주 결과물 프로젝트",
        "포스터·웹툰·디자인 작품 제작 특강",
        "기획안 작성부터 촬영·편집까지 이어지는 영상 제작 특강"
      ]
    }
  },
  {
    "id": "allcon-537851",
    "title": "제14회 전국 초·중·고 학생 사랑의열매 나눔공모전",
    "organizer": "원본 확인 필요",
    "grades": [
      "초",
      "중",
      "고"
    ],
    "regions": [
      "서울",
      "온라인"
    ],
    "category": "미술·디자인·영상",
    "start": "2026-05-26",
    "deadline": "2026-08-11",
    "dday": -80,
    "status": "접수중",
    "prize": null,
    "free": true,
    "officialUrl": "https://www.nanumcontest.co.kr/",
    "summary": "제14회 전국 초·중·고 학생 사랑의열매 나눔공모전 후보입니다. 참가대상·마감일·접수방법은 기관 원본 공고에서 확인하세요.",
    "conflict": false,
    "academyRecommendation": {
      "subjectTags": [
        "미술/디자인",
        "영상/미디어"
      ],
      "careerTags": [
        "디자인",
        "미디어"
      ],
      "useCaseTags": [
        "수업연계",
        "결과물있음",
        "학부모안내",
        "개별추천",
        "심화도전"
      ],
      "confidence": "높음",
      "confidenceScore": 100,
      "reasons": [
        "미술/디자인·영상/미디어 수업과 연결해 학생별 결과물 제작 과제로 활용할 수 있습니다.",
        "기관 원본 공고가 확인되어 학부모 안내 자료로 사용하기 전 검토 부담이 낮습니다.",
        "준비 부담이 있는 산출물 또는 전문 분야 단서가 있어 관심 학생의 심화 프로젝트 후보로 적합합니다."
      ],
      "evidence": [
        "참가대상: 초·중·고",
        "분야: 미술·디자인·영상",
        "마감까지 -80일",
        "지역/방식: 전국 또는 온라인",
        "참가비: 무료",
        "기관 원본 공고 확인"
      ],
      "warnings": [],
      "programIdeas": [
        "포스터·웹툰·디자인 작품 제작 특강",
        "기획안 작성부터 촬영·편집까지 이어지는 영상 제작 특강"
      ]
    }
  },
  {
    "id": "allcon-538193",
    "title": "2026 해양생물 콘텐츠 공모전",
    "organizer": "원본 확인 필요",
    "grades": [
      "초",
      "중"
    ],
    "regions": [
      "서울",
      "온라인"
    ],
    "category": "과학·SW·창의",
    "start": "2026-06-04",
    "deadline": "2026-08-14",
    "dday": -77,
    "status": "접수중",
    "prize": null,
    "free": true,
    "officialUrl": "https://www.meis.go.kr/inform/contest/view1.do",
    "summary": "2026 해양생물 콘텐츠 공모전 후보입니다. 참가대상·마감일·접수방법은 기관 원본 공고에서 확인하세요.",
    "conflict": false,
    "academyRecommendation": {
      "subjectTags": [
        "과학",
        "코딩/SW",
        "영상/미디어"
      ],
      "careerTags": [
        "이공계",
        "IT/SW",
        "미디어"
      ],
      "useCaseTags": [
        "수업연계",
        "결과물있음",
        "학부모안내",
        "심화도전"
      ],
      "confidence": "높음",
      "confidenceScore": 92,
      "reasons": [
        "과학·코딩/SW 수업과 연결해 학생별 결과물 제작 과제로 활용할 수 있습니다.",
        "기관 원본 공고가 확인되어 학부모 안내 자료로 사용하기 전 검토 부담이 낮습니다.",
        "준비 부담이 있는 산출물 또는 전문 분야 단서가 있어 관심 학생의 심화 프로젝트 후보로 적합합니다."
      ],
      "evidence": [
        "참가대상: 초·중",
        "분야: 과학·SW·창의",
        "마감까지 -77일",
        "지역/방식: 전국 또는 온라인",
        "참가비: 무료",
        "기관 원본 공고 확인"
      ],
      "warnings": [
        "제출 형식은 원본 공고에서 확인 필요"
      ],
      "programIdeas": [
        "SW 심화반 문제풀이 또는 미니 프로젝트",
        "기획안 작성부터 촬영·편집까지 이어지는 영상 제작 특강"
      ]
    }
  },
  {
    "id": "allcon-536489",
    "title": "제1회 국민통합 문학공모전",
    "organizer": "원본 확인 필요",
    "grades": [
      "중",
      "고"
    ],
    "regions": [
      "서울",
      "온라인"
    ],
    "category": "과학·SW·창의",
    "start": "2026-05-01",
    "deadline": "2026-08-14",
    "dday": -77,
    "status": "접수중",
    "prize": null,
    "free": true,
    "officialUrl": "https://www.k-together.kr/",
    "summary": "제1회 국민통합 문학공모전 후보입니다. 참가대상·마감일·접수방법은 기관 원본 공고에서 확인하세요.",
    "conflict": true,
    "academyRecommendation": {
      "subjectTags": [
        "과학",
        "코딩/SW",
        "국어/논술"
      ],
      "careerTags": [
        "이공계",
        "IT/SW"
      ],
      "useCaseTags": [
        "수업연계",
        "결과물있음",
        "심화도전"
      ],
      "confidence": "중간",
      "confidenceScore": 78,
      "reasons": [
        "과학·코딩/SW 수업과 연결해 학생별 결과물 제작 과제로 활용할 수 있습니다.",
        "준비 부담이 있는 산출물 또는 전문 분야 단서가 있어 관심 학생의 심화 프로젝트 후보로 적합합니다."
      ],
      "evidence": [
        "참가대상: 중·고",
        "분야: 과학·SW·창의",
        "마감까지 -77일",
        "지역/방식: 전국 또는 온라인",
        "참가비: 무료"
      ],
      "warnings": [
        "기관 원본 링크 또는 검수상태 확인 필요",
        "제출 형식은 원본 공고에서 확인 필요"
      ],
      "programIdeas": [
        "독서·글쓰기 수업의 2~4주 결과물 프로젝트",
        "SW 심화반 문제풀이 또는 미니 프로젝트"
      ]
    }
  },
  {
    "id": "wevity-108491",
    "title": "제23회 황순원문학제 백일장",
    "organizer": "양평군·경희대학교·중앙일보 / 황순원기념사업회·황순원문학촌 소나기마을",
    "grades": [
      "초",
      "중",
      "고"
    ],
    "regions": [
      "전국"
    ],
    "category": "글쓰기·독서",
    "start": "2026-06-15",
    "deadline": "2026-08-15",
    "dday": -76,
    "status": "접수중",
    "prize": "100만원",
    "free": true,
    "officialUrl": "https://blog.naver.com/sonagivill/224307606859",
    "summary": "양평군·경희대학교·중앙일보 주최. 참가대상 고등·중등·초등. 대상지역 전국. 자세한 내용은 기관 원본 공고 확인.",
    "conflict": false,
    "academyRecommendation": {
      "subjectTags": [
        "국어/논술"
      ],
      "careerTags": [
        "인문사회"
      ],
      "useCaseTags": [
        "수업연계",
        "결과물있음",
        "학부모안내",
        "단체참여",
        "개별추천"
      ],
      "confidence": "높음",
      "confidenceScore": 100,
      "reasons": [
        "국어/논술 수업과 연결해 학생별 결과물 제작 과제로 활용할 수 있습니다.",
        "기관 원본 공고가 확인되어 학부모 안내 자료로 사용하기 전 검토 부담이 낮습니다."
      ],
      "evidence": [
        "참가대상: 초·중·고",
        "분야: 글쓰기·독서",
        "마감까지 -76일",
        "지역/방식: 전국 또는 온라인",
        "참가비: 무료",
        "기관 원본 공고 확인"
      ],
      "warnings": [],
      "programIdeas": [
        "독서·글쓰기 수업의 2~4주 결과물 프로젝트"
      ]
    }
  },
  {
    "id": "contestkorea-202606250046",
    "title": "제4회 LG 영상공모전",
    "organizer": "원본 확인 필요",
    "grades": [
      "초",
      "중",
      "고"
    ],
    "regions": [
      "강원",
      "경기",
      "경북",
      "대구",
      "대전",
      "부산",
      "서울",
      "온라인",
      "충남"
    ],
    "category": "과학·SW·창의",
    "start": "2026-06-22",
    "deadline": "2026-08-21",
    "dday": -70,
    "status": "접수중",
    "prize": null,
    "free": true,
    "officialUrl": null,
    "summary": "제4회 LG 영상공모전 후보입니다. 참가대상·마감일·접수방법은 기관 원본 공고에서 확인하세요.",
    "conflict": true,
    "academyRecommendation": {
      "subjectTags": [
        "과학",
        "코딩/SW",
        "영상/미디어"
      ],
      "careerTags": [
        "이공계",
        "IT/SW",
        "미디어"
      ],
      "useCaseTags": [
        "수업연계",
        "결과물있음",
        "개별추천",
        "심화도전"
      ],
      "confidence": "높음",
      "confidenceScore": 86,
      "reasons": [
        "과학·코딩/SW 수업과 연결해 학생별 결과물 제작 과제로 활용할 수 있습니다.",
        "준비 부담이 있는 산출물 또는 전문 분야 단서가 있어 관심 학생의 심화 프로젝트 후보로 적합합니다."
      ],
      "evidence": [
        "참가대상: 초·중·고",
        "분야: 과학·SW·창의",
        "마감까지 -70일",
        "지역/방식: 전국 또는 온라인",
        "참가비: 무료",
        "제출물 단서: 영상/SW/보고서/창업 등 준비 부담 가능"
      ],
      "warnings": [
        "기관 원본 링크 또는 검수상태 확인 필요"
      ],
      "programIdeas": [
        "SW 심화반 문제풀이 또는 미니 프로젝트",
        "기획안 작성부터 촬영·편집까지 이어지는 영상 제작 특강"
      ]
    }
  },
  {
    "id": "contestkorea-202606250041",
    "title": "제5회 Galaxy 사진공모전",
    "organizer": "원본 확인 필요",
    "grades": [
      "초",
      "중",
      "고"
    ],
    "regions": [
      "강원",
      "경기",
      "경북",
      "대구",
      "대전",
      "부산",
      "서울",
      "온라인",
      "충남"
    ],
    "category": "과학·SW·창의",
    "start": "2026-06-22",
    "deadline": "2026-08-21",
    "dday": -70,
    "status": "접수중",
    "prize": null,
    "free": true,
    "officialUrl": null,
    "summary": "제5회 Galaxy 사진공모전 후보입니다. 참가대상·마감일·접수방법은 기관 원본 공고에서 확인하세요.",
    "conflict": true,
    "academyRecommendation": {
      "subjectTags": [
        "과학",
        "코딩/SW",
        "영상/미디어"
      ],
      "careerTags": [
        "이공계",
        "IT/SW",
        "미디어"
      ],
      "useCaseTags": [
        "수업연계",
        "결과물있음",
        "심화도전"
      ],
      "confidence": "높음",
      "confidenceScore": 86,
      "reasons": [
        "과학·코딩/SW 수업과 연결해 학생별 결과물 제작 과제로 활용할 수 있습니다.",
        "준비 부담이 있는 산출물 또는 전문 분야 단서가 있어 관심 학생의 심화 프로젝트 후보로 적합합니다."
      ],
      "evidence": [
        "참가대상: 초·중·고",
        "분야: 과학·SW·창의",
        "마감까지 -70일",
        "지역/방식: 전국 또는 온라인",
        "참가비: 무료",
        "제출물 단서: 글/그림/아이디어 등 비교적 가벼운 산출물"
      ],
      "warnings": [
        "기관 원본 링크 또는 검수상태 확인 필요"
      ],
      "programIdeas": [
        "SW 심화반 문제풀이 또는 미니 프로젝트",
        "기획안 작성부터 촬영·편집까지 이어지는 영상 제작 특강"
      ]
    }
  },
  {
    "id": "allcon-538940",
    "title": "KBHR 뷰티페스타 2026",
    "organizer": "원본 확인 필요",
    "grades": [
      "고"
    ],
    "regions": [
      "서울"
    ],
    "category": "과학·SW·창의",
    "start": "2026-08-14",
    "deadline": "2026-08-22",
    "dday": -69,
    "status": "접수예정",
    "prize": null,
    "free": true,
    "officialUrl": "https://kbhr.or.kr/bbs/board.php?bo_table=B18",
    "summary": "KBHR 뷰티페스타 2026 후보입니다. 참가대상·마감일·접수방법은 기관 원본 공고에서 확인하세요.",
    "conflict": true,
    "academyRecommendation": {
      "subjectTags": [
        "과학",
        "코딩/SW"
      ],
      "careerTags": [
        "이공계",
        "IT/SW"
      ],
      "useCaseTags": [
        "수업연계",
        "결과물있음",
        "개별추천",
        "심화도전"
      ],
      "confidence": "중간",
      "confidenceScore": 75,
      "reasons": [
        "과학·코딩/SW 수업과 연결해 학생별 결과물 제작 과제로 활용할 수 있습니다.",
        "준비 부담이 있는 산출물 또는 전문 분야 단서가 있어 관심 학생의 심화 프로젝트 후보로 적합합니다."
      ],
      "evidence": [
        "참가대상: 고",
        "분야: 과학·SW·창의",
        "마감까지 -69일",
        "지역: 서울",
        "참가비: 무료"
      ],
      "warnings": [
        "기관 원본 링크 또는 검수상태 확인 필요",
        "제출 형식은 원본 공고에서 확인 필요"
      ],
      "programIdeas": [
        "SW 심화반 문제풀이 또는 미니 프로젝트"
      ]
    }
  },
  {
    "id": "contestkorea-202610290001",
    "title": "제3회 다대는TV 유튜브 영상 공모전 (기간연장)",
    "organizer": "원본 확인 필요",
    "grades": [
      "고"
    ],
    "regions": [
      "경기",
      "경북",
      "대구",
      "대전",
      "부산",
      "서울",
      "온라인"
    ],
    "category": "과학·SW·창의",
    "start": "2026-08-24",
    "deadline": "2026-08-24",
    "dday": -67,
    "status": "마감",
    "prize": null,
    "free": true,
    "officialUrl": "https://www.twitter.com/contestkorea",
    "summary": "제3회 다대는TV 유튜브 영상 공모전 (기간연장) 후보입니다. 참가대상·마감일·접수방법은 기관 원본 공고에서 확인하세요.",
    "conflict": false,
    "academyRecommendation": {
      "subjectTags": [
        "과학",
        "코딩/SW",
        "영상/미디어"
      ],
      "careerTags": [
        "이공계",
        "IT/SW",
        "미디어"
      ],
      "useCaseTags": [
        "수업연계",
        "결과물있음",
        "학부모안내",
        "개별추천",
        "심화도전"
      ],
      "confidence": "높음",
      "confidenceScore": 100,
      "reasons": [
        "과학·코딩/SW 수업과 연결해 학생별 결과물 제작 과제로 활용할 수 있습니다.",
        "기관 원본 공고가 확인되어 학부모 안내 자료로 사용하기 전 검토 부담이 낮습니다.",
        "준비 부담이 있는 산출물 또는 전문 분야 단서가 있어 관심 학생의 심화 프로젝트 후보로 적합합니다."
      ],
      "evidence": [
        "참가대상: 고",
        "분야: 과학·SW·창의",
        "마감까지 -67일",
        "지역/방식: 전국 또는 온라인",
        "참가비: 무료",
        "기관 원본 공고 확인"
      ],
      "warnings": [],
      "programIdeas": [
        "SW 심화반 문제풀이 또는 미니 프로젝트",
        "기획안 작성부터 촬영·편집까지 이어지는 영상 제작 특강"
      ]
    }
  },
  {
    "id": "allcon-539183",
    "title": "도박문제예방 29역숏폼왕 개최안내",
    "organizer": "원본 확인 필요",
    "grades": [
      "중",
      "고"
    ],
    "regions": [
      "서울"
    ],
    "category": "미술·디자인·영상",
    "start": "2026-06-25",
    "deadline": "2026-08-27",
    "dday": -64,
    "status": "접수중",
    "prize": null,
    "free": true,
    "officialUrl": "https://1336.29sking.com/faq",
    "summary": "도박문제예방 29역숏폼왕 개최안내 후보입니다. 참가대상·마감일·접수방법은 기관 원본 공고에서 확인하세요.",
    "conflict": true,
    "academyRecommendation": {
      "subjectTags": [
        "미술/디자인",
        "영상/미디어"
      ],
      "careerTags": [
        "디자인",
        "미디어"
      ],
      "useCaseTags": [
        "수업연계",
        "결과물있음",
        "개별추천",
        "심화도전"
      ],
      "confidence": "높음",
      "confidenceScore": 83,
      "reasons": [
        "미술/디자인·영상/미디어 수업과 연결해 학생별 결과물 제작 과제로 활용할 수 있습니다.",
        "준비 부담이 있는 산출물 또는 전문 분야 단서가 있어 관심 학생의 심화 프로젝트 후보로 적합합니다."
      ],
      "evidence": [
        "참가대상: 중·고",
        "분야: 미술·디자인·영상",
        "마감까지 -64일",
        "지역: 서울",
        "참가비: 무료",
        "제출물 단서: 영상/SW/보고서/창업 등 준비 부담 가능"
      ],
      "warnings": [
        "기관 원본 링크 또는 검수상태 확인 필요"
      ],
      "programIdeas": [
        "포스터·웹툰·디자인 작품 제작 특강",
        "기획안 작성부터 촬영·편집까지 이어지는 영상 제작 특강"
      ]
    }
  },
  {
    "id": "wevity-108484",
    "title": "제2회 뉴스피릿 미술 공모전",
    "organizer": "뉴스피릿",
    "grades": [
      "초",
      "중",
      "고"
    ],
    "regions": [
      "전국"
    ],
    "category": "미술·디자인·영상",
    "start": "2026-08-13",
    "deadline": "2026-08-28",
    "dday": -63,
    "status": "접수예정",
    "prize": "다양한 혜택",
    "free": true,
    "officialUrl": "https://newsspiritart.kr/guide/recruit",
    "summary": "뉴스피릿 주최. 참가대상 고등·중등·초등. 대상지역 전국. 자세한 내용은 기관 원본 공고 확인.",
    "conflict": false,
    "academyRecommendation": {
      "subjectTags": [
        "미술/디자인",
        "영상/미디어"
      ],
      "careerTags": [
        "디자인",
        "미디어"
      ],
      "useCaseTags": [
        "수업연계",
        "결과물있음",
        "학부모안내",
        "개별추천",
        "심화도전"
      ],
      "confidence": "높음",
      "confidenceScore": 100,
      "reasons": [
        "미술/디자인·영상/미디어 수업과 연결해 학생별 결과물 제작 과제로 활용할 수 있습니다.",
        "기관 원본 공고가 확인되어 학부모 안내 자료로 사용하기 전 검토 부담이 낮습니다.",
        "준비 부담이 있는 산출물 또는 전문 분야 단서가 있어 관심 학생의 심화 프로젝트 후보로 적합합니다."
      ],
      "evidence": [
        "참가대상: 초·중·고",
        "분야: 미술·디자인·영상",
        "마감까지 -63일",
        "지역/방식: 전국 또는 온라인",
        "참가비: 무료",
        "기관 원본 공고 확인"
      ],
      "warnings": [],
      "programIdeas": [
        "포스터·웹툰·디자인 작품 제작 특강",
        "기획안 작성부터 촬영·편집까지 이어지는 영상 제작 특강"
      ]
    }
  },
  {
    "id": "wevity-108508",
    "title": "2026년 전국 청소년 농업 아이디어 공모전 - 틴저린 챌린지",
    "organizer": "틴저린프로젝트",
    "grades": [
      "중",
      "고"
    ],
    "regions": [
      "전국"
    ],
    "category": "진로·경제·아이디어",
    "start": "2026-06-10",
    "deadline": "2026-09-10",
    "dday": -50,
    "status": "접수중",
    "prize": "1천만원이하",
    "free": true,
    "officialUrl": null,
    "summary": "틴저린프로젝트 주최. 참가대상 고등·중등. 대상지역 전국. 자세한 내용은 기관 원본 공고 확인.",
    "conflict": true,
    "academyRecommendation": {
      "subjectTags": [
        "진로/경제"
      ],
      "careerTags": [
        "창업/경제",
        "인문사회"
      ],
      "useCaseTags": [
        "수업연계",
        "결과물있음",
        "개별추천",
        "심화도전"
      ],
      "confidence": "중간",
      "confidenceScore": 86,
      "reasons": [
        "진로/경제 수업과 연결해 학생별 결과물 제작 과제로 활용할 수 있습니다.",
        "준비 부담이 있는 산출물 또는 전문 분야 단서가 있어 관심 학생의 심화 프로젝트 후보로 적합합니다."
      ],
      "evidence": [
        "참가대상: 중·고",
        "분야: 진로·경제·아이디어",
        "마감까지 -50일",
        "지역/방식: 전국 또는 온라인",
        "참가비: 무료",
        "제출물 단서: 글/그림/아이디어 등 비교적 가벼운 산출물"
      ],
      "warnings": [
        "기관 원본 링크 또는 검수상태 확인 필요",
        "가벼운 산출물 단서와 고난도 단서가 함께 있어 난이도 확인 필요"
      ],
      "programIdeas": [
        "아이디어 발굴과 발표자료 제작 진로 프로젝트"
      ]
    }
  },
  {
    "id": "contestkorea-202610300036",
    "title": "2026 AI 이미지콘테스트",
    "organizer": "원본 확인 필요",
    "grades": [
      "초",
      "중",
      "고"
    ],
    "regions": [
      "경기",
      "경북",
      "대구",
      "대전",
      "부산",
      "서울",
      "온라인"
    ],
    "category": "과학·SW·창의",
    "start": "2026-09-28",
    "deadline": "2026-09-28",
    "dday": -32,
    "status": "마감",
    "prize": null,
    "free": true,
    "officialUrl": "https://ai.pask.net/home/registe",
    "summary": "2026 AI 이미지콘테스트 후보입니다. 참가대상·마감일·접수방법은 기관 원본 공고에서 확인하세요.",
    "conflict": false,
    "academyRecommendation": {
      "subjectTags": [
        "과학",
        "코딩/SW"
      ],
      "careerTags": [
        "이공계",
        "IT/SW"
      ],
      "useCaseTags": [
        "수업연계",
        "결과물있음",
        "학부모안내",
        "개별추천",
        "심화도전"
      ],
      "confidence": "높음",
      "confidenceScore": 92,
      "reasons": [
        "과학·코딩/SW 수업과 연결해 학생별 결과물 제작 과제로 활용할 수 있습니다.",
        "기관 원본 공고가 확인되어 학부모 안내 자료로 사용하기 전 검토 부담이 낮습니다.",
        "준비 부담이 있는 산출물 또는 전문 분야 단서가 있어 관심 학생의 심화 프로젝트 후보로 적합합니다."
      ],
      "evidence": [
        "참가대상: 초·중·고",
        "분야: 과학·SW·창의",
        "마감까지 -32일",
        "지역/방식: 전국 또는 온라인",
        "참가비: 무료",
        "기관 원본 공고 확인"
      ],
      "warnings": [
        "제출 형식은 원본 공고에서 확인 필요"
      ],
      "programIdeas": [
        "SW 심화반 문제풀이 또는 미니 프로젝트"
      ]
    }
  },
  {
    "id": "contestkorea-202610300035",
    "title": "제4회 한국청소년사진제",
    "organizer": "원본 확인 필요",
    "grades": [
      "초",
      "중",
      "고"
    ],
    "regions": [
      "경기",
      "경북",
      "대구",
      "대전",
      "부산",
      "서울",
      "온라인"
    ],
    "category": "과학·SW·창의",
    "start": "2026-09-28",
    "deadline": "2026-09-28",
    "dday": -32,
    "status": "마감",
    "prize": null,
    "free": true,
    "officialUrl": "https://teen.pask.net/home/registe_agree",
    "summary": "제4회 한국청소년사진제 후보입니다. 참가대상·마감일·접수방법은 기관 원본 공고에서 확인하세요.",
    "conflict": false,
    "academyRecommendation": {
      "subjectTags": [
        "과학",
        "코딩/SW",
        "영상/미디어"
      ],
      "careerTags": [
        "이공계",
        "IT/SW",
        "미디어"
      ],
      "useCaseTags": [
        "수업연계",
        "결과물있음",
        "학부모안내",
        "심화도전"
      ],
      "confidence": "높음",
      "confidenceScore": 100,
      "reasons": [
        "과학·코딩/SW 수업과 연결해 학생별 결과물 제작 과제로 활용할 수 있습니다.",
        "기관 원본 공고가 확인되어 학부모 안내 자료로 사용하기 전 검토 부담이 낮습니다.",
        "준비 부담이 있는 산출물 또는 전문 분야 단서가 있어 관심 학생의 심화 프로젝트 후보로 적합합니다."
      ],
      "evidence": [
        "참가대상: 초·중·고",
        "분야: 과학·SW·창의",
        "마감까지 -32일",
        "지역/방식: 전국 또는 온라인",
        "참가비: 무료",
        "기관 원본 공고 확인"
      ],
      "warnings": [],
      "programIdeas": [
        "SW 심화반 문제풀이 또는 미니 프로젝트",
        "기획안 작성부터 촬영·편집까지 이어지는 영상 제작 특강"
      ]
    }
  },
  {
    "id": "contestkorea-202606250057",
    "title": "2026 울산광역시 U잼 영상 공모전",
    "organizer": "원본 확인 필요",
    "grades": [
      "초",
      "중",
      "고"
    ],
    "regions": [
      "강원",
      "경기",
      "대구",
      "대전",
      "부산",
      "서울",
      "온라인",
      "울산",
      "충남"
    ],
    "category": "과학·SW·창의",
    "start": "2026-10-01",
    "deadline": "2026-10-01",
    "dday": -29,
    "status": "접수예정",
    "prize": null,
    "free": true,
    "officialUrl": "https://forms.gle/q4nnTNrtwCVnL2i16",
    "summary": "2026 울산광역시 U잼 영상 공모전 후보입니다. 참가대상·마감일·접수방법은 기관 원본 공고에서 확인하세요.",
    "conflict": false,
    "academyRecommendation": {
      "subjectTags": [
        "과학",
        "코딩/SW",
        "국어/논술",
        "영상/미디어"
      ],
      "careerTags": [
        "이공계",
        "IT/SW",
        "미디어"
      ],
      "useCaseTags": [
        "수업연계",
        "결과물있음",
        "학부모안내",
        "개별추천",
        "심화도전"
      ],
      "confidence": "높음",
      "confidenceScore": 100,
      "reasons": [
        "과학·코딩/SW 수업과 연결해 학생별 결과물 제작 과제로 활용할 수 있습니다.",
        "기관 원본 공고가 확인되어 학부모 안내 자료로 사용하기 전 검토 부담이 낮습니다.",
        "준비 부담이 있는 산출물 또는 전문 분야 단서가 있어 관심 학생의 심화 프로젝트 후보로 적합합니다."
      ],
      "evidence": [
        "참가대상: 초·중·고",
        "분야: 과학·SW·창의",
        "마감까지 -29일",
        "지역/방식: 전국 또는 온라인",
        "참가비: 무료",
        "기관 원본 공고 확인"
      ],
      "warnings": [],
      "programIdeas": [
        "독서·글쓰기 수업의 2~4주 결과물 프로젝트",
        "SW 심화반 문제풀이 또는 미니 프로젝트",
        "기획안 작성부터 촬영·편집까지 이어지는 영상 제작 특강"
      ]
    }
  },
  {
    "id": "contestkorea-202606260004",
    "title": "2026 대전 중구 북페스티벌 '책으로 잇는 중구 이야기' 에세이 공모전",
    "organizer": "원본 확인 필요",
    "grades": [
      "초",
      "중",
      "고"
    ],
    "regions": [
      "강원",
      "경기",
      "대구",
      "대전",
      "부산",
      "서울",
      "온라인",
      "충남"
    ],
    "category": "과학·SW·창의",
    "start": "2026-06-25",
    "deadline": "2026-10-10",
    "dday": -20,
    "status": "접수중",
    "prize": null,
    "free": true,
    "officialUrl": "https://naver.me/FhuCKnXb",
    "summary": "2026 대전 중구 북페스티벌 '책으로 잇는 중구 이야기' 에세이 공모전 후보입니다. 참가대상·마감일·접수방법은 기관 원본 공고에서 확인하세요.",
    "conflict": false,
    "academyRecommendation": {
      "subjectTags": [
        "과학",
        "코딩/SW"
      ],
      "careerTags": [
        "이공계",
        "IT/SW"
      ],
      "useCaseTags": [
        "수업연계",
        "결과물있음",
        "학부모안내",
        "개별추천",
        "심화도전"
      ],
      "confidence": "높음",
      "confidenceScore": 92,
      "reasons": [
        "과학·코딩/SW 수업과 연결해 학생별 결과물 제작 과제로 활용할 수 있습니다.",
        "기관 원본 공고가 확인되어 학부모 안내 자료로 사용하기 전 검토 부담이 낮습니다.",
        "준비 부담이 있는 산출물 또는 전문 분야 단서가 있어 관심 학생의 심화 프로젝트 후보로 적합합니다."
      ],
      "evidence": [
        "참가대상: 초·중·고",
        "분야: 과학·SW·창의",
        "마감까지 -20일",
        "지역/방식: 전국 또는 온라인",
        "참가비: 무료",
        "기관 원본 공고 확인"
      ],
      "warnings": [
        "제출 형식은 원본 공고에서 확인 필요"
      ],
      "programIdeas": [
        "SW 심화반 문제풀이 또는 미니 프로젝트"
      ]
    }
  },
  {
    "id": "contestkorea-202610230011",
    "title": "2026년「횡성 숨은 매력 찾기」공모전",
    "organizer": "원본 확인 필요",
    "grades": [
      "초",
      "중",
      "고"
    ],
    "regions": [
      "경기",
      "경북",
      "대구",
      "대전",
      "부산",
      "서울",
      "온라인"
    ],
    "category": "과학·SW·창의",
    "start": "2026-10-13",
    "deadline": "2026-10-13",
    "dday": -17,
    "status": "마감",
    "prize": null,
    "free": true,
    "officialUrl": "https://www.twitter.com/contestkorea",
    "summary": "2026년「횡성 숨은 매력 찾기」공모전 후보입니다. 참가대상·마감일·접수방법은 기관 원본 공고에서 확인하세요.",
    "conflict": false,
    "academyRecommendation": {
      "subjectTags": [
        "과학",
        "코딩/SW"
      ],
      "careerTags": [
        "이공계",
        "IT/SW"
      ],
      "useCaseTags": [
        "수업연계",
        "결과물있음",
        "학부모안내",
        "개별추천",
        "심화도전"
      ],
      "confidence": "높음",
      "confidenceScore": 92,
      "reasons": [
        "과학·코딩/SW 수업과 연결해 학생별 결과물 제작 과제로 활용할 수 있습니다.",
        "기관 원본 공고가 확인되어 학부모 안내 자료로 사용하기 전 검토 부담이 낮습니다.",
        "준비 부담이 있는 산출물 또는 전문 분야 단서가 있어 관심 학생의 심화 프로젝트 후보로 적합합니다."
      ],
      "evidence": [
        "참가대상: 초·중·고",
        "분야: 과학·SW·창의",
        "마감까지 -17일",
        "지역/방식: 전국 또는 온라인",
        "참가비: 무료",
        "기관 원본 공고 확인"
      ],
      "warnings": [
        "제출 형식은 원본 공고에서 확인 필요"
      ],
      "programIdeas": [
        "SW 심화반 문제풀이 또는 미니 프로젝트"
      ]
    }
  },
  {
    "id": "contestkorea-202610210029",
    "title": "신봉도서관 청소년 서포터즈「TEUMER(트머) 1기」 모집",
    "organizer": "원본 확인 필요",
    "grades": [
      "초",
      "중",
      "고"
    ],
    "regions": [
      "경기",
      "경북",
      "대구",
      "대전",
      "부산",
      "서울",
      "온라인"
    ],
    "category": "과학·SW·창의",
    "start": "2026-10-22",
    "deadline": "2026-10-22",
    "dday": -8,
    "status": "마감",
    "prize": null,
    "free": true,
    "officialUrl": "https://www.twitter.com/contestkorea",
    "summary": "신봉도서관 청소년 서포터즈「TEUMER(트머) 1기」 모집 후보입니다. 참가대상·마감일·접수방법은 기관 원본 공고에서 확인하세요.",
    "conflict": false,
    "academyRecommendation": {
      "subjectTags": [
        "과학",
        "코딩/SW"
      ],
      "careerTags": [
        "이공계",
        "IT/SW"
      ],
      "useCaseTags": [
        "수업연계",
        "결과물있음",
        "학부모안내",
        "개별추천",
        "심화도전"
      ],
      "confidence": "높음",
      "confidenceScore": 92,
      "reasons": [
        "과학·코딩/SW 수업과 연결해 학생별 결과물 제작 과제로 활용할 수 있습니다.",
        "기관 원본 공고가 확인되어 학부모 안내 자료로 사용하기 전 검토 부담이 낮습니다.",
        "준비 부담이 있는 산출물 또는 전문 분야 단서가 있어 관심 학생의 심화 프로젝트 후보로 적합합니다."
      ],
      "evidence": [
        "참가대상: 초·중·고",
        "분야: 과학·SW·창의",
        "마감까지 -8일",
        "지역/방식: 전국 또는 온라인",
        "참가비: 무료",
        "기관 원본 공고 확인"
      ],
      "warnings": [
        "제출 형식은 원본 공고에서 확인 필요"
      ],
      "programIdeas": [
        "SW 심화반 문제풀이 또는 미니 프로젝트"
      ]
    }
  },
  {
    "id": "contestkorea-202607200008",
    "title": "[수상자 발표] 2026 고성 해양심층수 브랜드 AI 영상 공모전",
    "organizer": "원본 확인 필요",
    "grades": [
      "중",
      "고"
    ],
    "regions": [
      "경기",
      "경북",
      "대구",
      "대전",
      "부산",
      "서울",
      "온라인"
    ],
    "category": "과학·SW·창의",
    "start": "2026-09-17",
    "deadline": "2026-10-23",
    "dday": -7,
    "status": "마감",
    "prize": null,
    "free": true,
    "officialUrl": "https://naver.me/xXnMgc1a",
    "summary": "[수상자 발표] 2026 고성 해양심층수 브랜드 AI 영상 공모전 후보입니다. 참가대상·마감일·접수방법은 기관 원본 공고에서 확인하세요.",
    "conflict": true,
    "academyRecommendation": {
      "subjectTags": [
        "과학",
        "코딩/SW",
        "영상/미디어"
      ],
      "careerTags": [
        "이공계",
        "IT/SW",
        "미디어"
      ],
      "useCaseTags": [
        "수업연계",
        "결과물있음",
        "개별추천",
        "심화도전"
      ],
      "confidence": "높음",
      "confidenceScore": 86,
      "reasons": [
        "과학·코딩/SW 수업과 연결해 학생별 결과물 제작 과제로 활용할 수 있습니다.",
        "준비 부담이 있는 산출물 또는 전문 분야 단서가 있어 관심 학생의 심화 프로젝트 후보로 적합합니다."
      ],
      "evidence": [
        "참가대상: 중·고",
        "분야: 과학·SW·창의",
        "마감까지 -7일",
        "지역/방식: 전국 또는 온라인",
        "참가비: 무료",
        "제출물 단서: 영상/SW/보고서/창업 등 준비 부담 가능"
      ],
      "warnings": [
        "기관 원본 링크 또는 검수상태 확인 필요"
      ],
      "programIdeas": [
        "SW 심화반 문제풀이 또는 미니 프로젝트",
        "기획안 작성부터 촬영·편집까지 이어지는 영상 제작 특강"
      ]
    }
  },
  {
    "id": "contestkorea-202610280017",
    "title": "2026 제18회 전국청소년 모형항공기대회",
    "organizer": "원본 확인 필요",
    "grades": [
      "초",
      "중",
      "고"
    ],
    "regions": [
      "경기",
      "경북",
      "대구",
      "대전",
      "부산",
      "서울",
      "온라인"
    ],
    "category": "과학·SW·창의",
    "start": "2026-11-21",
    "deadline": "2026-10-26",
    "dday": -4,
    "status": "접수예정",
    "prize": null,
    "free": true,
    "officialUrl": "http://masak-k.or.kr/hanggong/index.php",
    "summary": "2026 제18회 전국청소년 모형항공기대회 후보입니다. 참가대상·마감일·접수방법은 기관 원본 공고에서 확인하세요.",
    "conflict": false,
    "academyRecommendation": {
      "subjectTags": [
        "과학",
        "코딩/SW"
      ],
      "careerTags": [
        "이공계",
        "IT/SW"
      ],
      "useCaseTags": [
        "수업연계",
        "결과물있음",
        "학부모안내",
        "개별추천",
        "심화도전"
      ],
      "confidence": "높음",
      "confidenceScore": 92,
      "reasons": [
        "과학·코딩/SW 수업과 연결해 학생별 결과물 제작 과제로 활용할 수 있습니다.",
        "기관 원본 공고가 확인되어 학부모 안내 자료로 사용하기 전 검토 부담이 낮습니다.",
        "준비 부담이 있는 산출물 또는 전문 분야 단서가 있어 관심 학생의 심화 프로젝트 후보로 적합합니다."
      ],
      "evidence": [
        "참가대상: 초·중·고",
        "분야: 과학·SW·창의",
        "마감까지 -4일",
        "지역/방식: 전국 또는 온라인",
        "참가비: 무료",
        "기관 원본 공고 확인"
      ],
      "warnings": [
        "제출 형식은 원본 공고에서 확인 필요"
      ],
      "programIdeas": [
        "SW 심화반 문제풀이 또는 미니 프로젝트"
      ]
    }
  },
  {
    "id": "contestkorea-202610230038",
    "title": "식중독 예방 숏폼 영상 공모전",
    "organizer": "원본 확인 필요",
    "grades": [
      "초",
      "중",
      "고"
    ],
    "regions": [
      "경기",
      "경북",
      "대구",
      "대전",
      "부산",
      "서울",
      "온라인"
    ],
    "category": "과학·SW·창의",
    "start": "2026-10-26",
    "deadline": "2026-10-26",
    "dday": -4,
    "status": "마감",
    "prize": null,
    "free": true,
    "officialUrl": "https://www.twitter.com/contestkorea",
    "summary": "식중독 예방 숏폼 영상 공모전 후보입니다. 참가대상·마감일·접수방법은 기관 원본 공고에서 확인하세요.",
    "conflict": false,
    "academyRecommendation": {
      "subjectTags": [
        "과학",
        "코딩/SW",
        "영상/미디어"
      ],
      "careerTags": [
        "이공계",
        "IT/SW",
        "미디어"
      ],
      "useCaseTags": [
        "수업연계",
        "결과물있음",
        "학부모안내",
        "개별추천",
        "심화도전"
      ],
      "confidence": "높음",
      "confidenceScore": 100,
      "reasons": [
        "과학·코딩/SW 수업과 연결해 학생별 결과물 제작 과제로 활용할 수 있습니다.",
        "기관 원본 공고가 확인되어 학부모 안내 자료로 사용하기 전 검토 부담이 낮습니다.",
        "준비 부담이 있는 산출물 또는 전문 분야 단서가 있어 관심 학생의 심화 프로젝트 후보로 적합합니다."
      ],
      "evidence": [
        "참가대상: 초·중·고",
        "분야: 과학·SW·창의",
        "마감까지 -4일",
        "지역/방식: 전국 또는 온라인",
        "참가비: 무료",
        "기관 원본 공고 확인"
      ],
      "warnings": [],
      "programIdeas": [
        "SW 심화반 문제풀이 또는 미니 프로젝트",
        "기획안 작성부터 촬영·편집까지 이어지는 영상 제작 특강"
      ]
    }
  },
  {
    "id": "contestkorea-202610230042",
    "title": "완주군 피지컬AI 실증단지 명칭 공모전",
    "organizer": "원본 확인 필요",
    "grades": [
      "초",
      "중",
      "고"
    ],
    "regions": [
      "경기",
      "경북",
      "대구",
      "대전",
      "부산",
      "서울",
      "온라인",
      "전북"
    ],
    "category": "과학·SW·창의",
    "start": "2026-10-26",
    "deadline": "2026-10-26",
    "dday": -4,
    "status": "마감",
    "prize": null,
    "free": true,
    "officialUrl": "https://www.twitter.com/contestkorea",
    "summary": "완주군 피지컬AI 실증단지 명칭 공모전 후보입니다. 참가대상·마감일·접수방법은 기관 원본 공고에서 확인하세요.",
    "conflict": false,
    "academyRecommendation": {
      "subjectTags": [
        "과학",
        "코딩/SW"
      ],
      "careerTags": [
        "이공계",
        "IT/SW"
      ],
      "useCaseTags": [
        "수업연계",
        "결과물있음",
        "학부모안내",
        "개별추천",
        "심화도전"
      ],
      "confidence": "높음",
      "confidenceScore": 92,
      "reasons": [
        "과학·코딩/SW 수업과 연결해 학생별 결과물 제작 과제로 활용할 수 있습니다.",
        "기관 원본 공고가 확인되어 학부모 안내 자료로 사용하기 전 검토 부담이 낮습니다.",
        "준비 부담이 있는 산출물 또는 전문 분야 단서가 있어 관심 학생의 심화 프로젝트 후보로 적합합니다."
      ],
      "evidence": [
        "참가대상: 초·중·고",
        "분야: 과학·SW·창의",
        "마감까지 -4일",
        "지역/방식: 전국 또는 온라인",
        "참가비: 무료",
        "기관 원본 공고 확인"
      ],
      "warnings": [
        "제출 형식은 원본 공고에서 확인 필요"
      ],
      "programIdeas": [
        "SW 심화반 문제풀이 또는 미니 프로젝트"
      ]
    }
  },
  {
    "id": "contestkorea-202610270020",
    "title": "2026 동피랑 아트데이 축제",
    "organizer": "원본 확인 필요",
    "grades": [
      "초",
      "중",
      "고"
    ],
    "regions": [
      "경기",
      "경북",
      "대구",
      "대전",
      "부산",
      "서울",
      "온라인"
    ],
    "category": "과학·SW·창의",
    "start": "2026-11-07",
    "deadline": "2026-10-27",
    "dday": -3,
    "status": "접수예정",
    "prize": null,
    "free": true,
    "officialUrl": "https://docs.google.com/forms/d/e/1FAIpQLSfxPoRSZnfWi6dH1Tm5QOFw6UenEyA7ccKrlGpV1GiJ9B8zFw/viewform",
    "summary": "2026 동피랑 아트데이 축제 후보입니다. 참가대상·마감일·접수방법은 기관 원본 공고에서 확인하세요.",
    "conflict": false,
    "academyRecommendation": {
      "subjectTags": [
        "과학",
        "코딩/SW",
        "미술/디자인"
      ],
      "careerTags": [
        "이공계",
        "IT/SW"
      ],
      "useCaseTags": [
        "수업연계",
        "결과물있음",
        "학부모안내",
        "심화도전"
      ],
      "confidence": "높음",
      "confidenceScore": 92,
      "reasons": [
        "과학·코딩/SW 수업과 연결해 학생별 결과물 제작 과제로 활용할 수 있습니다.",
        "기관 원본 공고가 확인되어 학부모 안내 자료로 사용하기 전 검토 부담이 낮습니다.",
        "준비 부담이 있는 산출물 또는 전문 분야 단서가 있어 관심 학생의 심화 프로젝트 후보로 적합합니다."
      ],
      "evidence": [
        "참가대상: 초·중·고",
        "분야: 과학·SW·창의",
        "마감까지 -3일",
        "지역/방식: 전국 또는 온라인",
        "참가비: 무료",
        "기관 원본 공고 확인"
      ],
      "warnings": [
        "제출 형식은 원본 공고에서 확인 필요"
      ],
      "programIdeas": [
        "SW 심화반 문제풀이 또는 미니 프로젝트",
        "포스터·웹툰·디자인 작품 제작 특강"
      ]
    }
  },
  {
    "id": "contestkorea-202610270037",
    "title": "제39회 무등일보 신춘문예",
    "organizer": "원본 확인 필요",
    "grades": [
      "초",
      "중",
      "고"
    ],
    "regions": [
      "경기",
      "경북",
      "광주",
      "대구",
      "대전",
      "부산",
      "서울",
      "온라인",
      "전남"
    ],
    "category": "과학·SW·창의",
    "start": "2026-12-07",
    "deadline": "2026-10-27",
    "dday": -3,
    "status": "접수예정",
    "prize": null,
    "free": true,
    "officialUrl": "https://www.twitter.com/contestkorea",
    "summary": "제39회 무등일보 신춘문예 후보입니다. 참가대상·마감일·접수방법은 기관 원본 공고에서 확인하세요.",
    "conflict": false,
    "academyRecommendation": {
      "subjectTags": [
        "과학",
        "코딩/SW"
      ],
      "careerTags": [
        "이공계",
        "IT/SW"
      ],
      "useCaseTags": [
        "수업연계",
        "결과물있음",
        "학부모안내",
        "개별추천",
        "심화도전"
      ],
      "confidence": "높음",
      "confidenceScore": 92,
      "reasons": [
        "과학·코딩/SW 수업과 연결해 학생별 결과물 제작 과제로 활용할 수 있습니다.",
        "기관 원본 공고가 확인되어 학부모 안내 자료로 사용하기 전 검토 부담이 낮습니다.",
        "준비 부담이 있는 산출물 또는 전문 분야 단서가 있어 관심 학생의 심화 프로젝트 후보로 적합합니다."
      ],
      "evidence": [
        "참가대상: 초·중·고",
        "분야: 과학·SW·창의",
        "마감까지 -3일",
        "지역/방식: 전국 또는 온라인",
        "참가비: 무료",
        "기관 원본 공고 확인"
      ],
      "warnings": [
        "제출 형식은 원본 공고에서 확인 필요"
      ],
      "programIdeas": [
        "SW 심화반 문제풀이 또는 미니 프로젝트"
      ]
    }
  },
  {
    "id": "contestkorea-202610280021",
    "title": "웨어러블 로봇 시장 분석 방법, 제품 개발 기획 보고서 작성 실무",
    "organizer": "원본 확인 필요",
    "grades": [
      "초",
      "중",
      "고"
    ],
    "regions": [
      "경기",
      "경북",
      "대구",
      "대전",
      "부산",
      "서울",
      "온라인"
    ],
    "category": "과학·SW·창의",
    "start": "2026-11-28",
    "deadline": "2026-10-28",
    "dday": -2,
    "status": "접수예정",
    "prize": null,
    "free": true,
    "officialUrl": "https://forms.gle/17g8u5pB4KWgE4yv6",
    "summary": "웨어러블 로봇 시장 분석 방법, 제품 개발 기획 보고서 작성 실무 후보입니다. 참가대상·마감일·접수방법은 기관 원본 공고에서 확인하세요.",
    "conflict": false,
    "academyRecommendation": {
      "subjectTags": [
        "과학",
        "코딩/SW",
        "국어/논술"
      ],
      "careerTags": [
        "이공계",
        "IT/SW"
      ],
      "useCaseTags": [
        "수업연계",
        "결과물있음",
        "학부모안내",
        "개별추천",
        "심화도전"
      ],
      "confidence": "높음",
      "confidenceScore": 100,
      "reasons": [
        "과학·코딩/SW 수업과 연결해 학생별 결과물 제작 과제로 활용할 수 있습니다.",
        "기관 원본 공고가 확인되어 학부모 안내 자료로 사용하기 전 검토 부담이 낮습니다.",
        "준비 부담이 있는 산출물 또는 전문 분야 단서가 있어 관심 학생의 심화 프로젝트 후보로 적합합니다."
      ],
      "evidence": [
        "참가대상: 초·중·고",
        "분야: 과학·SW·창의",
        "마감까지 -2일",
        "지역/방식: 전국 또는 온라인",
        "참가비: 무료",
        "기관 원본 공고 확인"
      ],
      "warnings": [],
      "programIdeas": [
        "독서·글쓰기 수업의 2~4주 결과물 프로젝트",
        "SW 심화반 문제풀이 또는 미니 프로젝트"
      ]
    }
  },
  {
    "id": "contestkorea-202610270005",
    "title": "씨뮬 전국연합 3년간 기출 모의고사 체험단 1기 모집",
    "organizer": "원본 확인 필요",
    "grades": [
      "중",
      "고"
    ],
    "regions": [
      "경기",
      "경북",
      "대구",
      "대전",
      "부산",
      "서울",
      "온라인"
    ],
    "category": "과학·SW·창의",
    "start": "2026-10-19",
    "deadline": "2026-10-29",
    "dday": -1,
    "status": "마감",
    "prize": null,
    "free": true,
    "officialUrl": "https://form.naver.com/response/CdrzHlxZY2S",
    "summary": "씨뮬 전국연합 3년간 기출 모의고사 체험단 1기 모집 후보입니다. 참가대상·마감일·접수방법은 기관 원본 공고에서 확인하세요.",
    "conflict": false,
    "academyRecommendation": {
      "subjectTags": [
        "과학",
        "코딩/SW"
      ],
      "careerTags": [
        "이공계",
        "IT/SW"
      ],
      "useCaseTags": [
        "수업연계",
        "결과물있음",
        "학부모안내",
        "개별추천",
        "심화도전"
      ],
      "confidence": "높음",
      "confidenceScore": 92,
      "reasons": [
        "과학·코딩/SW 수업과 연결해 학생별 결과물 제작 과제로 활용할 수 있습니다.",
        "기관 원본 공고가 확인되어 학부모 안내 자료로 사용하기 전 검토 부담이 낮습니다.",
        "준비 부담이 있는 산출물 또는 전문 분야 단서가 있어 관심 학생의 심화 프로젝트 후보로 적합합니다."
      ],
      "evidence": [
        "참가대상: 중·고",
        "분야: 과학·SW·창의",
        "마감까지 -1일",
        "지역/방식: 전국 또는 온라인",
        "참가비: 무료",
        "기관 원본 공고 확인"
      ],
      "warnings": [
        "제출 형식은 원본 공고에서 확인 필요"
      ],
      "programIdeas": [
        "SW 심화반 문제풀이 또는 미니 프로젝트"
      ]
    }
  },
  {
    "id": "contestkorea-202610300012",
    "title": "[무료 참가] 선도기업·투자자·전문가와 만나는 1:1 비즈니스 미팅｜2026 KOREA LBS Day",
    "organizer": "원본 확인 필요",
    "grades": [
      "초",
      "중",
      "고"
    ],
    "regions": [
      "경기",
      "경북",
      "대구",
      "대전",
      "부산",
      "서울",
      "온라인"
    ],
    "category": "과학·SW·창의",
    "start": "2026-11-18",
    "deadline": "2026-10-30",
    "dday": 0,
    "status": "접수예정",
    "prize": null,
    "free": true,
    "officialUrl": "https://forms.gle/4jxjsmhgtyrmQayj8",
    "summary": "[무료 참가] 선도기업·투자자·전문가와 만나는 1:1 비즈니스 미팅｜2026 KOREA LBS Day 후보입니다. 참가대상·마감일·접수방법은 기관 원본 공고에서 확인하세요.",
    "conflict": false,
    "academyRecommendation": {
      "subjectTags": [
        "과학",
        "코딩/SW",
        "진로/경제"
      ],
      "careerTags": [
        "이공계",
        "IT/SW"
      ],
      "useCaseTags": [
        "수업연계",
        "결과물있음",
        "학부모안내",
        "심화도전"
      ],
      "confidence": "높음",
      "confidenceScore": 92,
      "reasons": [
        "과학·코딩/SW 수업과 연결해 학생별 결과물 제작 과제로 활용할 수 있습니다.",
        "기관 원본 공고가 확인되어 학부모 안내 자료로 사용하기 전 검토 부담이 낮습니다.",
        "준비 부담이 있는 산출물 또는 전문 분야 단서가 있어 관심 학생의 심화 프로젝트 후보로 적합합니다."
      ],
      "evidence": [
        "참가대상: 초·중·고",
        "분야: 과학·SW·창의",
        "마감까지 0일",
        "지역/방식: 전국 또는 온라인",
        "참가비: 무료",
        "기관 원본 공고 확인"
      ],
      "warnings": [
        "제출 형식은 원본 공고에서 확인 필요"
      ],
      "programIdeas": [
        "SW 심화반 문제풀이 또는 미니 프로젝트",
        "아이디어 발굴과 발표자료 제작 진로 프로젝트"
      ]
    }
  },
  {
    "id": "contestkorea-202610210031",
    "title": "제17회 부산고등어축제",
    "organizer": "원본 확인 필요",
    "grades": [
      "초",
      "중",
      "고"
    ],
    "regions": [
      "경기",
      "경북",
      "대구",
      "대전",
      "부산",
      "서울",
      "온라인"
    ],
    "category": "과학·SW·창의",
    "start": "2026-10-30",
    "deadline": "2026-10-30",
    "dday": 0,
    "status": "마감임박",
    "prize": null,
    "free": true,
    "officialUrl": "https://www.twitter.com/contestkorea",
    "summary": "제17회 부산고등어축제 후보입니다. 참가대상·마감일·접수방법은 기관 원본 공고에서 확인하세요.",
    "conflict": false,
    "academyRecommendation": {
      "subjectTags": [
        "과학",
        "코딩/SW"
      ],
      "careerTags": [
        "이공계",
        "IT/SW"
      ],
      "useCaseTags": [
        "수업연계",
        "결과물있음",
        "학부모안내",
        "개별추천",
        "심화도전"
      ],
      "confidence": "높음",
      "confidenceScore": 92,
      "reasons": [
        "과학·코딩/SW 수업과 연결해 학생별 결과물 제작 과제로 활용할 수 있습니다.",
        "기관 원본 공고가 확인되어 학부모 안내 자료로 사용하기 전 검토 부담이 낮습니다.",
        "준비 부담이 있는 산출물 또는 전문 분야 단서가 있어 관심 학생의 심화 프로젝트 후보로 적합합니다."
      ],
      "evidence": [
        "참가대상: 초·중·고",
        "분야: 과학·SW·창의",
        "마감까지 0일",
        "지역/방식: 전국 또는 온라인",
        "참가비: 무료",
        "기관 원본 공고 확인"
      ],
      "warnings": [
        "제출 형식은 원본 공고에서 확인 필요"
      ],
      "programIdeas": [
        "SW 심화반 문제풀이 또는 미니 프로젝트"
      ]
    }
  },
  {
    "id": "contestkorea-202610220002",
    "title": "[굿네이버스] 좋은이웃 부산 유스크루 1기 2차 모집",
    "organizer": "원본 확인 필요",
    "grades": [
      "초",
      "중",
      "고"
    ],
    "regions": [
      "경기",
      "경북",
      "대구",
      "대전",
      "부산",
      "서울",
      "온라인"
    ],
    "category": "과학·SW·창의",
    "start": "2026-10-22",
    "deadline": "2026-10-31",
    "dday": 1,
    "status": "마감임박",
    "prize": null,
    "free": true,
    "officialUrl": "https://www.twitter.com/contestkorea",
    "summary": "[굿네이버스] 좋은이웃 부산 유스크루 1기 2차 모집 후보입니다. 참가대상·마감일·접수방법은 기관 원본 공고에서 확인하세요.",
    "conflict": false,
    "academyRecommendation": {
      "subjectTags": [
        "과학",
        "코딩/SW"
      ],
      "careerTags": [
        "이공계",
        "IT/SW"
      ],
      "useCaseTags": [
        "수업연계",
        "결과물있음",
        "학부모안내",
        "개별추천",
        "심화도전"
      ],
      "confidence": "높음",
      "confidenceScore": 92,
      "reasons": [
        "과학·코딩/SW 수업과 연결해 학생별 결과물 제작 과제로 활용할 수 있습니다.",
        "기관 원본 공고가 확인되어 학부모 안내 자료로 사용하기 전 검토 부담이 낮습니다.",
        "준비 부담이 있는 산출물 또는 전문 분야 단서가 있어 관심 학생의 심화 프로젝트 후보로 적합합니다."
      ],
      "evidence": [
        "참가대상: 초·중·고",
        "분야: 과학·SW·창의",
        "마감까지 1일",
        "지역/방식: 전국 또는 온라인",
        "참가비: 무료",
        "기관 원본 공고 확인"
      ],
      "warnings": [
        "제출 형식은 원본 공고에서 확인 필요"
      ],
      "programIdeas": [
        "SW 심화반 문제풀이 또는 미니 프로젝트"
      ]
    }
  },
  {
    "id": "contestkorea-202610290036",
    "title": "제9회 만화일러스트 공모전",
    "organizer": "원본 확인 필요",
    "grades": [
      "초",
      "중",
      "고"
    ],
    "regions": [
      "경기",
      "경북",
      "대구",
      "대전",
      "부산",
      "서울",
      "온라인"
    ],
    "category": "과학·SW·창의",
    "start": "2026-11-02",
    "deadline": "2026-11-02",
    "dday": 3,
    "status": "접수예정",
    "prize": null,
    "free": true,
    "officialUrl": "https://naver.me/FUit9XzG",
    "summary": "제9회 만화일러스트 공모전 후보입니다. 참가대상·마감일·접수방법은 기관 원본 공고에서 확인하세요.",
    "conflict": false,
    "academyRecommendation": {
      "subjectTags": [
        "과학",
        "코딩/SW",
        "미술/디자인"
      ],
      "careerTags": [
        "이공계",
        "IT/SW"
      ],
      "useCaseTags": [
        "수업연계",
        "결과물있음",
        "학부모안내",
        "심화도전"
      ],
      "confidence": "높음",
      "confidenceScore": 92,
      "reasons": [
        "과학·코딩/SW 수업과 연결해 학생별 결과물 제작 과제로 활용할 수 있습니다.",
        "기관 원본 공고가 확인되어 학부모 안내 자료로 사용하기 전 검토 부담이 낮습니다.",
        "준비 부담이 있는 산출물 또는 전문 분야 단서가 있어 관심 학생의 심화 프로젝트 후보로 적합합니다."
      ],
      "evidence": [
        "참가대상: 초·중·고",
        "분야: 과학·SW·창의",
        "마감까지 3일",
        "지역/방식: 전국 또는 온라인",
        "참가비: 무료",
        "기관 원본 공고 확인"
      ],
      "warnings": [
        "제출 형식은 원본 공고에서 확인 필요"
      ],
      "programIdeas": [
        "SW 심화반 문제풀이 또는 미니 프로젝트",
        "포스터·웹툰·디자인 작품 제작 특강"
      ]
    }
  },
  {
    "id": "contestkorea-202610260027",
    "title": "BYC 아동복 코코모메 2026 F/W 서포터즈 모집",
    "organizer": "원본 확인 필요",
    "grades": [
      "초"
    ],
    "regions": [
      "경기",
      "경북",
      "대구",
      "대전",
      "부산",
      "서울",
      "온라인"
    ],
    "category": "과학·SW·창의",
    "start": "2026-10-26",
    "deadline": "2026-11-06",
    "dday": 7,
    "status": "마감임박",
    "prize": null,
    "free": true,
    "officialUrl": "https://form.naver.com/response/IX6qma2iPhJ",
    "summary": "BYC 아동복 코코모메 2026 F/W 서포터즈 모집 후보입니다. 참가대상·마감일·접수방법은 기관 원본 공고에서 확인하세요.",
    "conflict": false,
    "academyRecommendation": {
      "subjectTags": [
        "과학",
        "코딩/SW"
      ],
      "careerTags": [
        "이공계",
        "IT/SW"
      ],
      "useCaseTags": [
        "수업연계",
        "결과물있음",
        "학부모안내",
        "개별추천",
        "심화도전"
      ],
      "confidence": "높음",
      "confidenceScore": 92,
      "reasons": [
        "과학·코딩/SW 수업과 연결해 학생별 결과물 제작 과제로 활용할 수 있습니다.",
        "기관 원본 공고가 확인되어 학부모 안내 자료로 사용하기 전 검토 부담이 낮습니다.",
        "준비 부담이 있는 산출물 또는 전문 분야 단서가 있어 관심 학생의 심화 프로젝트 후보로 적합합니다."
      ],
      "evidence": [
        "참가대상: 초",
        "분야: 과학·SW·창의",
        "마감까지 7일",
        "지역/방식: 전국 또는 온라인",
        "참가비: 무료",
        "기관 원본 공고 확인"
      ],
      "warnings": [
        "제출 형식은 원본 공고에서 확인 필요"
      ],
      "programIdeas": [
        "SW 심화반 문제풀이 또는 미니 프로젝트"
      ]
    }
  },
  {
    "id": "contestkorea-202610150006",
    "title": "내 폰 안의 부산대자율상권 숏폼 공모전",
    "organizer": "원본 확인 필요",
    "grades": [
      "초",
      "중",
      "고"
    ],
    "regions": [
      "경기",
      "경북",
      "대구",
      "대전",
      "부산",
      "서울",
      "온라인"
    ],
    "category": "과학·SW·창의",
    "start": "2026-10-13",
    "deadline": "2026-11-08",
    "dday": 9,
    "status": "접수중",
    "prize": null,
    "free": true,
    "officialUrl": "https://forms.gle/nLJBsViVoju8GYAv6",
    "summary": "내 폰 안의 부산대자율상권 숏폼 공모전 후보입니다. 참가대상·마감일·접수방법은 기관 원본 공고에서 확인하세요.",
    "conflict": false,
    "academyRecommendation": {
      "subjectTags": [
        "과학",
        "코딩/SW",
        "영상/미디어"
      ],
      "careerTags": [
        "이공계",
        "IT/SW",
        "미디어"
      ],
      "useCaseTags": [
        "수업연계",
        "결과물있음",
        "학부모안내",
        "개별추천",
        "심화도전"
      ],
      "confidence": "높음",
      "confidenceScore": 100,
      "reasons": [
        "과학·코딩/SW 수업과 연결해 학생별 결과물 제작 과제로 활용할 수 있습니다.",
        "기관 원본 공고가 확인되어 학부모 안내 자료로 사용하기 전 검토 부담이 낮습니다.",
        "준비 부담이 있는 산출물 또는 전문 분야 단서가 있어 관심 학생의 심화 프로젝트 후보로 적합합니다."
      ],
      "evidence": [
        "참가대상: 초·중·고",
        "분야: 과학·SW·창의",
        "마감까지 9일",
        "지역/방식: 전국 또는 온라인",
        "참가비: 무료",
        "기관 원본 공고 확인"
      ],
      "warnings": [],
      "programIdeas": [
        "SW 심화반 문제풀이 또는 미니 프로젝트",
        "기획안 작성부터 촬영·편집까지 이어지는 영상 제작 특강"
      ]
    }
  },
  {
    "id": "contestkorea-202610280053",
    "title": "2026 「다시, 다리다」 유휴공간 활성화 아이디어 공모전",
    "organizer": "원본 확인 필요",
    "grades": [
      "초",
      "중",
      "고"
    ],
    "regions": [
      "경기",
      "경북",
      "대구",
      "대전",
      "부산",
      "서울",
      "온라인"
    ],
    "category": "과학·SW·창의",
    "start": "2026-10-28",
    "deadline": "2026-11-09",
    "dday": 10,
    "status": "접수중",
    "prize": null,
    "free": true,
    "officialUrl": "https://www.twitter.com/contestkorea",
    "summary": "2026 「다시, 다리다」 유휴공간 활성화 아이디어 공모전 후보입니다. 참가대상·마감일·접수방법은 기관 원본 공고에서 확인하세요.",
    "conflict": false,
    "academyRecommendation": {
      "subjectTags": [
        "과학",
        "코딩/SW",
        "국어/논술",
        "진로/경제"
      ],
      "careerTags": [
        "이공계",
        "IT/SW"
      ],
      "useCaseTags": [
        "수업연계",
        "결과물있음",
        "학부모안내",
        "심화도전"
      ],
      "confidence": "높음",
      "confidenceScore": 100,
      "reasons": [
        "과학·코딩/SW 수업과 연결해 학생별 결과물 제작 과제로 활용할 수 있습니다.",
        "기관 원본 공고가 확인되어 학부모 안내 자료로 사용하기 전 검토 부담이 낮습니다.",
        "준비 부담이 있는 산출물 또는 전문 분야 단서가 있어 관심 학생의 심화 프로젝트 후보로 적합합니다."
      ],
      "evidence": [
        "참가대상: 초·중·고",
        "분야: 과학·SW·창의",
        "마감까지 10일",
        "지역/방식: 전국 또는 온라인",
        "참가비: 무료",
        "기관 원본 공고 확인"
      ],
      "warnings": [],
      "programIdeas": [
        "독서·글쓰기 수업의 2~4주 결과물 프로젝트",
        "SW 심화반 문제풀이 또는 미니 프로젝트",
        "아이디어 발굴과 발표자료 제작 진로 프로젝트"
      ]
    }
  },
  {
    "id": "contestkorea-202610290043",
    "title": "2026 유성구 관광 크리에이터 모집",
    "organizer": "원본 확인 필요",
    "grades": [
      "초",
      "중",
      "고"
    ],
    "regions": [
      "경기",
      "경북",
      "대구",
      "대전",
      "부산",
      "서울",
      "온라인"
    ],
    "category": "과학·SW·창의",
    "start": "2026-10-08",
    "deadline": "2026-11-11",
    "dday": 12,
    "status": "접수중",
    "prize": null,
    "free": true,
    "officialUrl": "https://docs.google.com/forms/d/e/1FAIpQLSfGQFrAWKJUXNkb1YQvZc2o8MdiIxnpKxEU0cfs1SabkLttNg/viewform",
    "summary": "2026 유성구 관광 크리에이터 모집 후보입니다. 참가대상·마감일·접수방법은 기관 원본 공고에서 확인하세요.",
    "conflict": false,
    "academyRecommendation": {
      "subjectTags": [
        "과학",
        "코딩/SW"
      ],
      "careerTags": [
        "이공계",
        "IT/SW"
      ],
      "useCaseTags": [
        "수업연계",
        "결과물있음",
        "학부모안내",
        "개별추천",
        "심화도전"
      ],
      "confidence": "높음",
      "confidenceScore": 92,
      "reasons": [
        "과학·코딩/SW 수업과 연결해 학생별 결과물 제작 과제로 활용할 수 있습니다.",
        "기관 원본 공고가 확인되어 학부모 안내 자료로 사용하기 전 검토 부담이 낮습니다.",
        "준비 부담이 있는 산출물 또는 전문 분야 단서가 있어 관심 학생의 심화 프로젝트 후보로 적합합니다."
      ],
      "evidence": [
        "참가대상: 초·중·고",
        "분야: 과학·SW·창의",
        "마감까지 12일",
        "지역/방식: 전국 또는 온라인",
        "참가비: 무료",
        "기관 원본 공고 확인"
      ],
      "warnings": [
        "제출 형식은 원본 공고에서 확인 필요"
      ],
      "programIdeas": [
        "SW 심화반 문제풀이 또는 미니 프로젝트"
      ]
    }
  },
  {
    "id": "contestkorea-202610220045",
    "title": "AI 콘텐츠 페스티벌 2026",
    "organizer": "원본 확인 필요",
    "grades": [
      "초",
      "중",
      "고"
    ],
    "regions": [
      "경기",
      "경북",
      "대구",
      "대전",
      "부산",
      "서울",
      "온라인"
    ],
    "category": "과학·SW·창의",
    "start": "2026-11-12",
    "deadline": "2026-11-12",
    "dday": 13,
    "status": "접수예정",
    "prize": null,
    "free": true,
    "officialUrl": "https://fd.sysforu.co.kr/2026/aicontentfestival/BF/",
    "summary": "AI 콘텐츠 페스티벌 2026 후보입니다. 참가대상·마감일·접수방법은 기관 원본 공고에서 확인하세요.",
    "conflict": false,
    "academyRecommendation": {
      "subjectTags": [
        "과학",
        "코딩/SW",
        "영상/미디어"
      ],
      "careerTags": [
        "이공계",
        "IT/SW",
        "미디어"
      ],
      "useCaseTags": [
        "수업연계",
        "결과물있음",
        "학부모안내",
        "심화도전"
      ],
      "confidence": "높음",
      "confidenceScore": 92,
      "reasons": [
        "과학·코딩/SW 수업과 연결해 학생별 결과물 제작 과제로 활용할 수 있습니다.",
        "기관 원본 공고가 확인되어 학부모 안내 자료로 사용하기 전 검토 부담이 낮습니다.",
        "준비 부담이 있는 산출물 또는 전문 분야 단서가 있어 관심 학생의 심화 프로젝트 후보로 적합합니다."
      ],
      "evidence": [
        "참가대상: 초·중·고",
        "분야: 과학·SW·창의",
        "마감까지 13일",
        "지역/방식: 전국 또는 온라인",
        "참가비: 무료",
        "기관 원본 공고 확인"
      ],
      "warnings": [
        "제출 형식은 원본 공고에서 확인 필요"
      ],
      "programIdeas": [
        "SW 심화반 문제풀이 또는 미니 프로젝트",
        "기획안 작성부터 촬영·편집까지 이어지는 영상 제작 특강"
      ]
    }
  },
  {
    "id": "contestkorea-202610240004",
    "title": "동작구 관내 공원 시설명칭 공모",
    "organizer": "원본 확인 필요",
    "grades": [
      "초",
      "중",
      "고"
    ],
    "regions": [
      "경기",
      "경북",
      "대구",
      "대전",
      "부산",
      "서울",
      "온라인"
    ],
    "category": "과학·SW·창의",
    "start": "2026-10-20",
    "deadline": "2026-11-18",
    "dday": 19,
    "status": "접수중",
    "prize": null,
    "free": true,
    "officialUrl": "https://www.twitter.com/contestkorea",
    "summary": "동작구 관내 공원 시설명칭 공모 후보입니다. 참가대상·마감일·접수방법은 기관 원본 공고에서 확인하세요.",
    "conflict": false,
    "academyRecommendation": {
      "subjectTags": [
        "과학",
        "코딩/SW",
        "국어/논술"
      ],
      "careerTags": [
        "이공계",
        "IT/SW"
      ],
      "useCaseTags": [
        "수업연계",
        "결과물있음",
        "학부모안내",
        "심화도전"
      ],
      "confidence": "높음",
      "confidenceScore": 92,
      "reasons": [
        "과학·코딩/SW 수업과 연결해 학생별 결과물 제작 과제로 활용할 수 있습니다.",
        "기관 원본 공고가 확인되어 학부모 안내 자료로 사용하기 전 검토 부담이 낮습니다.",
        "준비 부담이 있는 산출물 또는 전문 분야 단서가 있어 관심 학생의 심화 프로젝트 후보로 적합합니다."
      ],
      "evidence": [
        "참가대상: 초·중·고",
        "분야: 과학·SW·창의",
        "마감까지 19일",
        "지역/방식: 전국 또는 온라인",
        "참가비: 무료",
        "기관 원본 공고 확인"
      ],
      "warnings": [
        "제출 형식은 원본 공고에서 확인 필요"
      ],
      "programIdeas": [
        "독서·글쓰기 수업의 2~4주 결과물 프로젝트",
        "SW 심화반 문제풀이 또는 미니 프로젝트"
      ]
    }
  },
  {
    "id": "contestkorea-202610270019",
    "title": "이스타항공 기내식 레시피 공모전",
    "organizer": "원본 확인 필요",
    "grades": [
      "초",
      "중",
      "고"
    ],
    "regions": [
      "경기",
      "경북",
      "대구",
      "대전",
      "부산",
      "서울",
      "온라인"
    ],
    "category": "과학·SW·창의",
    "start": "2026-10-23",
    "deadline": "2026-11-20",
    "dday": 21,
    "status": "접수중",
    "prize": null,
    "free": true,
    "officialUrl": "https://forms.gle/iaqYmNA6mJUVowme9",
    "summary": "이스타항공 기내식 레시피 공모전 후보입니다. 참가대상·마감일·접수방법은 기관 원본 공고에서 확인하세요.",
    "conflict": false,
    "academyRecommendation": {
      "subjectTags": [
        "과학",
        "코딩/SW",
        "국어/논술"
      ],
      "careerTags": [
        "이공계",
        "IT/SW"
      ],
      "useCaseTags": [
        "수업연계",
        "결과물있음",
        "특강가능",
        "학부모안내",
        "심화도전"
      ],
      "confidence": "높음",
      "confidenceScore": 92,
      "reasons": [
        "마감까지 3주 이상 남아 결과물 제작형 수업이나 단기 특강으로 연결하기 좋습니다.",
        "과학·코딩/SW 수업과 연결해 학생별 결과물 제작 과제로 활용할 수 있습니다.",
        "기관 원본 공고가 확인되어 학부모 안내 자료로 사용하기 전 검토 부담이 낮습니다."
      ],
      "evidence": [
        "참가대상: 초·중·고",
        "분야: 과학·SW·창의",
        "마감까지 21일",
        "지역/방식: 전국 또는 온라인",
        "참가비: 무료",
        "기관 원본 공고 확인"
      ],
      "warnings": [
        "제출 형식은 원본 공고에서 확인 필요"
      ],
      "programIdeas": [
        "독서·글쓰기 수업의 2~4주 결과물 프로젝트",
        "SW 심화반 문제풀이 또는 미니 프로젝트"
      ]
    }
  },
  {
    "id": "contestkorea-202610080033",
    "title": "제14회 계란요리경연대회 & 제2회 알&닭 펫푸드경연대회",
    "organizer": "원본 확인 필요",
    "grades": [
      "초",
      "중",
      "고"
    ],
    "regions": [
      "경기",
      "경북",
      "대구",
      "대전",
      "부산",
      "서울",
      "세종",
      "온라인"
    ],
    "category": "과학·SW·창의",
    "start": "2026-10-05",
    "deadline": "2026-11-21",
    "dday": 22,
    "status": "접수중",
    "prize": null,
    "free": true,
    "officialUrl": "https://docs.google.com/forms/d/e/1FAIpQLSenshJ-n3IvDqXhc3lNX8HXiYaO5lQCTBfr84XrQuhqrcHeXg/formResponse",
    "summary": "제14회 계란요리경연대회 & 제2회 알&닭 펫푸드경연대회 후보입니다. 참가대상·마감일·접수방법은 기관 원본 공고에서 확인하세요.",
    "conflict": false,
    "academyRecommendation": {
      "subjectTags": [
        "과학",
        "코딩/SW"
      ],
      "careerTags": [
        "이공계",
        "IT/SW"
      ],
      "useCaseTags": [
        "수업연계",
        "결과물있음",
        "특강가능",
        "학부모안내",
        "개별추천",
        "심화도전"
      ],
      "confidence": "높음",
      "confidenceScore": 92,
      "reasons": [
        "마감까지 3주 이상 남아 결과물 제작형 수업이나 단기 특강으로 연결하기 좋습니다.",
        "과학·코딩/SW 수업과 연결해 학생별 결과물 제작 과제로 활용할 수 있습니다.",
        "기관 원본 공고가 확인되어 학부모 안내 자료로 사용하기 전 검토 부담이 낮습니다."
      ],
      "evidence": [
        "참가대상: 초·중·고",
        "분야: 과학·SW·창의",
        "마감까지 22일",
        "지역/방식: 전국 또는 온라인",
        "참가비: 무료",
        "기관 원본 공고 확인"
      ],
      "warnings": [
        "제출 형식은 원본 공고에서 확인 필요"
      ],
      "programIdeas": [
        "SW 심화반 문제풀이 또는 미니 프로젝트"
      ]
    }
  },
  {
    "id": "contestkorea-202610300023",
    "title": "강남구중독관리통합지원센터 캐릭터 공모전",
    "organizer": "원본 확인 필요",
    "grades": [
      "중",
      "고"
    ],
    "regions": [
      "경기",
      "경북",
      "대구",
      "대전",
      "부산",
      "서울",
      "온라인"
    ],
    "category": "과학·SW·창의",
    "start": "2026-11-02",
    "deadline": "2026-11-22",
    "dday": 23,
    "status": "접수예정",
    "prize": null,
    "free": true,
    "officialUrl": "https://www.twitter.com/contestkorea",
    "summary": "강남구중독관리통합지원센터 캐릭터 공모전 후보입니다. 참가대상·마감일·접수방법은 기관 원본 공고에서 확인하세요.",
    "conflict": false,
    "academyRecommendation": {
      "subjectTags": [
        "과학",
        "코딩/SW"
      ],
      "careerTags": [
        "이공계",
        "IT/SW"
      ],
      "useCaseTags": [
        "수업연계",
        "결과물있음",
        "특강가능",
        "학부모안내",
        "개별추천",
        "심화도전"
      ],
      "confidence": "높음",
      "confidenceScore": 92,
      "reasons": [
        "마감까지 3주 이상 남아 결과물 제작형 수업이나 단기 특강으로 연결하기 좋습니다.",
        "과학·코딩/SW 수업과 연결해 학생별 결과물 제작 과제로 활용할 수 있습니다.",
        "기관 원본 공고가 확인되어 학부모 안내 자료로 사용하기 전 검토 부담이 낮습니다."
      ],
      "evidence": [
        "참가대상: 중·고",
        "분야: 과학·SW·창의",
        "마감까지 23일",
        "지역/방식: 전국 또는 온라인",
        "참가비: 무료",
        "기관 원본 공고 확인"
      ],
      "warnings": [
        "제출 형식은 원본 공고에서 확인 필요"
      ],
      "programIdeas": [
        "SW 심화반 문제풀이 또는 미니 프로젝트"
      ]
    }
  },
  {
    "id": "contestkorea-202610300005",
    "title": "2026 성평등 AI 벤치마크 챌린지",
    "organizer": "원본 확인 필요",
    "grades": [
      "초",
      "중",
      "고"
    ],
    "regions": [
      "경기",
      "경북",
      "대구",
      "대전",
      "부산",
      "서울",
      "온라인"
    ],
    "category": "과학·SW·창의",
    "start": "2026-11-02",
    "deadline": "2026-11-26",
    "dday": 27,
    "status": "접수예정",
    "prize": null,
    "free": true,
    "officialUrl": "https://www.mogefdatacontest.co.kr/index.jsp",
    "summary": "2026 성평등 AI 벤치마크 챌린지 후보입니다. 참가대상·마감일·접수방법은 기관 원본 공고에서 확인하세요.",
    "conflict": false,
    "academyRecommendation": {
      "subjectTags": [
        "과학",
        "코딩/SW"
      ],
      "careerTags": [
        "이공계",
        "IT/SW"
      ],
      "useCaseTags": [
        "수업연계",
        "결과물있음",
        "특강가능",
        "학부모안내",
        "개별추천",
        "심화도전"
      ],
      "confidence": "높음",
      "confidenceScore": 92,
      "reasons": [
        "마감까지 3주 이상 남아 결과물 제작형 수업이나 단기 특강으로 연결하기 좋습니다.",
        "과학·코딩/SW 수업과 연결해 학생별 결과물 제작 과제로 활용할 수 있습니다.",
        "기관 원본 공고가 확인되어 학부모 안내 자료로 사용하기 전 검토 부담이 낮습니다."
      ],
      "evidence": [
        "참가대상: 초·중·고",
        "분야: 과학·SW·창의",
        "마감까지 27일",
        "지역/방식: 전국 또는 온라인",
        "참가비: 무료",
        "기관 원본 공고 확인"
      ],
      "warnings": [
        "제출 형식은 원본 공고에서 확인 필요"
      ],
      "programIdeas": [
        "SW 심화반 문제풀이 또는 미니 프로젝트"
      ]
    }
  },
  {
    "id": "contestkorea-202610300003",
    "title": "2026년 대국민 재정교육 아이디어 공모전",
    "organizer": "원본 확인 필요",
    "grades": [
      "초",
      "중",
      "고"
    ],
    "regions": [
      "경기",
      "경북",
      "대구",
      "대전",
      "부산",
      "서울",
      "온라인"
    ],
    "category": "과학·SW·창의",
    "start": "2026-10-30",
    "deadline": "2026-11-27",
    "dday": 28,
    "status": "접수중",
    "prize": null,
    "free": true,
    "officialUrl": "https://buly.kr/2qbUIR9",
    "summary": "2026년 대국민 재정교육 아이디어 공모전 후보입니다. 참가대상·마감일·접수방법은 기관 원본 공고에서 확인하세요.",
    "conflict": true,
    "academyRecommendation": {
      "subjectTags": [
        "과학",
        "코딩/SW",
        "진로/경제"
      ],
      "careerTags": [
        "이공계",
        "IT/SW"
      ],
      "useCaseTags": [
        "수업연계",
        "결과물있음",
        "특강가능",
        "초보도전",
        "심화도전"
      ],
      "confidence": "높음",
      "confidenceScore": 86,
      "reasons": [
        "참가대상·마감여유·무료/전국 조건과 가벼운 제출물 단서가 있어 첫 도전 후보로 검토할 수 있습니다.",
        "마감까지 3주 이상 남아 결과물 제작형 수업이나 단기 특강으로 연결하기 좋습니다.",
        "과학·코딩/SW 수업과 연결해 학생별 결과물 제작 과제로 활용할 수 있습니다."
      ],
      "evidence": [
        "참가대상: 초·중·고",
        "분야: 과학·SW·창의",
        "마감까지 28일",
        "지역/방식: 전국 또는 온라인",
        "참가비: 무료",
        "제출물 단서: 글/그림/아이디어 등 비교적 가벼운 산출물"
      ],
      "warnings": [
        "기관 원본 링크 또는 검수상태 확인 필요"
      ],
      "programIdeas": [
        "SW 심화반 문제풀이 또는 미니 프로젝트",
        "아이디어 발굴과 발표자료 제작 진로 프로젝트"
      ]
    }
  },
  {
    "id": "contestkorea-202610300002",
    "title": "문경시 관광 AI 영상 공모전",
    "organizer": "원본 확인 필요",
    "grades": [
      "초",
      "중",
      "고"
    ],
    "regions": [
      "경기",
      "경북",
      "대구",
      "대전",
      "부산",
      "서울",
      "온라인"
    ],
    "category": "과학·SW·창의",
    "start": "2026-10-26",
    "deadline": "2026-11-30",
    "dday": 31,
    "status": "접수중",
    "prize": null,
    "free": true,
    "officialUrl": "https://www.twitter.com/contestkorea",
    "summary": "문경시 관광 AI 영상 공모전 후보입니다. 참가대상·마감일·접수방법은 기관 원본 공고에서 확인하세요.",
    "conflict": false,
    "academyRecommendation": {
      "subjectTags": [
        "과학",
        "코딩/SW",
        "국어/논술",
        "영상/미디어"
      ],
      "careerTags": [
        "이공계",
        "IT/SW",
        "미디어"
      ],
      "useCaseTags": [
        "수업연계",
        "결과물있음",
        "특강가능",
        "학부모안내",
        "개별추천",
        "심화도전"
      ],
      "confidence": "높음",
      "confidenceScore": 100,
      "reasons": [
        "마감까지 3주 이상 남아 결과물 제작형 수업이나 단기 특강으로 연결하기 좋습니다.",
        "과학·코딩/SW 수업과 연결해 학생별 결과물 제작 과제로 활용할 수 있습니다.",
        "기관 원본 공고가 확인되어 학부모 안내 자료로 사용하기 전 검토 부담이 낮습니다."
      ],
      "evidence": [
        "참가대상: 초·중·고",
        "분야: 과학·SW·창의",
        "마감까지 31일",
        "지역/방식: 전국 또는 온라인",
        "참가비: 무료",
        "기관 원본 공고 확인"
      ],
      "warnings": [],
      "programIdeas": [
        "독서·글쓰기 수업의 2~4주 결과물 프로젝트",
        "SW 심화반 문제풀이 또는 미니 프로젝트",
        "기획안 작성부터 촬영·편집까지 이어지는 영상 제작 특강"
      ]
    }
  },
  {
    "id": "contestkorea-202610300001",
    "title": "2026 경산시 AI 미디어 콘텐츠 공모전 「AI·스마트도시·YOUR STORY」",
    "organizer": "원본 확인 필요",
    "grades": [
      "초",
      "중",
      "고"
    ],
    "regions": [
      "경기",
      "경북",
      "대구",
      "대전",
      "부산",
      "서울",
      "온라인"
    ],
    "category": "과학·SW·창의",
    "start": "2026-11-09",
    "deadline": "2026-12-05",
    "dday": 36,
    "status": "접수예정",
    "prize": null,
    "free": true,
    "officialUrl": "https://aiart.gbgs.art/",
    "summary": "2026 경산시 AI 미디어 콘텐츠 공모전 「AI·스마트도시·YOUR STORY」 후보입니다. 참가대상·마감일·접수방법은 기관 원본 공고에서 확인하세요.",
    "conflict": false,
    "academyRecommendation": {
      "subjectTags": [
        "과학",
        "코딩/SW",
        "국어/논술",
        "영상/미디어"
      ],
      "careerTags": [
        "이공계",
        "IT/SW",
        "미디어"
      ],
      "useCaseTags": [
        "수업연계",
        "결과물있음",
        "특강가능",
        "학부모안내",
        "심화도전"
      ],
      "confidence": "높음",
      "confidenceScore": 92,
      "reasons": [
        "마감까지 3주 이상 남아 결과물 제작형 수업이나 단기 특강으로 연결하기 좋습니다.",
        "과학·코딩/SW 수업과 연결해 학생별 결과물 제작 과제로 활용할 수 있습니다.",
        "기관 원본 공고가 확인되어 학부모 안내 자료로 사용하기 전 검토 부담이 낮습니다."
      ],
      "evidence": [
        "참가대상: 초·중·고",
        "분야: 과학·SW·창의",
        "마감까지 36일",
        "지역/방식: 전국 또는 온라인",
        "참가비: 무료",
        "기관 원본 공고 확인"
      ],
      "warnings": [
        "제출 형식은 원본 공고에서 확인 필요"
      ],
      "programIdeas": [
        "독서·글쓰기 수업의 2~4주 결과물 프로젝트",
        "SW 심화반 문제풀이 또는 미니 프로젝트",
        "기획안 작성부터 촬영·편집까지 이어지는 영상 제작 특강"
      ]
    }
  },
  {
    "id": "contestkorea-202610230030",
    "title": "제2회 코리아 프롬스(오케스트라 협연 콩쿠르)",
    "organizer": "원본 확인 필요",
    "grades": [
      "중",
      "고"
    ],
    "regions": [
      "경기",
      "경북",
      "대구",
      "대전",
      "부산",
      "서울",
      "온라인"
    ],
    "category": "과학·SW·창의",
    "start": "2026-11-23",
    "deadline": "2026-12-06",
    "dday": 37,
    "status": "접수예정",
    "prize": null,
    "free": true,
    "officialUrl": "https://docs.google.com/forms/d/e/1FAIpQLScdmi1OBDKEaQgoqHIqn1EBd5Pm69DJjMCd2MFQNRR_t8ltiA/viewform",
    "summary": "제2회 코리아 프롬스(오케스트라 협연 콩쿠르) 후보입니다. 참가대상·마감일·접수방법은 기관 원본 공고에서 확인하세요.",
    "conflict": false,
    "academyRecommendation": {
      "subjectTags": [
        "과학",
        "코딩/SW"
      ],
      "careerTags": [
        "이공계",
        "IT/SW"
      ],
      "useCaseTags": [
        "수업연계",
        "결과물있음",
        "특강가능",
        "학부모안내",
        "개별추천",
        "심화도전"
      ],
      "confidence": "높음",
      "confidenceScore": 92,
      "reasons": [
        "마감까지 3주 이상 남아 결과물 제작형 수업이나 단기 특강으로 연결하기 좋습니다.",
        "과학·코딩/SW 수업과 연결해 학생별 결과물 제작 과제로 활용할 수 있습니다.",
        "기관 원본 공고가 확인되어 학부모 안내 자료로 사용하기 전 검토 부담이 낮습니다."
      ],
      "evidence": [
        "참가대상: 중·고",
        "분야: 과학·SW·창의",
        "마감까지 37일",
        "지역/방식: 전국 또는 온라인",
        "참가비: 무료",
        "기관 원본 공고 확인"
      ],
      "warnings": [
        "제출 형식은 원본 공고에서 확인 필요"
      ],
      "programIdeas": [
        "SW 심화반 문제풀이 또는 미니 프로젝트"
      ]
    }
  },
  {
    "id": "contestkorea-202610180002",
    "title": "중구 관광홍보콘텐츠(숏츠&아티클) 공모전 '중구하루여행'",
    "organizer": "원본 확인 필요",
    "grades": [
      "초",
      "중",
      "고"
    ],
    "regions": [
      "경기",
      "경북",
      "대구",
      "대전",
      "부산",
      "서울",
      "온라인"
    ],
    "category": "과학·SW·창의",
    "start": "2026-10-16",
    "deadline": "2026-12-11",
    "dday": 42,
    "status": "접수중",
    "prize": null,
    "free": true,
    "officialUrl": "https://www.twitter.com/contestkorea",
    "summary": "중구 관광홍보콘텐츠(숏츠&아티클) 공모전 '중구하루여행' 후보입니다. 참가대상·마감일·접수방법은 기관 원본 공고에서 확인하세요.",
    "conflict": false,
    "academyRecommendation": {
      "subjectTags": [
        "과학",
        "코딩/SW",
        "영상/미디어"
      ],
      "careerTags": [
        "이공계",
        "IT/SW",
        "미디어"
      ],
      "useCaseTags": [
        "수업연계",
        "결과물있음",
        "특강가능",
        "학부모안내",
        "심화도전"
      ],
      "confidence": "높음",
      "confidenceScore": 92,
      "reasons": [
        "마감까지 3주 이상 남아 결과물 제작형 수업이나 단기 특강으로 연결하기 좋습니다.",
        "과학·코딩/SW 수업과 연결해 학생별 결과물 제작 과제로 활용할 수 있습니다.",
        "기관 원본 공고가 확인되어 학부모 안내 자료로 사용하기 전 검토 부담이 낮습니다."
      ],
      "evidence": [
        "참가대상: 초·중·고",
        "분야: 과학·SW·창의",
        "마감까지 42일",
        "지역/방식: 전국 또는 온라인",
        "참가비: 무료",
        "기관 원본 공고 확인"
      ],
      "warnings": [
        "제출 형식은 원본 공고에서 확인 필요"
      ],
      "programIdeas": [
        "SW 심화반 문제풀이 또는 미니 프로젝트",
        "기획안 작성부터 촬영·편집까지 이어지는 영상 제작 특강"
      ]
    }
  },
  {
    "id": "contestkorea-202610290008",
    "title": "2026-2027 서울영아티스트 전국 음악콩쿠르(온라인)",
    "organizer": "원본 확인 필요",
    "grades": [
      "초",
      "중",
      "고"
    ],
    "regions": [
      "경기",
      "경북",
      "대구",
      "대전",
      "부산",
      "서울",
      "온라인"
    ],
    "category": "과학·SW·창의",
    "start": "2026-11-28",
    "deadline": "2026-12-19",
    "dday": 50,
    "status": "접수예정",
    "prize": null,
    "free": true,
    "officialUrl": "https://seoulyoungartist.com/%ec%98%a8%eb%9d%bc%ec%9d%b8-%ec%8b%a0%ec%b2%ad/",
    "summary": "2026-2027 서울영아티스트 전국 음악콩쿠르(온라인) 후보입니다. 참가대상·마감일·접수방법은 기관 원본 공고에서 확인하세요.",
    "conflict": false,
    "academyRecommendation": {
      "subjectTags": [
        "과학",
        "코딩/SW"
      ],
      "careerTags": [
        "이공계",
        "IT/SW"
      ],
      "useCaseTags": [
        "수업연계",
        "결과물있음",
        "특강가능",
        "학부모안내",
        "개별추천",
        "심화도전"
      ],
      "confidence": "높음",
      "confidenceScore": 92,
      "reasons": [
        "마감까지 3주 이상 남아 결과물 제작형 수업이나 단기 특강으로 연결하기 좋습니다.",
        "과학·코딩/SW 수업과 연결해 학생별 결과물 제작 과제로 활용할 수 있습니다.",
        "기관 원본 공고가 확인되어 학부모 안내 자료로 사용하기 전 검토 부담이 낮습니다."
      ],
      "evidence": [
        "참가대상: 초·중·고",
        "분야: 과학·SW·창의",
        "마감까지 50일",
        "지역/방식: 전국 또는 온라인",
        "참가비: 무료",
        "기관 원본 공고 확인"
      ],
      "warnings": [
        "제출 형식은 원본 공고에서 확인 필요"
      ],
      "programIdeas": [
        "SW 심화반 문제풀이 또는 미니 프로젝트"
      ]
    }
  },
  {
    "id": "contestkorea-202610010030",
    "title": "제1회 중앙일보 어린이 미술대회",
    "organizer": "원본 확인 필요",
    "grades": [
      "초"
    ],
    "regions": [
      "경기",
      "경북",
      "대구",
      "대전",
      "부산",
      "서울",
      "온라인"
    ],
    "category": "과학·SW·창의",
    "start": "2026-10-26",
    "deadline": "2026-12-21",
    "dday": 52,
    "status": "접수중",
    "prize": null,
    "free": true,
    "officialUrl": "https://joongangkidsart.co.kr/index.html",
    "summary": "제1회 중앙일보 어린이 미술대회 후보입니다. 참가대상·마감일·접수방법은 기관 원본 공고에서 확인하세요.",
    "conflict": false,
    "academyRecommendation": {
      "subjectTags": [
        "과학",
        "코딩/SW",
        "미술/디자인"
      ],
      "careerTags": [
        "이공계",
        "IT/SW"
      ],
      "useCaseTags": [
        "수업연계",
        "결과물있음",
        "특강가능",
        "학부모안내",
        "심화도전"
      ],
      "confidence": "높음",
      "confidenceScore": 92,
      "reasons": [
        "마감까지 3주 이상 남아 결과물 제작형 수업이나 단기 특강으로 연결하기 좋습니다.",
        "과학·코딩/SW 수업과 연결해 학생별 결과물 제작 과제로 활용할 수 있습니다.",
        "기관 원본 공고가 확인되어 학부모 안내 자료로 사용하기 전 검토 부담이 낮습니다."
      ],
      "evidence": [
        "참가대상: 초",
        "분야: 과학·SW·창의",
        "마감까지 52일",
        "지역/방식: 전국 또는 온라인",
        "참가비: 무료",
        "기관 원본 공고 확인"
      ],
      "warnings": [
        "제출 형식은 원본 공고에서 확인 필요"
      ],
      "programIdeas": [
        "SW 심화반 문제풀이 또는 미니 프로젝트",
        "포스터·웹툰·디자인 작품 제작 특강"
      ]
    }
  },
  {
    "id": "contestkorea-202610280048",
    "title": "<2027년도 UN 청소년 대표단> 10기 모집, 실제 UN 본회의에서 발언!",
    "organizer": "원본 확인 필요",
    "grades": [
      "중",
      "고"
    ],
    "regions": [
      "경기",
      "경북",
      "대구",
      "대전",
      "부산",
      "서울",
      "온라인"
    ],
    "category": "과학·SW·창의",
    "start": "2027-01-01",
    "deadline": "2027-01-02",
    "dday": 64,
    "status": "접수예정",
    "prize": null,
    "free": true,
    "officialUrl": "https://unyouthdelegate.org/79",
    "summary": "<2027년도 UN 청소년 대표단> 10기 모집, 실제 UN 본회의에서 발언! 후보입니다. 참가대상·마감일·접수방법은 기관 원본 공고에서 확인하세요.",
    "conflict": false,
    "academyRecommendation": {
      "subjectTags": [
        "과학",
        "코딩/SW"
      ],
      "careerTags": [
        "이공계",
        "IT/SW"
      ],
      "useCaseTags": [
        "수업연계",
        "결과물있음",
        "특강가능",
        "학부모안내",
        "개별추천",
        "심화도전"
      ],
      "confidence": "높음",
      "confidenceScore": 92,
      "reasons": [
        "마감까지 3주 이상 남아 결과물 제작형 수업이나 단기 특강으로 연결하기 좋습니다.",
        "과학·코딩/SW 수업과 연결해 학생별 결과물 제작 과제로 활용할 수 있습니다.",
        "기관 원본 공고가 확인되어 학부모 안내 자료로 사용하기 전 검토 부담이 낮습니다."
      ],
      "evidence": [
        "참가대상: 중·고",
        "분야: 과학·SW·창의",
        "마감까지 64일",
        "지역/방식: 전국 또는 온라인",
        "참가비: 무료",
        "기관 원본 공고 확인"
      ],
      "warnings": [
        "제출 형식은 원본 공고에서 확인 필요"
      ],
      "programIdeas": [
        "SW 심화반 문제풀이 또는 미니 프로젝트"
      ]
    }
  },
  {
    "id": "contestkorea-202606250060",
    "title": "[다쏘시스템코리아] 카티아(CATIA) 첨단 모빌리티 스쿨 5기 모집",
    "organizer": "원본 확인 필요",
    "grades": [
      "초",
      "중",
      "고"
    ],
    "regions": [
      "경기",
      "대구",
      "대전",
      "부산",
      "서울",
      "온라인",
      "충남"
    ],
    "category": "과학·SW·창의",
    "start": "2026-07-27",
    "deadline": "2027-01-28",
    "dday": 90,
    "status": "접수예정",
    "prize": null,
    "free": true,
    "officialUrl": "https://forms.gle/KPr5KHrbxPxo1iLe6",
    "summary": "[다쏘시스템코리아] 카티아(CATIA) 첨단 모빌리티 스쿨 5기 모집 후보입니다. 참가대상·마감일·접수방법은 기관 원본 공고에서 확인하세요.",
    "conflict": false,
    "academyRecommendation": {
      "subjectTags": [
        "과학",
        "코딩/SW",
        "국어/논술"
      ],
      "careerTags": [
        "이공계",
        "IT/SW"
      ],
      "useCaseTags": [
        "수업연계",
        "결과물있음",
        "특강가능",
        "학부모안내",
        "심화도전"
      ],
      "confidence": "높음",
      "confidenceScore": 92,
      "reasons": [
        "마감까지 3주 이상 남아 결과물 제작형 수업이나 단기 특강으로 연결하기 좋습니다.",
        "과학·코딩/SW 수업과 연결해 학생별 결과물 제작 과제로 활용할 수 있습니다.",
        "기관 원본 공고가 확인되어 학부모 안내 자료로 사용하기 전 검토 부담이 낮습니다."
      ],
      "evidence": [
        "참가대상: 초·중·고",
        "분야: 과학·SW·창의",
        "마감까지 90일",
        "지역/방식: 전국 또는 온라인",
        "참가비: 무료",
        "기관 원본 공고 확인"
      ],
      "warnings": [
        "제출 형식은 원본 공고에서 확인 필요"
      ],
      "programIdeas": [
        "독서·글쓰기 수업의 2~4주 결과물 프로젝트",
        "SW 심화반 문제풀이 또는 미니 프로젝트"
      ]
    }
  },
  {
    "id": "allcon-538592",
    "title": "2026 임업통계 활용 경진대회",
    "organizer": "원본 확인 필요",
    "grades": [
      "중",
      "고"
    ],
    "regions": [
      "서울",
      "온라인"
    ],
    "category": "과학·SW·창의",
    "start": null,
    "deadline": null,
    "dday": null,
    "status": "접수중",
    "prize": null,
    "free": true,
    "officialUrl": "http://www.profor.kr/forestry_contest/",
    "summary": "2026 임업통계 활용 경진대회 후보입니다. 참가대상·마감일·접수방법은 기관 원본 공고에서 확인하세요.",
    "conflict": true,
    "academyRecommendation": {
      "subjectTags": [
        "과학",
        "코딩/SW",
        "수학"
      ],
      "careerTags": [
        "이공계",
        "IT/SW"
      ],
      "useCaseTags": [
        "수업연계",
        "결과물있음",
        "심화도전"
      ],
      "confidence": "중간",
      "confidenceScore": 62,
      "reasons": [
        "과학·코딩/SW 수업과 연결해 학생별 결과물 제작 과제로 활용할 수 있습니다.",
        "준비 부담이 있는 산출물 또는 전문 분야 단서가 있어 관심 학생의 심화 프로젝트 후보로 적합합니다."
      ],
      "evidence": [
        "참가대상: 중·고",
        "분야: 과학·SW·창의",
        "마감일: 확인 필요",
        "지역/방식: 전국 또는 온라인",
        "참가비: 무료"
      ],
      "warnings": [
        "기관 원본 링크 또는 검수상태 확인 필요",
        "마감일 확인 필요",
        "제출 형식은 원본 공고에서 확인 필요"
      ],
      "programIdeas": [
        "SW 심화반 문제풀이 또는 미니 프로젝트"
      ]
    }
  },
  {
    "id": "allcon-538326",
    "title": "2026 한경 청소년 경제체험대회",
    "organizer": "원본 확인 필요",
    "grades": [
      "고"
    ],
    "regions": [
      "서울"
    ],
    "category": "글쓰기·독서",
    "start": null,
    "deadline": null,
    "dday": null,
    "status": "접수중",
    "prize": null,
    "free": true,
    "officialUrl": null,
    "summary": "2026 한경 청소년 경제체험대회 후보입니다. 참가대상·마감일·접수방법은 기관 원본 공고에서 확인하세요.",
    "conflict": true,
    "academyRecommendation": {
      "subjectTags": [
        "국어/논술",
        "진로/경제"
      ],
      "careerTags": [
        "인문사회"
      ],
      "useCaseTags": [
        "수업연계",
        "결과물있음",
        "개별추천"
      ],
      "confidence": "중간",
      "confidenceScore": 67,
      "reasons": [
        "국어/논술·진로/경제 수업과 연결해 학생별 결과물 제작 과제로 활용할 수 있습니다."
      ],
      "evidence": [
        "참가대상: 고",
        "분야: 글쓰기·독서",
        "마감일: 확인 필요",
        "지역: 서울",
        "참가비: 무료",
        "제출물 단서: 글/그림/아이디어 등 비교적 가벼운 산출물"
      ],
      "warnings": [
        "기관 원본 링크 또는 검수상태 확인 필요",
        "마감일 확인 필요"
      ],
      "programIdeas": [
        "독서·글쓰기 수업의 2~4주 결과물 프로젝트",
        "아이디어 발굴과 발표자료 제작 진로 프로젝트"
      ]
    }
  },
  {
    "id": "wevity-108371",
    "title": "4회 한운사청소년문학상 공모",
    "organizer": "동양일보문화기획단",
    "grades": [
      "초",
      "중",
      "고"
    ],
    "regions": [
      "전국"
    ],
    "category": "글쓰기·독서",
    "start": null,
    "deadline": null,
    "dday": null,
    "status": "접수중",
    "prize": null,
    "free": true,
    "officialUrl": null,
    "summary": "동양일보문화기획단 주최. 참가대상 고등·중등·초등. 대상지역 전국. 자세한 내용은 기관 원본 공고 확인.",
    "conflict": true,
    "academyRecommendation": {
      "subjectTags": [
        "국어/논술"
      ],
      "careerTags": [
        "인문사회"
      ],
      "useCaseTags": [
        "수업연계",
        "결과물있음",
        "개별추천"
      ],
      "confidence": "중간",
      "confidenceScore": 70,
      "reasons": [
        "국어/논술 수업과 연결해 학생별 결과물 제작 과제로 활용할 수 있습니다."
      ],
      "evidence": [
        "참가대상: 초·중·고",
        "분야: 글쓰기·독서",
        "마감일: 확인 필요",
        "지역/방식: 전국 또는 온라인",
        "참가비: 무료",
        "제출물 단서: 글/그림/아이디어 등 비교적 가벼운 산출물"
      ],
      "warnings": [
        "기관 원본 링크 또는 검수상태 확인 필요",
        "마감일 확인 필요"
      ],
      "programIdeas": [
        "독서·글쓰기 수업의 2~4주 결과물 프로젝트"
      ]
    }
  },
  {
    "id": "allcon-544070",
    "title": "doodll 2nd AI Makeathon 신발 메이커톤",
    "organizer": "원본 확인 필요",
    "grades": [
      "중",
      "고"
    ],
    "regions": [
      "서울"
    ],
    "category": "과학·SW·창의",
    "start": null,
    "deadline": null,
    "dday": null,
    "status": "접수중",
    "prize": null,
    "free": true,
    "officialUrl": "https://doodll.com/makeathon-v2",
    "summary": "doodll 2nd AI Makeathon 신발 메이커톤 후보입니다. 참가대상·마감일·접수방법은 기관 원본 공고에서 확인하세요.",
    "conflict": true,
    "academyRecommendation": {
      "subjectTags": [
        "과학",
        "코딩/SW"
      ],
      "careerTags": [
        "이공계",
        "IT/SW"
      ],
      "useCaseTags": [
        "수업연계",
        "결과물있음",
        "개별추천",
        "심화도전"
      ],
      "confidence": "중간",
      "confidenceScore": 59,
      "reasons": [
        "과학·코딩/SW 수업과 연결해 학생별 결과물 제작 과제로 활용할 수 있습니다.",
        "준비 부담이 있는 산출물 또는 전문 분야 단서가 있어 관심 학생의 심화 프로젝트 후보로 적합합니다."
      ],
      "evidence": [
        "참가대상: 중·고",
        "분야: 과학·SW·창의",
        "마감일: 확인 필요",
        "지역: 서울",
        "참가비: 무료"
      ],
      "warnings": [
        "기관 원본 링크 또는 검수상태 확인 필요",
        "마감일 확인 필요",
        "제출 형식은 원본 공고에서 확인 필요"
      ],
      "programIdeas": [
        "SW 심화반 문제풀이 또는 미니 프로젝트"
      ]
    }
  },
  {
    "id": "wevity-108579",
    "title": "맞추랑께 그리랑께(백일장, 사생대회)",
    "organizer": "전북도, 전주시",
    "grades": [
      "초",
      "중",
      "고"
    ],
    "regions": [
      "전북"
    ],
    "category": "미술·디자인·영상",
    "start": null,
    "deadline": null,
    "dday": null,
    "status": "마감",
    "prize": null,
    "free": true,
    "officialUrl": null,
    "summary": "전북도, 전주시 주최. 참가대상 고등·중등·초등. 대상지역 전북. 자세한 내용은 기관 원본 공고 확인.",
    "conflict": true,
    "academyRecommendation": {
      "subjectTags": [
        "미술/디자인",
        "영상/미디어",
        "국어/논술"
      ],
      "careerTags": [
        "디자인",
        "미디어"
      ],
      "useCaseTags": [
        "수업연계",
        "결과물있음",
        "개별추천",
        "심화도전"
      ],
      "confidence": "중간",
      "confidenceScore": 67,
      "reasons": [
        "미술/디자인·영상/미디어 수업과 연결해 학생별 결과물 제작 과제로 활용할 수 있습니다.",
        "준비 부담이 있는 산출물 또는 전문 분야 단서가 있어 관심 학생의 심화 프로젝트 후보로 적합합니다."
      ],
      "evidence": [
        "참가대상: 초·중·고",
        "분야: 미술·디자인·영상",
        "마감일: 확인 필요",
        "지역: 전북",
        "참가비: 무료",
        "제출물 단서: 영상/SW/보고서/창업 등 준비 부담 가능"
      ],
      "warnings": [
        "기관 원본 링크 또는 검수상태 확인 필요",
        "마감일 확인 필요"
      ],
      "programIdeas": [
        "독서·글쓰기 수업의 2~4주 결과물 프로젝트",
        "포스터·웹툰·디자인 작품 제작 특강",
        "기획안 작성부터 촬영·편집까지 이어지는 영상 제작 특강"
      ]
    }
  }
];

export function getEvent(id: string): ContestEvent | undefined {
  return SAMPLE_EVENTS.find((e) => e.id === id);
}

const WD = ["일", "월", "화", "수", "목", "금", "토"];

function parseLocalDate(value: string | null): Date | null {
  if (!value) return null;
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function startOfToday(): Date {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

export function currentDday(date: string | null): number | null {
  const target = parseLocalDate(date);
  if (!target) return null;
  return Math.round((target.getTime() - startOfToday().getTime()) / 86400000);
}

export function isContestExpired(event: Pick<ContestEvent, "deadline" | "status">): boolean {
  const days = currentDday(event.deadline);
  return days != null ? days < 0 : event.status === "마감";
}

/** "2026-06-30" → "06.30(화)" */
export function deadlineLabel(date: string | null): string {
  if (!date) return "마감 미정";
  const d = new Date(date + "T00:00:00");
  const [, m, day] = date.split("-");
  return `${m}.${day}(${WD[d.getDay()]})`;
}

/** "2026-06-30" → "06.30" */
export function shortDate(date: string | null): string {
  if (!date) return "미정";
  const [, m, day] = date.split("-");
  return `${m}.${day}`;
}
