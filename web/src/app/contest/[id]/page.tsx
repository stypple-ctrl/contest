import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContestDetail } from "@/components/contest/contest-detail";
import { getEvent, SAMPLE_EVENTS } from "@/lib/contest-data";

export function generateStaticParams() {
  return SAMPLE_EVENTS.map((e) => ({ id: e.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const event = getEvent(id);
  if (!event) return { title: "행사를 찾을 수 없음" };
  return {
    title: event.title,
    description: event.summary,
  };
}

export default async function ContestDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const event = getEvent(id);
  if (!event) notFound();
  return <ContestDetail event={event} />;
}
