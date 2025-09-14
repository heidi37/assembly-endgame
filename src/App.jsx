import { useState } from "react"
import "./App.css"
import { languages } from "./languages"

function App() {
  const [currentWord, setCurrentWord] = useState('test')

  const alphabet = "abcdefghijklmnopqrstuvwxyz"

  const keys = alphabet.split("").map(key => (
    <button className="key-buttons" key={key}>{key.toUpperCase()}</button>
  ))

  const languageEls = languages.map((language) => (
    <span className="chip"
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
    <span className="word-letters" key={index}>{letter.toUpperCase()}</span>
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
