import Link from "next/link";
import { Logo } from "@/components/ui/Logo";

/**
 * Temporary placeholder — Register is not part of the assignment's 7 screens.
 * The Login screen links here per the Figma design, so this exists only to
 * avoid a dead 404 link. Replace or remove once scope is confirmed.
 */
export default function RegisterPlaceholder() {
  return (
    <main className="min-h-dvh flex flex-col items-center justify-center gap-4 bg-surface px-6 text-center">
      <Logo size="lg" />
      <h1 className="text-xl font-bold text-ink-950">Register</h1>
      <p className="max-w-sm text-sm text-ink-500">
        This screen isn&apos;t part of the assignment&apos;s scope — only the
        Login page&apos;s outbound link target. Coming soon.
      </p>
      <Link href="/login" className="text-sm font-medium text-brand-500 hover:text-brand-600">
        ← Back to Login
      </Link>
    </main>
  );
}
