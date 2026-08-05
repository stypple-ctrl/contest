// 공모전·대외활동 도메인 타입. 화면(검색·상세·블로그글감)이 공유하는 단일 소스.
// 표준 레코드 스키마(contest 프로젝트의 record-schema.md)와 정렬되어 있으며,
// 추후 Postgres/API 연동 시 ContestEvent 형태로 매핑하면 된다.

export type Grade = "초" | "중" | "고";

export type ContestStatus = "접수예정" | "접수중" | "마감임박" | "마감";

export type ContestCategory =
  | "과학·SW·창의"
  | "미술·디자인·영상"
  | "글쓰기·독서"
  | "음악·예술"
  | "봉사·인성·환경"
  | "진로·경제·아이디어"
  | "영어·외국어"
  | "기타";

export type SubjectTag =
  | "국어/논술"
  | "영어"
  | "수학"
  | "과학"
  | "코딩/SW"
  | "미술/디자인"
  | "영상/미디어"
  | "진로/경제"
  | "사회/환경";

export type CareerTag =
  | "인문사회"
  | "이공계"
  | "디자인"
  | "미디어"
  | "창업/경제"
  | "환경/공공"
  | "문화예술"
  | "IT/SW";

export type UseCaseTag =
  | "초보도전"
  | "심화도전"
  | "수업연계"
  | "특강가능"
  | "결과물있음"
  | "단체참여"
  | "개별추천"
  | "학부모안내";

export type ConfidenceLevel = "높음" | "중간" | "낮음";

export interface AcademyRecommendation {
  subjectTags: SubjectTag[];
  careerTags: CareerTag[];
  useCaseTags: UseCaseTag[];
  confidence: ConfidenceLevel;
  confidenceScore: number;
  reasons: string[];
  evidence: string[];
  warnings: string[];
  programIdeas: string[];
}

export interface ContestEvent {
  id: string;
  title: string;
  organizer: string;
  grades: Grade[];
  regions: string[];
  category: ContestCategory;
  /** 접수 시작일 (YYYY-MM-DD) — 없으면 null */
  start: string | null;
  /** 접수 마감일 (YYYY-MM-DD) — 없으면 null */
  deadline: string | null;
  /** 마감까지 남은 일수 (스냅샷). 없으면 null → 정렬 시 맨 뒤 */
  dday: number | null;
  status: ContestStatus;
  /** 시상 내역 요약 — 없으면 null */
  prize: string | null;
  /** 참가비 무료 여부 */
  free: boolean;
  /** 기관/주최측 원본 공고 URL. 사용자에게 "원본 공고"로 노출하는 1차 링크 */
  officialUrl: string | null;
  /** 자체 재구성 요약 (원문 복붙 금지) */
  summary: string;
  /** 일부 정보(주최 등) 확인 중이면 true → "참고용" 강조 */
  conflict: boolean;
  /** 학원 운영 관점의 근거 기반 활용 후보 분류 */
  academyRecommendation: AcademyRecommendation;
}

/** 분야 색 코딩 (8종) — 의미를 담은 기능적 색이라 브랜드 토큰과 별개로 유지 */
export const CATEGORY_META: Record<
  ContestCategory,
  { accent: string; bg: string; text: string }
> = {
  "과학·SW·창의": { accent: "#3E7BD6", bg: "#EAF1FC", text: "#2C5DA8" },
  "미술·디자인·영상": { accent: "#E5736B", bg: "#FCEDEB", text: "#C2483F" },
  "글쓰기·독서": { accent: "#D9A12C", bg: "#FAF1DC", text: "#98700F" },
  "음악·예술": { accent: "#8E6FD6", bg: "#F0EAFB", text: "#6244AE" },
  "봉사·인성·환경": { accent: "#3DA56F", bg: "#E6F5EC", text: "#1F7D4D" },
  "진로·경제·아이디어": { accent: "#E08A3C", bg: "#FBEEDD", text: "#B5651C" },
  "영어·외국어": { accent: "#3FA9B0", bg: "#E4F4F5", text: "#1F8088" },
  기타: { accent: "#9AA1AB", bg: "#F0F1F3", text: "#6B7280" },
};

/** 상태 배지 (4종) — 의미를 담은 기능적 색 (접수중=초록, 마감임박=빨강 등) */
export const STATUS_META: Record<
  ContestStatus,
  { bg: string; text: string; dot: string }
> = {
  접수예정: { bg: "#EEF1F5", text: "#5B6675", dot: "#8A93A0" },
  접수중: { bg: "#E7F5EC", text: "#18794A", dot: "#2EA45F" },
  마감임박: { bg: "#FCEBE9", text: "#C13320", dot: "#E0492C" },
  마감: { bg: "#F0F1F3", text: "#A2A8B0", dot: "#C7CCD4" },
};

export const GRADE_OPTIONS: { value: Grade; label: string }[] = [
  { value: "초", label: "초등" },
  { value: "중", label: "중등" },
  { value: "고", label: "고등" },
];

export const REGION_OPTIONS: string[] = [
  "전국", "온라인", "서울", "부산", "대구", "인천", "광주", "대전", "울산",
  "세종", "경기", "강원", "충북", "충남", "전북", "전남", "경북", "경남", "제주",
];

export const CATEGORY_OPTIONS: ContestCategory[] = [
  "과학·SW·창의", "미술·디자인·영상", "글쓰기·독서", "음악·예술",
  "봉사·인성·환경", "진로·경제·아이디어", "영어·외국어", "기타",
];

export const USE_CASE_OPTIONS: UseCaseTag[] = [
  "수업연계", "특강가능", "결과물있음", "학부모안내", "초보도전", "심화도전",
];

export const SUBJECT_OPTIONS: SubjectTag[] = [
  "국어/논술", "영어", "수학", "과학", "코딩/SW", "미술/디자인", "영상/미디어", "진로/경제", "사회/환경",
];
