"use client";

import { MoreHorizontal } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import {
  SHIPMENT_TYPE_DATA,
  SHIPMENT_TYPE_TOTAL,
  SHIPMENT_TYPE_LEGEND_ORDER,
} from "@/lib/data/dashboard";

export function ShipmentTypeCard() {
  const legendSlices = SHIPMENT_TYPE_LEGEND_ORDER.map(
    (name) => SHIPMENT_TYPE_DATA.find((s) => s.name === name)!
  );
  return (
    <div className="flex h-full flex-col rounded-2xl bg-white p-4 desktop:p-5 shadow-[var(--shadow-card)]">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-ink-950">Shipment Type</h2>
        <button type="button" aria-label="More options" className="text-ink-400 hover:text-ink-700">
          <MoreHorizontal size={18} />
        </button>
      </div>

      <div className="relative mx-auto mt-4 h-[180px] w-[180px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={SHIPMENT_TYPE_DATA}
              dataKey="value"
              nameKey="name"
              innerRadius="72%"
              outerRadius="100%"
              paddingAngle={2}
              stroke="none"
            >
              {SHIPMENT_TYPE_DATA.map((slice) => (
                <Cell key={slice.name} fill={slice.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xs text-ink-400">Total Shipment</span>
          <span className="font-display text-xl font-bold text-ink-950">
            {SHIPMENT_TYPE_TOTAL.toLocaleString()}
          </span>
        </div>
      </div>

      <ul className="mt-5 grid grid-cols-2 gap-x-3 gap-y-4">
        {legendSlices.map((slice) => (
          <li key={slice.name} className="flex items-center gap-2.5">
            <span
              className="flex h-9 min-w-[44px] shrink-0 items-center justify-center rounded-lg px-1.5 text-xs font-bold"
              style={{
                backgroundColor: slice.color,
                color: slice.name === "Rail Freight" ? "var(--color-ink-700)" : "#FFFFFF",
              }}
            >
              {slice.value}%
            </span>
            <span className="min-w-0">
              <span className="block truncate text-sm font-semibold text-ink-950">{slice.shortLabel}</span>
              <span className="block truncate text-xs text-ink-400">
                {slice.shipments.toLocaleString()} shipments
              </span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}