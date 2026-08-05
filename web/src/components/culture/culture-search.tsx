"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { currentCultureDday, cultureDateLabel, isCultureEnded } from "@/lib/culture-data";
import { ResultGrid } from "@/components/search/result-grid";
import {
  SearchFilterButton,
  SearchFilterCard,
  SearchFilterPanel,
  SearchFilterReset,
  SearchFilterToggle,
  SearchHero,
} from "@/components/search/search-filter-panel";
import { mergeSavedItems, readSavedItems } from "@/lib/saved-items";
import {
  CULTURE_USE_CASE_OPTIONS,
  type CultureEvent,
} from "@/types/culture";
import { REGION_OPTIONS } from "@/types/contest";

function toggle<T>(arr: T[], v: T): T[] {
  return arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v];
}

export function CultureSearch({ events }: { events: CultureEvent[] }) {
  const [keyword, setKeyword] = useState("");
  const [regions, setRegions] = useState<string[]>([]);
  const [types, setTypes] = useState<string[]>([]);
  const [useCases, setUseCases] = useState<string[]>([]);
  const [freeOnly, setFreeOnly] = useState(false);
  const [hideEnded, setHideEnded] = useState(true);
  const [selected, setSelected] = useState<string[]>(() =>
    readSavedItems().filter((item) => item.kind === "culture").map((item) => item.id)
  );
  const [panel, setPanel] = useState<"region" | "type" | "use" | null>(null);

  function updateSelected(next: string[] | ((prev: string[]) => string[])) {
    setSelected((prev) => {
      const value = typeof next === "function" ? next(prev) : next;
      mergeSavedItems("culture", value);
      return value;
    });
  }

  const list = useMemo(() => {
    const k = keyword.trim().toLowerCase();
    return events
      .filter((e) => {
        if (hideEnded && isCultureEnded(e)) return false;
        if (freeOnly && !e.free) return false;
        if (regions.length && !regions.includes(e.region)) return false;
        if (types.length && !types.includes(e.eventType)) return false;
        if (useCases.length && !e.recommendation.useCaseTags.some((u) => useCases.includes(u))) return false;
        if (k && !(`${e.title} ${e.category} ${e.venueName ?? ""}`.toLowerCase().includes(k))) return false;
        return true;
      })
      .sort((a, b) => (currentCultureDday(a.startDate, a.endDate) ?? 99999) - (currentCultureDday(b.startDate, b.endDate) ?? 99999));
  }, [events, keyword, regions, types, useCases, freeOnly, hideEnded]);

  const typeOptions = useMemo(
    () => Array.from(new Set(events.map((event) => event.eventType).filter(Boolean))).sort(),
    [events]
  );

  function reset() {
    setKeyword("");
    setRegions([]);
    setTypes([]);
    setUseCases([]);
    setFreeOnly(false);
    setHideEnded(true);
    setPanel(null);
  }

  const activeFilterCount = regions.length + types.length + useCases.length + Number(freeOnly) + Number(hideEnded);
  const emptyMessage = "검색어나 필터를 줄여보세요. 새 문화행사는 내부 검수 후 순차적으로 반영됩니다.";

  return (
    <main className="mx-auto w-full max-w-[var(--max-wide)] px-[var(--pad-x)] py-7 sm:py-9">
      <SearchHero
        eyebrow="문화행사 전용검색"
        title="학생에게 안내할 문화행사를 빠르게 고르세요"
        description="공연·전시·체험 정보를 지역, 관람연령, 일정, 무료 여부 기준으로 같은 방식으로 검색합니다."
        metrics={[
          { label: "전체 자료", value: `${events.length}` },
          { label: "현재 결과", value: `${list.length}`, accent: true },
          { label: "담은 행사", value: `${selected.length}` },
        ]}
        keyword={keyword}
        onKeywordChange={setKeyword}
        placeholder="예: 서울 무료 전시, 아동공연, 이번주 관람"
      />

      <SearchFilterCard
        activeFilterCount={activeFilterCount}
        right={
          <>
            <SearchFilterToggle checked={hideEnded} label="지난 일정 숨기기" onClick={() => setHideEnded((v) => !v)} />
            <SearchFilterToggle checked={freeOnly} label="무료만 보기" onClick={() => setFreeOnly((v) => !v)} />
            <SearchFilterReset onClick={reset} />
          </>
        }
        panel={
          <>
            {panel === "region" && (
              <SearchFilterPanel
                title="지역"
                hint="여러 지역을 함께 선택할 수 있습니다."
                options={REGION_OPTIONS}
                values={regions}
                onToggle={(value) => setRegions((prev) => toggle(prev, value))}
              />
            )}
            {panel === "type" && (
              <SearchFilterPanel
                title="분야/종류"
                hint="현재 수집된 문화행사의 실제 종류만 보여줍니다."
                options={typeOptions}
                values={types}
                onToggle={(value) => setTypes((prev) => toggle(prev, value))}
              />
            )}
            {panel === "use" && (
              <SearchFilterPanel
                title="학원 활용"
                hint="일정, 가격, 장소, 연령에서 나온 운영 신호입니다."
                options={CULTURE_USE_CASE_OPTIONS}
                values={useCases}
                onToggle={(value) => setUseCases((prev) => toggle(prev, value))}
              />
            )}
          </>
        }
      >
        <SearchFilterButton
          label={regions.length ? `지역 ${regions.length}` : "지역 전체"}
          active={regions.length > 0 || panel === "region"}
          onClick={() => setPanel((p) => (p === "region" ? null : "region"))}
        />
        <SearchFilterButton
          label={types.length ? `분야/종류 ${types.length}` : "분야/종류"}
          active={types.length > 0 || panel === "type"}
          onClick={() => setPanel((p) => (p === "type" ? null : "type"))}
        />
        <SearchFilterButton
          label={useCases.length ? `활용 ${useCases.length}` : "학원 활용"}
          active={useCases.length > 0 || panel === "use"}
          onClick={() => setPanel((p) => (p === "use" ? null : "use"))}
        />
      </SearchFilterCard>

      <div className="flex flex-wrap items-end justify-between gap-3 px-1 pt-6">
        <div>
          <h2 className="text-[18px] font-extrabold text-foreground">문화행사 {list.length}건</h2>
          <p className="mt-1 text-[12.5px] text-muted-foreground">포스터와 일정, 관람연령을 먼저 확인하세요.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {selected.length > 0 && (
            <Link href="/contest/blog" className="rounded-full bg-[#191F28] px-4 py-2 text-[12.5px] font-extrabold text-white hover:bg-[#3182F6]">
              담은 항목 글감 만들기
            </Link>
          )}
          <Link href="/search" className="rounded-full bg-[#F2F4F6] px-4 py-2 text-[12.5px] font-extrabold text-[#4E5968] hover:bg-[#E5E8EB]">
            통합검색으로 보기
          </Link>
        </div>
      </div>

      {list.length === 0 ? (
        <section className="mt-4 rounded-xl bg-card p-8 text-center ring-1 ring-foreground/10">
          <h2 className="text-lg font-extrabold text-foreground">조건에 맞는 문화행사가 없습니다</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {emptyMessage}
          </p>
          <button
            type="button"
            onClick={reset}
            className="mt-4 rounded-full bg-[#191F28] px-4 py-2 text-[13px] font-extrabold text-white transition-colors hover:bg-[#3182F6]"
          >
            필터 초기화
          </button>
        </section>
      ) : (
        <ResultGrid>
          {list.map((event) => (
            <CultureCard
              key={event.id}
              event={event}
              selected={selected.includes(event.id)}
              onToggle={(id) => updateSelected((p) => toggle(p, id))}
            />
          ))}
        </ResultGrid>
      )}
    </main>
  );
}

function CultureCard({
  event,
  selected,
  onToggle,
}: {
  event: CultureEvent;
  selected: boolean;
  onToggle: (id: string) => void;
}) {
  const dday = currentCultureDday(event.startDate, event.endDate);
  const factChips = [
    event.ageText ?? (event.grades.length ? `${event.grades.join("·")} 후보` : "연령 확인"),
    event.free ? "무료" : event.priceText ?? "가격 확인",
    event.officialUrl ? "원본 확인" : "원본 링크 확인 중",
    event.runtime,
  ].filter(Boolean);

  return (
    <article className={cn(
      "group flex h-[660px] flex-col overflow-hidden rounded-[22px] bg-white shadow-[0_10px_30px_rgba(15,23,42,0.05)] ring-1 ring-[#E5E8EB] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_50px_rgba(15,23,42,0.13)] focus-within:ring-2 focus-within:ring-[#3182F6]",
      selected && "ring-2 ring-[#3182F6]"
    )}>
      <Link href={`/culture/${event.id}`} className="block bg-[#F2F4F6] p-3">
        <div className="grid aspect-[3/4] place-items-center overflow-hidden rounded-2xl bg-white ring-1 ring-[#E5E8EB] transition-all duration-300 group-hover:ring-[#3182F6]/40">
          {event.posterUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={event.posterUrl} alt="" className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.025]" />
          ) : (
            <div className="grid h-full w-full place-items-center bg-accent text-[12px] font-bold text-accent-foreground">{event.eventType}</div>
          )}
        </div>
      </Link>
      <div className="flex flex-1 flex-col gap-3 p-4 pt-3 transition-transform duration-300 group-hover:-translate-y-1 group-focus-within:-translate-y-1">
        <div className="flex items-center justify-between gap-2">
          <span className="rounded-full bg-[#E8F3FF] px-2.5 py-1 text-[11px] font-extrabold text-[#1B64DA]">{event.eventType}</span>
          <span className="text-[12px] font-extrabold text-[#3182F6]">
            {dday === 0 ? "진행중" : dday != null ? `D-${dday}` : cultureDateLabel(event.startDate, event.endDate)}
          </span>
        </div>
        <Link href={`/culture/${event.id}`} className="line-clamp-2 text-[16px] font-extrabold leading-snug text-[#191F28] hover:underline">
          {event.title}
        </Link>
        <div className="text-[12.5px] leading-relaxed text-muted-foreground">
          {event.region} · {event.venueName ?? "장소 확인 필요"}
        </div>
        <div className="flex flex-wrap gap-1.5">
          {factChips.map((tag) => (
            <span key={tag} className="rounded-md bg-[#F2F4F6] px-2 py-0.5 text-[11px] font-bold text-[#4E5968]">
              {tag}
            </span>
          ))}
        </div>
        <p className="line-clamp-2 text-[12px] leading-snug text-muted-foreground">
          {cultureDateLabel(event.startDate, event.endDate)} · {event.category}
        </p>
        <div className="mt-auto flex items-center justify-between gap-2 border-t border-[#E5E8EB] pt-3 transition-all duration-300 group-hover:border-[#3182F6]/30">
          <span className="text-[12px] font-bold text-muted-foreground">{event.free ? "무료" : event.priceText ?? "가격 확인 필요"}</span>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => onToggle(event.id)}
              className={cn(
                "rounded-full px-3 py-2 text-[12px] font-bold transition-colors",
                selected ? "bg-[#E8F3FF] text-[#1B64DA]" : "bg-[#F2F4F6] text-[#4E5968] hover:bg-[#E5E8EB]"
              )}
            >
              {selected ? "담김" : "담기"}
            </button>
            {event.officialUrl ? (
              <Link href={`/culture/${event.id}`} className="rounded-full bg-[#191F28] px-3 py-2 text-[12px] font-bold text-white transition-all duration-300 group-hover:translate-x-0.5 group-hover:bg-[#3182F6]">
                보기
              </Link>
            ) : (
              <span className="rounded-full bg-muted px-3 py-2 text-[12px] font-bold text-muted-foreground">확인 중</span>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
