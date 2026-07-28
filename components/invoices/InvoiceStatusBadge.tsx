import { cn } from "@/lib/utils/cn";
import { Invoice } from "@/lib/types";

const STYLE: Record<Invoice["status"], string> = {
  Paid: "bg-success-bg text-success",
  Unpaid: "bg-brand-100 text-brand-700",
  Pending: "bg-neutral-bg text-neutral",
  Overdue: "bg-warning-bg text-warning",
};

export function InvoiceStatusBadge({ status, className }: { status: Invoice["status"]; className?: string }) {
  return (
    <span className={cn("inline-flex items-center rounded-md px-2 py-1 text-xs font-medium whitespace-nowrap", STYLE[status], className)}>
      {status}
    </span>
  );
}
