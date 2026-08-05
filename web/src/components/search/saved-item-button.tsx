"use client";

import { useMemo, useSyncExternalStore } from "react";
import {
  getSavedItemsRawSnapshot,
  parseSavedItems,
  subscribeSavedItems,
  writeSavedItems,
  type SavedItemKind,
} from "@/lib/saved-items";
import { cn } from "@/lib/utils";

export function SavedItemButton({
  kind,
  id,
  selectedLabel = "담김",
  unselectedLabel = "담기",
  className,
  selectedClassName,
  unselectedClassName,
  stopPropagation = false,
}: {
  kind: SavedItemKind;
  id: string;
  selectedLabel?: string;
  unselectedLabel?: string;
  className?: string;
  selectedClassName?: string;
  unselectedClassName?: string;
  stopPropagation?: boolean;
}) {
  const savedItemsRaw = useSyncExternalStore(
    subscribeSavedItems,
    getSavedItemsRawSnapshot,
    () => "[]"
  );
  const savedItems = useMemo(() => parseSavedItems(savedItemsRaw), [savedItemsRaw]);
  const selected = savedItems.some((item) => item.kind === kind && item.id === id);

  function toggle() {
    if (selected) {
      writeSavedItems(savedItems.filter((item) => !(item.kind === kind && item.id === id)));
      return;
    }
    writeSavedItems([...savedItems, { kind, id }]);
  }

  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={(event) => {
        if (stopPropagation) event.stopPropagation();
        toggle();
      }}
      className={cn(
        "rounded-full px-3 py-2 text-[12px] font-bold transition-colors",
        selected ? selectedClassName : unselectedClassName,
        className
      )}
    >
      {selected ? selectedLabel : unselectedLabel}
    </button>
  );
}
