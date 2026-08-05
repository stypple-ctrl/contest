import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { currentCultureDday, cultureDateLabel, CULTURE_EVENTS, getCultureEvent } from "@/lib/culture-data";
import { cn } from "@/lib/utils";
import { SavedItemButton } from "@/components/search/saved-item-button";

export function generateStaticParams() {
  return CULTURE_EVENTS.map((e) => ({ id: e.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const event = getCultureEvent(id);
  if (!event) return { title: "문화행사를 찾을 수 없음" };
  return {
    title: event.title,
    description: event.summary,
  };
}

export default async function CultureDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const event = getCultureEvent(id);
  if (!event) notFound();
  const rec = event.recommendation;
  const liveDday = currentCultureDday(event.startDate, event.endDate);

  return (
    <div className="mx-auto w-full max-w-[var(--max-default)] px-[var(--pad-x)] py-8">
      <Link href="/culture" className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary">
        ← 문화행사 목록으로 돌아가기
      </Link>

      <section className="mt-4 overflow-hidden rounded-[24px] bg-card shadow-[0_18px_50px_rgba(15,23,42,0.08)] ring-1 ring-foreground/6">
        <div className="grid gap-0 md:grid-cols-[280px_1fr]">
          <div className="bg-[#F2F4F6] p-4">
            <div className="grid aspect-[3/4] place-items-center overflow-hidden rounded-2xl bg-card ring-1 ring-[#E5E8EB]">
              {event.posterUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={event.posterUrl} alt="" className="h-full w-full object-contain" />
              ) : (
                <div className="grid h-full w-full place-items-center bg-accent text-[12px] font-bold text-accent-foreground">{event.eventType}</div>
              )}
            </div>
          </div>
          <div className="p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-[#E8F3FF] px-3 py-1 text-[12px] font-extrabold text-[#1B64DA]">{event.eventType}</span>
                <span className="rounded-full bg-[#F2F4F6] px-3 py-1 text-[12px] font-bold text-[#4E5968]">{event.category}</span>
                {event.conflict && <span className="rounded-full bg-[#FBF4E6] px-3 py-1 text-[12px] font-bold text-[#9A7B23]">확인 필요</span>}
              </div>
              <h1 className="mt-3 text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">{event.title}</h1>
              <p className="mt-2 text-[13.5px] text-muted-foreground">{event.region} · {event.venueName ?? "장소 확인 필요"}</p>
            </div>
            <div className="rounded-2xl bg-[#E8F3FF] px-5 py-4 text-center text-[#1B64DA]">
              <div className="text-[11px] font-bold opacity-80">일정</div>
              <div className="mt-1 text-2xl font-extrabold">{cultureDateLabel(event.startDate, event.endDate)}</div>
              <div className="mt-1 text-xs font-bold">{liveDday === 0 ? "진행중" : liveDday != null ? `D-${liveDday}` : event.status}</div>
            </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-[1fr_300px]">
        <div className="space-y-4">
          <section className="rounded-xl bg-card p-5 ring-1 ring-foreground/10">
            <h2 className="text-[13px] font-bold text-foreground">한눈에 보기</h2>
            <p className="mt-2.5 text-[14px] leading-relaxed text-foreground/85">{event.summary}</p>
          </section>

          <section className="rounded-xl bg-card p-5 ring-1 ring-foreground/10">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="text-[13px] font-bold text-foreground">학원 활용 제안</h2>
                <p className="mt-1 text-[12px] text-muted-foreground">관람연령·일정·장소·원본 링크를 기준으로 한 후보 분류입니다.</p>
              </div>
              <span className="rounded-full bg-accent px-3 py-1 text-[12px] font-extrabold text-accent-foreground">
                안내 전 원본에서 확인해요
              </span>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <TagBox title="활용 방식" items={rec.useCaseTags} />
              <TagBox title="과목 연결" items={rec.subjectTags} />
            </div>
            <div className="mt-4 grid gap-3 lg:grid-cols-3">
              <ListBox title="추천 이유" items={rec.reasons} tone="primary" />
              <ListBox title="분류 근거" items={rec.evidence} />
              <ListBox title="확인 필요" items={rec.warnings.length ? rec.warnings : ["관람연령, 일정, 장소는 안내 전 원본에서 한 번 더 확인해요."]} tone="warning" />
            </div>
          </section>
        </div>

        <aside className="space-y-3 lg:sticky lg:top-[calc(var(--header-h)+1rem)] lg:self-start">
          <section className="rounded-xl bg-card p-5 ring-1 ring-foreground/10">
            <Fact k="관람연령" v={event.ageText ?? "확인 필요"} />
            <Fact k="학생대상" v={event.grades.join("·") || "확인 필요"} />
            <Fact k="장소" v={event.venueName ?? "확인 필요"} />
            <Fact k="가격" v={event.free ? "무료" : event.priceText ?? "확인 필요"} />
            <Fact k="러닝타임" v={event.runtime ?? "확인 필요"} last />
          </section>
          {event.officialUrl ? (
            <a href={event.officialUrl} rel="noopener noreferrer" className="flex items-center justify-center rounded-xl bg-primary px-4 py-3.5 text-[14px] font-extrabold text-primary-foreground">
              원본에서 확인하기 →
            </a>
          ) : (
            <div className="rounded-xl border border-[#F0E2C0] bg-[#FBF4E6] p-3 text-[12px] leading-relaxed text-[#9A7B23]">
              원본 또는 예매처 링크를 아직 확보하지 못했습니다.
            </div>
          )}
          <SavedItemButton
            kind="culture"
            id={event.id}
            selectedLabel="✓ 글감 목록에 담김"
            unselectedLabel="+ 글감 목록에 담기"
            className="w-full rounded-xl border px-4 py-3 text-[13.5px]"
            selectedClassName="border-primary/40 bg-accent text-accent-foreground"
            unselectedClassName="border-border bg-card text-foreground hover:bg-muted"
          />
        </aside>
      </div>
    </div>
  );
}

function Fact({ k, v, last }: { k: string; v: string; last?: boolean }) {
  return (
    <div className={cn("flex items-center justify-between gap-3 py-2.5", !last && "border-b border-border")}>
      <span className="text-[12.5px] text-muted-foreground">{k}</span>
      <span className="text-right text-[13px] font-bold text-foreground">{v}</span>
    </div>
  );
}

function TagBox({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-xl border border-border bg-secondary/45 p-4">
      <div className="text-[12px] font-bold text-muted-foreground">{title}</div>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {items.map((item) => (
          <span key={item} className="rounded-md bg-card px-2.5 py-1 text-[12px] font-bold text-foreground ring-1 ring-border">{item}</span>
        ))}
      </div>
    </div>
  );
}

function ListBox({ title, items, tone = "default" }: { title: string; items: string[]; tone?: "default" | "primary" | "warning" }) {
  const toneClass = tone === "primary" ? "border-primary/20 bg-accent/70" : tone === "warning" ? "border-[#F0E2C0] bg-[#FBF4E6]" : "border-border bg-background";
  return (
    <div className={cn("rounded-xl border p-4", toneClass)}>
      <div className="text-[12px] font-bold text-foreground">{title}</div>
      <ul className="mt-2 space-y-1.5">
        {items.map((item) => (
          <li key={item} className="flex gap-2 text-[12.5px] leading-relaxed text-foreground/80">
            <span className="mt-1.5 size-1.5 flex-none rounded-full bg-primary/70" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
