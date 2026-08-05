import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function ResultGrid({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "grid grid-cols-[repeat(auto-fit,minmax(min(100%,290px),1fr))] gap-4 pt-4 sm:gap-5",
        className
      )}
    >
      {children}
    </section>
  );
}
