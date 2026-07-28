import { ReactNode } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { MobileTopBar } from "@/components/layout/MobileNav";
import { Footer } from "@/components/layout/Footer";

/**
 * Shared shell built once on the Dashboard screen and reused by every other
 * screen in the `(dashboard)` route group, per assignment §4.2.
 */
export function DashboardShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh bg-surface">
      {/* Skip link: hidden until focused, lets keyboard users jump past the
          sidebar/topbar straight to the page content. */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-[10px] focus:bg-ink-950 focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
      >
        Skip to main content
      </a>
      <Sidebar />
      <div className="flex min-h-dvh flex-1 flex-col">
        <MobileTopBar />
        <main
          id="main-content"
          tabIndex={-1}
          className="flex-1 px-4 py-5 tablet:px-6 tablet:py-6 desktop:px-8 desktop:py-8"
        >
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
}