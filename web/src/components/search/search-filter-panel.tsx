"use client";

import type { ReactNode } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { GRADE_OPTIONS, type Grade } from "@/types/contest";

type Metric = {
  label: string;
  value: string;
  accent?: boolean;
};

export function SearchHero({
  eyebrow,
  title,
  description,
  metrics,
  keyword,
  onKeywordChange,
  placeholder,
}: {
  eyebrow: string;
  title: string;
  description: string;
  metrics: Metric[];
  keyword: string;
  onKeywordChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <section className="overflow-hidden rounded-[28px] bg-[#F8FAFC] ring-1 ring-[#E5E8EB]">
      <div className="grid gap-6 px-5 py-6 sm:px-8 sm:py-8 lg:grid-cols-[1fr_310px] lg:items-end">
        <div>
          <p className="inline-flex rounded-full bg-white px-3 py-1 text-[12px] font-extrabold text-[#3182F6] ring-1 ring-[#E5E8EB]">
            {eyebrow}
          </p>
          <h1 className="mt-4 max-w-2xl text-[30px] font-extrabold leading-tight tracking-normal text-[#191F28] sm:text-[40px]">
            {title}
          </h1>
          <p className="mt-3 max-w-2xl text-[14px] leading-7 text-[#4E5968] sm:text-[15px]">
            {description}
          </p>
        </div>
        <div className="grid grid-cols-3 gap-2 rounded-2xl bg-white p-2 ring-1 ring-[#E5E8EB] lg:grid-cols-1">
          {metrics.map((metric) => (
            <HeroMetric key={metric.label} {...metric} />
          ))}
        </div>
      </div>
      <div className="border-t border-[#E5E8EB] bg-white px-5 py-4 sm:px-8">
        <div className="flex min-h-14 items-center gap-3 rounded-[18px] bg-[#F2F4F6] px-4 py-2 ring-1 ring-transparent transition-colors focus-within:bg-white focus-within:ring-[#3182F6]/35">
          <span className="grid size-8 shrink-0 place-items-center rounded-full bg-white text-[15px] font-extrabold text-[#8B95A1] ring-1 ring-[#E5E8EB]">
            ⌕
          </span>
          <Input
            value={keyword}
            onChange={(event) => onKeywordChange(event.target.value)}
            placeholder={placeholder}
            className="h-10 flex-1 border-0 bg-transparent px-0 text-[15px] font-semibold text-[#191F28] placeholder:text-[#8B95A1] focus-visible:ring-0"
          />
          {keyword && (
            <button
              type="button"
              onClick={() => onKeywordChange("")}
              className="rounded-full bg-white px-3 py-1.5 text-[12px] font-extrabold text-[#6B7684] ring-1 ring-[#E5E8EB]"
            >
              지우기
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

export function SearchFilterCard({
  activeFilterCount,
  children,
  right,
  panel,
}: {
  activeFilterCount: number;
  children: ReactNode;
  right: ReactNode;
  panel?: ReactNode;
}) {
  return (
    <section className="relative z-[5] mt-4 rounded-[22px] bg-white p-3 shadow-[0_10px_30px_rgba(15,23,42,0.05)] ring-1 ring-[#E5E8EB] sm:p-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-2">{children}</div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="hidden text-[12px] font-extrabold text-[#8B95A1] sm:inline">필터 {activeFilterCount}</span>
          {right}
        </div>
      </div>
      {panel}
    </section>
  );
}

export function SearchFilterButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-xl px-4 py-2 text-[13px] font-extrabold transition-colors",
        active ? "bg-[#191F28] text-white" : "bg-[#F2F4F6] text-[#4E5968] hover:bg-[#E5E8EB]"
      )}
    >
      {label} <span className="ml-1 text-current/70">⌄</span>
    </button>
  );
}

export function SearchFilterPanel({
  title,
  hint,
  options,
  values,
  onToggle,
}: {
  title: string;
  hint: string;
  options: string[];
  values: string[];
  onToggle: (value: string) => void;
}) {
  return (
    <div className="mt-4 rounded-2xl bg-[#F9FAFB] p-4 ring-1 ring-[#E5E8EB]">
      <div className="flex flex-wrap items-baseline gap-2">
        <p className="text-[13px] font-extrabold text-[#191F28]">{title}</p>
        <p className="text-[12px] text-[#8B95A1]">{hint}</p>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((option) => {
          const on = values.includes(option);
          return (
            <button
              key={option}
              type="button"
              onClick={() => onToggle(option)}
              className={cn(
                "rounded-full px-3.5 py-2 text-[12.5px] font-bold transition-colors",
                on ? "bg-[#191F28] text-white" : "bg-white text-[#4E5968] ring-1 ring-[#E5E8EB] hover:bg-[#F2F4F6]"
              )}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function SearchFilterToggle({
  checked,
  label,
  onClick,
}: {
  checked: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-full bg-[#F9FAFB] px-3 py-2 text-[13px] font-extrabold text-[#4E5968] ring-1 ring-[#E5E8EB]"
    >
      <span className={cn("relative h-6 w-10 rounded-full transition-colors", checked ? "bg-[#3182F6]" : "bg-[#D1D6DB]")}>
        <span className={cn("absolute top-1 size-4 rounded-full bg-white transition-transform", checked ? "left-5" : "left-1")} />
      </span>
      {label}
    </button>
  );
}

export function SearchFilterReset({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-full px-3 py-2 text-[13px] font-extrabold text-[#6B7684] hover:bg-[#F2F4F6]"
    >
      초기화
    </button>
  );
}

export function SearchFilterDivider() {
  return <span className="hidden h-6 w-px bg-[#E5E8EB] sm:block" />;
}

export function SearchGradeFilter({
  values,
  onToggle,
}: {
  values: Grade[];
  onToggle: (value: Grade) => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-extrabold text-[#8B95A1]">참가학년</span>
      <div className="flex gap-1.5">
        {GRADE_OPTIONS.map((grade) => {
          const on = values.includes(grade.value);
          return (
            <button
              key={grade.value}
              type="button"
              onClick={() => onToggle(grade.value)}
              className={cn(
                "rounded-xl px-3.5 py-2 text-[13px] font-extrabold transition-colors",
                on ? "bg-[#191F28] text-white" : "bg-[#F2F4F6] text-[#4E5968] hover:bg-[#E5E8EB]"
              )}
            >
              {grade.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function SearchSegmentButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-xl px-4 py-2.5 text-[13px] font-extrabold transition-colors",
        active ? "bg-white text-[#191F28] shadow-[0_4px_12px_rgba(15,23,42,0.08)]" : "text-[#6B7684] hover:text-[#191F28]"
      )}
    >
      {label}
    </button>
  );
}

function HeroMetric({ label, value, accent }: Metric) {
  return (
    <div className={cn("rounded-xl px-3 py-3", accent ? "bg-[#E8F3FF]" : "bg-[#F9FAFB]")}>
      <div className={cn("text-[11px] font-extrabold", accent ? "text-[#1B64DA]" : "text-[#6B7684]")}>{label}</div>
      <div className={cn("mt-1 text-[22px] font-black leading-none", accent ? "text-[#1B64DA]" : "text-[#191F28]")}>{value}</div>
    </div>
  );
}
