import type { Metadata } from "next";
import { ContestSearch } from "@/components/contest/contest-search";
import { SAMPLE_EVENTS } from "@/lib/contest-data";

export const metadata: Metadata = {
  title: "공모전 찾기",
  description:
    "초·중·고 학생이 참가 가능한 공모전·대외활동을 참가 학년·지역·마감일로 검색하세요.",
};

export default function ContestPage() {
  // TODO: 추후 SAMPLE_EVENTS → Postgres/contest DB 조회로 교체
  return <ContestSearch events={SAMPLE_EVENTS} />;
}
