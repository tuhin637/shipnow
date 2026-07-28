import { ArrowUp } from "lucide-react";
import { WAREHOUSE_STATS } from "@/lib/data/warehouse";

export function WarehouseStats() {
  return (
    <div className="flex flex-col gap-4">
      {WAREHOUSE_STATS.map((s) => (
        <div key={s.id} className="rounded-2xl bg-white p-4 desktop:p-5 shadow-[var(--shadow-card)]">
          <p className="text-sm text-ink-500">{s.label}</p>
          <p className="mt-2 flex flex-wrap items-baseline gap-2">
            <span className="font-display text-2xl font-bold text-ink-950">{s.value}</span>
            {s.suffix && <span className="text-sm font-medium text-ink-400">{s.suffix}</span>}
            <span className="inline-flex items-center gap-1">
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-success text-white">
                <ArrowUp size={10} />
              </span>
              <span className="rounded-full bg-success-bg px-1.5 py-0.5 text-xs font-medium text-success">
                {s.trendPct}
              </span>
            </span>
          </p>
        </div>
      ))}
    </div>
  );
}