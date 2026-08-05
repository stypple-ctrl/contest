"use client";

import { useMemo, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { currentDday } from "@/lib/contest-data";
import { currentCultureDday } from "@/lib/culture-data";
import {
  getSavedItemsRawSnapshot,
  parseSavedItems,
  subscribeSavedItems,
} from "@/lib/saved-items";
import type { ContestEvent } from "@/types/contest";
import type { CultureEvent } from "@/types/culture";

type Tone = "formal" | "friendly";

type DraftItem = {
  kind: "contest" | "culture";
  id: string;
  title: string;
  typeLabel: string;
  organizerLabel: string;
  targetLabel: string;
  category: string;
  regionLabel: string;
  deadlineLabel: string;
  dday: number | null;
  free: boolean;
  priceLabel: string;
  prizeLabel: string | null;
  officialUrl: string | null;
  summary: string;
  tags: string[];
};

function contestDraftItem(event: ContestEvent): DraftItem {
  const gradeTag: Record<string, string> = { 초: "#초등공모전", 중: "#중등공모전", 고: "#고등공모전" };
  const tags = ["#공모전", "#대외활동", ...event.grades.map((g) => gradeTag[g]), `#${event.category.replace(/[·\s]/g, "")}`];
  if (event.free) tags.push("#무료공모전");
  if (!event.regions.includes("전국") && event.regions[0]) tags.push(`#${event.regions[0]}`);
  return {
    kind: "contest",
    id: event.id,
    title: event.title,
    typeLabel: "공모전",
    organizerLabel: event.organizer,
    targetLabel: `${event.grades.join("·")}등학생`,
    category: event.category,
    regionLabel: event.regions.join("·"),
    deadlineLabel: event.deadline ?? "미정",
    dday: currentDday(event.deadline),
    free: event.free,
    priceLabel: event.free ? "무료" : "확인 필요",
    prizeLabel: event.prize,
    officialUrl: event.officialUrl,
    summary: event.summary,
    tags,
  };
}

function cultureDraftItem(event: CultureEvent): DraftItem {
  const tags = ["#문화행사", `#${event.eventType.replace(/[·/\s]/g, "")}`];
  event.grades.forEach((g) => tags.push(`#${g}등문화체험`));
  if (event.free) tags.push("#무료문화행사");
  if (event.region && event.region !== "확인필요") tags.push(`#${event.region}`);
  return {
    kind: "culture",
    id: event.id,
    title: event.title,
    typeLabel: `문화행사 · ${event.eventType}`,
    organizerLabel: event.venueName ?? event.source,
    targetLabel: event.grades.length ? `${event.grades.join("·")}등학생` : event.ageText ?? "연령 확인 필요",
    category: event.category,
    regionLabel: event.region,
    deadlineLabel: event.endDate ?? event.startDate ?? "일정 확인 필요",
    dday: currentCultureDday(event.startDate, event.endDate),
    free: event.free,
    priceLabel: event.free ? "무료" : event.priceText ?? "확인 필요",
    prizeLabel: null,
    officialUrl: event.officialUrl,
    summary: event.summary,
    tags,
  };
}

export function BlogDraftGenerator({
  contests,
  cultures,
  initialId,
}: {
  contests: ContestEvent[];
  cultures: CultureEvent[];
  initialId?: string;
}) {
  const [idx, setIdx] = useState(0);
  const savedItemsRaw = useSyncExternalStore(
    subscribeSavedItems,
    getSavedItemsRawSnapshot,
    () => "[]"
  );
  const savedRefs = useMemo(() => parseSavedItems(savedItemsRaw), [savedItemsRaw]);
  const [academy, setAcademy] = useState("○○학원");
  const [tone, setTone] = useState<Tone>("formal");
  const [withTags, setWithTags] = useState(true);
  const [copied, setCopied] = useState(false);

  const allItems = useMemo(
    () => [...contests.map(contestDraftItem), ...cultures.map(cultureDraftItem)],
    [contests, cultures]
  );

  const events = useMemo(() => {
    const saved = savedRefs
      .map((ref) => allItems.find((item) => item.kind === ref.kind && item.id === ref.id))
      .filter((item): item is DraftItem => Boolean(item));
    if (saved.length) return saved;
    return initialId ? allItems.filter((item) => item.id === initialId) : [];
  }, [allItems, initialId, savedRefs]);

  const safeIdx = events.length ? Math.min(idx, events.length - 1) : 0;
  const event = events[safeIdx] ?? null;
  const tagsFor = useMemo(() => event?.tags ?? [], [event]);

  const plain = useMemo(() => {
    if (!event) return "";
    const greet =
      tone === "friendly"
        ? `안녕하세요, 학부모님! ${academy}입니다.`
        : `안녕하세요, ${academy}입니다. 학생들에게 안내하기 좋은 교육 정보를 전해드립니다.`;
    const L: string[] = [];
    L.push(`[${event.typeLabel}] ${event.title}`);
    L.push("");
    L.push(greet);
    L.push(event.kind === "contest" ? "이번에 우리 학생들이 도전해볼 만한 공모전을 소개합니다." : "이번에 학생과 가족이 함께 살펴볼 만한 문화행사를 소개합니다.");
    L.push("");
    L.push("■ 행사 한눈에");
    L.push(`· 행사명: ${event.title}`);
    L.push(`· 주최/장소: ${event.organizerLabel}`);
    L.push(`· 대상: ${event.targetLabel}`);
    L.push(`· 분야: ${event.category}`);
    L.push(`· 지역: ${event.regionLabel} (참고용)`);
    L.push(`· 일정/마감: ${event.deadlineLabel}${event.dday != null ? ` (D-${event.dday})` : ""}`);
    L.push(`· 비용: ${event.priceLabel}`);
    if (event.prizeLabel) L.push(`· 시상: ${event.prizeLabel}`);
    L.push("");
    L.push("■ 행사 소개");
    L.push(event.summary);
    L.push("");
    L.push(event.kind === "contest" ? "■ 참가 방법" : "■ 확인 방법");
    L.push("아래 원본 페이지에서 자세한 요강과 일정을 한 번 더 확인해 주세요.");
    L.push(`▶ 원본에서 확인하기: ${event.officialUrl ?? "원본 링크 확인 중"}`);
    L.push("");
    L.push(`관심 있는 학생과 학부모님은 일정(${event.deadlineLabel}) 전에 꼭 확인해 주세요.`);
    L.push(`— ${academy} 드림`);
    if (withTags) {
      L.push("");
      L.push(tagsFor.join(" "));
    }
    return L.join("\n");
  }, [event, tone, academy, withTags, tagsFor]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(plain);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = plain;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div className="mx-auto w-full max-w-[var(--max-wide)] px-[var(--pad-x)] py-7 sm:py-9">
      <section className="overflow-hidden rounded-[28px] bg-[#F8FAFC] ring-1 ring-[#E5E8EB]">
        <div className="grid gap-6 px-5 py-6 sm:px-8 sm:py-8 lg:grid-cols-[1fr_310px] lg:items-end">
          <div>
            <p className="inline-flex rounded-full bg-white px-3 py-1 text-[12px] font-extrabold text-[#3182F6] ring-1 ring-[#E5E8EB]">
              학원 안내문 제작도구
            </p>
            <h1 className="mt-4 max-w-2xl text-[30px] font-extrabold leading-tight tracking-normal text-[#191F28] sm:text-[40px]">
              담아둔 교육 정보를 학부모 안내 글로 정리하세요
            </h1>
            <p className="mt-3 max-w-2xl text-[14px] leading-7 text-[#4E5968] sm:text-[15px]">
              공모전과 문화행사의 기본정보, 원본 링크, 일정, 해시태그를 같은 형식으로 정리해 블로그나 문자 안내에 활용합니다.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-2 rounded-2xl bg-white p-2 ring-1 ring-[#E5E8EB] lg:grid-cols-1">
            <HeroMetric label="글감 후보" value={`${events.length}`} />
            <HeroMetric label="현재 선택" value={event ? `${safeIdx + 1}` : "0"} accent />
            <HeroMetric label="본문 길이" value={`${plain.length}`} />
          </div>
        </div>
      </section>

      {!event && (
        <section className="mt-4 rounded-[22px] bg-white p-6 text-center shadow-[0_10px_30px_rgba(15,23,42,0.05)] ring-1 ring-[#E5E8EB] sm:p-10">
          <h2 className="text-[20px] font-extrabold text-[#191F28]">아직 담아둔 항목이 없어요</h2>
          <p className="mx-auto mt-2 max-w-xl text-[14px] leading-7 text-[#6B7684]">
            공모전이나 문화행사 화면에서 `담기`를 누르면 이곳에 글감 후보가 생겨요. 안내문을 만들기 전에는 원본 페이지에서 일정과 참가 조건을 한 번 더 확인해요.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            <Link href="/contest" className="rounded-full bg-[#191F28] px-4 py-2.5 text-[13px] font-extrabold text-white">
              공모전 보러가기
            </Link>
            <Link href="/culture" className="rounded-full bg-[#E8F3FF] px-4 py-2.5 text-[13px] font-extrabold text-[#1B64DA]">
              문화행사 보러가기
            </Link>
          </div>
        </section>
      )}

      {/* 예시 행사 전환 */}
      {event && <div className="mt-4 rounded-[22px] bg-white p-3 shadow-[0_10px_30px_rgba(15,23,42,0.05)] ring-1 ring-[#E5E8EB]">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <span className="shrink-0 text-[11.5px] font-extrabold text-[#8B95A1]">행사 선택</span>
        {events.map((ev, i) => {
          const on = i === safeIdx;
          const short = ev.title.length > 14 ? ev.title.slice(0, 13) + "…" : ev.title;
          return (
            <button
              key={ev.id}
              onClick={() => { setIdx(i); setCopied(false); }}
              className={cn(
                "shrink-0 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                on ? "border-[#191F28] bg-[#191F28] text-white" : "border-[#E5E8EB] bg-[#F2F4F6] text-[#4E5968] hover:bg-[#E5E8EB]"
              )}
            >
              {short}
            </button>
          );
        })}
        </div>
      </div>}

      {event && <div className="mt-5 grid grid-cols-1 items-start gap-4 lg:grid-cols-[1fr_360px]">
        {/* LEFT: 블로그 글 */}
        <div className="overflow-hidden rounded-[22px] bg-white shadow-[0_10px_30px_rgba(15,23,42,0.05)] ring-1 ring-[#E5E8EB]">
          <div className="h-1 bg-[#3182F6]" />
          <div className="flex items-center justify-between gap-3 border-b border-[#E5E8EB] px-5 py-4">
            <div>
              <div className="text-sm font-extrabold text-[#191F28]">블로그 글감 · 복사해서 붙여넣기</div>
              <div className="mt-0.5 text-[11.5px] text-[#6B7684]">{plain.length}자 · 학부모 안내용 구조</div>
            </div>
            <button
              onClick={copy}
              className={cn(
                "flex-none rounded-xl px-4 py-2.5 text-[13.5px] font-bold text-white transition-colors",
                copied ? "bg-[#2E9D63]" : "bg-[#191F28] hover:bg-[#3182F6]"
              )}
            >
              {copied ? "✓ 복사됨!" : "복사하기"}
            </button>
          </div>
          <pre className="px-6 py-5 font-sans text-[14.5px] leading-loose whitespace-pre-wrap text-[#191F28] select-text">
            {plain}
          </pre>
        </div>

        {/* RIGHT: 포스터 + 옵션 */}
        <div className="flex flex-col gap-4">
          <section className="rounded-[22px] bg-white p-5 shadow-[0_10px_30px_rgba(15,23,42,0.05)] ring-1 ring-[#E5E8EB]">
            <div className="flex items-center justify-between">
              <h2 className="text-[13px] font-bold text-foreground">포스터 · 이미지</h2>
              <span className="text-[11px] text-muted-foreground">드래그하거나 클릭해 넣기</span>
            </div>
            <p className="mt-1.5 text-[11.5px] leading-relaxed text-muted-foreground">
              행사 페이지의 포스터·홍보 이미지를 넣으면 블로그에 함께 올릴 수 있습니다.
            </p>
            <div className="mt-3 flex flex-col gap-2.5">
              <ImageSlot height={200} placeholder="행사 포스터를 드래그" />
              <div className="grid grid-cols-2 gap-2.5">
                <ImageSlot height={92} placeholder="이미지 2" />
                <ImageSlot height={92} placeholder="이미지 3" />
              </div>
            </div>
          </section>

          <section className="rounded-[22px] bg-white p-5 shadow-[0_10px_30px_rgba(15,23,42,0.05)] ring-1 ring-[#E5E8EB]">
            <h2 className="text-[13px] font-bold text-foreground">안내문 옵션</h2>

            <div className="mt-3.5">
              <div className="mb-1.5 text-[11.5px] font-bold text-muted-foreground">학원 이름</div>
              <input
                value={academy}
                onChange={(e) => { setAcademy(e.target.value || "○○학원"); setCopied(false); }}
                placeholder="○○학원"
                className="h-11 w-full rounded-xl border border-border bg-card px-3.5 text-[13.5px] text-foreground outline-none focus:border-primary"
              />
            </div>

            <div className="mt-3.5">
              <div className="mb-1.5 text-[11.5px] font-bold text-muted-foreground">말투</div>
              <div className="flex gap-2">
                {(["formal", "friendly"] as Tone[]).map((t) => (
                  <button
                    key={t}
                    onClick={() => { setTone(t); setCopied(false); }}
                    className={cn(
                      "flex-1 rounded-xl border py-2.5 text-[13px] font-bold transition-colors",
                      tone === t ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-foreground hover:bg-muted"
                    )}
                  >
                    {t === "formal" ? "정중한" : "친근한"}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => { setWithTags((v) => !v); setCopied(false); }}
              className="mt-3.5 flex w-full items-center justify-between"
              role="switch"
              aria-checked={withTags}
            >
              <span className="text-[13px] font-medium text-foreground">해시태그 포함</span>
              <span className={cn("relative h-[22px] w-[38px] rounded-full transition-colors", withTags ? "bg-primary" : "bg-muted-foreground/40")}>
                <span className={cn("absolute top-0.5 size-[18px] rounded-full bg-white shadow transition-all", withTags ? "left-[18px]" : "left-0.5")} />
              </span>
            </button>

            {withTags && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {tagsFor.map((tg) => (
                  <span key={tg} className="rounded-full bg-accent px-2.5 py-1 text-[11.5px] font-medium text-accent-foreground">
                    {tg}
                  </span>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>}
    </div>
  );
}

function HeroMetric({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className={cn("rounded-xl px-3 py-3", accent ? "bg-[#E8F3FF]" : "bg-[#F9FAFB]")}>
      <div className={cn("text-[11px] font-extrabold", accent ? "text-[#1B64DA]" : "text-[#6B7684]")}>{label}</div>
      <div className={cn("mt-1 text-[22px] font-black leading-none", accent ? "text-[#1B64DA]" : "text-[#191F28]")}>{value}</div>
    </div>
  );
}

function ImageSlot({ height, placeholder }: { height: number; placeholder: string }) {
  const [src, setSrc] = useState<string | null>(null);
  const [over, setOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function load(file: File | undefined) {
    if (!file || !file.type.startsWith("image/")) return;
    setSrc(URL.createObjectURL(file));
  }

  return (
    <div
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => { e.preventDefault(); setOver(true); }}
      onDragLeave={() => setOver(false)}
      onDrop={(e) => { e.preventDefault(); setOver(false); load(e.dataTransfer.files?.[0]); }}
      className={cn(
        "flex cursor-pointer items-center justify-center overflow-hidden rounded-xl border-2 border-dashed transition-colors",
        over ? "border-primary bg-accent" : "border-border bg-muted/40"
      )}
      style={{ height }}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt="첨부 이미지" className="size-full object-cover" />
      ) : (
        <span className="px-2 text-center text-[11.5px] font-medium text-muted-foreground">{placeholder}</span>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => load(e.target.files?.[0])}
      />
    </div>
  );
}
