import {useState, useEffect} from "react";
import './App.css'
import Cards from "./components/Cards";

const cardsImg = [
  {"src" : "/img/helmet-1.png", matched : false}, 
  {"src" : "/img/potion-1.png", matched : false},
  {"src" : "/img/ring-1.png", matched : false}, 
  {"src" : "/img/scroll-1.png", matched : false},
  {"src" : "/img/shield-1.png", matched : false},
  {"src" : "/img/sword-1.png", matched : false}
]

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);

  // 2 choices
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);

  // for disabling the card (for a sec) when user has selected two cards
  const [disable, setDisable] = useState(false);

  // Shuffling of the cards whenever we press "New Game" button.
  function shuffleCards() {
    // duplicating each card once, randomizing the order of cards, applying a random id to each card.
    const shuffledCards = [...cardsImg, ...cardsImg]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random()}));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  }

  useEffect(() => {
    shuffleCards();
  }, []);

  // Making a choice 
  function makingChoice(card) {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  }

  useEffect(() => {
    if(choiceOne && choiceTwo) {
      setDisable(true);
      if(choiceOne.src === choiceTwo.src) {
        setCards(prevState => {
          return prevState.map(card => {
            // Basically we're assigning matched == true when the cards matches
            // So, that card won't flip back again..
            if(card.src === choiceOne.src) {
              return {...card, matched: true};
            }
            else return card;
          })
        });
        resetValues();
      }
      else {
        // when the cards do not match there'll be delay of 1s.
        setTimeout(() => resetValues(), 1000);
      }
    }
  }, [choiceOne, choiceTwo])

  // comparingChoice();

  // function comparingChoice() {
  //   // If both have been selected !
  //   if(choiceOne && choiceTwo) {
  //     if(choiceOne.src === choiceTwo.src) {
  //     }
  //     else {
  //     }
  //     resetValues();
  //   }
  // }

  function resetValues() {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(prev => prev + 1);
    setDisable(false);
  }

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
        {
          cards.map(card => (
            <Cards 
              key={card.id} 
              card={card} 
              onChoice={makingChoice}
              // 3 Cases : when user selects 1st card, 2nd card, or previously if the cards were matched
              flipped={card === choiceOne || card === choiceTwo || card.matched}
              disable={disable}
            />
          ))
        }
      </div>

        <p>Turns : {turns}</p>

    </div>
  );
}

export default App