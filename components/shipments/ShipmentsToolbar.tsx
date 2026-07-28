"use client";

import { Search, SlidersHorizontal, ChevronDown, CalendarRange } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { ShipmentStage } from "@/lib/types";

export type StatusFilter = "All" | ShipmentStage;
export type SortOption = "Newest" | "Oldest" | "Progress: High to Low" | "Progress: Low to High";

const STATUS_TABS: StatusFilter[] = ["All", "Completed", "Delivery", "Pending"];

export function ShipmentsToolbar({
  status,
  onStatusChange,
  search,
  onSearchChange,
  rightControl,
  sort,
  onSortChange,
}: {
  status: StatusFilter;
  onStatusChange: (s: StatusFilter) => void;
  search: string;
  onSearchChange: (v: string) => void;
  /** Grid view uses a sort dropdown; Table view uses a date-range control (assignment §4.3/§4.4). */
  rightControl: "sort" | "dateRange";
  sort?: SortOption;
  onSortChange?: (s: SortOption) => void;
}) {
  return (
    <div className="flex flex-col gap-3 tablet:flex-row tablet:items-center tablet:justify-between">
      {/* Status tabs / filter chips */}
      <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1">
        {STATUS_TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => onStatusChange(tab)}
            className={cn(
              "shrink-0 rounded-full border px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors",
              status === tab
                ? "border-ink-950 bg-ink-950 text-white"
                : "border-ink-200 bg-white text-ink-500 hover:bg-ink-50"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Search + filter + sort/date-range */}
      <div className="flex flex-wrap items-center gap-2.5">
        <label className="relative">
          <span className="sr-only">Search shipment</span>
          <Search size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400" />
          <input
            type="search"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search id, company, etc"
            className="h-10 w-full min-w-[180px] rounded-[10px] border border-ink-200 bg-white pl-9 pr-3 text-sm text-ink-950 placeholder:text-ink-400 outline-none focus:border-brand-400 tablet:w-[200px]"
          />
        </label>

        <button
          type="button"
          className="flex h-10 shrink-0 items-center gap-1.5 rounded-[10px] border border-ink-200 bg-white px-3.5 text-sm font-medium text-ink-700 hover:bg-ink-50"
        >
          <SlidersHorizontal size={15} />
          Filter
          <ChevronDown size={14} className="text-ink-400" />
        </button>

        {rightControl === "sort" ? (
          <label className="relative shrink-0">
            <span className="sr-only">Sort by</span>
            <select
              value={sort}
              onChange={(e) => onSortChange?.(e.target.value as SortOption)}
              className="h-10 appearance-none rounded-[10px] border border-ink-200 bg-white pl-3.5 pr-8 text-sm font-medium text-ink-700 outline-none focus:border-brand-400"
            >
              <option>Newest</option>
              <option>Oldest</option>
              <option>Progress: High to Low</option>
              <option>Progress: Low to High</option>
            </select>
            <ChevronDown size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-ink-400" />
          </label>
        ) : (
          <button
            type="button"
            className="flex h-10 shrink-0 items-center gap-1.5 rounded-[10px] border border-ink-200 bg-white px-3.5 text-sm font-medium text-ink-700 hover:bg-ink-50"
          >
            <CalendarRange size={15} />
            This Month
            <ChevronDown size={14} className="text-ink-400" />
          </button>
        )}
      </div>
    </div>
  );
}