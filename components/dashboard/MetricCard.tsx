import { Truck, Gauge, DollarSign, ArrowUp, ArrowDown, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { MetricCardData } from "@/lib/data/dashboard";

const ICONS: Record<MetricCardData["icon"], LucideIcon> = {
  Truck,
  Gauge,
  DollarSign,
};

export function MetricCard({ metric }: { metric: MetricCardData }) {
  const Icon = ICONS[metric.icon];
  const up = metric.trend === "up";
  const match = metric.deltaLabel.match(/^([+-]?[\d.]+%)\s*(.*)$/);
  const pct = match?.[1] ?? metric.deltaLabel;
  const rest = match?.[2] ?? "";

  return (
    <div className="rounded-2xl bg-white p-4 desktop:p-5 shadow-[var(--shadow-card)]">
      <div className="flex items-start justify-between">
        <p className="text-sm text-ink-500">{metric.label}</p>
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-500 text-white">
          <Icon size={19} />
        </span>
      </div>
      <p className="mt-3 flex items-baseline gap-1.5 font-display text-2xl font-bold text-ink-950">
        {metric.value}
        {metric.suffix && <span className="text-sm font-medium text-ink-400">{metric.suffix}</span>}
      </p>
      <p className="mt-2.5 flex flex-wrap items-center gap-1.5 text-xs text-ink-500">
        <span
          className={cn(
            "inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 font-medium",
            up ? "bg-success-bg text-success" : "bg-danger-bg text-danger"
          )}
        >
          {up ? <ArrowUp size={11} /> : <ArrowDown size={11} />}
          {pct}
        </span>
        {rest}
      </p>
    </div>
  );
}