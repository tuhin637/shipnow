"use client";

import { ChevronDown, ArrowUpRight } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import { SHIPMENT_STATISTIC } from "@/lib/data/dashboard";

const highlightIndex = SHIPMENT_STATISTIC.data.findIndex(
  (d) => d.month === SHIPMENT_STATISTIC.highlight.month
);

const Y_TICKS = [0, 1200, 2400, 3600, 4800];

function formatK(value: number) {
  return value === 0 ? "0K" : `${value / 1000}K`;
}

/**
 * Custom bar: a soft top-to-bottom gradient fill with a solid dark "cap"
 * line across the top edge. The highlighted month gets the brand-purple
 * gradient plus a dot marker centered on its cap, per the Figma design.
 */
function GradientBar(props: { x?: number; y?: number; width?: number; height?: number; index?: number }) {
  const { x = 0, y = 0, width = 0, height = 0, index } = props;
  const isHighlighted = index === highlightIndex;
  const gradientId = isHighlighted ? "shipmentStatBarPurple" : "shipmentStatBarGray";

  return (
    <g>
      <rect x={x} y={y} width={width} height={height} fill={`url(#${gradientId})`} />
      <rect x={x} y={y} width={width} height={2.5} fill="var(--color-ink-950)" />
      {isHighlighted ? (
        <circle cx={x + width / 2} cy={y} r={6} fill="var(--color-ink-950)" stroke="white" strokeWidth={2} />
      ) : null}
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

      <div className="mt-1 flex items-center gap-2">
        <span className="font-display text-2xl font-bold text-ink-950">{SHIPMENT_STATISTIC.total}</span>
        <span className="inline-flex items-center gap-0.5 rounded-full bg-success-bg px-2 py-0.5 text-xs font-medium text-success">
          <ArrowUpRight size={12} aria-hidden="true" />
          {SHIPMENT_STATISTIC.deltaLabel}
        </span>
      </div>

      <div className="relative mt-3 h-[200px] w-full">
        <div className="pointer-events-none absolute left-[52%] top-0 z-10 -translate-x-1/2 rounded-xl bg-brand-100 px-3 py-1.5 text-center shadow-[var(--shadow-pop)]">
          <p className="text-[10px] leading-tight text-brand-600">{SHIPMENT_STATISTIC.highlight.yearLabel}</p>
          <p className="text-sm font-bold leading-tight text-ink-950">
            {SHIPMENT_STATISTIC.highlight.value.toLocaleString()}
          </p>
        </div>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={SHIPMENT_STATISTIC.data} margin={{ top: 40, right: 4, left: -4, bottom: 0 }} barCategoryGap="28%">
            <defs>
              <linearGradient id="shipmentStatBarGray" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-ink-300)" stopOpacity={0.55} />
                <stop offset="100%" stopColor="var(--color-ink-100)" stopOpacity={0.05} />
              </linearGradient>
              <linearGradient id="shipmentStatBarPurple" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-brand-500)" stopOpacity={0.9} />
                <stop offset="100%" stopColor="var(--color-brand-300)" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} strokeDasharray="4 4" stroke="var(--color-ink-100)" />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "var(--color-ink-400)", fontSize: 11 }}
              interval={0}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              ticks={Y_TICKS}
              domain={[0, SHIPMENT_STATISTIC.yMax]}
              tickFormatter={formatK}
              tick={{ fill: "var(--color-ink-400)", fontSize: 11 }}
              width={34}
            />
            <Bar dataKey="value" shape={GradientBar} isAnimationActive={false} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
