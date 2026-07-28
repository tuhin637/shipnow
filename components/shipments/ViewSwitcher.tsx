"use client";

import { LayoutGrid, List } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import type { ShipmentsView } from "@/lib/types";

export function ViewSwitcher({
  view,
  onChange,
}: {
  view: ShipmentsView;
  onChange: (v: ShipmentsView) => void;
}) {
  return (
    <div
      role="tablist"
      aria-label="Shipments view"
      className="inline-flex items-center gap-0.5 rounded-[10px] border border-ink-200 bg-white p-1"
    >
      <button
        type="button"
        role="tab"
        aria-selected={view === "table"}
        onClick={() => onChange("table")}
        className={cn(
          "flex h-9 items-center gap-1.5 rounded-[8px] px-3 text-sm font-medium transition-colors",
          view === "table" ? "bg-ink-950 text-white" : "text-ink-500 hover:bg-ink-50"
        )}
      >
        <List size={16} />
        <span className="hidden desktop:inline">Table</span>
      </button>
      <button
        type="button"
        role="tab"
        aria-selected={view === "grid"}
        onClick={() => onChange("grid")}
        className={cn(
          "flex h-9 items-center gap-1.5 rounded-[8px] px-3 text-sm font-medium transition-colors",
          view === "grid" ? "bg-ink-950 text-white" : "text-ink-500 hover:bg-ink-50"
        )}
      >
        <LayoutGrid size={16} />
        <span className="hidden desktop:inline">Grid</span>
      </button>
    </div>
  );
}