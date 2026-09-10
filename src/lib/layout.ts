/**
 * Shared inner-content width, used by every section (Header, Hero, Section,
 * Footer) so text, nav and rules all align to the same edges regardless of
 * viewport width.
 */
export const CONTAINER = 'mx-auto w-full max-w-5xl px-6 lg:px-8'

/**
 * The readout sheet: prose on the left, measured values hanging in a fixed
 * right-hand gutter, the way a lab sheet puts the number in the margin beside
 * the observation. Collapses to a single column below `md`, where the gutter
 * moves above the prose as a header row.
 */
export const SHEET = 'grid gap-x-10 gap-y-3 md:grid-cols-[minmax(0,1fr)_11rem]'

/** Gutter cell: sits first on narrow screens, right-aligned beside the prose. */
export const GUTTER =
  'order-first flex items-baseline gap-x-4 md:order-none md:block md:text-right'
