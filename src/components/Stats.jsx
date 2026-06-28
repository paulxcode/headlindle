import { useMemo } from "react"
import { Button } from "@/components/ui/button"
import { getAllResults, getStreak, getBestStreak } from "@/utils/daily"

export default function Stats({ onBack }) {
  const results = useMemo(() => getAllResults(), [])
  const streak = getStreak()
  const bestStreak = getBestStreak()

  const totalGames = results.length
  const totalCorrect = results.reduce((sum, r) => sum + (r.score ?? 0), 0)
  const totalQuestions = totalGames * 5
  const winRate = totalGames > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0
  const avgScore = totalGames > 0 ? (totalCorrect / totalGames).toFixed(1) : "—"

  const distribution = Array(6).fill(0)
  results.forEach((r) => {
    const s = r.score ?? 0
    if (s >= 0 && s <= 5) distribution[s]++
  })

  return (
    <div className="flex flex-col items-center px-4 py-8 max-w-lg mx-auto animate-fadeUp">
      <h2 className="text-2xl font-bold mb-6 dark:text-slate-100">Your Stats</h2>

      <div className="grid grid-cols-2 gap-4 w-full mb-8">
        <div className="text-center p-4 rounded-lg bg-white dark:bg-gray-900 border border-slate-200 dark:border-slate-700">
          <p className="text-3xl font-extrabold">{totalGames}</p>
          <p className="text-xs text-slate-400 dark:text-slate-500">Played</p>
        </div>
        <div className="text-center p-4 rounded-lg bg-white dark:bg-gray-900 border border-slate-200 dark:border-slate-700">
          <p className="text-3xl font-extrabold">{winRate}%</p>
          <p className="text-xs text-slate-400 dark:text-slate-500">Win rate</p>
        </div>
        <div className="text-center p-4 rounded-lg bg-white dark:bg-gray-900 border border-slate-200 dark:border-slate-700">
          <p className="text-3xl font-extrabold">{avgScore}</p>
          <p className="text-xs text-slate-400 dark:text-slate-500">Avg score</p>
        </div>
        <div className="text-center p-4 rounded-lg bg-white dark:bg-gray-900 border border-slate-200 dark:border-slate-700">
          <p className="text-3xl font-extrabold flex items-center justify-center gap-1">
            {streak}
            {streak > 0 && <span className="text-lg">🔥</span>}
          </p>
          <p className="text-xs text-slate-400 dark:text-slate-500">Streak</p>
        </div>
      </div>

      <div className="w-full mb-6">
        <p className="text-sm font-semibold mb-3 text-center dark:text-slate-200">
          Best streak: {bestStreak} day{bestStreak !== 1 ? "s" : ""}
        </p>
      </div>

      <div className="w-full mb-8">
        <h3 className="text-sm font-semibold mb-3 text-center dark:text-slate-200">
          Score distribution
        </h3>
        <div className="space-y-2">
          {[5, 4, 3, 2, 1, 0].map((score) => {
            const count = distribution[score]
            const maxCount = Math.max(...distribution, 1)
            const barWidth = maxCount > 0 ? (count / maxCount) * 100 : 0
            return (
              <div key={score} className="flex items-center gap-2 text-sm">
                <span className="w-6 text-right text-slate-500 dark:text-slate-400">
                  {score}
                </span>
                <div className="flex-1 h-6 bg-slate-200 dark:bg-slate-700 rounded overflow-hidden">
                  <div
                    className={`h-full rounded transition-all duration-500 ${
                      score >= 4 ? "bg-green-500" : score >= 2 ? "bg-yellow-500" : "bg-red-500"
                    }`}
                    style={{ width: `${barWidth}%` }}
                  />
                </div>
                <span className="w-6 text-left text-slate-500 dark:text-slate-400">
                  {count}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      <Button variant="outline" onClick={onBack} aria-label="Back to home">
        Back to home
      </Button>
    </div>
  )
}
