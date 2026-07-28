"use client";

import { MoreHorizontal } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { CAPACITY_USAGE } from "@/lib/data/warehouse";

export function CapacityUsageCard() {
  const data = [
    { name: "Loaded", value: CAPACITY_USAGE.totalPct },
    { name: "Empty", value: 100 - CAPACITY_USAGE.totalPct },
  ];

  return (
    <div className="flex h-full flex-col rounded-2xl bg-ink-950 p-4 desktop:p-5 text-white shadow-[var(--shadow-card)]">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold">Capacity Usage</h2>
        <button type="button" aria-label="More options" className="text-white/50 hover:text-white">
          <MoreHorizontal size={18} />
        </button>
      </div>

      <div className="relative mx-auto mt-2 h-[170px] w-[170px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius="72%"
              outerRadius="100%"
              startAngle={90}
              endAngle={-270}
              stroke="none"
            >
              <Cell fill="var(--color-brand-500)" />
              <Cell fill="rgba(255,255,255,0.12)" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-xs text-white/60">Total Usage</span>
          <span className="font-display text-2xl font-bold">{CAPACITY_USAGE.totalPct}%</span>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between text-sm">
        <div>
          <p className="text-white/50">Loaded</p>
          <p className="font-semibold">{CAPACITY_USAGE.loadedShelves} shelves</p>
        </div>
        <div className="text-right">
          <p className="text-white/50">Empty</p>
          <p className="font-semibold">{CAPACITY_USAGE.emptyShelves} shelves</p>
        </div>
      </div>
    </div>
  );
}