"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ContestCard } from "@/components/contest/contest-card";
import { ResultGrid } from "@/components/search/result-grid";
import {
  SearchFilterButton,
  SearchFilterCard,
  SearchFilterDivider,
  SearchFilterPanel,
  SearchFilterReset,
  SearchFilterToggle,
  SearchGradeFilter,
  SearchHero,
} from "@/components/search/search-filter-panel";
import { matchesGradeFilter } from "@/lib/grade-utils";
import { currentDday, isContestExpired } from "@/lib/contest-data";
import { mergeSavedItems, readSavedItems } from "@/lib/saved-items";
import {
  REGION_OPTIONS,
  CATEGORY_OPTIONS,
  SUBJECT_OPTIONS,
  USE_CASE_OPTIONS,
  type ContestEvent,
  type Grade,
  type ContestCategory,
  type SubjectTag,
  type UseCaseTag,
} from "@/types/contest";

type SortKey = "deadline" | "deadline_desc";

function toggle<T>(arr: T[], v: T): T[] {
  return arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v];
}

export function ContestSearch({ events }: { events: ContestEvent[] }) {
  const [grades, setGrades] = useState<Grade[]>([]);
  const [regions, setRegions] = useState<string[]>([]);
  const [fields, setFields] = useState<ContestCategory[]>([]);
  const [subjects, setSubjects] = useState<SubjectTag[]>([]);
  const [useCases, setUseCases] = useState<UseCaseTag[]>([]);
  const [keyword, setKeyword] = useState("");
  const [hideExpired, setHideExpired] = useState(true);
  const [thisWeek, setThisWeek] = useState(false);
  const [freeOnly, setFreeOnly] = useState(false);
  const [sort, setSort] = useState<SortKey>("deadline");
  const [selected, setSelected] = useState<string[]>(() =>
    readSavedItems().filter((item) => item.kind === "contest").map((item) => item.id)
  );
  const [panel, setPanel] = useState<"region" | "field" | "subject" | "useCase" | null>(null);

  function updateSelected(next: string[] | ((prev: string[]) => string[])) {
    setSelected((prev) => {
      const value = typeof next === "function" ? next(prev) : next;
      mergeSavedItems("contest", value);
      return value;
    });
  }

  const list = useMemo(() => {
    const big = 99999;
    const k = keyword.trim().toLowerCase();
    const out = events.filter((e) => {
      const days = currentDday(e.deadline);
      if (hideExpired && isContestExpired(e)) return false;
      if (!matchesGradeFilter(e.grades, grades)) return false;
      if (
        regions.length &&
        !(e.regions.some((r) => regions.includes(r)) || e.regions.includes("전국"))
      )
        return false;
      if (fields.length && !fields.includes(e.category)) return false;
      if (subjects.length && !e.academyRecommendation.subjectTags.some((s) => subjects.includes(s))) return false;
      if (useCases.length && !e.academyRecommendation.useCaseTags.some((u) => useCases.includes(u))) return false;
      if (thisWeek && (days == null || days < 0 || days > 7)) return false;
      if (freeOnly && !e.free) return false;
      if (k && !(
        e.title.toLowerCase().includes(k) ||
        e.organizer.toLowerCase().includes(k) ||
        e.academyRecommendation.subjectTags.join(" ").toLowerCase().includes(k) ||
        e.academyRecommendation.useCaseTags.join(" ").toLowerCase().includes(k)
      ))
        return false;
      return true;
    });
    out.sort((a, b) => {
      const da = currentDday(a.deadline) ?? big;
      const db = currentDday(b.deadline) ?? big;
      return sort === "deadline" ? da - db : db - da;
    });
    return out;
  }, [events, grades, regions, fields, subjects, useCases, keyword, hideExpired, thisWeek, freeOnly, sort]);

  const filterBits: string[] = [];
  if (grades.length) filterBits.push(`학년 ${grades.length}`);
  if (regions.length) filterBits.push(`지역 ${regions.length}`);
  if (fields.length) filterBits.push(`분야 ${fields.length}`);
  if (subjects.length) filterBits.push(`과목 ${subjects.length}`);
  if (useCases.length) filterBits.push(`활용 ${useCases.length}`);
  if (thisWeek) filterBits.push("이번 주 마감");
  if (freeOnly) filterBits.push("무료");
  const activeFilterCount = filterBits.length + Number(hideExpired);
  const conflictCount = list.filter((e) => e.conflict).length;
  const selectedEvents = events.filter((e) => selected.includes(e.id));
  const selectedConflictCount = selectedEvents.filter((e) => e.conflict).length;

  function resetAll() {
    setGrades([]); setRegions([]); setFields([]); setSubjects([]); setUseCases([]); setKeyword("");
    setHideExpired(true); setThisWeek(false); setFreeOnly(false); setPanel(null);
  }

  function exportCsv() {
    const rows = events.filter((e) => selected.includes(e.id));
    if (!rows.length) return;
    const head = ["제목", "상태", "마감일", "D-day", "학년", "지역", "분야", "활용태그", "추천근거", "확인 안내", "주최", "시상", "참가비", "기관 원본링크"];
    const esc = (x: unknown) => `"${String(x ?? "").replace(/"/g, '""')}"`;
    const body = rows.map((e) =>
      [e.title, e.status, e.deadline ?? "", currentDday(e.deadline) != null ? `D-${currentDday(e.deadline)}` : "", e.grades.join("·"),
        e.regions.join("·"), e.category, e.academyRecommendation.useCaseTags.join("·"),
        e.academyRecommendation.reasons[0] ?? "", "안내 전 원본에서 확인",
        e.organizer, e.prize ?? "", e.free ? "무료" : "", e.officialUrl ?? ""]
        .map(esc).join(",")
    );
    const csv = "﻿" + [head.map(esc).join(","), ...body].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "공모전_선택목록.csv";
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  }

  return (
    <div className="mx-auto w-full max-w-[var(--max-wide)] px-[var(--pad-x)] py-7 sm:py-9">
      <SearchHero
        eyebrow="공모전·대외활동 전용검색"
        title="우리 학생에게 맞는 공모전을 빠르게 고르세요"
        description="참가 학년, 지역, 분야, 과목 연계, 활용 목적을 같은 방식으로 걸러 학원 안내 자료로 정리합니다."
        metrics={[
          { label: "전체 자료", value: `${events.length}` },
          { label: "현재 결과", value: `${list.length}`, accent: true },
          { label: "선택됨", value: `${selected.length}` },
        ]}
        keyword={keyword}
        onKeywordChange={setKeyword}
        placeholder="예: 초등 서울 그림, 환경, 과학, 특강 후보"
      />

      <SearchFilterCard
        activeFilterCount={activeFilterCount}
        right={
          <>
            <SearchFilterToggle
              checked={hideExpired}
              onClick={() => setHideExpired((v) => !v)}
              label="지난 일정 숨기기"
            />
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
            {panel === "field" && (
              <SearchFilterPanel
                title="분야/종류"
                hint="공모전의 주제 성격을 기준으로 고릅니다."
                options={CATEGORY_OPTIONS}
                values={fields}
                onToggle={(value) => setFields((prev) => toggle(prev, value as ContestCategory))}
              />
            )}
            {panel === "subject" && (
              <SearchFilterPanel
                title="과목 연계"
                hint="학원 수업과 연결하기 쉬운 과목 신호입니다."
                options={SUBJECT_OPTIONS}
                values={subjects}
                onToggle={(value) => setSubjects((prev) => toggle(prev, value as SubjectTag))}
              />
            )}
            {panel === "useCase" && (
              <SearchFilterPanel
                title="학원 활용"
                hint="안내문, 특강, 수업 결과물 등 운영 목적 기준입니다."
                options={USE_CASE_OPTIONS}
                values={useCases}
                onToggle={(value) => setUseCases((prev) => toggle(prev, value as UseCaseTag))}
              />
            )}
          </>
        }
      >
            <SearchGradeFilter values={grades} onToggle={(value) => setGrades((prev) => toggle(prev, value))} />

            <SearchFilterDivider />

            <SearchFilterButton
              label={regions.length ? `지역 ${regions.length}` : "지역 전체"}
              active={regions.length > 0 || panel === "region"}
              onClick={() => setPanel((p) => (p === "region" ? null : "region"))}
            />
            <SearchFilterButton
              label={fields.length ? `분야/종류 ${fields.length}` : "분야/종류"}
              active={fields.length > 0 || panel === "field"}
              onClick={() => setPanel((p) => (p === "field" ? null : "field"))}
            />
            <SearchFilterButton
              label={useCases.length ? `활용 ${useCases.length}` : "학원 활용"}
              active={useCases.length > 0 || panel === "useCase"}
              onClick={() => setPanel((p) => (p === "useCase" ? null : "useCase"))}
            />
            <SearchFilterButton
              label={subjects.length ? `과목 ${subjects.length}` : "과목 연계"}
              active={subjects.length > 0 || panel === "subject"}
              onClick={() => setPanel((p) => (p === "subject" ? null : "subject"))}
            />
      </SearchFilterCard>

      {/* ===== Results header ===== */}
      <div className="flex flex-wrap items-end justify-between gap-3 px-1 pt-6">
        <div className="flex flex-wrap items-baseline gap-2">
          <span className="text-[16.5px] font-bold text-foreground">검색 결과 {list.length}건</span>
          <span className="text-[12.5px] text-muted-foreground">
            · {filterBits.length ? filterBits.join(" · ") : "전체"}
          </span>
          {conflictCount > 0 && (
            <span className="rounded-full bg-[#FBF4E6] px-2.5 py-1 text-[11.5px] font-bold text-[#9A7B23]">
              확인 필요 {conflictCount}건
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground">정렬</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="rounded-full border border-border bg-card px-3 py-2 text-[13px] font-medium text-foreground outline-none"
          >
            <option value="deadline">마감 임박순</option>
            <option value="deadline_desc">마감 늦은순</option>
          </select>
        </div>
      </div>

      {/* ===== Selection bar ===== */}
      {selected.length > 0 && (
        <div className="mt-3.5 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-accent px-4 py-3 ring-1 ring-primary/20 xl:hidden">
          <div className="text-[13.5px] font-bold text-accent-foreground">
            <span className="text-[15px]">{selected.length}개</span> 선택됨 — 골라둔 행사를 안내문으로 내보내세요
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={exportCsv}
              className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-[13px] font-bold text-primary-foreground transition-opacity hover:opacity-90"
            >
              ↧ CSV 내보내기
            </button>
            <button
              onClick={() => window.print()}
              className="rounded-full border border-primary/40 bg-card px-4 py-2 text-[13px] font-bold text-primary"
            >
              인쇄용 안내문
            </button>
            <button
              onClick={() => updateSelected([])}
              className="rounded-full px-3 py-2 text-[13px] font-medium text-muted-foreground"
            >
              선택 해제
            </button>
          </div>
        </div>
      )}

      {/* ===== Cards + action panel ===== */}
      <div className="grid grid-cols-1 gap-5 pt-4 pb-8">
        <div>
          {list.length === 0 ? (
            <div className="rounded-xl bg-card py-14 text-center text-muted-foreground ring-1 ring-foreground/10">
              <p className="text-[14.5px] font-bold text-foreground">조건에 맞는 행사가 없습니다</p>
              <p className="mt-1.5 text-[12.5px]">
                필터를 줄이거나{" "}
                <button onClick={resetAll} className="font-bold text-primary hover:underline">
                  초기화
                </button>{" "}
                해보세요.
              </p>
            </div>
          ) : (
            <ResultGrid className="pt-0">
              {list.map((e) => (
                <ContestCard
                  key={e.id}
                  event={e}
                  selected={selected.includes(e.id)}
                  onToggle={(id) => updateSelected((p) => toggle(p, id))}
                />
              ))}
            </ResultGrid>
          )}
        </div>

        <SelectionPanel
          selectedEvents={selectedEvents}
          selectedConflictCount={selectedConflictCount}
          onClear={() => updateSelected([])}
          onExport={exportCsv}
        />
      </div>
    </div>
  );
}

function SelectionPanel({
  selectedEvents,
  selectedConflictCount,
  onClear,
  onExport,
}: {
  selectedEvents: ContestEvent[];
  selectedConflictCount: number;
  onClear: () => void;
  onExport: () => void;
}) {
  const first = selectedEvents[0];

  return (
    <aside className="rounded-[22px] bg-white p-4 shadow-[0_10px_30px_rgba(15,23,42,0.05)] ring-1 ring-[#E5E8EB] xl:sticky xl:top-[calc(var(--header-h)+1rem)] xl:self-start">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[11.5px] font-bold text-muted-foreground">선택 목록</p>
          <h2 className="mt-1 text-xl font-extrabold tracking-tight text-foreground">
            {selectedEvents.length}개 담김
          </h2>
        </div>
        {selectedEvents.length > 0 && (
          <button onClick={onClear} className="text-[12px] font-bold text-muted-foreground hover:text-foreground">
            비우기
          </button>
        )}
      </div>

      {selectedEvents.length === 0 ? (
        <div className="mt-4 rounded-xl bg-[#F2F4F6] p-4 text-[12.5px] leading-relaxed text-[#6B7684]">
          추천 카드나 검색 결과에서 행사를 담으면 안내문과 CSV로 바로 정리할 수 있습니다.
        </div>
      ) : (
        <>
          <div className="mt-4 max-h-[220px] space-y-2 overflow-auto pr-1">
            {selectedEvents.slice(0, 5).map((event) => (
              <div key={event.id} className="rounded-lg bg-[#F9FAFB] p-3 ring-1 ring-[#E5E8EB]">
                <div className="line-clamp-2 text-[12.5px] font-bold leading-snug text-foreground">{event.title}</div>
                <div className="mt-2 flex items-center gap-1.5 text-[11px] text-muted-foreground">
                  <span>{currentDday(event.deadline) != null ? `D-${currentDday(event.deadline)}` : "마감 미정"}</span>
                  <span>·</span>
                  <span>{event.grades.join("·")}</span>
                  {event.conflict && <span className="font-bold text-[#9A7B23]">확인 필요</span>}
                </div>
              </div>
            ))}
            {selectedEvents.length > 5 && (
              <div className="text-center text-[12px] font-medium text-muted-foreground">
                외 {selectedEvents.length - 5}개
              </div>
            )}
          </div>

          {selectedConflictCount > 0 && (
            <div className="mt-3 rounded-lg border border-[#F0E2C0] bg-[#FBF4E6] p-3 text-[11.5px] leading-relaxed text-[#9A7B23]">
              확인이 필요한 항목 {selectedConflictCount}건이 포함되어 있어요. 안내 전 원본 공고에서 한 번 더 확인해요.
            </div>
          )}

          <div className="mt-4 grid gap-2">
            <Link
              href={`/contest/blog${first ? `?event=${first.id}` : ""}`}
              className="flex items-center justify-center rounded-xl bg-[#191F28] px-4 py-3 text-[13.5px] font-extrabold text-white transition-colors hover:bg-[#3182F6]"
            >
              안내문 만들기
            </Link>
            <button
              onClick={onExport}
              className="rounded-xl bg-[#E8F3FF] px-4 py-3 text-[13px] font-bold text-[#1B64DA] transition-colors hover:bg-[#D6EFFF]"
            >
              CSV 내보내기
            </button>
          </div>
        </>
      )}
    </aside>
  );
}
