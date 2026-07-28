import {
  Box, Zap, Wrench, Leaf, Rocket, Shirt, Cog, Sparkles,
  Cherry, Hammer, Flower2, Gem, type LucideIcon,
} from "lucide-react";

const PALETTE: { bg: string; icon: LucideIcon }[] = [
  { bg: "#F5A623", icon: Box },
  { bg: "#2F6FED", icon: Zap },
  { bg: "#14121F", icon: Sparkles },
  { bg: "#E4483C", icon: Wrench },
  { bg: "#0FA3A3", icon: Leaf },
  { bg: "#856EF4", icon: Rocket },
  { bg: "#1B1B1F", icon: Shirt },
  { bg: "#3B6BDE", icon: Cog },
  { bg: "#D6572E", icon: Cherry },
  { bg: "#5C5C5C", icon: Hammer },
  { bg: "#3B795B", icon: Flower2 },
  { bg: "#B0308A", icon: Gem },
];

function hashString(str: string) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
  return h;
}

/**
 * Decorative company "logo" mark. The Figma design shows a unique icon per
 * (fictional) company; since these aren't real brand logos, a deterministic
 * colored icon is generated per company name instead of sourcing artwork.
 */
export function CompanyAvatar({ company, size = 40 }: { company: string; size?: number }) {
  const { bg, icon: Icon } = PALETTE[hashString(company) % PALETTE.length];
  return (
    <span
      className="flex shrink-0 items-center justify-center rounded-xl text-white"
      style={{ backgroundColor: bg, width: size, height: size }}
      aria-hidden="true"
    >
      <Icon size={Math.round(size * 0.5)} strokeWidth={2} />
    </span>
  );
}