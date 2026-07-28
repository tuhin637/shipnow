"use client";

import { useState } from "react";
import { cn } from "@/lib/utils/cn";
import { WAREHOUSE_MAP_FLOORS } from "@/lib/data/warehouse";

const FLOORS = ["Floor 1", "Floor 2", "Floor 3"] as const;

export function WarehouseMapCard() {
  const [floor, setFloor] = useState<(typeof FLOORS)[number]>("Floor 1");
  const zones = WAREHOUSE_MAP_FLOORS[floor];

  return (
    <div className="rounded-2xl bg-white p-4 desktop:p-5 shadow-[var(--shadow-card)]">
      <div className="flex flex-col gap-3 tablet:flex-row tablet:items-center tablet:justify-between">
        <h2 className="text-lg font-bold text-ink-950">Warehouse Map</h2>
        <div role="tablist" aria-label="Floor" className="inline-flex items-center gap-0.5 self-start rounded-[10px] border border-ink-200 bg-white p-1">
          {FLOORS.map((f) => (
            <button
              key={f}
              type="button"
              role="tab"
              aria-selected={floor === f}
              onClick={() => setFloor(f)}
              className={cn(
                "h-8 rounded-[8px] px-3.5 text-sm font-medium transition-colors",
                floor === f ? "bg-ink-950 text-white" : "text-ink-500 hover:bg-ink-50"
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 tablet:grid-cols-2 desktop:grid-cols-4">
        {zones.map((zone) => (
          <div key={zone.name} className="rounded-2xl bg-ink-50/70 p-4">
            <p className="text-sm font-semibold text-ink-950">{zone.name}</p>
            <div className="mt-3 flex flex-wrap gap-2.5">
              {zone.cells.map((cell) => (
                <span
                  key={cell.code}
                  title={cell.code}
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full text-xs",
                    cell.full ? "bg-ink-950 font-semibold text-white" : "bg-brand-100 font-medium text-brand-600"
                  )}
                >
                  {cell.code}
                </span>
              ))}
            </div>
            <p className="mt-3.5 text-xs text-ink-500">
              Available Space <span className="font-semibold text-ink-950">{zone.availableOf100}/100</span>
            </p>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center gap-5 text-sm text-ink-600">
        <span className="flex items-center gap-2">
          <span className="h-3.5 w-3.5 rounded-full bg-brand-100" /> Available
        </span>
        <span className="flex items-center gap-2">
          <span className="h-3.5 w-3.5 rounded-full bg-ink-950" /> Full
        </span>
      </div>
    </div>
  );
}