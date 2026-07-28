import { Truck } from "lucide-react";
import { Shipment } from "@/lib/types";
import { StatusBadge } from "@/components/shipments/StatusBadge";
import { CompanyAvatar } from "@/components/shipments/CompanyAvatar";

export function ShipmentCard({ shipment }: { shipment: Shipment }) {
  return (
    <article className="flex flex-col rounded-2xl bg-white p-4 shadow-[var(--shadow-card)]">
      <div className="flex items-start justify-between">
        <p className="font-display text-sm font-bold text-ink-950">{shipment.id}</p>
        <button
          type="button"
          aria-label={`Quick actions for ${shipment.id}`}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-ink-100 text-ink-500 hover:bg-ink-50"
        >
          <Truck size={15} />
        </button>
      </div>
      <div className="mt-1.5">
        <StatusBadge stage={shipment.stage} />
      </div>

      <div className="my-3.5 h-px bg-ink-100" />

      <div className="flex items-center gap-2.5">
        <CompanyAvatar company={shipment.company} />
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-ink-950">{shipment.company}</p>
          <p className="truncate text-xs text-ink-400">{shipment.companyCategory}</p>
        </div>
      </div>

      <div className="relative mt-4 flex flex-col gap-3 pl-4">
        <span className="absolute left-[3px] top-1.5 bottom-1.5 w-px bg-ink-200" aria-hidden="true" />

        <div className="flex items-start justify-between gap-3">
          <div className="relative min-w-0">
            <span className="absolute -left-4 top-1 h-1.5 w-1.5 rounded-full bg-brand-500" aria-hidden="true" />
            <p className="text-xs text-ink-400">{shipment.originLabel}</p>
            <p className="truncate text-sm font-medium text-ink-950">{shipment.originCity}</p>
          </div>
          <p className="shrink-0 whitespace-nowrap text-xs text-ink-400">{shipment.atd}</p>
        </div>

        <div className="flex items-start justify-between gap-3">
          <div className="relative min-w-0">
            <span className="absolute -left-4 top-1 h-1.5 w-1.5 rounded-full border-2 border-ink-300 bg-white" aria-hidden="true" />
            <p className="text-xs text-ink-400">{shipment.destinationLabel}</p>
            <p className="truncate text-sm font-medium text-ink-950">{shipment.destinationCity}</p>
          </div>
          <p className="shrink-0 whitespace-nowrap text-xs text-ink-400">{shipment.eta}</p>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between text-xs text-ink-500">
        <span>
          Progress <span className="font-semibold text-ink-950">{shipment.progress}%</span>
        </span>
        <span>
          Carrier <span className="font-semibold text-ink-950">{shipment.carrier}</span>
        </span>
      </div>
      <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-ink-100">
        <div
          className="h-full rounded-full bg-brand-500"
          style={{ width: `${shipment.progress}%` }}
          role="progressbar"
          aria-valuenow={shipment.progress}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </article>
  );
}