"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  CATEGORY_META,
  STATUS_META,
  type ContestEvent,
} from "@/types/contest";
import { currentDday, deadlineLabel, isContestExpired } from "@/lib/contest-data";

export function ContestCard({
  event,
  selected,
  onToggle,
}: {
  event: ContestEvent;
  selected: boolean;
  onToggle: (id: string) => void;
}) {
  const router = useRouter();
  const cat = CATEGORY_META[event.category];
  const st = STATUS_META[event.status];
  const dday = currentDday(event.deadline);
  const urgent = dday != null && dday >= 0 && dday <= 7;
  const closed = isContestExpired(event);
  const rec = event.academyRecommendation;
  const detailHref = `/contest/${event.id}`;
  const openDetail = () => router.push(detailHref);

  return (
    <div
      role="link"
      tabIndex={0}
      aria-label={`${event.title} 상세 보기`}
      onClick={openDetail}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          openDetail();
        }
      }}
      className={cn(
        "group/card relative flex h-full min-h-[430px] cursor-pointer flex-col overflow-hidden rounded-[22px] bg-white text-card-foreground transition-all duration-300",
        "ring-1 hover:-translate-y-1 hover:shadow-[0_22px_50px_rgba(15,23,42,0.13)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3182F6]",
        selected ? "ring-2 ring-[#3182F6]" : "ring-[#E5E8EB]",
        closed && "opacity-70"
      )}
    >
      {/* 분야 accent 바 (기능색) */}
      <div className="h-1 bg-[#F2C94C]" />

      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#FFF7D6]/70 to-transparent opacity-0 transition-opacity duration-300 group-hover/card:opacity-100 group-focus-within/card:opacity-100" />

      <div className="relative flex flex-1 flex-col gap-3 p-4">
        {/* 상단: 체크 + 상태배지 / D-day */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex min-w-0 items-center gap-2">
            <button
              type="button"
              aria-pressed={selected}
              onClick={(e) => {
                e.stopPropagation();
                onToggle(event.id);
              }}
              className={cn(
                "inline-flex flex-none items-center gap-1.5 rounded-full px-2.5 py-1 text-[11.5px] font-extrabold transition-colors",
                selected
                  ? "bg-[#E8F3FF] text-[#1B64DA]"
                  : "bg-[#F2F4F6] text-[#4E5968] hover:bg-[#E5E8EB]"
              )}
            >
              <span
                aria-hidden
                className={cn(
                  "grid size-4 place-items-center rounded border text-[10px]",
                  selected ? "border-[#3182F6] bg-[#3182F6] text-white" : "border-[#D1D6DB] bg-white text-[#8B95A1]"
                )}
              >
                {selected ? "✓" : "+"}
              </span>
              {selected ? "담김" : "목록 담기"}
            </button>
            <span
              className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11.5px] font-bold whitespace-nowrap"
              style={{ background: st.bg, color: st.text }}
            >
              <span
                className="size-1.5 rounded-full"
                style={{ background: st.dot }}
              />
              {event.status}
            </span>
          </div>
          <div className="flex flex-none flex-col items-end gap-1">
            <span
              className="rounded-full px-3 py-0.5 text-[21px] font-extrabold tracking-tight tabular-nums"
              style={{
                background: urgent ? "#FFF1F1" : closed ? "#F2F4F6" : "#E8F3FF",
                color: urgent ? "#E5484D" : closed ? "#8B95A1" : "#1B64DA",
              }}
            >
              {dday != null ? `D-${dday}` : "—"}
            </span>
            <span className="text-[11px] font-medium whitespace-nowrap text-muted-foreground">
              마감 {deadlineLabel(event.deadline)}
            </span>
          </div>
        </div>

        {/* 제목 (상세로 이동) */}
        <Link
          href={detailHref}
          onClick={(e) => e.stopPropagation()}
          className={cn(
            "aw-title-wrap line-clamp-2 text-[17px] leading-snug font-extrabold tracking-normal transition-transform duration-300 hover:underline group-hover/card:-translate-y-0.5 group-focus-within/card:-translate-y-0.5",
            closed ? "text-[#8B95A1]" : "text-[#191F28]"
          )}
        >
          {event.title}
        </Link>

        {/* 학년 칩 + 지역 */}
        <div className="flex flex-wrap items-center gap-1.5">
          {event.grades.map((g) => (
            <span
              key={g}
              className="inline-flex items-center rounded-lg bg-[#E8F3FF] px-2.5 py-1 text-[12.5px] font-bold text-[#1B64DA]"
            >
              {g}
            </span>
          ))}
          <span className="mx-0.5 h-3.5 w-px bg-[#E5E8EB]" />
          <span className="inline-flex items-center rounded-lg bg-[#F2F4F6] px-2.5 py-1 text-xs font-bold text-[#4E5968]">
            {event.regions.join("·")}
          </span>
          {event.regions.includes("전국") && (
            <span className="text-[11px] text-muted-foreground/70">참고용</span>
          )}
        </div>

        {/* 분야 + 주최 */}
        <div className="flex min-w-0 items-center gap-2">
          <span
            className="flex-none rounded-lg px-2.5 py-1 text-[11.5px] font-bold"
            style={{ background: cat.bg, color: cat.text }}
          >
            {event.category}
          </span>
          <span
            className={cn(
              "truncate text-[12.5px]",
              event.conflict ? "text-[#B0791F]" : "text-muted-foreground"
            )}
          >
            {event.organizer}
          </span>
          {event.conflict && (
            <span className="flex-none rounded-md bg-[#FBF4E6] px-2 py-0.5 text-[11px] font-bold text-[#9A7B23]">
              확인 필요
            </span>
          )}
        </div>

        {/* 학원 활용 추천 */}
        <div className="rounded-xl bg-[#F9FAFB] p-3 ring-1 ring-[#E5E8EB] transition-all duration-300 group-hover/card:bg-white group-hover/card:shadow-[0_10px_28px_rgba(15,23,42,0.07)] group-focus-within/card:bg-white">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] font-bold text-muted-foreground">활용</span>
            {rec.useCaseTags.slice(0, 3).map((tag) => (
              <span key={tag} className="rounded-md bg-[#F2F4F6] px-2 py-0.5 text-[11px] font-bold text-[#4E5968]">
                {tag}
              </span>
            ))}
            <span className="ml-auto rounded-md bg-[#E8F3FF] px-2 py-0.5 text-[11px] font-bold text-[#1B64DA]">
              원본 확인
            </span>
          </div>
          <p className="mt-2 line-clamp-2 text-[12px] leading-snug text-muted-foreground">
            {rec.reasons[0] ?? "기본 정보 기준으로 활용 후보를 분류했습니다."}
          </p>
        </div>

        {/* 푸터: 무료/시상 + 원본공고 */}
        <div className="mt-auto flex items-center justify-between gap-2.5 border-t border-[#E5E8EB] pt-3">
          <div className="flex min-w-0 items-center gap-2">
            {event.free && (
              <span
                className="rounded-lg px-2.5 py-0.5 text-xs font-bold whitespace-nowrap"
                style={{ background: "#E6F5EC", color: "#1F7D4D" }}
              >
                참가비 무료
              </span>
            )}
            {event.prize && (
              <span className="text-[12.5px] font-medium whitespace-nowrap text-muted-foreground">
                시상 {event.prize}
              </span>
            )}
          </div>
          <div className="flex flex-none items-center gap-1.5">
            {event.officialUrl ? (
              <a
                href={event.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex flex-none items-center gap-1 rounded-full bg-[#191F28] px-3.5 py-2 text-[12.5px] font-bold text-white transition-all duration-300 hover:bg-[#3182F6] group-hover/card:translate-x-0.5 group-focus-within/card:translate-x-0.5"
              >
                원본에서 확인하기
              </a>
            ) : (
              <span className="inline-flex flex-none items-center gap-1 rounded-full bg-muted px-3.5 py-2 text-[12.5px] font-bold text-muted-foreground">
                원본 링크 확인 중
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
