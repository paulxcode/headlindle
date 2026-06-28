import { ExternalLink } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function HeadlineCard({
  headline,
  source,
  url,
  explanation,
  difficulty: _difficulty,
  revealed,
  correct,
  guessed,
}) {
  let borderClass = "border-slate-200 dark:border-slate-700"
  let animationClass = "animate-fadeUp"

  if (guessed && correct === true) {
    borderClass = "border-green-500 animate-correctPulse"
    animationClass = "animate-fadeUp"
  } else if (guessed && correct === false) {
    borderClass = "border-red-500 animate-shake"
    animationClass = "animate-fadeUp"
  }

  return (
    <div className={animationClass}>
      <Card
        className={`border-2 transition-colors duration-300 ${borderClass} dark:bg-gray-900`}
      >
        <CardContent className="p-6 pt-6">
          <h2 className="text-2xl text-center font-serif leading-snug mb-4 dark:text-slate-100">
            {headline}
          </h2>

          <div className="text-center text-sm text-slate-500 dark:text-slate-400">
            {revealed && url ? (
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-slate-700 dark:hover:text-slate-300 transition-colors inline-flex items-center gap-1"
              >
                — {source}
                <ExternalLink className="w-3 h-3 inline" />
              </a>
            ) : (
              <span
                aria-hidden={!revealed}
                className={
                  revealed
                    ? "transition-all duration-400 filter-none"
                    : "filter blur-sm select-none transition-all duration-400"
                }
              >
                {revealed ? "— " + source : "— Source hidden"}
              </span>
            )}
            {!revealed && (
              <span className="sr-only">
                Source revealed after you make your guess
              </span>
            )}
          </div>

          {revealed && explanation && (
            <p className="mt-3 text-sm text-slate-400 dark:text-slate-500 text-center animate-fadeIn">
              {explanation}
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
