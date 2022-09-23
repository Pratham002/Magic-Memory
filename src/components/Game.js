import React, { useState, useEffect } from "react"
import Cards from "./Cards"
import "./Game.css"
import { AnimatePresence, motion } from "framer-motion/dist/framer-motion"

const cardsImg = [
  { src: "../img/helmet-1.png", matched: false },
  { src: "../img/potion-1.png", matched: false },
  { src: "../img/ring-1.png", matched: false },
  { src: "../img/scroll-1.png", matched: false },
  { src: "../img/shield-1.png", matched: false },
  { src: "../img/sword-1.png", matched: false },
]

const containerVariants = {
  hidden: {
    x: "100vw",
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      delay: 0.5,
      duration: 0.7,
      when: "beforeChildren",
      staggerChildren: 0.5,
    },
  },
}

const childVariants = {
  hidden: {
    opacity: 0,
    y: "100vh",
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      // delay: 0.5,
      duration: 0.5,
    },
  },
}

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
    <>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <h1>Magic Match</h1>
        <button style={{ margin: "0 auto" }} onClick={shuffleCards}>
          New Game
        </button>
        <motion.div className="card-grid" variants={childVariants}>
          {cards.map((card) => (
            <Cards
              key={card.id}
              card={card}
              onChoice={makingChoice}
              flipped={card === choiceOne || card === choiceTwo || card.matched}
              disable={disable}
            />
          ))}
        </motion.div>
        <motion.p variants={childVariants}>Turns : {turns}</motion.p>
      </motion.div>
    </>
  )
}

export default Game
