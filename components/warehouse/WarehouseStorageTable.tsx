"use client";

import { useMemo, useState } from "react";
import { ArrowUp, ArrowDown, ArrowUpDown, SlidersHorizontal, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { WAREHOUSE_STORAGE_ROWS } from "@/lib/data/warehouse";
import { WarehouseStorageRow } from "@/lib/types";

type SortKey = "floor" | "section" | "category" | "storageUsedPct" | "available";
type SortDir = "asc" | "desc";

const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: "floor", label: "Floor" },
  { key: "section", label: "Section" },
  { key: "category", label: "Category" },
  { key: "storageUsedPct", label: "Storage Used" },
  { key: "available", label: "Available Space" },
];

function SortableTh({
  colKey,
  label,
  sortKey,
  sortDir,
  onSort,
}: {
  colKey: SortKey;
  label: string;
  sortKey: SortKey;
  sortDir: SortDir;
  onSort: (key: SortKey) => void;
}) {
  const isActive = sortKey === colKey;
  return (
    <th
      scope="col"
      aria-sort={isActive ? (sortDir === "asc" ? "ascending" : "descending") : "none"}
      className="px-4 py-3 font-medium"
    >
      <button
        type="button"
        onClick={() => onSort(colKey)}
        aria-label={`Sort by ${label}${isActive ? `, currently ${sortDir === "asc" ? "ascending" : "descending"}` : ""}`}
        className="inline-flex items-center gap-1 hover:text-ink-950"
      >
        {label}
        {isActive ? (
          sortDir === "asc" ? <ArrowUp size={13} aria-hidden="true" /> : <ArrowDown size={13} aria-hidden="true" />
        ) : (
          <ArrowUpDown size={13} className="text-ink-300" aria-hidden="true" />
        )}
      </button>
    </th>
  );
}

export function WarehouseStorageTable() {
  const [sortKey, setSortKey] = useState<SortKey>("floor");
  const [sortDir, setSortDir] = useState<SortDir>("asc");

  function handleSort(key: SortKey) {
    if (key === sortKey) setSortDir(sortDir === "asc" ? "desc" : "asc");
    else {
      setSortKey(key);
      setSortDir("asc");
    }
  }

  const rows = useMemo(() => {
    return [...WAREHOUSE_STORAGE_ROWS].sort((a, b) => {
      const dir = sortDir === "asc" ? 1 : -1;
      const av = a[sortKey as keyof WarehouseStorageRow];
      const bv = b[sortKey as keyof WarehouseStorageRow];
      if (typeof av === "number" && typeof bv === "number") return (av - bv) * dir;
      return String(av).localeCompare(String(bv)) * dir;
    });
  }, [sortKey, sortDir]);

  return (
    <div className="rounded-2xl bg-white p-4 desktop:p-5 shadow-[var(--shadow-card)]">
      <div className="flex flex-col gap-3 tablet:flex-row tablet:items-center tablet:justify-between">
        <h2 className="text-lg font-bold text-ink-950">Warehouse Storage</h2>
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            className="flex h-9 items-center gap-1.5 rounded-[10px] border border-ink-200 bg-white px-3 text-sm font-medium text-ink-700 hover:bg-ink-50"
          >
            <SlidersHorizontal size={14} />
            Filter
            <ChevronDown size={13} className="text-ink-400" />
          </button>
          <label className="relative">
            <span className="sr-only">Sort by</span>
            <select
              value={sortKey}
              onChange={(e) => {
                const key = e.target.value as SortKey;
                setSortKey(key);
                setSortDir("asc");
              }}
              className="h-9 appearance-none rounded-[10px] border border-ink-200 bg-white pl-3 pr-7 text-sm font-medium text-ink-700 outline-none focus:border-brand-400"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.key} value={o.key}>
                  {o.label}
                </option>
              ))}
            </select>
            <ChevronDown size={13} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-ink-400" />
          </label>
        </div>
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-ink-100 text-left text-xs font-medium text-ink-500">
              <SortableTh colKey="floor" label="Floor" sortKey={sortKey} sortDir={sortDir} onSort={handleSort} />
              <SortableTh colKey="section" label="Section" sortKey={sortKey} sortDir={sortDir} onSort={handleSort} />
              <SortableTh colKey="category" label="Category" sortKey={sortKey} sortDir={sortDir} onSort={handleSort} />
              <SortableTh colKey="storageUsedPct" label="Storage Used" sortKey={sortKey} sortDir={sortDir} onSort={handleSort} />
              <th scope="col" className="px-4 py-3 font-medium">Percentage</th>
              <SortableTh colKey="available" label="Available Space" sortKey={sortKey} sortDir={sortDir} onSort={handleSort} />
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={`${r.floor}-${r.section}`} className="border-b border-ink-100 last:border-0 hover:bg-ink-50/50">
                <td className="px-4 py-3 text-ink-950">{r.floor}</td>
                <td className="px-4 py-3 whitespace-nowrap text-ink-950">{r.section}</td>
                <td className="px-4 py-3 whitespace-nowrap text-ink-600">{r.category}</td>
                <td className="px-4 py-3">
                  <div className="h-1.5 w-24 overflow-hidden rounded-full bg-ink-100">
                    <div className="h-full rounded-full bg-brand-500" style={{ width: `${r.storageUsedPct}%` }} />
                  </div>
                </td>
                <td className={cn("px-4 py-3 font-medium text-ink-950")}>{r.storageUsedPct}%</td>
                <td className="px-4 py-3 whitespace-nowrap text-ink-600">
                  {r.available}/{r.total}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}