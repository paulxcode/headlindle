function mulberry32(a) {
  return function () {
    let t = (a += 0x6d2b79f5)
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function seededShuffle(arr, seed) {
  const rng = mulberry32(seed)
  const shuffled = [...arr]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

function hashDate(dateStr) {
  let hash = 0
  for (let i = 0; i < dateStr.length; i++) {
    const char = dateStr.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash |= 0
  }
  return Math.abs(hash)
}

const LAUNCH_DATE = new Date("2026-01-01")
const TODAY_KEY_PREFIX = "realorfake_"
const STREAK_KEY = "realorfake_streak"
const BEST_STREAK_KEY = "realorfake_best_streak"
const LAST_PLAYED_KEY = "realorfake_lastplayed"

export function getTodayString() {
  return new Date().toISOString().split("T")[0]
}

export function getDailyHeadlinesForDate(dateStr, allHeadlines) {
  const seed = hashDate(dateStr)
  const shuffled = seededShuffle(allHeadlines, seed)
  return shuffled.slice(0, 5)
}

export function getDailyHeadlines(allHeadlines) {
  return getDailyHeadlinesForDate(getTodayString(), allHeadlines)
}

export function getPuzzleNumber() {
  return getPuzzleNumberForDate(getTodayString())
}

export function getPuzzleNumberForDate(dateStr) {
  const date = new Date(dateStr + "T00:00:00")
  const diff = date.getTime() - LAUNCH_DATE.getTime()
  return Math.floor(diff / (1000 * 60 * 60 * 24)) + 1
}

export function saveResult(answers) {
  const today = getTodayString()
  const correct = answers.filter((a) => a.correct).length
  localStorage.setItem(
    `${TODAY_KEY_PREFIX}${today}`,
    JSON.stringify({ answers, score: correct })
  )
  updateStreak()
}

export function loadTodayResult() {
  return loadResultForDate(getTodayString())
}

export function loadResultForDate(dateStr) {
  const raw = localStorage.getItem(`${TODAY_KEY_PREFIX}${dateStr}`)
  if (!raw) return null
  return JSON.parse(raw)
}

export function getStreak() {
  return parseInt(localStorage.getItem(STREAK_KEY) || "0", 10)
}

export function getBestStreak() {
  return parseInt(localStorage.getItem(BEST_STREAK_KEY) || "0", 10)
}

export function getAllResults() {
  const results = []
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (key && key.startsWith(TODAY_KEY_PREFIX)) {
      try {
        const data = JSON.parse(localStorage.getItem(key))
        const dateStr = key.replace(TODAY_KEY_PREFIX, "")
        results.push({ dateStr, ...data })
      } catch {}
    }
  }
  return results.sort((a, b) => a.dateStr.localeCompare(b.dateStr))
}

function updateStreak() {
  const today = getTodayString()
  const lastPlayed = localStorage.getItem(LAST_PLAYED_KEY)
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  const yesterdayStr = yesterday.toISOString().split("T")[0]

  let streak = parseInt(localStorage.getItem(STREAK_KEY) || "0", 10)

  if (lastPlayed === yesterdayStr) {
    streak += 1
  } else if (lastPlayed !== today) {
    streak = 1
  }

  localStorage.setItem(STREAK_KEY, streak.toString())
  const best = parseInt(localStorage.getItem(BEST_STREAK_KEY) || "0", 10)
  if (streak > best) {
    localStorage.setItem(BEST_STREAK_KEY, streak.toString())
  }
  localStorage.setItem(LAST_PLAYED_KEY, today)
}

export function hasCompletedToday() {
  const today = getTodayString()
  return localStorage.getItem(`${TODAY_KEY_PREFIX}${today}`) !== null
}
