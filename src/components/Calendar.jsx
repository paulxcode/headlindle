import { useState, useMemo } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { loadResultForDate } from "@/utils/daily"

function getMonthGrid(year, month) {
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const cells = []
  for (let i = 0; i < firstDay; i++) {
    cells.push(null)
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push(new Date(year, month, d))
  }
  return cells
}

export default function Calendar({ onSelectDate, onBack }) {
  const today = new Date()
  const [viewYear, setViewYear] = useState(today.getFullYear())
  const [viewMonth, setViewMonth] = useState(today.getMonth())

  const cells = useMemo(() => getMonthGrid(viewYear, viewMonth), [viewYear, viewMonth])

  const monthLabel = new Date(viewYear, viewMonth).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  })

  function isFuture(date) {
    const d = new Date(date)
    d.setHours(0, 0, 0, 0)
    const t = new Date(today)
    t.setHours(0, 0, 0, 0)
    return d > t
  }

  function getResultDot(dateStr) {
    const result = loadResultForDate(dateStr)
    if (!result) return null
    if (result.score === 5) return "bg-green-500"
    if (result.score >= 3) return "bg-yellow-500"
    return "bg-red-500"
  }

  function isToday(date) {
    const d = new Date(date)
    d.setHours(0, 0, 0, 0)
    const t = new Date(today)
    t.setHours(0, 0, 0, 0)
    return d.getTime() === t.getTime()
  }

  function prevMonth() {
    if (viewMonth === 0) {
      setViewYear((y) => y - 1)
      setViewMonth(11)
    } else {
      setViewMonth((m) => m - 1)
    }
  }

  function nextMonth() {
    if (viewMonth === 11) {
      setViewYear((y) => y + 1)
      setViewMonth(0)
    } else {
      setViewMonth((m) => m + 1)
    }
  }

  const launchDate = new Date("2026-01-01")
  const isAtLaunch =
    viewYear === launchDate.getFullYear() && viewMonth === launchDate.getMonth()
  const isAtCurrent =
    viewYear === today.getFullYear() && viewMonth === today.getMonth()

  return (
    <div className="flex flex-col items-center px-4 py-8 max-w-lg mx-auto animate-fadeUp">
      <h2 className="text-2xl font-bold mb-4 dark:text-slate-100">Past Puzzles</h2>

      <div className="flex items-center justify-between w-full mb-4">
        <button
          onClick={prevMonth}
          disabled={isAtLaunch}
          className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-slate-700 dark:text-slate-300"
          aria-label="Previous month"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <span className="text-lg font-semibold dark:text-slate-200">{monthLabel}</span>
        <button
          onClick={nextMonth}
          disabled={isAtCurrent}
          className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-slate-700 dark:text-slate-300"
          aria-label="Next month"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 w-full mb-6">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
          <div key={d} className="text-center text-xs text-slate-400 dark:text-slate-500 font-medium py-1">
            {d}
          </div>
        ))}
        {cells.map((cell, i) => {
          if (!cell) return <div key={`e-${i}`} />

          const dateStr = cell.toISOString().split("T")[0]
          const fut = isFuture(cell)
          const dot = getResultDot(dateStr)
          const td = isToday(cell)

          return (
            <button
              key={dateStr}
              onClick={() => !fut && onSelectDate(dateStr)}
              disabled={fut}
              className={`
                relative aspect-square flex items-center justify-center text-sm rounded-lg transition-colors
                ${fut ? "text-slate-300 dark:text-slate-600 cursor-not-allowed" : "hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer"}
                ${td ? "ring-2 ring-slate-400 dark:ring-slate-500 font-bold" : ""}
                ${!fut ? "text-slate-800 dark:text-slate-200" : ""}
              `}
              aria-label={`${cell.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}${dot ? ", completed" : ""}`}
            >
              {cell.getDate()}
              {dot && (
                <span className={`absolute bottom-1 w-1.5 h-1.5 rounded-full ${dot}`} />
              )}
            </button>
          )
        })}
      </div>

      <div className="flex items-center gap-4 text-xs text-slate-400 dark:text-slate-500 mb-6">
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-green-500" /> 5/5
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-yellow-500" /> 3-4/5
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-red-500" /> 0-2/5
        </span>
      </div>

      <Button variant="outline" onClick={onBack} aria-label="Back to home">
        Back to home
      </Button>
    </div>
  )
}
