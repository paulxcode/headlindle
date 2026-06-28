import { Button } from "@/components/ui/button"
import { getStreak, getPuzzleNumber } from "@/utils/daily"

function formatDate() {
  return new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

export default function Splash({ onPlay, hasCompleted, onViewResults, onViewCalendar, onViewStats }) {
  const streak = getStreak()
  const puzzleNum = getPuzzleNumber()

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4 animate-fadeUp">
      <div className="animate-fadeIn">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-1">
          Real or Fake?
        </h1>
        <p className="text-xs text-slate-400 dark:text-slate-500 mb-2 font-mono">
          #{puzzleNum}
        </p>
        <p className="text-lg text-slate-500 dark:text-slate-400 mb-1">
          5 headlines. Real or fake. No Googling.
        </p>
        <p className="text-sm text-slate-400 dark:text-slate-500 mb-6">{formatDate()}</p>

        {streak > 0 && (
          <p className="text-lg mb-6" aria-label={`${streak} day streak`}>
            🔥 {streak} day streak
          </p>
        )}

        {hasCompleted ? (
          <Button
            size="lg"
            variant="default"
            onClick={onViewResults}
            aria-label="See your results"
          >
            See your results
          </Button>
        ) : (
          <Button
            size="lg"
            variant="default"
            onClick={onPlay}
            aria-label="Play today's puzzle"
          >
            Play today's puzzle
          </Button>
        )}

        <div className="mt-4 flex gap-2 flex-wrap justify-center">
          <Button
            variant="ghost"
            onClick={onViewCalendar}
            aria-label="View past puzzles"
          >
            Past puzzles
          </Button>
          <Button
            variant="ghost"
            onClick={onViewStats}
            aria-label="View your stats"
          >
            Stats
          </Button>
        </div>
      </div>
    </div>
  )
}
