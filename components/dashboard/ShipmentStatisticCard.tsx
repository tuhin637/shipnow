"use client";

import { ChevronDown, ArrowUp } from "lucide-react";
import { LineChart, Line, XAxis, ResponsiveContainer } from "recharts";
import { SHIPMENT_STATISTIC } from "@/lib/data/dashboard";

const highlightIndex = SHIPMENT_STATISTIC.data.findIndex(
  (d) => d.month === SHIPMENT_STATISTIC.highlight.month
);

function HighlightDot(props: { cx?: number; cy?: number; index?: number }) {
  const { cx, cy, index } = props;
  if (index !== highlightIndex || cx == null || cy == null) return null;
  return (
    <g>
      <circle cx={cx} cy={cy} r={5} fill="var(--color-brand-500)" stroke="white" strokeWidth={2} />
    </g>
  );
}

export function ShipmentStatisticCard() {
  return (
    <div className="rounded-2xl bg-white p-4 desktop:p-5 shadow-[var(--shadow-card)]">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-ink-950">Shipment Statistic</h2>
        <button
          type="button"
          className="flex items-center gap-1 rounded-[8px] border border-ink-100 px-2.5 py-1 text-xs text-ink-500 hover:bg-ink-50"
        >
          {SHIPMENT_STATISTIC.range}
          <ChevronDown size={13} />
        </button>
      </div>

      <div className="mt-1 flex items-baseline gap-2">
        <span className="font-display text-2xl font-bold text-ink-950">{SHIPMENT_STATISTIC.total}</span>
        <span className="inline-flex items-center gap-0.5 text-xs font-medium text-success">
          <ArrowUp size={12} />
          {SHIPMENT_STATISTIC.deltaLabel}
        </span>
      </div>

      <div className="relative mt-3 h-[180px] w-full">
        <div className="pointer-events-none absolute left-[52%] top-0 z-10 -translate-x-1/2 rounded-lg bg-ink-950 px-2.5 py-1.5 text-center text-white shadow-[var(--shadow-pop)]">
          <p className="text-[10px] leading-tight text-ink-300">{SHIPMENT_STATISTIC.highlight.yearLabel}</p>
          <p className="text-xs font-semibold leading-tight">
            {SHIPMENT_STATISTIC.highlight.value.toLocaleString()}
          </p>
        </div>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={SHIPMENT_STATISTIC.data} margin={{ top: 32, right: 8, left: 8, bottom: 0 }}>
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "var(--color-ink-400)", fontSize: 11 }}
              interval={0}
            />
            <Line
              type="stepAfter"
              dataKey="value"
              stroke="var(--color-brand-500)"
              strokeWidth={2.5}
              dot={<HighlightDot />}
              activeDot={false}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
