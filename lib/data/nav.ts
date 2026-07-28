import { NavItem } from "@/lib/types";

/**
 * Primary sidebar navigation. `implemented: false` items still render and
 * route, but land on the shared placeholder page (per assignment §4.2 —
 * "Navigation items without a corresponding screen... should still be
 * rendered and styled, and may route to a placeholder page.").
 */
export const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: "LayoutDashboard", implemented: true },
  { label: "Analytics", href: "/analytics", icon: "ChartNoAxesColumn", implemented: false },
  { label: "Calendar", href: "/calendar", icon: "Calendar", implemented: false },
  { label: "Shipments", href: "/shipments", icon: "Package", implemented: true },
  { label: "Tracking", href: "/tracking", icon: "LocateFixed", implemented: false },
  { label: "Warehouse", href: "/warehouse", icon: "Warehouse", implemented: true },
  { label: "Fleets", href: "/fleets", icon: "Truck", implemented: false },
  { label: "Drivers", href: "/drivers", icon: "IdCard", implemented: false },
  { label: "Invoices & Billing", href: "/invoices", icon: "FileText", implemented: true },
];

export interface UtilityNavItem {
  label: string;
  href: string;
  icon: string;
  badge?: number;
}

export const UTILITY_NAV_ITEMS: UtilityNavItem[] = [
  { label: "Message", href: "/messages", icon: "MessageSquare", badge: 19 },
  { label: "Notification", href: "/notifications", icon: "Bell", badge: 5 },
  { label: "Settings", href: "/settings", icon: "Settings" },
];
