export default function ProgressDots({ total, current, results }) {
  const dots = Array.from({ length: total }, (_, i) => {
    const result = results[i]
    let className =
      "w-3 h-3 rounded-full border-2 border-slate-300 dark:border-slate-600 transition-colors duration-300"
    if (result === true) className += " bg-green-500 border-green-500"
    else if (result === false) className += " bg-red-500 border-red-500"
    else if (i === current) className += " bg-slate-400 dark:bg-slate-500 border-slate-400 dark:border-slate-500"
    else className += " bg-white dark:bg-gray-800"

    return <span key={i} className={className} aria-label={`Headline ${i + 1}: ${result === true ? "correct" : result === false ? "wrong" : "unanswered"}`} />
  })

  return (
    <div className="flex items-center gap-2 justify-center" role="progressbar" aria-valuenow={results.filter(r => r !== null).length} aria-valuemin={0} aria-valuemax={total}>
      {dots}
    </div>
  )
}
