import type { CSSProperties } from 'react'
import { Section } from '@/components/Section'
import { bookshelf, type Book } from '@/data/site'

/**
 * Spine height. Derived from the title so it is stable between renders and
 * varies the way a real shelf does — nothing is encoded in it, it is the one
 * piece of this section that is purely visual.
 */
function spineHeight(book: Book) {
  return 216 + ((book.title.length * 7) % 56)
}

/**
 * A spine is lit like the project marks: a wash of its accent over its own
 * ground, a hairline of the same hue, and a bright line inside one edge —
 * here running down the spine, where the light would fall on a book standing
 * on a shelf. Two bands near the ends stand in for foil stamping.
 */
function Spine({ book }: { book: Book }) {
  const fg = `var(--tint-${book.accent}-fg)`
  const bg = `var(--tint-${book.accent}-bg)`

  const style = {
    height: `${spineHeight(book)}px`,
    background: `linear-gradient(100deg, color-mix(in srgb, ${fg} 30%, ${bg}), ${bg} 62%)`,
    color: fg,
    borderColor: `color-mix(in srgb, ${fg} 26%, transparent)`,
    boxShadow: `inset 1px 0 0 color-mix(in srgb, ${fg} 34%, transparent), 0 2px 6px rgb(0 0 0 / 0.22)`,
  } as CSSProperties

  const band = {
    background: `color-mix(in srgb, ${fg} 32%, transparent)`,
  } as CSSProperties

  return (
    <li
      style={style}
      title={`${book.title} — ${book.author}`}
      className="relative w-14 shrink-0 rounded-sm border opacity-100 transition duration-300 ease-out group-hover/shelf:opacity-45 hover:opacity-100! motion-safe:hover:-translate-y-2.5 sm:w-16 lg:w-20"
    >
      <span aria-hidden="true" style={band} className="absolute inset-x-2 top-5 h-px" />
      <span aria-hidden="true" style={band} className="absolute inset-x-2 bottom-5 h-px" />

      {/* The text block is as wide as the spine is tall, then rotated to run
          up the spine. It is placed by hand rather than centred by grid or
          flex: an item wider than its container falls back to start
          alignment, which would swing the rotated text clear of the spine. */}
      <span className="absolute inset-0 overflow-hidden">
        <span
          style={{ width: `${spineHeight(book) - 48}px` }}
          className="absolute top-1/2 left-1/2 block -translate-x-1/2 -translate-y-1/2 -rotate-90 text-center"
        >
          <span className="block text-small leading-tight font-medium text-pretty">
            {book.spine ?? book.title}
          </span>
          <span className="mt-1 block font-mono text-[0.625rem] leading-tight opacity-70">
            {book.author}
          </span>
        </span>
      </span>
    </li>
  )
}

export function Bookshelf() {
  return (
    <Section
      id="bookshelf"
      title="Bookshelf"
      meta={`${bookshelf.length} on the shelf`}
    >
      <p className="max-w-[58ch] text-pretty text-muted">
        What I have been reading — half of it about how to work, half about
        what to build.
      </p>

      <div className="mt-10">
        <ul className="group/shelf flex items-end gap-2 sm:gap-3">
          {bookshelf.map((book) => (
            <Spine key={book.title} book={book} />
          ))}
        </ul>

        {/* The board. Full width, so the shelf reads as furniture the books
            stand on rather than a strip that stops where they do. */}
        <div className="h-1.5 w-full rounded-sm border border-rule bg-panel-2 shadow-elevate" />
      </div>
    </Section>
  )
}
