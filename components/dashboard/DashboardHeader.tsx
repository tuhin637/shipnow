import { Search, Plus } from "lucide-react";

export function DashboardHeader() {
  return (
    <div className="flex flex-col gap-4 tablet:flex-row tablet:items-center tablet:justify-between">
      <div>
        <p className="text-sm text-ink-500">Hello John!</p>
        <h1 className="font-display text-2xl font-bold text-ink-950">Good Morning</h1>
      </div>

      <div className="flex items-center gap-3">
        <label className="relative hidden tablet:block">
          <span className="sr-only">Search anything</span>
          <Search size={17} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400" />
          <input
            type="search"
            placeholder="Search anything"
            className="h-11 w-[220px] desktop:w-[280px] rounded-full border border-ink-100 bg-white pl-10 pr-3.5 text-sm text-ink-950 placeholder:text-ink-400 outline-none focus:border-brand-400"
          />
        </label>

        <button
          type="button"
          className="flex h-11 items-center gap-1.5 whitespace-nowrap rounded-full bg-ink-950 px-5 text-sm font-medium text-white hover:bg-ink-800"
        >
          <Plus size={17} />
          <span className="hidden tablet:inline">Add New Shipping</span>
          <span className="tablet:hidden">Add</span>
        </button>
      </div>
    </div>
  );
}