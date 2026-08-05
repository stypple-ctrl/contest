"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { currentCultureDday, cultureDateLabel, isCultureEnded } from "@/lib/culture-data";
import { currentDday, deadlineLabel, isContestExpired } from "@/lib/contest-data";
import { matchesGradeFilter } from "@/lib/grade-utils";
import { cn } from "@/lib/utils";
import {
  SearchFilterButton,
  SearchFilterCard,
  SearchFilterDivider,
  SearchFilterPanel,
  SearchFilterReset,
  SearchFilterToggle,
  SearchGradeFilter,
  SearchHero,
  SearchSegmentButton,
} from "@/components/search/search-filter-panel";
import { ResultGrid } from "@/components/search/result-grid";
import { SavedItemButton } from "@/components/search/saved-item-button";
import {
  CATEGORY_OPTIONS,
  REGION_OPTIONS,
  USE_CASE_OPTIONS,
  type ContestEvent,
  type Grade,
} from "@/types/contest";
import { CULTURE_USE_CASE_OPTIONS, type CultureEvent } from "@/types/culture";

type ResultKind = "all" | "contest" | "culture";

function toggle<T>(arr: T[], v: T): T[] {
  return arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v];
}

type UnifiedItem = {
  id: string;
  kind: "contest" | "culture";
  title: string;
  href: string;
  typeLabel: string;
  dateLabel: string;
  dday: number | null;
  regionLabel: string;
  regionValues: string[];
  targetLabel: string;
  gradeValues: string[];
  typeValue: string;
  summary: string;
  useCases: string[];
  free: boolean;
  conflict: boolean;
  closed: boolean;
  sortDday: number | null;
};

function contestItem(event: ContestEvent): UnifiedItem {
  return {
    id: `contest-${event.id}`,
    kind: "contest",
    title: event.title,
    href: `/contest/${event.id}`,
    typeLabel: `공모전 · ${event.category}`,
    dateLabel: `마감 ${deadlineLabel(event.deadline)}`,
    dday: currentDday(event.deadline),
    regionLabel: event.regions.join("·"),
    regionValues: event.regions,
    targetLabel: event.grades.join("·") || "대상 확인",
    gradeValues: event.grades,
    typeValue: event.category,
    summary: event.academyRecommendation.reasons[0] ?? event.summary,
    useCases: event.academyRecommendation.useCaseTags,
    free: event.free,
    conflict: event.conflict,
    closed: isContestExpired(event),
    sortDday: currentDday(event.deadline),
  };
}

function cultureItem(event: CultureEvent): UnifiedItem {
  return {
    id: `culture-${event.id}`,
    kind: "culture",
    title: event.title,
    href: `/culture/${event.id}`,
    typeLabel: `문화행사 · ${event.eventType}`,
    dateLabel: cultureDateLabel(event.startDate, event.endDate),
    dday: currentCultureDday(event.startDate, event.endDate),
    regionLabel: event.region,
    regionValues: [event.region],
    targetLabel: event.grades.join("·") || event.ageText || "연령 확인",
    gradeValues: event.grades,
    typeValue: event.eventType,
    summary: event.recommendation.reasons[0] ?? event.summary,
    useCases: event.recommendation.useCaseTags,
    free: event.free,
    conflict: event.conflict,
    closed: isCultureEnded(event),
    sortDday: currentCultureDday(event.startDate, event.endDate),
  };
}

export function UnifiedSearch({
  contests,
  cultures,
}: {
  contests: ContestEvent[];
  cultures: CultureEvent[];
}) {
  const [keyword, setKeyword] = useState("");
  const [kind, setKind] = useState<ResultKind>("all");
  const [grades, setGrades] = useState<Grade[]>([]);
  const [regions, setRegions] = useState<string[]>([]);
  const [types, setTypes] = useState<string[]>([]);
  const [useCases, setUseCases] = useState<string[]>([]);
  const [freeOnly, setFreeOnly] = useState(false);
  const [hideClosed, setHideClosed] = useState(true);
  const [panel, setPanel] = useState<"region" | "type" | "use" | null>(null);

  const items = useMemo(() => {
    const all = [...contests.map(contestItem), ...cultures.map(cultureItem)];
    const k = keyword.trim().toLowerCase();
    return all
      .filter((item) => {
        if (kind !== "all" && item.kind !== kind) return false;
        if (!matchesGradeFilter(item.gradeValues, grades)) return false;
        if (regions.length && !item.regionValues.some((region) => regions.includes(region) || region === "전국")) return false;
        if (types.length && !types.includes(item.typeValue)) return false;
        if (useCases.length && !item.useCases.some((useCase) => useCases.includes(useCase))) return false;
        if (freeOnly && !item.free) return false;
        if (hideClosed && item.closed) return false;
        if (k && !`${item.title} ${item.typeLabel} ${item.regionLabel} ${item.targetLabel} ${item.useCases.join(" ")}`.toLowerCase().includes(k)) return false;
        return true;
      })
      .sort((a, b) => {
        const ad = a.sortDday ?? 99999;
        const bd = b.sortDday ?? 99999;
        return ad - bd;
      });
  }, [contests, cultures, keyword, kind, grades, regions, types, useCases, freeOnly, hideClosed]);

  const contestCount = contests.length;
  const cultureCount = cultures.length;
  const cultureTypeOptions = useMemo(
    () => Array.from(new Set(cultures.map((event) => event.eventType).filter(Boolean))).sort(),
    [cultures]
  );
  const typeOptions = useMemo(() => [...CATEGORY_OPTIONS, ...cultureTypeOptions], [cultureTypeOptions]);
  const useCaseOptions = [...USE_CASE_OPTIONS, ...CULTURE_USE_CASE_OPTIONS];
  const activeFilterCount = Number(kind !== "all") + grades.length + regions.length + types.length + useCases.length + Number(freeOnly) + Number(hideClosed);

  function resetAll() {
    setKind("all");
    setGrades([]);
    setRegions([]);
    setTypes([]);
    setUseCases([]);
    setFreeOnly(false);
    setHideClosed(true);
    setPanel(null);
  }

  return (
    <main className="mx-auto w-full max-w-[var(--max-wide)] px-[var(--pad-x)] py-7 sm:py-9">
      <SearchHero
        eyebrow="학원장용 교육정보 통합검색"
        title="학생에게 맞는 공모전과 문화행사를 빠르게 고르세요"
        description="학년, 지역, 일정, 무료 여부를 기준으로 공모전·대외활동과 공연·전시·체험 정보를 함께 살펴볼 수 있습니다."
        metrics={[
          { label: "공모전", value: `${contestCount}` },
          { label: "문화행사", value: `${cultureCount}` },
          { label: "현재 결과", value: `${items.length}`, accent: true },
        ]}
        keyword={keyword}
        onKeywordChange={setKeyword}
        placeholder="예: 초등 서울 과학, 무료 전시, 감상문 과제"
      />

      <SearchFilterCard
        activeFilterCount={activeFilterCount}
        right={
          <>
            <SearchFilterToggle checked={hideClosed} label="지난 일정 숨기기" onClick={() => setHideClosed((v) => !v)} />
            <SearchFilterToggle checked={freeOnly} label="무료만 보기" onClick={() => setFreeOnly((v) => !v)} />
            <SearchFilterReset onClick={resetAll} />
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
                hint="공모전 분야와 문화행사 종류를 같은 위치에서 고릅니다."
                options={typeOptions}
                values={types}
                onToggle={(value) => setTypes((prev) => toggle(prev, value))}
              />
            )}
            {panel === "use" && (
              <SearchFilterPanel
                title="학원 활용"
                hint="안내문, 특강, 수업 결과물 등 운영 목적 기준입니다."
                options={useCaseOptions}
                values={useCases}
                onToggle={(value) => setUseCases((prev) => toggle(prev, value))}
              />
            )}
          </>
        }
      >
        <SearchGradeFilter values={grades} onToggle={(value) => setGrades((prev) => toggle(prev, value))} />
        <SearchFilterButton
          label={regions.length ? `지역 ${regions.length}` : "지역 전체"}
          active={regions.length > 0 || panel === "region"}
          onClick={() => setPanel((prev) => (prev === "region" ? null : "region"))}
        />
        <SearchFilterButton
          label={types.length ? `분야/종류 ${types.length}` : "분야/종류"}
          active={types.length > 0 || panel === "type"}
          onClick={() => setPanel((prev) => (prev === "type" ? null : "type"))}
        />
        <SearchFilterButton
          label={useCases.length ? `활용 ${useCases.length}` : "학원 활용"}
          active={useCases.length > 0 || panel === "use"}
          onClick={() => setPanel((prev) => (prev === "use" ? null : "use"))}
        />

        <SearchFilterDivider />

        <div className="grid grid-cols-3 rounded-2xl bg-[#F2F4F6] p-1">
          <SearchSegmentButton label="전체" active={kind === "all"} onClick={() => setKind("all")} />
          <SearchSegmentButton label="공모전" active={kind === "contest"} onClick={() => setKind("contest")} />
          <SearchSegmentButton label="문화행사" active={kind === "culture"} onClick={() => setKind("culture")} />
        </div>
      </SearchFilterCard>

      <div className="flex flex-wrap items-end justify-between gap-3 px-1 pt-7">
        <div>
          <h2 className="text-[20px] font-extrabold text-[#191F28]">통합 검색 결과 {items.length}건</h2>
          <p className="mt-1 text-[13px] font-medium text-[#6B7684]">마감일·시작일이 가까운 순서로 정렬됩니다.</p>
        </div>
        <div className="flex gap-2 text-[12.5px] font-bold">
          <Link href="/contest" className="rounded-full bg-white px-3 py-2 text-[#4E5968] ring-1 ring-[#E5E8EB] hover:bg-[#F2F4F6]">공모전 전용</Link>
          <Link href="/culture" className="rounded-full bg-white px-3 py-2 text-[#4E5968] ring-1 ring-[#E5E8EB] hover:bg-[#F2F4F6]">문화행사 전용</Link>
        </div>
      </div>

      <ResultGrid>
        {items.length ? (
          items.map((item) => <UnifiedCard key={item.id} item={item} />)
        ) : (
          <div className="col-span-full rounded-[22px] bg-white px-6 py-16 text-center ring-1 ring-[#E5E8EB]">
            <p className="text-[17px] font-extrabold text-[#191F28]">조건에 맞는 결과가 없습니다.</p>
            <p className="mt-2 text-[13px] text-[#6B7684]">검색어를 줄이거나 무료 필터를 해제해보세요.</p>
          </div>
        )}
      </ResultGrid>
    </main>
  );
}

function UnifiedCard({ item }: { item: UnifiedItem }) {
  const router = useRouter();
  const isContest = item.kind === "contest";
  const ddayText = item.kind === "culture" && item.sortDday === 0 ? "진행중" : item.sortDday != null ? `D-${item.sortDday}` : item.dateLabel;
  const openDetail = () => router.push(item.href);

  return (
    <article
      role="link"
      tabIndex={0}
      aria-label={`${item.title} 상세 보기`}
      onClick={openDetail}
      onKeyDown={(event) => {
        if (event.key === "Enter") {
          event.preventDefault();
          openDetail();
        }
      }}
      className="group relative flex h-full min-h-[330px] cursor-pointer flex-col overflow-hidden rounded-[22px] bg-white p-5 ring-1 ring-[#E5E8EB] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_50px_rgba(15,23,42,0.13)] focus-within:ring-2 focus-within:ring-[#3182F6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3182F6]"
    >
      <div className={cn("absolute inset-x-0 top-0 h-1", isContest ? "bg-[#F2C94C]" : "bg-[#2D9CDB]")} />
      <div className={cn("pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100", isContest ? "from-[#FFF7D6]/70 to-transparent" : "from-[#E8F3FF]/80 to-transparent")} />
      <div className="relative flex items-start justify-between gap-3">
        <span
          className={cn(
            "rounded-full px-3 py-1 text-[11.5px] font-extrabold",
            isContest ? "bg-[#FFF6D6] text-[#8A6200]" : "bg-[#E8F3FF] text-[#1B64DA]"
          )}
        >
          {item.typeLabel}
        </span>
        <span className={cn("shrink-0 rounded-full px-2.5 py-1 text-[12px] font-black", item.sortDday != null && item.sortDday <= 7 ? "bg-[#FFF1F1] text-[#E5484D]" : "bg-[#F2F4F6] text-[#4E5968]")}>
          {ddayText}
        </span>
      </div>
      <Link href={item.href} onClick={(event) => event.stopPropagation()} className="relative mt-4 line-clamp-2 text-[18px] font-extrabold leading-snug text-[#191F28] transition-transform duration-300 hover:underline group-hover:-translate-y-0.5 group-focus-within:-translate-y-0.5">
        {item.title}
      </Link>
      <div className="mt-4 grid gap-2 text-[12.5px] font-bold text-[#4E5968]">
        <div className="flex items-center justify-between gap-3 rounded-xl bg-[#F9FAFB] px-3 py-2">
          <span className="text-[#8B95A1]">대상</span>
          <span className="truncate text-right">{item.targetLabel}</span>
        </div>
        <div className="flex items-center justify-between gap-3 rounded-xl bg-[#F9FAFB] px-3 py-2">
          <span className="text-[#8B95A1]">지역</span>
          <span className="truncate text-right">{item.regionLabel}</span>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {item.useCases.slice(0, 3).map((tag) => (
          <span key={tag} className="rounded-md bg-[#F2F4F6] px-2 py-0.5 text-[11px] font-bold text-[#4E5968]">
            {tag}
          </span>
        ))}
        {item.free && <span className="rounded-md bg-[#E6F5EC] px-2 py-0.5 text-[11px] font-bold text-[#1F7D4D]">무료</span>}
      </div>
      <p className="mt-3 line-clamp-3 text-[13px] leading-relaxed text-[#6B7684]">{item.summary}</p>
      <div className="mt-auto flex items-center justify-between gap-2 border-t border-[#E5E8EB] pt-3">
        <div>
          <span className="block text-[12px] font-extrabold text-[#191F28]">{item.dateLabel}</span>
          <span className="mt-0.5 block text-[11px] font-bold text-[#8B95A1]">안내 전 원본에서 확인해요</span>
        </div>
        <div className="flex items-center gap-1.5">
          <SavedItemButton
            kind={item.kind}
            id={item.id.replace(/^(contest|culture)-/, "")}
            selectedLabel="담김"
            unselectedLabel="담기"
            stopPropagation
            selectedClassName="bg-[#E8F3FF] text-[#1B64DA]"
            unselectedClassName="bg-[#F2F4F6] text-[#4E5968] hover:bg-[#E5E8EB]"
          />
          {item.conflict ? (
            <span className="rounded-full bg-[#FBF4E6] px-2.5 py-1 text-[11px] font-bold text-[#9A7B23]">확인 필요</span>
          ) : (
            <Link href={item.href} onClick={(event) => event.stopPropagation()} className="rounded-full bg-[#191F28] px-3 py-2 text-[12px] font-extrabold text-white transition-all duration-300 group-hover:translate-x-0.5 group-hover:bg-[#3182F6]">
              자세히
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
