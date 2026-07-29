import { ShieldCheck, FileX2, CircleDashed, Clock, type LucideIcon } from "lucide-react";
import { INVOICE_STATS } from "@/lib/data/invoices";

const ICONS: Record<string, LucideIcon> = { ShieldCheck, FileX2, CircleDashed, Clock };

export function InvoiceStats() {
  return (
    <div className="grid grid-cols-1 gap-4 tablet:grid-cols-2 desktop:grid-cols-4">
      {INVOICE_STATS.map((s) => {
        const Icon = ICONS[s.icon];
        return (
          <div key={s.id} className="flex items-center gap-4 rounded-2xl bg-white p-4 desktop:p-5 shadow-[var(--shadow-card)]">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-500 text-white">
              <Icon size={20} />
            </span>
            <div className="min-w-0 flex-1 text-right">
              <p className="truncate text-sm text-ink-500">{s.label}</p>
              <p className="mt-1 font-display text-2xl font-bold text-ink-950">
                ${s.amount.toLocaleString()}
              </p>
              <p className="mt-1 text-xs text-ink-400">
                from <span className="rounded-full bg-ink-100 px-1.5 py-0.5 font-medium text-ink-700">{s.count}</span> Invoices
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
