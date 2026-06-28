import { useState, useEffect, useMemo } from "react"
import ThemeProvider from "@/context/ThemeProvider"
import ThemeToggle from "@/components/ThemeToggle"
import AdsPlaceholder from "@/components/AdsPlaceholder"
import Splash from "@/components/Splash"
import Game from "@/components/Game"
import Results from "@/components/Results"
import Calendar from "@/components/Calendar"
import Stats from "@/components/Stats"
import Footer from "@/components/Footer"
import InfoPage from "@/components/InfoPage"
import { getDailyHeadlines, getDailyHeadlinesForDate, loadTodayResult, loadResultForDate, hasCompletedToday, getTodayString, saveResult } from "@/utils/daily"
import { headlines as allHeadlines } from "@/data/headlines"

const SCREENS = { SPLASH: "splash", GAME: "game", RESULTS: "results", CALENDAR: "calendar", STATS: "stats", INFO: "info" }

export default function App() {
  const [screen, setScreen] = useState(SCREENS.SPLASH)
  const [resultData, setResultData] = useState(null)
  const [dateOverride, setDateOverride] = useState(null)
  const [infoPage, setInfoPage] = useState("about")

  const dailyHeadlines = useMemo(() => {
    if (dateOverride) return getDailyHeadlinesForDate(dateOverride, allHeadlines)
    return getDailyHeadlines(allHeadlines)
  }, [dateOverride])

  const todayStr = getTodayString()

  useEffect(() => {
    if (hasCompletedToday()) {
      const saved = loadTodayResult()
      if (saved) setResultData(saved.answers)
    }
  }, [])

  function handlePlay() {
    setDateOverride(null)
    setScreen(SCREENS.GAME)
  }

  function handleComplete(answers) {
    setResultData(answers)
    saveResult(answers)
    setScreen(SCREENS.RESULTS)
  }

  function handleViewResults() {
    setScreen(SCREENS.RESULTS)
  }

  function handleViewCalendar() {
    setScreen(SCREENS.CALENDAR)
  }

  function handleViewStats() {
    setScreen(SCREENS.STATS)
  }

  function handleInfoPage(page) {
    setInfoPage(page)
    setScreen(SCREENS.INFO)
  }

  function handleRetryArchive() {
    setResultData(null)
    setScreen(SCREENS.GAME)
  }

  function handleSelectDate(dateStr) {
    setDateOverride(dateStr)
    const saved = loadResultForDate(dateStr)
    if (saved) {
      setResultData(saved.answers)
      setScreen(SCREENS.RESULTS)
    } else {
      setScreen(SCREENS.GAME)
    }
  }

  function handlePlayAgain() {
    if (dateOverride) {
      setScreen(SCREENS.CALENDAR)
    } else {
      setDateOverride(null)
      setResultData(null)
      setScreen(SCREENS.SPLASH)
    }
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col items-center transition-colors relative">
        <AdsPlaceholder />
        <ThemeToggle />
        <main className="w-full max-w-lg">
          {screen === SCREENS.SPLASH && (
            <Splash
              key="splash"
              onPlay={handlePlay}
              onViewResults={handleViewResults}
              onViewCalendar={handleViewCalendar}
              onViewStats={handleViewStats}
              hasCompleted={hasCompletedToday()}
            />
          )}

          {screen === SCREENS.GAME && (
            <Game key="game" headlines={dailyHeadlines} onComplete={handleComplete} />
          )}

          {screen === SCREENS.RESULTS && resultData && (
            <Results
              key="results"
              answers={resultData}
              puzzleDate={dateOverride}
              onPlayAgain={handlePlayAgain}
              isArchive={!!dateOverride && dateOverride !== todayStr}
              onBackToArchive={handleViewCalendar}
              onRetry={handleRetryArchive}
            />
          )}

          {screen === SCREENS.CALENDAR && (
            <Calendar
              key="calendar"
              onSelectDate={handleSelectDate}
              onBack={() => setScreen(SCREENS.SPLASH)}
            />
          )}

          {screen === SCREENS.STATS && (
            <Stats key="stats" onBack={() => setScreen(SCREENS.SPLASH)} />
          )}

          {screen === SCREENS.INFO && (
            <InfoPage key="info" page={infoPage} onBack={() => setScreen(SCREENS.SPLASH)} />
          )}
        </main>

        {screen !== SCREENS.GAME && screen !== SCREENS.RESULTS && (
          <Footer onNavigate={handleInfoPage} />
        )}
      </div>
    </ThemeProvider>
  )
}
