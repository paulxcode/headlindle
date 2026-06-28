import { config } from "@/config"

export default function AdsPlaceholder() {
  if (!config.adsEnabled) return null

  const adClass =
    "hidden xl:flex fixed top-0 w-[160px] h-screen flex-col items-center justify-center bg-slate-100 dark:bg-slate-900 border-x border-slate-200 dark:border-slate-800 select-none"

  return (
    <>
      <aside className={`${adClass} left-0`} aria-hidden>
        <span className="text-xs uppercase tracking-widest text-slate-400 dark:text-slate-600">
          Ad
        </span>
        <span className="mt-1 text-[11px] text-slate-300 dark:text-slate-700">
          160 x 100%
        </span>
      </aside>
      <aside className={`${adClass} right-0`} aria-hidden>
        <span className="text-xs uppercase tracking-widest text-slate-400 dark:text-slate-600">
          Ad
        </span>
        <span className="mt-1 text-[11px] text-slate-300 dark:text-slate-700">
          160 x 100%
        </span>
      </aside>
    </>
  )
}
