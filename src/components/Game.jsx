import { useState, useCallback, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import HeadlineCard from "@/components/HeadlineCard"
import ProgressDots from "@/components/ProgressDots"

export default function Game({ headlines, onComplete }) {
  const [current, setCurrent] = useState(0)
  const [results, setResults] = useState(Array(5).fill(null))
  const [guessed, setGuessed] = useState(false)
  const [guessCorrect, setGuessCorrect] = useState(null)
  const [answers, setAnswers] = useState([])
  const autoTimerRef = useRef(null)


  const headline = headlines[current]

  const handleGuess = useCallback(
    (guess) => {
      if (guessed) return
      const correct = guess === headline.isReal
      setGuessed(true)
      setGuessCorrect(correct)
      const newResults = [...results]
      newResults[current] = correct
      setResults(newResults)
      const newAnswers = [
        ...answers,
        { item: headline, correct, guessed: guess },
      ]
      setAnswers(newAnswers)

      autoTimerRef.current = setTimeout(() => {
        if (current < 4) {
          setCurrent((c) => c + 1)
          setGuessed(false)
          setGuessCorrect(null)
        } else {
          onComplete(newAnswers)
        }
      }, 1800)
    },
    [guessed, headline, results, current, answers, onComplete]
  )

  const guessedRef = useRef(false)
  guessedRef.current = guessed
  const handleGuessRef = useRef(() => {})
  const handleNextRef = useRef(() => {})

  useEffect(() => {
    function handleKeyDown(e) {
      if (guessedRef.current) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          handleNextRef.current()
        }
        return
      }
      if (e.key === "r" || e.key === "1") {
        handleGuessRef.current(true)
      } else if (e.key === "f" || e.key === "2") {
        handleGuessRef.current(false)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      if (autoTimerRef.current) clearTimeout(autoTimerRef.current)
    }
  }, [])

  function handleNext() {
    if (autoTimerRef.current) clearTimeout(autoTimerRef.current)
    if (current < 4) {
      setCurrent((c) => c + 1)
      setGuessed(false)
      setGuessCorrect(null)
    } else {
      onComplete(answers)
    }
  }

  handleGuessRef.current = handleGuess
  handleNextRef.current = handleNext

  return (
    <div className="flex flex-col items-center px-4 py-8 max-w-lg mx-auto min-h-[70vh] justify-center">
      <ProgressDots total={5} current={current} results={results} />

      <p className="text-sm text-slate-400 dark:text-slate-500 mt-4 mb-1">
        Headline {current + 1} of 5
      </p>
      <p className="text-xs text-slate-400 dark:text-slate-500 mb-3">
        {headline.difficulty === "easy" && "●"}
        {headline.difficulty === "medium" && "●●"}
        {headline.difficulty === "hard" && "●●●"}
        <span className="ml-1 capitalize">{headline.difficulty}</span>
      </p>

      <div className="w-full mb-6">
        <HeadlineCard
          headline={headline.headline}
          source={headline.source}
          url={headline.url}
          explanation={headline.explanation}
          difficulty={headline.difficulty}
          revealed={guessed}
          correct={guessCorrect}
          guessed={guessed}
        />
      </div>

      <div className="flex gap-4 w-full">
        <Button
          variant={guessed && guessCorrect === true ? "default" : "outline"}
          className={`flex-1 h-14 text-lg font-semibold transition-colors duration-300 ${
            guessed
              ? guessCorrect === true
                ? "bg-green-600 hover:bg-green-600 text-white border-green-600"
                : guessCorrect === false
                  ? "bg-red-600 hover:bg-red-600 text-white border-red-600"
                  : ""
              : ""
          }`}
          onClick={() => handleGuess(true)}
          disabled={guessed}
          aria-label="Guess this headline is real"
        >
          Real
        </Button>
        <Button
          variant={guessed && guessCorrect === false ? "default" : "outline"}
          className={`flex-1 h-14 text-lg font-semibold transition-colors duration-300 ${
            guessed
              ? guessCorrect === false
                ? "bg-green-600 hover:bg-green-600 text-white border-green-600"
                : guessCorrect === true
                  ? "bg-red-600 hover:bg-red-600 text-white border-red-600"
                  : ""
              : ""
          }`}
          onClick={() => handleGuess(false)}
          disabled={guessed}
          aria-label="Guess this headline is fake"
        >
          Fake
        </Button>
      </div>

      {guessed && (
        <div className="mt-6 animate-fadeIn">
          <Button
            variant="default"
            onClick={handleNext}
            aria-label={
              current < 4 ? "Go to next headline" : "See results"
            }
          >
            {current < 4 ? "Next headline →" : "See results →"}
          </Button>
        </div>
      )}
    </div>
  )
}
