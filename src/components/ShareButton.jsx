import { useState } from "react"
import { Button } from "@/components/ui/button"
import { getPuzzleNumberForDate, getTodayString } from "@/utils/daily"

function getScoreLabel(score) {
  if (score === 5) return "Impeccable"
  if (score === 4) return "Sharp"
  if (score === 3) return "Decent"
  if (score === 2) return "Shaky"
  return "Got played"
}

export default function ShareButton({ answers, puzzleDate }) {
  const [copied, setCopied] = useState(false)

  const score = answers.filter((a) => a.correct).length
  const emojiGrid = answers
    .map((a) => (a.correct ? "🟩" : "🟥"))
    .join("")
  const dateStr = puzzleDate || getTodayString()
  const puzzleNum = getPuzzleNumberForDate(dateStr)
  const date = new Date(dateStr + "T00:00:00").toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  })
  const label = getScoreLabel(score)
  const shareText = `Real or Fake? #${puzzleNum}\n${emojiGrid}\n${score}/5 — ${label}\n${date}`

  async function handleShare() {
    if (navigator.share) {
      try {
        await navigator.share({ text: shareText })
        return
      } catch {
      }
    }
    await navigator.clipboard.writeText(shareText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Button
      variant="outline"
      onClick={handleShare}
      aria-label={copied ? "Copied to clipboard" : "Share your results"}
      className="min-w-[140px]"
    >
      {copied ? "Copied!" : "Share Results"}
    </Button>
  )
}
