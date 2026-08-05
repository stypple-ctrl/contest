import type { Metadata } from "next";
import { BlogDraftGenerator } from "@/components/contest/blog-draft-generator";
import { SAMPLE_EVENTS } from "@/lib/contest-data";
import { CULTURE_EVENTS } from "@/lib/culture-data";

export const metadata: Metadata = {
  title: "블로그 글감 만들기",
  description: "담아둔 공모전과 문화행사를 학부모 안내용 블로그 글과 포스터로 정리합니다.",
};

export default async function ContestBlogPage({
  searchParams,
}: {
  searchParams: Promise<{ event?: string }>;
}) {
  const { event } = await searchParams;
  return <BlogDraftGenerator contests={SAMPLE_EVENTS} cultures={CULTURE_EVENTS} initialId={event} />;
}
