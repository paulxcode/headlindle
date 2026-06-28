import { useEffect, useState, useRef } from "react"
import confetti from "canvas-confetti"
import { CheckCircle2, XCircle, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import ShareButton from "@/components/ShareButton"
import { getPuzzleNumber } from "@/utils/daily"

const difficultyDots = {
  easy: "●",
  medium: "●●",
  hard: "●●●",
}
const difficultyColors = {
  easy: "text-green-500",
  medium: "text-yellow-500",
  hard: "text-red-500",
}
const difficultyLabels = {
  easy: "Easy",
  medium: "Medium",
  hard: "Hard",
}

function getScoreLabel(score) {
  if (score === 5) return "Impeccable"
  if (score === 4) return "Sharp"
  if (score === 3) return "Decent"
  if (score === 2) return "Shaky"
  return "Got played"
}

function useCountUp(target) {
  const [display, setDisplay] = useState(0)
  const started = useRef(false)

  useEffect(() => {
    if (started.current) return
    started.current = true
    const duration = 600
    const steps = 20
    const increment = target / steps
    let current = 0
    const interval = setInterval(() => {
      current += increment
      if (current >= target) {
        setDisplay(target)
        clearInterval(interval)
      } else {
        setDisplay(Math.floor(current))
      }
    }, duration / steps)
    return () => {
      clearInterval(interval)
      started.current = false
    }
  }, [target])

  return display
}

function getTimeToMidnight() {
  const now = new Date()
  const midnight = new Date(now)
  midnight.setDate(midnight.getDate() + 1)
  midnight.setHours(0, 0, 0, 0)
  const diff = midnight - now
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)
  return { hours, minutes, seconds, total: diff }
}

function Countdown() {
  const [time, setTime] = useState(getTimeToMidnight)

  useEffect(() => {
    const id = setInterval(() => {
      setTime(getTimeToMidnight())
    }, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <p className="text-sm text-slate-400 dark:text-slate-500 mt-6">
      Come back tomorrow —{" "}
      <span className="font-mono">
        {String(time.hours).padStart(2, "0")}:
        {String(time.minutes).padStart(2, "0")}:
        {String(time.seconds).padStart(2, "0")}
      </span>
    </p>
  )
}

const mediaTips = [
  "Always check the source before sharing — satire sites look real.",
  "If a headline makes you angry, pause. Outrage is a manipulation tactic.",
  "Google the headline verbatim in quotes to verify it.",
  "Check the date — old headlines recirculate to mislead.",
  "Photos can be AI-generated or taken out of context.",
  "If only one outlet is reporting it, be skeptical.",
  "Look for primary sources, not just summaries.",
  "Satire accounts often have 'onion' or 'daily' in the URL.",
  "Emotional headlines are more likely to be fake — they're designed to spread.",
  "Reverse image search photos to see if they're recycled from old stories.",
]

function getDailyTip() {
  const puzzleNum = getPuzzleNumber()
  return mediaTips[puzzleNum % mediaTips.length]
}

export default function Results({ answers, puzzleDate, onPlayAgain, isArchive, onBackToArchive, onRetry }) {
  const score = answers.filter((a) => a.correct).length
  const label = getScoreLabel(score)
  const animatedScore = useCountUp(score)
  const firedRef = useRef(false)

  useEffect(() => {
    if (score === 5 && !firedRef.current) {
      firedRef.current = true
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
      })
    }
  }, [score])

  return (
    <div className="flex flex-col items-center px-4 py-8 max-w-lg mx-auto animate-fadeUp">
      <div className="animate-countUp mb-2">
        <p className="text-6xl font-extrabold tracking-tight">
          {animatedScore} / 5
        </p>
      </div>
      <p className="text-xl text-slate-500 dark:text-slate-400 mb-6">{label}</p>

      <div className="flex gap-1 mb-8 text-2xl" aria-label="Results emoji grid">
        {answers.map((a, i) => (
          <span key={i}>{a.correct ? "🟩" : "🟥"}</span>
        ))}
      </div>

      <div className="w-full space-y-3 mb-8">
        {answers.map((a, i) => (
          <div
            key={i}
            className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-gray-900 border border-slate-200 dark:border-slate-700"
          >
            {a.correct ? (
              <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 shrink-0" aria-label="Correct" />
            ) : (
              <XCircle className="w-5 h-5 text-red-600 mt-0.5 shrink-0" aria-label="Wrong" />
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium leading-snug dark:text-slate-200">{a.item.headline}</p>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                — {a.item.url ? (
                  <a href={a.item.url} target="_blank" rel="noopener noreferrer" className="underline hover:text-slate-600 dark:hover:text-slate-300">
                    {a.item.source}
                  </a>
                ) : (
                  a.item.source
                )}
              </p>
              <div className="flex items-center gap-1 mt-1">
                <HelpCircle className="w-3 h-3 text-slate-400 dark:text-slate-500" />
                <span
                  className={`text-xs ${difficultyColors[a.item.difficulty] || "text-slate-400 dark:text-slate-500"}`}
                  aria-label={`${difficultyLabels[a.item.difficulty]} difficulty`}
                >
                  {difficultyDots[a.item.difficulty] || ""}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-3 mb-4">
        <ShareButton answers={answers} puzzleDate={puzzleDate} />
        <Button variant="ghost" onClick={onPlayAgain} aria-label="Play again">
          {isArchive ? "Back to archive" : "Play again"}
        </Button>
      </div>

      <div className="text-center max-w-sm">
        <p className="text-xs text-slate-400 dark:text-slate-500 italic mb-2">
          💡 Did you know? {getDailyTip()}
        </p>
      </div>

      {isArchive ? (
        <div className="flex gap-3 mt-6">
          <Button variant="outline" onClick={onRetry} aria-label="Retry this puzzle">
            Retry puzzle
          </Button>
          <Button variant="outline" onClick={onBackToArchive} aria-label="Back to archive">
            Back to archive
          </Button>
        </div>
      ) : (
        <Countdown />
      )}
    </div>
  )
}
