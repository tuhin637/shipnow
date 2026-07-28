"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, Plus, ArrowUp, ArrowDown, ArrowUpDown, FileText } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { Invoice } from "@/lib/types";
import { INVOICES } from "@/lib/data/invoices";
import { InvoiceStatusBadge } from "@/components/invoices/InvoiceStatusBadge";
import { CompanyAvatar } from "@/components/shipments/CompanyAvatar";
import { Checkbox } from "@/components/ui/Checkbox";

type SortKey = "id" | "company" | "shippingId" | "issueDate" | "amount" | "status";
type SortDir = "asc" | "desc";

const COLUMNS: { key: SortKey; label: string }[] = [
  { key: "id", label: "Invoice ID" },
  { key: "company", label: "Company" },
  { key: "shippingId", label: "Shipping ID" },
  { key: "issueDate", label: "Date" },
  { key: "amount", label: "Amount" },
  { key: "status", label: "Status" },
];

export function InvoicesListCard({
  selectedId,
  onSelect,
}: {
  selectedId: string;
  onSelect: (invoice: Invoice) => void;
}) {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("id");
  const [sortDir, setSortDir] = useState<SortDir>("asc");

  function handleSort(key: SortKey) {
    if (key === sortKey) setSortDir(sortDir === "asc" ? "desc" : "asc");
    else {
      setSortKey(key);
      setSortDir("asc");
    }
  }

  const rows = useMemo(() => {
    let list = INVOICES;
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(
        (inv) =>
          inv.id.toLowerCase().includes(q) ||
          inv.company.toLowerCase().includes(q) ||
          inv.shippingId.toLowerCase().includes(q)
      );
    }
    return [...list].sort((a, b) => {
      const dir = sortDir === "asc" ? 1 : -1;
      const av = a[sortKey];
      const bv = b[sortKey];
      if (typeof av === "number" && typeof bv === "number") return (av - bv) * dir;
      return String(av).localeCompare(String(bv)) * dir;
    });
  }, [search, sortKey, sortDir]);

  return (
    <div className="rounded-2xl bg-white p-4 desktop:p-5 shadow-[var(--shadow-card)]">
      <div className="flex flex-col gap-3 tablet:flex-row tablet:items-center tablet:justify-between">
        <h2 className="text-lg font-bold text-ink-950">Invoices</h2>
        <div className="flex flex-1 flex-wrap items-center justify-end gap-2.5">
          <label className="relative min-w-[160px] flex-1 tablet:flex-none tablet:w-[200px]">
            <span className="sr-only">Search invoices</span>
            <Search size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search invoices"
              className="h-10 w-full rounded-[10px] border border-ink-200 bg-white pl-8 pr-3 text-sm text-ink-950 placeholder:text-ink-400 outline-none focus:border-brand-400"
            />
          </label>
          <button
            type="button"
            aria-label="Filter"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] border border-ink-200 bg-white text-ink-500 hover:bg-ink-50"
          >
            <SlidersHorizontal size={15} />
          </button>
          <button
            type="button"
            className="flex h-10 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-[10px] bg-ink-950 px-4 text-sm font-medium text-white hover:bg-ink-800"
          >
            <Plus size={16} />
            New Invoice
          </button>
        </div>
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-ink-100 text-left text-xs font-medium text-ink-500">
              <th scope="col" className="w-9 px-2 py-3">
                <Checkbox aria-label="Select all invoices" checked={false} onChange={() => {}} />
              </th>
              {COLUMNS.map((col) => {
                const isActive = sortKey === col.key;
                return (
                  <th
                    key={col.key}
                    scope="col"
                    aria-sort={isActive ? (sortDir === "asc" ? "ascending" : "descending") : "none"}
                    className="whitespace-nowrap px-3 py-3 font-medium"
                  >
                    <button
                      type="button"
                      onClick={() => handleSort(col.key)}
                      aria-label={`Sort by ${col.label}${isActive ? `, currently ${sortDir === "asc" ? "ascending" : "descending"}` : ""}`}
                      className="inline-flex items-center gap-1 hover:text-ink-950"
                    >
                      {col.label}
                      {isActive ? (
                        sortDir === "asc" ? <ArrowUp size={12} aria-hidden="true" /> : <ArrowDown size={12} aria-hidden="true" />
                      ) : (
                        <ArrowUpDown size={12} className="text-ink-300" aria-hidden="true" />
                      )}
                    </button>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {rows.map((inv) => (
              <tr
                key={inv.id}
                onClick={() => onSelect(inv)}
                className={cn(
                  "cursor-pointer border-b border-ink-100 last:border-0 hover:bg-ink-50/60",
                  selectedId === inv.id && "bg-brand-50"
                )}
              >
                <td className="px-2 py-3" onClick={(e) => e.stopPropagation()}>
                  <Checkbox
                    checked={selectedId === inv.id}
                    onChange={() => onSelect(inv)}
                    aria-label={`Select ${inv.id}`}
                  />
                </td>
                <td className="whitespace-nowrap px-3 py-3">
                  <span className="inline-flex items-center gap-1.5 font-medium text-brand-600">
                    {inv.id}
                    <FileText size={13} className="text-ink-300" />
                  </span>
                </td>
                <td className="whitespace-nowrap px-3 py-3">
                  <span className="flex items-center gap-2">
                    <CompanyAvatar company={inv.company} size={26} />
                    <span className="font-medium text-ink-950">{inv.company}</span>
                  </span>
                </td>
                <td className="whitespace-nowrap px-3 py-3 text-ink-500">{inv.shippingId}</td>
                <td className="whitespace-nowrap px-3 py-3 text-ink-500">
                  {inv.issueDate} <span className="text-ink-400">(Issued)</span>
                  <br />
                  {inv.dueDate} <span className="text-ink-400">(Due)</span>
                </td>
                <td className="whitespace-nowrap px-3 py-3 font-medium text-ink-950">
                  ${inv.amount.toFixed(2)}
                </td>
                <td className="px-3 py-3">
                  <InvoiceStatusBadge status={inv.status} />
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={7} className="px-3 py-8 text-center text-sm text-ink-400">
                  No invoices found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}