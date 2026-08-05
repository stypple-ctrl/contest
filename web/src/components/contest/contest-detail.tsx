"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  CATEGORY_META,
  STATUS_META,
  type ContestEvent,
} from "@/types/contest";
import { currentDday, DATA_DATE, deadlineLabel, shortDate } from "@/lib/contest-data";
import { SavedItemButton } from "@/components/search/saved-item-button";

export function ContestDetail({ event }: { event: ContestEvent }) {
  const [draft, setDraft] = useState("");
  const [added, setAdded] = useState<{ url: string; label: string }[]>([]);

  const cat = CATEGORY_META[event.category];
  const st = STATUS_META[event.status];
  const urgent = event.status === "마감임박";
  const rec = event.academyRecommendation;
  const liveDday = currentDday(event.deadline);

  // 접수기간 진행률
  let pct = 50;
  if (event.start && event.deadline) {
    const today = new Date(DATA_DATE + "T00:00:00").getTime();
    const start = new Date(event.start + "T00:00:00").getTime();
    const end = new Date(event.deadline + "T00:00:00").getTime();
    pct = Math.max(4, Math.min(96, Math.round(((today - start) / (end - start)) * 100)));
  }

  const ddayBg = urgent ? "#FCEBE9" : "#EEF1FB";
  const ddayColor = urgent ? "#C13320" : "#3A4A8F";

  function addLink() {
    const v = draft.trim();
    if (!v) return;
    const url = /^https?:\/\//i.test(v) ? v : `https://${v}`;
    const label = url.replace(/^https?:\/\//i, "").replace(/^www\./i, "").split("/")[0];
    setAdded((p) => [...p, { url, label }]);
    setDraft("");
  }

  const links = [
    ...(event.officialUrl
      ? [{ url: event.officialUrl, label: "기관 원본 공고에서 확인하기", fixed: true }]
      : []),
    ...added.map((l) => ({ ...l, fixed: false })),
  ];

  return (
    <div className="mx-auto w-full max-w-[var(--max-default)] px-[var(--pad-x)] py-8">
      <Link
        href="/contest"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        ← 검색 결과로 돌아가기
      </Link>

      {/* 헤더 카드 */}
      <div className="mt-4 overflow-hidden rounded-xl bg-card ring-1 ring-foreground/10">
        <div style={{ height: 5, background: cat.accent }} />
        <div className="p-6">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-start">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[12.5px] font-bold"
                  style={{ background: st.bg, color: st.text }}
                >
                  <span className="size-1.5 rounded-full" style={{ background: st.dot }} />
                  {event.status}
                </span>
                <span
                  className="rounded-lg px-2.5 py-1 text-xs font-bold"
                  style={{ background: cat.bg, color: cat.text }}
                >
                  {event.category}
                </span>
              </div>
              <h1 className="aw-title-wrap mt-3 font-serif text-2xl font-bold tracking-tight text-foreground sm:text-[25px]">
                {event.title}
              </h1>
              <p className={cn("mt-2 text-[13.5px]", event.conflict ? "text-[#B0791F]" : "text-muted-foreground")}>
                주최 · {event.organizer}
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-1.5">
                {event.grades.map((g) => (
                  <span key={g} className="rounded-lg bg-accent px-3 py-1.5 text-[13px] font-bold text-accent-foreground">
                    {g}
                  </span>
                ))}
                <span className="mx-1 h-3.5 w-px bg-border" />
                <span className="rounded-lg border border-border px-2.5 py-1.5 text-[12.5px] font-medium text-muted-foreground">
                  {event.regions.join("·")}
                </span>
                <span className="text-[11.5px] text-muted-foreground/70">지역 참고용</span>
              </div>
            </div>
            <div
              className="flex-none rounded-2xl px-6 py-4 text-center sm:min-w-[124px]"
              style={{ background: ddayBg }}
            >
              <div className="text-[11px] font-bold opacity-80" style={{ color: ddayColor }}>접수마감</div>
              <div className="mt-1 text-[34px] leading-none font-extrabold tracking-tight tabular-nums" style={{ color: ddayColor }}>
                {liveDday != null ? `D-${liveDday}` : "—"}
              </div>
              <div className="mt-1.5 text-xs font-medium" style={{ color: ddayColor }}>
                {deadlineLabel(event.deadline)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 본문 그리드 */}
      <div className="mt-4 grid grid-cols-1 items-start gap-4 lg:grid-cols-[1fr_308px]">
        <div className="flex flex-col gap-4">
          {/* 한눈에 보기 */}
          <section className="rounded-xl bg-card p-5 ring-1 ring-foreground/10">
            <h2 className="text-[13px] font-bold text-foreground">한눈에 보기</h2>
            <p className="mt-2.5 text-[14.5px] leading-relaxed text-foreground/85">{event.summary}</p>
          </section>

          {/* 학원 활용 제안 */}
          <section className="rounded-xl bg-card p-5 ring-1 ring-foreground/10">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="text-[13px] font-bold text-foreground">학원 활용 제안</h2>
                <p className="mt-1 text-[12px] text-muted-foreground">
                  제목만이 아니라 대상·분야·마감·지역·검수상태를 함께 본 후보 분류입니다.
                </p>
              </div>
              <span className="rounded-full bg-accent px-3 py-1 text-[12px] font-extrabold text-accent-foreground">
                안내 전 원본에서 확인해요
              </span>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <InfoBlock title="활용 방식" items={rec.useCaseTags} />
              <InfoBlock title="과목·진로 연결" items={[...rec.subjectTags, ...rec.careerTags].slice(0, 6)} />
            </div>

            <div className="mt-4 grid gap-3 lg:grid-cols-3">
              <EvidenceBlock title="추천 이유" items={rec.reasons} tone="primary" />
              <EvidenceBlock title="분류 근거" items={rec.evidence} />
              <EvidenceBlock title="확인 필요" items={rec.warnings.length ? rec.warnings : ["마감일, 참가 대상, 제출 방법은 안내 전 원본에서 한 번 더 확인해요."]} tone="warning" />
            </div>

            <div className="mt-4 rounded-xl border border-border bg-secondary/45 p-4">
              <div className="text-[12px] font-bold text-foreground">특강·수업 아이디어</div>
              <div className="mt-2 flex flex-wrap gap-2">
                {rec.programIdeas.map((idea) => (
                  <span key={idea} className="rounded-lg bg-card px-3 py-1.5 text-[12.5px] font-medium text-foreground ring-1 ring-border">
                    {idea}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* 접수 기간 */}
          <section className="rounded-xl bg-card p-5 ring-1 ring-foreground/10">
            <div className="flex items-center justify-between">
              <h2 className="text-[13px] font-bold text-foreground">접수 기간</h2>
              <span className="text-xs font-bold text-primary">
                {shortDate(event.start)} ~ {shortDate(event.deadline)}
              </span>
            </div>
            <div className="relative mt-4 h-2 rounded-full bg-muted">
              <div
                className="absolute top-0 left-0 h-2 rounded-full bg-primary"
                style={{ width: `${pct}%` }}
              />
              <div
                className="absolute -top-1 size-4 -translate-x-1/2 rounded-full border-[3px] border-primary bg-card"
                style={{ left: `${pct}%` }}
              />
            </div>
            <div className="mt-2.5 flex items-center justify-between text-xs text-muted-foreground">
              <span>시작 {shortDate(event.start)}</span>
              <span className="font-bold text-primary">기준일 {shortDate(DATA_DATE)}</span>
              <span>마감 {shortDate(event.deadline)}</span>
            </div>
            <div className="mt-4 flex items-center gap-2 border-t border-dashed border-border pt-3.5">
              <span className="text-xs font-bold text-muted-foreground">행사일</span>
              <span className="rounded-lg bg-muted px-2.5 py-1 text-xs font-bold text-muted-foreground">미정</span>
              <span className="text-xs text-muted-foreground/80">출처가 접수기간만 제공 — 확정 시 업데이트됩니다.</span>
            </div>
          </section>

          {/* 시상 · 참가비 */}
          <section className="rounded-xl bg-card p-5 ring-1 ring-foreground/10">
            <h2 className="text-[13px] font-bold text-foreground">시상 · 참가비</h2>
            <div className="mt-3 flex flex-wrap gap-3">
              <div className="min-w-[160px] flex-1 rounded-xl border border-[#F1E6CE] bg-[#FBF6EC] p-4">
                <div className="text-[11.5px] font-bold text-[#B5912F]">시상 내역</div>
                <div className="mt-1.5 text-xl font-extrabold tracking-tight text-[#8A6A12]">{event.prize ?? "없음"}</div>
              </div>
              <div className="min-w-[160px] flex-1 rounded-xl border border-[#D4EBDD] bg-[#EEF7F1] p-4">
                <div className="text-[11.5px] font-bold text-[#2E9D63]">참가비</div>
                <div className="mt-1.5 text-xl font-extrabold tracking-tight text-[#1F7D4D]">{event.free ? "무료" : "확인 필요"}</div>
              </div>
            </div>
          </section>

          {/* 주관처 · 관련 링크 */}
          <section className="rounded-xl bg-card p-5 ring-1 ring-foreground/10">
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-[13px] font-bold text-foreground">주관처 · 관련 링크</h2>
              <span className="text-[11.5px] text-muted-foreground">홈페이지 · 접수 폼 · 요강 PDF 링크를 추가하세요</span>
            </div>
            <div className="mt-3 flex flex-col gap-2.5">
              {links.map((lk, i) => (
                <div key={i} className="flex items-center gap-3 rounded-xl border border-border bg-secondary/40 p-3">
                  <span className="grid size-9 flex-none place-items-center rounded-lg bg-accent text-[15px] font-bold text-primary">↗</span>
                  <a href={lk.url} target="_blank" rel="noopener noreferrer" className="min-w-0 flex-1">
                    <div className="truncate text-[13.5px] font-bold text-foreground">{lk.label}</div>
                    <div className="truncate text-[11.5px] text-muted-foreground">{lk.url}</div>
                  </a>
                  {lk.fixed ? (
                    <span className="flex-none rounded-md bg-muted px-2 py-0.5 text-[11px] font-bold text-muted-foreground">기본</span>
                  ) : (
                    <button
                      onClick={() => setAdded((p) => p.filter((_, j) => j !== i - 1))}
                      className="flex-none px-2 py-1 text-[12.5px] font-bold text-muted-foreground transition-colors hover:text-destructive"
                    >
                      삭제
                    </button>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-3 flex gap-2">
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addLink()}
                placeholder="주관처 또는 접수 페이지 URL 붙여넣기 (예: nexon.com)"
                className="h-11 flex-1 rounded-xl border border-border bg-card px-3.5 text-[13px] text-foreground outline-none focus:border-primary"
              />
              <button
                onClick={addLink}
                disabled={!draft.trim()}
                className="flex-none rounded-xl bg-primary px-5 text-[13.5px] font-bold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-40"
              >
                + 추가
              </button>
            </div>
          </section>
        </div>

        {/* 사이드 정보 */}
        <aside className="flex flex-col gap-3.5 lg:sticky lg:top-[calc(var(--header-h)+1rem)]">
          <div className="rounded-xl bg-card p-5 ring-1 ring-foreground/10">
            <FactRow k="접수 시작" v={shortDate(event.start)} />
            <FactRow k="접수 마감" v={`${deadlineLabel(event.deadline)} ${liveDday != null ? `(D-${liveDday})` : ""}`} accent={ddayColor} />
            <FactRow k="참가 학년" v={event.grades.join("·")} />
            <FactRow k="지역" v={event.regions.join("·")} />
            <FactRow k="분야" v={event.category} last />
          </div>

          {event.officialUrl ? (
            <a
              href={event.officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 rounded-xl bg-primary px-4 py-3.5 text-[14.5px] font-extrabold text-primary-foreground shadow-[var(--shadow-card)] transition-opacity hover:opacity-90"
            >
              원본에서 확인하기 →
            </a>
          ) : (
            <div className="rounded-xl border border-[#F0E2C0] bg-[#FBF4E6] p-3 text-[12px] leading-relaxed text-[#9A7B23]">
              기관 원본 링크를 아직 확보하지 못했습니다. 내부 검수 목록에서 확인 후 업데이트됩니다.
            </div>
          )}
          <SavedItemButton
            kind="contest"
            id={event.id}
            selectedLabel="✓ 내보내기 목록에 담김"
            unselectedLabel="+ 내보내기 목록에 담기"
            className="rounded-xl border px-4 py-3 text-[13.5px]"
            selectedClassName="border-primary/40 bg-accent text-accent-foreground"
            unselectedClassName="border-border bg-card text-foreground hover:bg-muted"
          />

          {event.conflict && (
            <div className="rounded-xl border border-[#F0E2C0] bg-[#FBF4E6] p-3 text-[11.5px] leading-relaxed text-[#9A7B23]">
              일부 정보는 확인 중이에요. 안내 전 기관 원본 공고에서 한 번 더 확인해요.
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}

function FactRow({ k, v, accent, last }: { k: string; v: string; accent?: string; last?: boolean }) {
  return (
    <div className={cn("flex items-center justify-between py-2.5", !last && "border-b border-border")}>
      <span className="text-[12.5px] text-muted-foreground">{k}</span>
      <span className="text-[13px] font-bold text-foreground" style={accent ? { color: accent } : undefined}>{v}</span>
    </div>
  );
}

function InfoBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-xl border border-border bg-secondary/45 p-4">
      <div className="text-[12px] font-bold text-muted-foreground">{title}</div>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {items.length ? items.map((item) => (
          <span key={item} className="rounded-md bg-card px-2.5 py-1 text-[12px] font-bold text-foreground ring-1 ring-border">
            {item}
          </span>
        )) : (
          <span className="text-[12.5px] text-muted-foreground">분류 정보 확인 필요</span>
        )}
      </div>
    </div>
  );
}

function EvidenceBlock({
  title,
  items,
  tone = "default",
}: {
  title: string;
  items: string[];
  tone?: "default" | "primary" | "warning";
}) {
  const toneClass =
    tone === "primary"
      ? "border-primary/20 bg-accent/70"
      : tone === "warning"
        ? "border-[#F0E2C0] bg-[#FBF4E6]"
        : "border-border bg-background";

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
