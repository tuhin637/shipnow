"use client";

import { ArrowUp, ArrowDown, ArrowUpDown, Truck, Plane, Ship, TrainFront, type LucideIcon } from "lucide-react";
import { Shipment, FreightType } from "@/lib/types";
import { Checkbox } from "@/components/ui/Checkbox";
import { StatusBadge } from "@/components/shipments/StatusBadge";
import { CompanyAvatar } from "@/components/shipments/CompanyAvatar";
import { cn } from "@/lib/utils/cn";

export type SortKey = "id" | "company" | "progress" | "eta";
export type SortDir = "asc" | "desc";

const FREIGHT_ICON: Record<FreightType, LucideIcon> = {
  "Road Freight": Truck,
  "Air Freight": Plane,
  "Ocean Freight": Ship,
  "Rail Freight": TrainFront,
};


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
      className="px-3 py-3 font-medium"
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

export function ShipmentsTable({
  shipments,
  selected,
  onToggleSelect,
  onToggleSelectAll,
  sortKey,
  sortDir,
  onSort,
}: {
  shipments: Shipment[];
  selected: Set<string>;
  onToggleSelect: (id: string) => void;
  onToggleSelectAll: () => void;
  sortKey: SortKey;
  sortDir: SortDir;
  onSort: (key: SortKey) => void;
}) {
  const allSelected = shipments.length > 0 && shipments.every((s) => selected.has(s.id));

  if (shipments.length === 0) {
    return (
      <div className="flex min-h-[240px] flex-col items-center justify-center gap-1.5 rounded-2xl border border-dashed border-ink-200 py-16 text-center">
        <p className="text-sm font-semibold text-ink-950">No shipments found</p>
        <p className="text-sm text-ink-400">Try adjusting your search or filters.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl bg-white shadow-[var(--shadow-card)]">
      <table className="w-full min-w-[1080px] border-collapse text-sm">
        <thead>
          <tr className="border-b border-ink-100 bg-ink-50/60 text-left text-xs font-medium text-ink-500">
            <th scope="col" className="w-11 px-4 py-3">
              <Checkbox aria-label="Select all shipments" checked={allSelected} onChange={onToggleSelectAll} />
            </th>
            <SortableTh colKey="id" label="Shipping ID" sortKey={sortKey} sortDir={sortDir} onSort={onSort} />
            <SortableTh colKey="company" label="Company" sortKey={sortKey} sortDir={sortDir} onSort={onSort} />
            <th scope="col" className="px-3 py-3 font-medium">Carriers</th>
            <th scope="col" className="px-3 py-3 font-medium">Product Category</th>
            <th scope="col" className="px-3 py-3 font-medium">Weight</th>
            <th scope="col" className="px-3 py-3 font-medium">Route</th>
            <th scope="col" className="px-3 py-3 font-medium">Date</th>
            <SortableTh colKey="progress" label="Progress" sortKey={sortKey} sortDir={sortDir} onSort={onSort} />
            <th scope="col" className="px-4 py-3 font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          {shipments.map((s) => {
            const FreightIcon = FREIGHT_ICON[s.freightType];
            return (
              <tr
                key={s.id}
                className={cn(
                  "border-b border-ink-100 last:border-0 hover:bg-ink-50/50",
                  selected.has(s.id) && "bg-brand-50/60"
                )}
              >
                <td className="px-4 py-3 align-top">
                  <Checkbox aria-label={`Select ${s.id}`} checked={selected.has(s.id)} onChange={() => onToggleSelect(s.id)} />
                </td>

                <td className="px-3 py-3 align-top whitespace-nowrap">
                  <p className="font-medium text-brand-600">{s.id}</p>
                  <p className="mt-0.5 flex items-center gap-1 text-xs text-ink-400">
                    <FreightIcon size={12} /> {s.freightType}
                  </p>
                </td>

                <td className="px-3 py-3 align-top">
                  <div className="flex items-center gap-2.5">
                    <CompanyAvatar company={s.company} size={32} />
                    <div className="min-w-0">
                      <p className="truncate font-medium text-ink-950">{s.company}</p>
                      <p className="truncate text-xs text-ink-400">{s.companyCategory}</p>
                    </div>
                  </div>
                </td>

                <td className="px-3 py-3 align-top text-ink-600 whitespace-nowrap">{s.carrier}</td>
                <td className="px-3 py-3 align-top text-ink-600 whitespace-nowrap">{s.productCategory}</td>
                <td className="px-3 py-3 align-top text-ink-600 whitespace-nowrap">{s.weightKg.toLocaleString()} kg</td>

                <td className="px-3 py-3 align-top whitespace-nowrap">
                  <p className="text-ink-950">
                    {s.originCity} <span className="text-ink-400">({s.originLabel})</span>
                  </p>
                  <p className="mt-0.5 text-brand-600">
                    {s.destinationCity} <span className="text-ink-400">({s.destinationLabel})</span>
                  </p>
                </td>

                <td className="px-3 py-3 align-top whitespace-nowrap">
                  <p className="text-ink-950">
                    {s.atd} <span className="text-ink-400">(ATD)</span>
                  </p>
                  <p className="mt-0.5 text-brand-600">
                    {s.eta} <span className="text-ink-400">(ETA)</span>
                  </p>
                </td>

                <td className="px-3 py-3 align-top">
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-16 overflow-hidden rounded-full bg-ink-100">
                      <div className="h-full rounded-full bg-brand-500" style={{ width: `${s.progress}%` }} />
                    </div>
                    <span className="text-xs text-ink-500">{s.progress}%</span>
                  </div>
                </td>

                <td className="px-4 py-3 align-top">
                  <StatusBadge stage={s.stage} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}