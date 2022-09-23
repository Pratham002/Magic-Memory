import React, { useState, useEffect } from "react"
import Cards from "./Cards"
import "./Game.css"

const cardsImg = [
  { src: "../img/helmet-1.png", matched: false },
  { src: "../img/potion-1.png", matched: false },
  { src: "../img/ring-1.png", matched: false },
  { src: "../img/scroll-1.png", matched: false },
  { src: "../img/shield-1.png", matched: false },
  { src: "../img/sword-1.png", matched: false },
]

const Game = () => {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disable, setDisable] = useState(false)

  const shuffleCards = () => {
    const shuffledCards = [...cardsImg, ...cardsImg]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))

    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffledCards)
    setTurns(0)
  }

  useEffect(() => {
    shuffleCards()
  }, [])

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisable(true)
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevState) => {
          return prevState.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true }
            } else return card
          })
        })
        resetValues()
      } else {
        setTimeout(() => resetValues(), 1000)
      }
    }
  }, [choiceOne, choiceTwo])

  const resetValues = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns((prev) => prev + 1)
    setDisable(false)
  }

  const makingChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  return (
    <div>
      <h1>Magic Match</h1>
      <button style={{ margin: "0 auto" }} onClick={shuffleCards}>
        New Game
      </button>
      <div className="card-grid">
        {cards.map((card) => (
          <Cards
            key={card.id}
            card={card}
            onChoice={makingChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disable={disable}
          />
        ))}
      </div>
      <p>Turns : {turns}</p>
    </div>
  )
}

export default Game
