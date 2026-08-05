import type { Metadata } from "next";
import { UnifiedSearch } from "@/components/search/unified-search";
import { SAMPLE_EVENTS } from "@/lib/contest-data";
import { CULTURE_EVENTS } from "@/lib/culture-data";

export const metadata: Metadata = {
  title: "통합 검색",
  description: "공모전·대외활동과 문화행사를 한 번에 검색하세요.",
};

export default function SearchPage() {
  return <UnifiedSearch contests={SAMPLE_EVENTS} cultures={CULTURE_EVENTS} />;
}
