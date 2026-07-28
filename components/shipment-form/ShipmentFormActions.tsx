import { Button } from "@/components/ui/Button";

export function ShipmentFormActions({
  onDelete,
  submitting,
}: {
  onDelete: () => void;
  submitting?: boolean;
}) {
  return (
    <div className="flex items-center justify-end gap-3 border-t border-ink-100 pt-6">
      <Button type="button" variant="outline" className="border-ink-200 bg-ink-100 text-ink-700 hover:bg-ink-200" onClick={onDelete}>
        Delete Form
      </Button>
      <Button type="submit" variant="primary" disabled={submitting}>
        {submitting ? "Submitting…" : "Submit Shipment"}
      </Button>
    </div>
  );
}