# ShipNow — Frontend Developer Intern Assignment

Implementation of the **ShipNow** logistics dashboard for the Trends Bird
Limited Frontend Developer Intern assignment, built from the provided Figma
design.

- **Live demo:*https://shipnow-pearl.vercel.app/* 
- **GitHub repo:** _ADD YOUR REPO URL HERE_

---

## Setup

```bash
npm install
npm run dev       # http://localhost:3000
```

Production build:

```bash
npm run build && npm run start
```

---

## Screen status

| # | Screen                       | Status       | Notes |
|---|-------------------------------|--------------|-------|
| 1 | Login                         | ✅ Complete  | Desktop / Tablet / Mobile |
| 2 | Dashboard (app shell + widgets)| ✅ Complete | Desktop / Tablet / Mobile |
| 3 | Shipments — Table View         | ✅ Complete | Desktop / Tablet / Mobile |
| 4 | Shipments — Grid View          | ✅ Complete | Desktop / Tablet / Mobile |
| 5 | Shipments — View Switcher      | ✅ Complete | Single `/shipments` route, `?view=table\|grid` in URL |
| 6 | Create New Shipment            | ✅ Complete | Error-state reproduced, live validation |
| 7 | Invoices & Billing             | ✅ Complete | Master-detail, totals computed from line items |
| 8 | Warehouse                      | ✅ Complete | Floor-tab interactive map |

All non-implemented sidebar items (**Analytics, Calendar, Tracking, Fleets,
Drivers**) are rendered and styled in the nav but route to a shared
`PlaceholderScreen` component, per the assignment's explicit allowance in
§4.2, so no link 404s.

> Update the ✅/🟡/⬜ marks above if you make further changes before
> submitting, and keep this table honest — it's what the reviewer checks
> first.

---

## Stack

- **Next.js 16** (App Router) + **TypeScript**
- **Tailwind CSS v4** — custom design tokens in `app/globals.css`, custom
  breakpoints matching the Figma frames: mobile `<768px`, `tablet:` at
  `768px`, `desktop:` at `1440px`
- **recharts** for all charts (line, grouped bar, donut/pie)
- **lucide-react** for icons
- No backend, no API calls — all data is local mock data under `lib/data/`
- No pre-styled UI library used (MUI/Ant/Chakra/Bootstrap) per assignment
  rules — all components are custom-built

---

## Project structure

```
app/
  (auth)/login/               Login screen
  (dashboard)/                 Shared layout (sidebar / topbar / footer)
    dashboard/                 Dashboard
    shipments/                 Table + Grid view, view switcher
    shipments/new/             Create Shipment form
    invoices/                  Invoices & Billing
    warehouse/                 Warehouse
    analytics/ calendar/       Placeholder pages (not part of assignment scope)
    tracking/ fleets/ drivers/
  globals.css                  Design tokens
components/
  ui/                          Reusable primitives (Button, Input, Checkbox…)
  layout/                      Sidebar, MobileNav, Footer, DashboardShell
  dashboard/ shipments/        Screen-specific components
  shipment-form/ invoices/
  warehouse/
lib/
  types/                       Shared TypeScript domain types
  data/                        Mock data, seeded from the Figma content
  utils/                       Small helpers (cn, formatters)
```

---

## Functional behaviour implemented

- Client-side login validation (required fields, email format, password
  length) with a working show/hide password control and a simulated
  session redirect to `/dashboard`
- Sidebar collapses to icon-only rail at tablet width and to a hamburger
  drawer at mobile width
- Shipments table: column sorting, row selection, pagination with a
  page-size selector
- Shipments grid: same filtering/pagination behaviour as the table, no
  full-page reload when switching views
- Status tabs / filter chips / search inputs filter their respective lists
- Create Shipment form: reproduces the Figma error state and validates on
  submit, clearing errors as fields are corrected
- Invoices: selecting a row updates the detail panel; totals are computed
  from each invoice's line items rather than hard-coded
- Warehouse: floor-tab map switches zone data; charts render from mock data

---

## Accessibility

Not the focus of this assignment, but implemented per §3.4:

- Semantic landmarks: `<nav aria-label="Primary">`, `<nav aria-label="Utility">`,
  `<nav aria-label="Footer">`, one `<main id="main-content">` per page
- Skip-to-content link (visible on keyboard focus) before the sidebar in
  `DashboardShell`
- All form inputs use `<label htmlFor>`, `aria-invalid`, and
  `aria-describedby` pointing at their error message (`Field`,
  `PasswordField` in `components/ui/`)
- Icon-only buttons (more-options menus, pagination, zoom, filter, stepper
  +/-, password show/hide, mobile drawer open/close) all carry `aria-label`
- Sortable table columns use `scope="col"` and `aria-sort`, with an
  `aria-label` on the sort button describing the current direction
- Sidebar nav links get an explicit `aria-label` (not just `title`) so the
  accessible name survives the icon-only tablet rail, where the text label
  is visually + structurally hidden
- The two real `<Image>`s (login hero photos) have descriptive `alt` text;
  decorative icons use `aria-hidden="true"`
- A global `:focus-visible` outline (`app/globals.css`) gives every
  interactive element a visible keyboard focus ring by default, on top of
  per-component focus styles

## Known issues / assumptions

- **Password minimum length**: set to 8+ characters as a reasonable
  default since the Figma file doesn't state an exact minimum. Verify
  against the design's validation copy and adjust if it differs.
- **Design tokens**: colors, spacing, and type scale in `app/globals.css`
  were read from the provided screenshots rather than pulled directly from
  Figma Dev Mode / Inspect. Re-check exact hex/px/font values against the
  Figma file for a pixel-accurate match before final submission.
- **Fonts**: Poppins (display/headings) + Inter (body) loaded via a Google
  Fonts `<link>` tag rather than `next/font` — confirm these match the
  actual Figma typefaces.
- **Session simulation**: login uses `sessionStorage` (not `localStorage`)
  to fake an authenticated session, since the assignment requires no real
  backend/auth.
- **Tracking / Warehouse map**: implemented as a static image/gradient
  surface with an SVG route line, marker, and floor tabs on top — per the
  assignment FAQ's explicit note that a real mapping SDK is not required.
- **Social icons in the footer**: the installed `lucide-react` version
  doesn't ship brand/logo icons (Facebook, X, Instagram, LinkedIn), so
  these are small inline SVGs in `components/layout/Footer.tsx` instead.

---

## Before submitting — checklist

- [ ] Push to GitHub with incremental, descriptive commits (not a single
      commit) and paste the repo URL at the top of this file
- [ ] Deploy to Vercel/Netlify, test the link in a private/incognito
      window, and paste it at the top of this file
- [ ] Re-check colors/spacing/typography against Figma Dev Mode
- [ ] Confirm password validation rule matches the Figma copy
- [ ] Fill in the submission form with both links
