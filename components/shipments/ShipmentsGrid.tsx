import { Shipment } from "@/lib/types";
import { ShipmentCard } from "@/components/shipments/ShipmentCard";

export function ShipmentsGrid({ shipments }: { shipments: Shipment[] }) {
  if (shipments.length === 0) {
    return (
      <div className="flex min-h-[240px] flex-col items-center justify-center gap-1.5 rounded-2xl border border-dashed border-ink-200 py-16 text-center">
        <p className="text-sm font-semibold text-ink-950">No shipments found</p>
        <p className="text-sm text-ink-400">Try adjusting your search or filters.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 tablet:grid-cols-2 desktop:grid-cols-4">
      {shipments.map((s) => (
        <ShipmentCard key={s.id} shipment={s} />
      ))}
    </div>
  );
}