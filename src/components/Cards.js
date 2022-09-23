import React from "react"
import "./Card.css"

const Cards = ({ card, onChoice, flipped, disable }) => {
  const handleClick = () => {
    if (!disable) {
      onChoice(card)
    }
  }

  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <img className="front" src={card.src} alt="front img" />
        <img
          className="back"
          onClick={handleClick}
          src="/img/cover.png"
          alt="back img"
        />
      </div>
    </div>
  )
}

export default Cards
