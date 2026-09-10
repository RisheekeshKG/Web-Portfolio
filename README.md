# risheekesh.me

Personal site for Risheekesh KG — AI & software engineer. React 19, TypeScript,
Tailwind 4, Vite, deployed to GitHub Pages.

```bash
npm install
npm run dev      # vite dev server
npm run build    # tsc -b && vite build
npm run lint     # oxlint
```

## Design system

The site is built as a **readout sheet**, grounded in the subject matter: every
project here is a system that reads a noisy signal and returns a confident
number, so the page is laid out the way a lab sheet is — prose on the left,
measured values hanging in a right-hand gutter where they stack into a single
scannable column of evidence.

**Colour carries meaning.** `signal` (amber) marks a measured value and appears
nowhere else; `calm` (teal) marks structure, links and navigation. Neither is
used as decoration. Both themes clear WCAG AA for every text pair.

| token             | dark      | light     |
| ----------------- | --------- | --------- |
| `ground`          | `#0c1416` | `#f2f4f2` |
| `panel`           | `#121d20` | `#ffffff` |
| `rule`            | `#1e2e31` | `#dce2df` |
| `ink`             | `#e6edea` | `#0e1719` |
| `muted`           | `#8fa4a3` | `#55676a` |
| `signal` (amber)  | `#e0a24a` | `#8f5412` |
| `calm` (teal)     | `#5fb0a4` | `#176b60` |

**Two typefaces, deliberately far apart.** Source Serif 4 sets all prose and
headings — the register the research actually lives in. JetBrains Mono sets
every measured value, period, tag and nav item. Nothing uses a third face.
Scale is a minor third off a 17px body, defined as `--text-*` in `index.css`.

**Motion is spent once.** The page-load sequence — hero copy settling in while
the forecast readout resolves out of noise — is the only motion the page starts
on its own. Everything else moves only in answer to a user action, and the
whole thing collapses to a static settled state under
`prefers-reduced-motion: reduce`.

## Layout primitives

- `CONTAINER` (`src/lib/layout.ts`) — shared content width, so text, nav and
  rules all align to the same edges.
- `SHEET` / `GUTTER` — the two-column readout grid. Collapses to one column
  below `md`, where the gutter becomes a header row.
- `Section` (`src/components/Section.tsx`) — section shell plus the `Result`
  and `Points` pieces used inside entries. Its `meta` prop takes a fact about
  the section's contents (a count, a date range, a status) rather than a
  decorative index.

## The hero readout

`src/components/ForecastReadout.tsx` draws a coarse PM2.5 concentration field
advancing across the 16-hour horizon of the ConvLSTM2D forecaster described in
the Research section. The lattice is blocky on purpose — real WRF-Chem output
is a coarse grid, not a smooth gradient.

The field is generated rather than real model output; it reproduces the
behaviour (drifting, dispersing plumes over a regional background) at the
resolution and on the colour scale the real maps use. It repaints on theme
change, and stops entirely when scrolled out of view or when the tab is hidden.

## Activity heatmaps

Neither platform can be called directly from a page: GitHub's contribution API
needs a token, and LeetCode's GraphQL endpoint answers preflight with `405` and
sends no CORS headers at all. Both therefore go through public read-only
proxies, fetched in the browser on mount (`src/hooks/useActivity.ts`):

| source   | proxy                                    |
| -------- | ---------------------------------------- |
| GitHub   | `github-contributions-api.jogruber.de`   |
| LeetCode | `leetcode-api-faisalshohag.vercel.app`   |

These are free third-party services, so either can rate-limit or disappear.
Each is fetched independently behind an 8s timeout: if one fails, that panel
degrades to a link to the profile and the rest of the section is unaffected.
The empty grid renders immediately and fills in when data lands, so the section
never shifts.

To swap a proxy, change the two URL constants at the top of that hook. Both are
expected to return a per-day calendar and a headline total; see `fetchGitHub`
and `fetchLeetCode` for the shapes.

The heatmaps are drawn on the same colour scale as the hero forecast
(`src/lib/ramp.ts`), so a warm cell means the same thing everywhere. Counts are
bucketed by quartile rather than scaled linearly, so one twenty-commit day
cannot flatten every ordinary day to the bottom of the scale.

## Content

All copy and data live in `src/data/site.ts`. A `Result` (the amber number in
the gutter) should only be added where a real measurement exists — an empty
gutter is honest, an invented figure is not.
