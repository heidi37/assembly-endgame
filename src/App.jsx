import { useState } from "react"
import "./App.css"
import { languages } from "./languages"
import { clsx } from "clsx"
import { getFarewellText } from "./utils"
import {getRandomWord} from "./utils"

function App() {
  //State values
  const [currentWord, setCurrentWord] = useState(() => getRandomWord())
  const [guessedLetters, setGuessedLetters] = useState([])

  //Derived values
  const wrongGuessCount = guessedLetters.filter(
    (letter) => !currentWord.includes(letter)
  ).length
  const totalNumGuesses = languages.length - 1
  const numGuessesLeft = totalNumGuesses - wrongGuessCount
  const gameWon =
    guessedLetters.filter((letter) => currentWord.includes(letter)).length ===
    currentWord.length
  const gameLost = wrongGuessCount >= totalNumGuesses
  const isGameOver = gameLost || gameWon
  const lastGuessedLetter = guessedLetters[guessedLetters.length - 1]
  const currentGuessCorrect =
    guessedLetters.length > 0 ? currentWord.includes(lastGuessedLetter) : true

  //Static values
  const alphabet = "abcdefghijklmnopqrstuvwxyz"

  //Add letter to array held in state when guessed
  function addGuessedLetter(key) {
    setGuessedLetters((prev) => (prev.includes(key) ? prev : [...prev, key]))
  }

  //Check Letter and update keyboard
  const keys = alphabet.split("").map((key) => {
    const isKeyRight = currentWord.includes(key) && guessedLetters.includes(key)
    const isKeyWrong =
      !currentWord.includes(key) && guessedLetters.includes(key)
    return (
      <button
        className={clsx({
          "key-buttons": true,
          right: isKeyRight,
          wrong: isKeyWrong,
        })}
        key={key}
        disabled={isGameOver}
        aria-disabled={guessedLetters.includes(key)}
        aria-label={`Letter ${key}`}
        onClick={() => addGuessedLetter(key)}
      >
        {key.toUpperCase()}
      </button>
    )
  })

  //Keep track of chips/incorrect guesses
  const languageEls = languages.map((language, index) => (
    <span
      className={clsx({
        chip: true,
        lost: index < wrongGuessCount,
      })}
      key={language.name}
      style={{
        backgroundColor: language.backgroundColor,
        color: language.color,
      }}
    >
      {language.name}
    </span>
  ))

  //Show Correct Guesses in the word
  const wordLetters = currentWord.split("").map((letter, index) => (
    <span className="word-letters" key={index}>
      {guessedLetters.includes(letter) ? letter.toUpperCase() : ""}
    </span>
  ))
  return (
    <main>
      <header>
        <h1>Assembly: Endgame</h1>
        <p>
          Guess the word in under 8 attempts to keep the programming world safe
          from Assembly!
        </p>
      </header>
      <section
        aria-live="polite"
        role="status"
        className={clsx({
          status: true,
          won: gameWon,
          lost: gameLost,
          "wrong-message": !currentGuessCorrect,
        })}
      >
        {gameWon && <h2>You win!</h2>}
        {gameWon && <p>Well done! 🎉</p>}
        {gameLost && <h2>Game over!</h2>}
        {gameLost && <p>You lose! Better start learning Assembly 😭</p>}
        {!gameLost && !currentGuessCorrect && wrongGuessCount > 0 && (
          <p>{getFarewellText(languages[wrongGuessCount - 1].name)}</p>
        )}
      </section>
      <section className="chips">{languageEls}</section>
      <section className="word">{wordLetters}</section>
      {/* Combined visually-hidden aria-live region for status updates */}
      <section className="sr-only" aria-live="polite" role="status">
        <p>
          {currentWord.includes(lastGuessedLetter)
            ? `Correct! The letter ${lastGuessedLetter} is in the word.`
            : `Sorry, the letter ${lastGuessedLetter} is not in the word.`}
          You have {numGuessesLeft} attempts left.
        </p>
        <p>
          Current word:{" "}
          {currentWord
            .split("")
            .map((letter) =>
              guessedLetters.includes(letter) ? letter + "." : "blank."
            )
            .join(" ")}
        </p>
      </section>
      <section className="keyboard">{keys}</section>
      {isGameOver && <button className="new-game">New Game</button>}
    </main>
  )
}

export default App
