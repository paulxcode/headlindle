export default function Footer({ onNavigate }) {
  return (
    <footer className="w-full max-w-lg mx-auto px-4 py-6 mt-auto">
      <div className="flex justify-center gap-4 text-xs text-slate-400 dark:text-slate-500">
        <button onClick={() => onNavigate("about")} className="hover:text-slate-600 dark:hover:text-slate-300 transition-colors underline-offset-2 hover:underline">
          About
        </button>
        <button onClick={() => onNavigate("terms")} className="hover:text-slate-600 dark:hover:text-slate-300 transition-colors underline-offset-2 hover:underline">
          Terms
        </button>
        <button onClick={() => onNavigate("privacy")} className="hover:text-slate-600 dark:hover:text-slate-300 transition-colors underline-offset-2 hover:underline">
          Privacy
        </button>
        <button onClick={() => onNavigate("contact")} className="hover:text-slate-600 dark:hover:text-slate-300 transition-colors underline-offset-2 hover:underline">
          Contact
        </button>
      </div>
      <p className="text-center text-xs text-slate-400 dark:text-slate-500 mt-2">
        &copy; 2026 Headlindle. All rights reserved.
      </p>
    </footer>
  )
}
