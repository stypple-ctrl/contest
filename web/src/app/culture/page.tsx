import type { Metadata } from "next";
import { CultureSearch } from "@/components/culture/culture-search";
import { CULTURE_EVENTS } from "@/lib/culture-data";

export const metadata: Metadata = {
  title: "문화행사 찾기",
  description: "초·중·고 학생에게 안내할 공연·전시·체험 문화행사를 검색하세요.",
};

export default function CulturePage() {
  return <CultureSearch events={CULTURE_EVENTS} />;
}
