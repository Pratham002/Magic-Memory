import React from "react"
import "./Card.css"
import { motion } from "framer-motion"

const Cards = ({ card, onChoice, flipped, disable }) => {
  const handleClick = () => {
    if (!disable) {
      onChoice(card)
    }
  }

  return (
    <motion.div
      className="card"
      whileHover={{
        scale: 0.95,
      }}
    >
      <div className={flipped ? "flipped" : ""}>
        <img className="front" src={card.src} alt="front img" />
        <img
          className="back"
          onClick={handleClick}
          src="/img/cover.jpg"
          alt="back img"
        />
      </div>
    </motion.div>
  )
}

export default Cards
