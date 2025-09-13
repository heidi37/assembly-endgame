import { useState } from "react"

import "./App.css"

function App() {
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
    </main>
  )
}

export default App
