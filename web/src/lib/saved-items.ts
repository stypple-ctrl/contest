export type SavedItemKind = "contest" | "culture";

export type SavedItemRef = {
  kind: SavedItemKind;
  id: string;
};

export const SAVED_ITEMS_KEY = "edu-info:selected-items:v1";
const SAVED_ITEMS_EVENT = "edu-info:selected-items-change";

function isSavedItemRef(value: unknown): value is SavedItemRef {
  if (!value || typeof value !== "object") return false;
  const item = value as Partial<SavedItemRef>;
  return (item.kind === "contest" || item.kind === "culture") && typeof item.id === "string";
}

export function parseSavedItems(raw: string | null): SavedItemRef[] {
  try {
    const parsed: unknown = JSON.parse(raw ?? "[]");
    return Array.isArray(parsed) ? parsed.filter(isSavedItemRef) : [];
  } catch {
    return [];
  }
}

export function readSavedItems(): SavedItemRef[] {
  if (typeof window === "undefined") return [];
  return parseSavedItems(window.localStorage.getItem(SAVED_ITEMS_KEY));
}

export function getSavedItemsRawSnapshot() {
  if (typeof window === "undefined") return "[]";
  return window.localStorage.getItem(SAVED_ITEMS_KEY) ?? "[]";
}

export function subscribeSavedItems(onStoreChange: () => void) {
  if (typeof window === "undefined") return () => {};
  const onStorage = (event: StorageEvent) => {
    if (event.key === SAVED_ITEMS_KEY) onStoreChange();
  };
  window.addEventListener("storage", onStorage);
  window.addEventListener(SAVED_ITEMS_EVENT, onStoreChange);
  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(SAVED_ITEMS_EVENT, onStoreChange);
  };
}

export function writeSavedItems(items: SavedItemRef[]) {
  if (typeof window === "undefined") return;
  const deduped = items.filter(
    (item, index, arr) => arr.findIndex((x) => x.kind === item.kind && x.id === item.id) === index
  );
  window.localStorage.setItem(SAVED_ITEMS_KEY, JSON.stringify(deduped));
  window.dispatchEvent(new Event(SAVED_ITEMS_EVENT));
}

export function mergeSavedItems(kind: SavedItemKind, ids: string[]) {
  const keep = readSavedItems().filter((item) => item.kind !== kind);
  writeSavedItems([...keep, ...ids.map((id) => ({ kind, id }))]);
}
