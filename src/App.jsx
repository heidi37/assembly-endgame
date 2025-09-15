import { useState } from "react"
import "./App.css"
import { languages } from "./languages"
import { clsx } from "clsx"
import { getFarewellText } from "./utils"

function App() {
  //State values
  const [currentWord, setCurrentWord] = useState("react")
  const [guessedLetters, setGuessedLetters] = useState([])
  //Derived values
  const wrongGuessCount = guessedLetters.filter(letter => !currentWord.includes(letter)).length
  const gameWon = guessedLetters.filter(letter => currentWord.includes(letter)).length === currentWord.length
  const gameLost = wrongGuessCount >= languages.length - 1
  const isGameOver = gameLost || gameWon
  const isWrong = !gameWon && !gameLost && wrongGuessCount > 0
  //Static values
  const alphabet = "abcdefghijklmnopqrstuvwxyz"

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

  

  const languageEls = languages.map((language, index) => (
    <span
      className={
        clsx({
          chip: true,
          lost: index < wrongGuessCount
        })
      }
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
      <section className={clsx({status: true, won: gameWon, lost: gameLost, 'wrong-message': isWrong})}>
        {gameWon && <h2>You win!</h2>}
        {gameWon && <p>Well done! 🎉</p>}
        {gameLost && <h2>Game over!</h2>}
        {gameLost && <p>You lose! Better start learning Assembly 😭</p>}
        {isWrong && <p>{getFarewellText(languages[wrongGuessCount - 1].name)}</p>}
      </section>
      <section className="chips">{languageEls}</section>
      <section className="word">{wordLetters}</section>
      <section className="keyboard">{keys}</section>
      {isGameOver && <button className="new-game">New Game</button>}
    </main>
  )
}

export default App
