import { Truck, Clock, Package, SquareCheck, ChevronUp, ChevronDown, MoreHorizontal, type LucideIcon } from "lucide-react";
import { SHIPMENTS_METRICS } from "@/lib/data/shipments";
import { cn } from "@/lib/utils/cn";

const ICONS: Record<string, LucideIcon> = { Truck, Clock, Package, SquareCheck };

export function ShipmentsMetrics() {
  return (
    <div className="grid grid-cols-1 gap-4 tablet:grid-cols-2 desktop:grid-cols-4">
      {SHIPMENTS_METRICS.map((m) => {
        const Icon = ICONS[m.icon];
        const up = m.deltaDirection === "up";
        return (
          <div key={m.id} className="rounded-2xl bg-white p-4 shadow-[var(--shadow-card)]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-500">
                  <Icon size={17} />
                </span>
                <span className="text-sm text-ink-500">{m.label}</span>
              </div>
              <button
                type="button"
                aria-label={`More options for ${m.label}`}
                className="text-ink-300 hover:text-ink-500"
              >
                <MoreHorizontal size={16} />
              </button>
            </div>

            <p className="mt-3 font-display text-3xl font-bold text-ink-950 tabular-nums">{m.value}</p>

            <p className="mt-2 flex items-center gap-1.5 text-xs">
              <span
                className={cn(
                  "inline-flex items-center gap-0.5 rounded px-1.5 py-0.5 font-semibold",
                  up ? "bg-success-bg text-success" : "bg-danger-bg text-danger"
                )}
              >
                {up ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                {up ? "Up by" : "Down"} {m.deltaPct}%
              </span>
              <span className="text-ink-400">{m.deltaLabel}</span>
            </p>
          </div>
        );
      })}
    </div>
  );
}