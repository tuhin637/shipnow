import { cn } from "@/lib/utils/cn";

interface LogoProps {
  className?: string;
  /**
   * dark: purple mark + dark wordmark, for white/light backgrounds
   *   (Sidebar, Register, mobile top bar).
   * light: white mark + white wordmark, for near-black backgrounds
   *   (mobile nav drawer, bg-ink-950).
   * onBrand: dark mark + white wordmark, for the solid brand-purple
   *   hero panel (Login screen).
   */
  variant?: "dark" | "light" | "onBrand";
  /**
   * sm/md/lg for general chrome (sidebar, topbar). "xl" matches the exact
   * Figma Dev Mode spec measured on the Login screen: 34.43px, 120% line
   * height, Nunito Sans 900 italic, uppercase.
   */
  size?: "sm" | "md" | "lg" | "xl";
}

const sizeMap = {
  sm: { mark: 18, text: "text-base" },
  md: { mark: 22, text: "text-xl" },
  lg: { mark: 28, text: "text-[28px]" },
  xl: { mark: 34, text: "text-[34.43px]" },
};

const VARIANT_COLORS: Record<NonNullable<LogoProps["variant"]>, { mark: string; text: string }> = {
  dark: { mark: "#856EF4", text: "text-ink-950" },
  light: { mark: "#FEFEFE", text: "text-white" },
  onBrand: { mark: "#14121F", text: "text-white" },
};

/**
 * ShipNow mark: two congruent parallelogram bars, the second offset
 * diagonally down-right from the first with a slight overlap — measured
 * directly off the Figma screenshots (pixel-traced silhouette), not an
 * approximation.
 */
function LogoMarkSvg({ size, color }: { size: number; color: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="shrink-0"
    >
      <path d="M8 0H19L14 18H2Z" fill={color} />
      <path d="M8 0H19L14 18H2Z" fill={color} transform="translate(10 14)" />
    </svg>
  );
}

/** Standalone icon-only mark (no wordmark) — always the brand-purple fill, per Figma. */
export function LogoMark({ size = 28, className }: { size?: number; className?: string }) {
  return (
    <span className={cn("inline-flex", className)}>
      <LogoMarkSvg size={size} color="#856EF4" />
    </span>
  );
}

export function Logo({ className, variant = "dark", size = "md" }: LogoProps) {
  const { mark, text } = sizeMap[size];
  const colors = VARIANT_COLORS[variant];

  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <LogoMarkSvg size={mark} color={colors.mark} />
      <span
        className={cn(
          "font-logo font-black italic uppercase leading-[1.2] tracking-normal",
          text,
          colors.text
        )}
      >
        Shipnow
      </span>
    </div>
  );
}