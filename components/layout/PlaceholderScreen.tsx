import { Construction } from "lucide-react";

export function PlaceholderScreen({ title }: { title: string }) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-ink-200 px-6 py-16 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-50 text-brand-500">
        <Construction size={20} />
      </span>
      <h1 className="font-display text-lg font-bold text-ink-950">{title}</h1>
      <p className="max-w-sm text-sm text-ink-500">
        This screen isn&apos;t implemented in the current submission. The
        navigation item is wired up and styled, per the assignment&apos;s
        placeholder-page allowance for screens outside this exercise&apos;s scope.
      </p>
    </div>
  );
}
