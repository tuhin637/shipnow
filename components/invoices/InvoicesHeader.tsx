import Link from "next/link";
import { Search } from "lucide-react";

export function InvoicesHeader() {
  return (
    <div className="flex flex-col gap-4 tablet:flex-row tablet:items-center tablet:justify-between">
      <div>
        <h1 className="font-display text-2xl font-bold text-ink-950">Invoices &amp; Billing</h1>
        <p className="mt-1 flex items-center gap-1.5 text-sm text-ink-400">
          <Link href="/dashboard" className="hover:text-ink-600">
            Dashboard
          </Link>
          <span>/</span>
          <span className="text-ink-500">Invoices &amp; Billing</span>
        </p>
      </div>

      <label className="relative w-full tablet:w-[320px]">
        <span className="sr-only">Search anything</span>
        <Search size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400" />
        <input
          type="search"
          placeholder="Search anything"
          className="h-11 w-full rounded-[10px] border border-ink-200 bg-white pl-9 pr-3 text-sm text-ink-950 placeholder:text-ink-400 outline-none focus:border-brand-400"
        />
      </label>
    </div>
  );
}
