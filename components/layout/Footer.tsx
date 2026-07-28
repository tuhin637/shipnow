/** Minimal social glyphs — lucide-react's brand icon set isn't included in this version. */
function SocialIcon({ path, label }: { path: string; label: string }) {
  return (
    <svg width={15} height={15} viewBox="0 0 24 24" fill="currentColor" aria-label={label} role="img">
      <path d={path} />
    </svg>
  );
}

const FACEBOOK_PATH =
  "M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.91h-2.34V22c4.78-.79 8.44-4.94 8.44-9.94Z";
const X_PATH =
  "M18.9 2H22l-7.5 8.57L23 22h-6.9l-5.4-6.6L4.4 22H1.3l8.02-9.17L1 2h7.1l4.9 6.06L18.9 2Zm-1.2 18h1.7L7.4 4h-1.8l12.1 16Z";
const INSTAGRAM_PATH =
  "M12 2c2.72 0 3.06.01 4.12.06 1.07.05 1.79.22 2.43.46.66.26 1.22.6 1.77 1.15.5.5.9 1.1 1.15 1.77.24.64.41 1.36.46 2.43.05 1.06.06 1.4.06 4.12s-.01 3.06-.06 4.12c-.05 1.07-.22 1.79-.46 2.43a4.9 4.9 0 0 1-1.15 1.77 4.9 4.9 0 0 1-1.77 1.15c-.64.24-1.36.41-2.43.46-1.06.05-1.4.06-4.12.06s-3.06-.01-4.12-.06c-1.07-.05-1.79-.22-2.43-.46a4.9 4.9 0 0 1-1.77-1.15 4.9 4.9 0 0 1-1.15-1.77c-.24-.64-.41-1.36-.46-2.43C2.01 15.06 2 14.72 2 12s.01-3.06.06-4.12c.05-1.07.22-1.79.46-2.43.26-.66.6-1.22 1.15-1.77A4.9 4.9 0 0 1 5.44 2.52c.64-.24 1.36-.41 2.43-.46C8.94 2.01 9.28 2 12 2Zm0 1.8c-2.67 0-2.99.01-4.04.06-.87.04-1.34.18-1.66.3-.42.16-.72.36-1.03.67-.31.31-.51.6-.67 1.03-.12.32-.26.79-.3 1.66C4.25 8.51 4.2 8.9 4.2 12s0 3.49.06 4.04c.04.87.18 1.34.3 1.66.16.42.36.72.67 1.03.31.31.6.51 1.03.67.32.12.79.26 1.66.3.54.03.94.06 4.04.06s3.49 0 4.04-.06c.87-.04 1.34-.18 1.66-.3.42-.16.72-.36 1.03-.67.31-.31.51-.6.67-1.03.12-.32.26-.79.3-1.66.03-.55.06-.94.06-4.04s0-3.49-.06-4.04c-.04-.87-.18-1.34-.3-1.66a2.7 2.7 0 0 0-.67-1.03 2.7 2.7 0 0 0-1.03-.67c-.32-.12-.79-.26-1.66-.3C14.99 3.8 14.67 3.8 12 3.8Zm0 3.05a5.15 5.15 0 1 1 0 10.3 5.15 5.15 0 0 1 0-10.3Zm0 1.8a3.35 3.35 0 1 0 0 6.7 3.35 3.35 0 0 0 0-6.7Zm5.35-1.98a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4Z";
const LINKEDIN_PATH =
  "M6.94 5a2 2 0 1 1-4-.01 2 2 0 0 1 4 .01ZM3.2 8.5h3.5V21H3.2V8.5Zm6.24 0h3.36v1.71h.05c.47-.87 1.6-1.79 3.3-1.79 3.53 0 4.18 2.28 4.18 5.24V21h-3.5v-5.75c0-1.37-.03-3.14-1.94-3.14-1.95 0-2.25 1.5-2.25 3.04V21H9.44V8.5Z";

export function Footer() {
  return (
    <footer className="flex flex-col tablet:flex-row items-center justify-between gap-3 border-t border-ink-100 px-4 py-4 tablet:px-6 text-xs text-ink-400">
      <p>© 2025 Peterdraw</p>
      <nav className="flex items-center gap-4" aria-label="Footer">
        <a href="#" className="hover:text-ink-700">Privacy Policy</a>
        <a href="#" className="hover:text-ink-700">Term and conditions</a>
        <a href="#" className="hover:text-ink-700">Contact</a>
      </nav>
      <div className="flex items-center gap-3 text-ink-400">
        <a href="#" aria-label="Facebook" className="hover:text-ink-700"><SocialIcon path={FACEBOOK_PATH} label="Facebook" /></a>
        <a href="#" aria-label="Twitter / X" className="hover:text-ink-700"><SocialIcon path={X_PATH} label="X" /></a>
        <a href="#" aria-label="Instagram" className="hover:text-ink-700"><SocialIcon path={INSTAGRAM_PATH} label="Instagram" /></a>
        <a href="#" aria-label="LinkedIn" className="hover:text-ink-700"><SocialIcon path={LINKEDIN_PATH} label="LinkedIn" /></a>
      </div>
    </footer>
  );
}
