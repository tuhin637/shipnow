import { ChevronRight, FileWarning, MapPinOff, CloudOff, type LucideIcon } from "lucide-react";
import { ALERT_SUMMARY, SHIPMENT_ALERTS } from "@/lib/data/dashboard";

const ALERT_ICONS: Record<string, LucideIcon> = {
  "Customs Clearance Delay": FileWarning,
  "Incorrect Address Provided": MapPinOff,
  "Weather-Related Hold": CloudOff,
};

export function ShipmentAlertsCard() {
  return (
    <div className="rounded-2xl bg-white p-4 desktop:p-5 shadow-[var(--shadow-card)]">
      <h2 className="text-sm font-semibold text-ink-950">Shipment Alerts</h2>
      <p className="mt-1 text-xs text-ink-500">{ALERT_SUMMARY.total} Delays Detected</p>

      <div className="mt-3 grid grid-cols-3 gap-2">
        {ALERT_SUMMARY.breakdown.map((b) => (
          <div key={b.type} className="rounded-xl bg-ink-50 px-2 py-3 text-center">
            <p className="font-display text-lg font-bold text-ink-950">{b.count}</p>
            <p className="mt-0.5 text-[10px] leading-tight text-ink-500">{b.type}</p>
          </div>
        ))}
      </div>

      <ul className="mt-4 divide-y divide-ink-100">
        {SHIPMENT_ALERTS.map((a) => {
          const Icon = ALERT_ICONS[a.type] ?? FileWarning;
          return (
          <li key={a.id}>
            <button
              type="button"
              className="flex w-full items-center gap-3 py-2.5 text-left hover:bg-ink-50 rounded-lg -mx-1 px-1"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-600">
                <Icon size={14} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-xs font-medium text-ink-950">{a.type}</span>
                <span className="block truncate text-[11px] text-ink-400">
                  {a.shipmentId} · {a.freightType} · {a.date}
                </span>
              </span>
              <ChevronRight size={15} className="shrink-0 text-ink-300" />
            </button>
          </li>
          );
        })}
      </ul>
    </div>
  );
}