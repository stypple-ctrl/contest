export type CultureConfidence = "높음" | "중간" | "낮음";

export interface CultureRecommendation {
  subjectTags: string[];
  useCaseTags: string[];
  confidence: CultureConfidence;
  confidenceScore: number;
  reasons: string[];
  evidence: string[];
  warnings: string[];
  programIdeas: string[];
}

export interface CultureEvent {
  id: string;
  source: "kopis" | "cultureinfo" | string;
  title: string;
  eventType: string;
  category: string;
  grades: string[];
  ageText: string | null;
  region: string;
  venueName: string | null;
  venueAddress: string | null;
  startDate: string | null;
  endDate: string | null;
  dday: number | null;
  runtime: string | null;
  priceText: string | null;
  free: boolean;
  posterUrl: string | null;
  officialUrl: string | null;
  summary: string;
  status: string;
  conflict: boolean;
  recommendation: CultureRecommendation;
}

export const CULTURE_TYPE_OPTIONS = ["공연", "전시", "교육/체험", "뮤지컬/오페라", "연극", "축제/행사", "도서", "문화행사"];

export const CULTURE_USE_CASE_OPTIONS = [
  "아동공연",
  "무료전시",
  "장기전시",
  "이번주관람",
  "주말관람",
  "박물관/미술관",
  "원본확인",
];
