import type { Grade } from "@/types/contest";

export function normalizeGradeLabel(value: string): Grade | null {
  if (value === "초" || value.includes("초등")) return "초";
  if (value === "중" || value.includes("중등")) return "중";
  if (value === "고" || value.includes("고등")) return "고";
  return null;
}

export function matchesGradeFilter(values: string[], filters: Grade[]): boolean {
  if (!filters.length) return true;
  return values.some((value) => {
    const normalized = normalizeGradeLabel(value);
    return normalized ? filters.includes(normalized) : filters.includes(value as Grade);
  });
}
