import { useState } from "react"
import "./App.css"
import { languages } from "./languages"
import { clsx } from "clsx"

function App() {
  //State values
  const [currentWord, setCurrentWord] = useState("react")
  const [guessedLetters, setGuessedLetters] = useState([])
  //Derived values
  const wrongGuessCount = guessedLetters.filter(letter => !currentWord.includes(letter)).length
  //Static values
  const alphabet = "abcdefghijklmnopqrstuvwxyz"

  console.log(wrongGuessCount)

  function addGuessedLetter(key) {
    setGuessedLetters((prev) => (prev.includes(key) ? prev : [...prev, key]))
  }

  const keys = alphabet.split("").map((key) => {
    const isRight = currentWord.includes(key) && guessedLetters.includes(key)
    const isWrong = !currentWord.includes(key) && guessedLetters.includes(key)
    return (
      <button
        className={clsx({
          "key-buttons": true,
          right: isRight,
          wrong: isWrong,
        })}
        key={key}
        onClick={() => addGuessedLetter(key)}
      >
        {key.toUpperCase()}
      </button>
    )
  })

  const languageEls = languages.map((language) => (
    <span
      className="chip"
      key={language.name}
      style={{
        backgroundColor: language.backgroundColor,
        color: language.color,
      }}
    >
      {language.name}
    </span>
  ))

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
      <section className="status won">
        <h2>You win!</h2>
        <p>Well done! 🎉</p>
      </section>
      <section className="chips">{languageEls}</section>
      <section className="word">{wordLetters}</section>
      <section className="keyboard">{keys}</section>
      <button className="new-game">New Game</button>
    </main>
  )
}

export default App
