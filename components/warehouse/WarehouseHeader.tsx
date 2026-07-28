"use client";

import Link from "next/link";
import { Truck, TrainFront, Anchor, Plane, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { FreightType } from "@/lib/types";
import { FREIGHT_TABS } from "@/lib/data/warehouse";

const FREIGHT_ICONS: Record<FreightType, LucideIcon> = {
  "Road Freight": Truck,
  "Rail Freight": TrainFront,
  "Ocean Freight": Anchor,
  "Air Freight": Plane,
};

export function WarehouseHeader({
  active,
  onChange,
}: {
  active: FreightType;
  onChange: (f: FreightType) => void;
}) {
  return (
    <div className="flex flex-col gap-4 tablet:flex-row tablet:items-center tablet:justify-between">
      <div>
        <h1 className="font-display text-2xl font-bold text-ink-950">Warehouse</h1>
        <p className="mt-1 flex items-center gap-1.5 text-sm text-ink-400">
          <Link href="/dashboard" className="hover:text-ink-600">
            Dashboard
          </Link>
          <span>/</span>
          <span className="text-ink-500">Warehouse</span>
        </p>
      </div>

      <div
        role="tablist"
        aria-label="Freight type"
        className="no-scrollbar flex items-center gap-1 overflow-x-auto rounded-[10px] border border-ink-200 bg-white p-1"
      >
        {FREIGHT_TABS.map((type) => {
          const Icon = FREIGHT_ICONS[type];
          const isActive = active === type;
          return (
            <button
              key={type}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onChange(type)}
              className={cn(
                "flex h-9 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-[8px] px-3.5 text-sm font-medium transition-colors",
                isActive ? "bg-ink-950 text-white" : "text-ink-500 hover:bg-ink-50"
              )}
            >
              <Icon size={15} />
              {type}
            </button>
          );
        })}
      </div>
    </div>
  );
}