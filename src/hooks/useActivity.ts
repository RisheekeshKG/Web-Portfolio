import { useEffect, useState } from 'react'

/**
 * Live LeetCode and GitHub calendars, read in the browser.
 *
 * Neither platform can be called directly from a page — GitHub's contribution
 * API needs a token and LeetCode's GraphQL endpoint sends no CORS headers — so
 * both go through public read-only proxies. They are third-party and free, so
 * either can rate-limit or disappear; each is fetched independently and a
 * failure leaves that one panel empty rather than breaking the section.
 */

const GITHUB_USER = 'RisheekeshKG'
const LEETCODE_USER = 'RisheekeshKG'

const GITHUB_API = `https://github-contributions-api.jogruber.de/v4/${GITHUB_USER}?y=last`
const LEETCODE_API = `https://leetcode-api-faisalshohag.vercel.app/${LEETCODE_USER}`

const TIMEOUT_MS = 8000

export type Panel = {
  days: Record<string, number>
  activeDays: number
  /** The headline figure for the values gutter. */
  total: number
}

export type Activity = {
  from: string
  to: string
  github: Panel | null
  leetcode: Panel | null
  /** True until both requests have settled, however they settled. */
  loading: boolean
}

const iso = (date: Date) => date.toISOString().slice(0, 10)

/**
 * A 53-week window ending today and starting on a Sunday, so both grids share
 * one column layout regardless of what either API returns.
 */
function windowDates() {
  const to = new Date()
  to.setUTCHours(0, 0, 0, 0)
  const from = new Date(to)
  from.setUTCDate(from.getUTCDate() - 363)
  from.setUTCDate(from.getUTCDate() - from.getUTCDay())
  return { from: iso(from), to: iso(to) }
}

function panel(days: Record<string, number>, total: number): Panel {
  return { days, activeDays: Object.keys(days).length, total }
}

async function getJson(url: string, signal: AbortSignal) {
  const res = await fetch(url, { signal })
  if (!res.ok) throw new Error(`${url} → ${res.status}`)
  return res.json()
}

async function fetchGitHub(from: string, to: string, signal: AbortSignal) {
  const data = await getJson(GITHUB_API, signal)
  const days: Record<string, number> = {}
  for (const day of data.contributions ?? []) {
    if (day.count > 0 && day.date >= from && day.date <= to) {
      days[day.date] = day.count
    }
  }
  return panel(days, data.total?.lastYear ?? 0)
}

async function fetchLeetCode(from: string, to: string, signal: AbortSignal) {
  const data = await getJson(LEETCODE_API, signal)

  // The calendar arrives keyed by UTC-midnight unix seconds.
  const calendar =
    typeof data.submissionCalendar === 'string'
      ? JSON.parse(data.submissionCalendar)
      : (data.submissionCalendar ?? {})

  const days: Record<string, number> = {}
  for (const [seconds, count] of Object.entries(calendar)) {
    const date = iso(new Date(Number(seconds) * 1000))
    if (date >= from && date <= to) {
      days[date] = (days[date] ?? 0) + Number(count)
    }
  }
  return panel(days, data.totalSolved ?? 0)
}

export function useActivity(): Activity {
  const [{ from, to }] = useState(windowDates)
  const [github, setGithub] = useState<Panel | null>(null)
  const [leetcode, setLeetcode] = useState<Panel | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)
    const { signal } = controller

    Promise.allSettled([
      fetchGitHub(from, to, signal).then(setGithub),
      fetchLeetCode(from, to, signal).then(setLeetcode),
    ]).then(() => {
      if (signal.aborted) return
      clearTimeout(timer)
      setLoading(false)
    })

    return () => {
      clearTimeout(timer)
      controller.abort()
    }
  }, [from, to])

  return { from, to, github, leetcode, loading }
}
