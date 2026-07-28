"use client";

import { ChevronDown, ArrowUp } from "lucide-react";
import { BarChart, Bar, XAxis, ResponsiveContainer, Cell } from "recharts";
import { PROFIT_SUMMARY } from "@/lib/data/dashboard";

const highlightIndex = PROFIT_SUMMARY.data.findIndex(
  (d) => d.month === PROFIT_SUMMARY.highlightMonth
);
// Percentage across the chart width where the highlighted month's bar group sits,
// used to position the floating tooltip bubble above it (mirrors Shipment Statistic).
const highlightPct =
  ((highlightIndex + 0.5) / PROFIT_SUMMARY.data.length) * 100;

export function ProfitSummaryCard() {
  return (
    <div className="rounded-2xl bg-white p-4 desktop:p-5 shadow-[var(--shadow-card)]">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-ink-950">Profit Summary</h2>
        <button
          type="button"
          className="flex items-center gap-1 rounded-[8px] border border-ink-100 px-2.5 py-1 text-xs text-ink-500 hover:bg-ink-50"
        >
          {PROFIT_SUMMARY.range}
          <ChevronDown size={13} />
        </button>
      </div>

      <div className="mt-1 flex items-baseline gap-2">
        <span className="font-display text-2xl font-bold text-ink-950">{PROFIT_SUMMARY.total}</span>
        <span className="inline-flex items-center gap-0.5 text-xs font-medium text-success">
          <ArrowUp size={12} />
          {PROFIT_SUMMARY.deltaLabel}
        </span>
      </div>

      <div className="mt-3 flex items-center gap-4 text-xs text-ink-500">
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-brand-500" /> Revenue{" "}
          <span className="font-semibold text-ink-950">{PROFIT_SUMMARY.revenueTotal}</span>
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-ink-950" /> Cost{" "}
          <span className="font-semibold text-ink-950">{PROFIT_SUMMARY.costTotal}</span>
        </span>
      </div>

      <div className="relative mt-3 h-[164px] w-full">
        {/* Floating "Revenue / Cost" tooltip over the highlighted (May) column */}
        <div
          className="pointer-events-none absolute top-0 z-10 -translate-x-1/2 rounded-lg bg-white px-3 py-2 text-center shadow-[var(--shadow-pop)] ring-1 ring-ink-100"
          style={{ left: `${highlightPct}%` }}
        >
          <p className="flex items-center gap-1.5 whitespace-nowrap text-[11px] leading-tight text-ink-500">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-500" /> Revenue
            <span className="font-semibold text-ink-950">{PROFIT_SUMMARY.revenueTotal}</span>
          </p>
          <p className="mt-1 flex items-center gap-1.5 whitespace-nowrap text-[11px] leading-tight text-ink-500">
            <span className="h-1.5 w-1.5 rounded-full bg-ink-950" /> Cost
            <span className="font-semibold text-ink-950">{PROFIT_SUMMARY.costTotal}</span>
          </p>
        </div>

        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={PROFIT_SUMMARY.data} barGap={3} margin={{ top: 44, right: 0, left: 0, bottom: 0 }}>
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "var(--color-ink-400)", fontSize: 11 }}
              interval={0}
            />
            <Bar dataKey="revenue" radius={[3, 3, 0, 0]} maxBarSize={10} isAnimationActive={false}>
              {PROFIT_SUMMARY.data.map((entry, i) => (
                <Cell
                  key={entry.month}
                  fill={i === highlightIndex ? "var(--color-brand-500)" : "var(--color-brand-100)"}
                />
              ))}
            </Bar>
            <Bar dataKey="cost" radius={[3, 3, 0, 0]} maxBarSize={10} isAnimationActive={false}>
              {PROFIT_SUMMARY.data.map((entry, i) => (
                <Cell
                  key={entry.month}
                  fill={i === highlightIndex ? "var(--color-ink-950)" : "var(--color-ink-100)"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}