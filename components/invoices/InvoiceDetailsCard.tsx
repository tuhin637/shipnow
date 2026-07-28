import { Invoice } from "@/lib/types";
import { calculateInvoiceTotals } from "@/lib/data/invoices";
import { InvoiceStatusBadge } from "@/components/invoices/InvoiceStatusBadge";

export function InvoiceDetailsCard({ invoice }: { invoice: Invoice }) {
  const { subTotal, tax, total } = calculateInvoiceTotals(invoice);

  return (
    <div className="rounded-2xl bg-white p-4 desktop:p-5 shadow-[var(--shadow-card)]">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-bold text-ink-950">Invoice Details</h2>
        <div className="flex items-center gap-2">
          <button type="button" className="h-9 rounded-[10px] border border-ink-200 bg-white px-3.5 text-sm font-medium text-ink-700 hover:bg-ink-50">
            Edit
          </button>
          <button type="button" className="h-9 rounded-[10px] border border-ink-200 bg-white px-3.5 text-sm font-medium text-ink-700 hover:bg-ink-50">
            Hold
          </button>
          <button type="button" className="h-9 rounded-[10px] bg-ink-950 px-3.5 text-sm font-medium text-white hover:bg-ink-800">
            Send Invoice
          </button>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="font-display text-lg font-bold text-ink-950">
            Invoice <span className="text-brand-600">#{invoice.id}</span>
          </p>
          <div className="mt-1.5">
            <InvoiceStatusBadge status={invoice.status} />
          </div>
        </div>
        <div className="text-right text-sm text-ink-500">
          <p>
            Issue Date <span className="font-semibold text-ink-950">{invoice.issueDate}</span>
          </p>
          <p>
            Due Date <span className="font-semibold text-ink-950">{invoice.dueDate}</span>
          </p>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 rounded-xl bg-ink-50/60 p-4 tablet:grid-cols-2">
        <div>
          <p className="text-xs font-medium text-ink-400">Bill From</p>
          <p className="mt-1 font-semibold text-ink-950">{invoice.billFrom.name}</p>
          <p className="text-sm text-ink-500">{invoice.billFrom.email}</p>
          <p className="text-sm text-ink-500">{invoice.billFrom.address}</p>
          <p className="text-sm text-ink-500">{invoice.billFrom.phone}</p>
        </div>
        <div className="tablet:text-right">
          <p className="text-xs font-medium text-ink-400">Bill To</p>
          <p className="mt-1 font-semibold text-ink-950">{invoice.billTo.name}</p>
          <p className="text-sm text-ink-500">{invoice.billTo.email}</p>
          <p className="text-sm text-ink-500">{invoice.billTo.address}</p>
          <p className="text-sm text-ink-500">{invoice.billTo.phone}</p>
        </div>
      </div>

      <h3 className="mt-5 text-sm font-semibold text-ink-950">Package Summary</h3>
      <div className="mt-2 overflow-x-auto">
        <table className="w-full min-w-[420px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-ink-100 text-left text-xs font-medium text-ink-500">
              <th scope="col" className="py-2.5 pr-3 font-medium">Description</th>
              <th scope="col" className="py-2.5 pr-3 font-medium">Shipment Type</th>
              <th scope="col" className="py-2.5 pr-3 font-medium">Price</th>
              <th scope="col" className="py-2.5 pr-3 font-medium">Qty</th>
              <th scope="col" className="py-2.5 font-medium">Amount</th>
            </tr>
          </thead>
          <tbody>
            {invoice.lineItems.map((item, i) => {
              const words = item.shipmentType.split(" ");
              const sub = words.pop() ?? "";
              const main = words.join(" ");
              return (
                <tr key={i} className="border-b border-ink-100 last:border-0">
                  <td className="py-3 pr-3 text-ink-950">{item.description}</td>
                  <td className="py-3 pr-3 text-ink-500">
                    {main}
                    <br />
                    <span className="text-xs text-ink-400">{sub}</span>
                  </td>
                  <td className="py-3 pr-3 text-ink-500">${item.price.toFixed(2)}</td>
                  <td className="py-3 pr-3 text-ink-500">{item.qty}</td>
                  <td className="py-3 font-medium text-ink-950">${(item.price * item.qty).toFixed(2)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-3 flex flex-col gap-1.5 border-t border-ink-100 pt-3 text-sm">
        <div className="flex items-center justify-between text-ink-500">
          <span>Sub Total</span>
          <span>${subTotal.toFixed(2)}</span>
        </div>
        <div className="flex items-center justify-between text-ink-500">
          <span>Tax ({Math.round(invoice.taxRate * 100)}%)</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div className="flex items-center justify-between text-ink-500">
          <span>Fee</span>
          <span>${invoice.fee.toFixed(2)}</span>
        </div>
        <div className="flex items-center justify-between border-t border-ink-100 pt-1.5 text-base font-bold text-ink-950">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      <div className="mt-4 rounded-xl bg-ink-50/60 p-3.5">
        <p className="text-xs font-semibold text-ink-950">Note</p>
        <p className="mt-1 text-xs text-ink-500">{invoice.note}</p>
      </div>
    </div>
  );
}