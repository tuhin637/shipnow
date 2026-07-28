"use client";

import { useMemo, useState } from "react";
import { ArrowUpDown, Search, SlidersHorizontal } from "lucide-react";
import { RECENT_SHIPMENTS } from "@/lib/data/dashboard";
import { cn } from "@/lib/utils/cn";
import { Checkbox } from "@/components/ui/Checkbox";
import { ShipmentStatus } from "@/lib/types";

const STATUS_STYLES: Record<ShipmentStatus, string> = {
  "In Transit": "bg-neutral-bg text-neutral",
  "Out for Delivery": "bg-brand-100 text-brand-600",
  Delivered: "bg-success-bg text-success",
  Processing: "bg-info-bg text-info",
};

type SortKey = "id" | "company" | "carrier" | "route" | "atd" | "status";

const COLUMNS: { key: SortKey; label: string }[] = [
  { key: "id", label: "Shipping ID" },
  { key: "company", label: "Company" },
  { key: "carrier", label: "Carriers" },
  { key: "route", label: "Route" },
  { key: "atd", label: "Shipping Date" },
  { key: "status", label: "Status" },
];

export function RecentShipmentsCard() {
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("atd");
  const [sortAsc, setSortAsc] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const rows = useMemo(() => {
    const filtered = RECENT_SHIPMENTS.filter((s) => {
      const q = query.trim().toLowerCase();
      if (!q) return true;
      return (
        s.id.toLowerCase().includes(q) ||
        s.company.toLowerCase().includes(q) ||
        s.carrier.toLowerCase().includes(q)
      );
    });
    const sorted = [...filtered].sort((a, b) => {
      let cmp = 0;
      switch (sortKey) {
        case "id": cmp = a.id.localeCompare(b.id); break;
        case "company": cmp = a.company.localeCompare(b.company); break;
        case "carrier": cmp = a.carrier.localeCompare(b.carrier); break;
        case "route": cmp = a.originCity.localeCompare(b.originCity); break;
        case "atd": cmp = a.date.localeCompare(b.date); break;
        case "status": cmp = a.status.localeCompare(b.status); break;
      }
      return sortAsc ? cmp : -cmp;
    });
    return sorted;
  }, [query, sortKey, sortAsc]);

  function toggleSort(key: SortKey) {
    if (key === sortKey) setSortAsc((v) => !v);
    else {
      setSortKey(key);
      setSortAsc(true);
    }
  }

  function toggleRow(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  const allSelected = rows.length > 0 && rows.every((r) => selected.has(r.id));

  return (
    <div className="rounded-2xl bg-white p-4 desktop:p-5 shadow-[var(--shadow-card)]">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-sm font-semibold text-ink-950">Recent Shipments</h2>
        <div className="flex items-center gap-2">
          <label className="relative">
            <span className="sr-only">Search shipment</span>
            <Search size={14} className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-ink-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="search"
              placeholder="Search shipment"
              className="h-8 w-[130px] tablet:w-[170px] rounded-full border border-ink-100 bg-ink-50 pl-8 pr-3 text-xs text-ink-950 placeholder:text-ink-400 outline-none focus:border-brand-400"
            />
          </label>
          <button type="button" aria-label="Filter" className="flex h-8 w-8 items-center justify-center rounded-full border border-ink-100 text-ink-500 hover:bg-ink-50">
            <SlidersHorizontal size={14} />
          </button>
        </div>
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-xs">
          <thead>
            <tr className="rounded-xl bg-brand-100 text-ink-700">
              <th className="w-8 rounded-l-xl py-3 pl-3">
                <Checkbox
                  aria-label="Select all recent shipments"
                  checked={allSelected}
                  onChange={() =>
                    setSelected(allSelected ? new Set() : new Set(rows.map((r) => r.id)))
                  }
                />
              </th>
              {COLUMNS.map((col, i) => (
                <th
                  key={col.key}
                  className={cn("py-3 pr-4 font-medium", i === COLUMNS.length - 1 && "rounded-r-xl")}
                >
                  <button
                    type="button"
                    onClick={() => toggleSort(col.key)}
                    className="inline-flex items-center gap-1 hover:text-brand-700"
                  >
                    {col.label}
                    <ArrowUpDown size={11} className={cn(sortKey === col.key && "text-brand-600")} />
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-100">
            {rows.map((s) => (
              <tr key={s.id} className="text-ink-700">
                <td className="py-3">
                  <Checkbox
                    aria-label={`Select shipment ${s.id}`}
                    checked={selected.has(s.id)}
                    onChange={() => toggleRow(s.id)}
                  />
                </td>
                <td className="py-3 pr-4 font-medium text-brand-500">{s.id}</td>
                <td className="py-3 pr-4">
                  <p className="font-medium text-ink-950">{s.company}</p>
                  <p className="text-[11px] text-ink-400">{s.productCategory}</p>
                </td>
                <td className="py-3 pr-4">{s.carrier}</td>
                <td className="py-3 pr-4 whitespace-nowrap">{s.originCity} → {s.destinationCity}</td>
                <td className="py-3 pr-4 whitespace-nowrap">{s.atd}</td>
                <td className="py-3 pr-4">
                  <span className={cn("rounded-full px-2.5 py-1 text-[11px] font-medium whitespace-nowrap", STATUS_STYLES[s.status])}>
                    {s.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}