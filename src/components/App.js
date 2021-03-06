
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import cardImg from '../logoblue.jpg';
import useLocalStorage from "../Hooks/useLocalStorage";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";


function App() {
  const [deckID, setDeckID] = useState('x60sy3r1iwl8');
  const [secondDeckID, setSecondDeckID] = useState('ss5r6b8iug2c');
  const [score, setScore] = useLocalStorage('score', 0);
  const [card, setCard] = useState(null);
  const [cardValue, setCardValue] = useState();
  const [secondCard, setSecondCard] = useState(null);
  const [secondCardValue, setSecondCardValue] = useState();
  const [isShown, setIsShown] = useState(false)
  const [showHistory, setShowHistory] = useLocalStorage('showhistory', false)
  const [message, setMessage] = useLocalStorage('message', null);
  const [round, setRound] = useLocalStorage('round', 0);
  const [history, setHistory] = useLocalStorage('history', [{}]);
  const [btnMsg, setBtnMsg] = useLocalStorage('btnmsg', 'Game History')

  // link to unique game Deck because the API has limits and it's necessary to keep getting new API Key ( called "deck_id")
  var shuffle = `https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=20`;
  var secondShuffle = `https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=20`;

  // first deck unique deck_id
  useEffect(() => {

    axios.get(shuffle)
    .then(res => {
      setDeckID(res.data.deck_id)
      // console.log(res.data.deck_id) // just Testing
    })
    .catch(error => {
    console.log("there was an error with fetching card data: " + error);
    })
}, []);

  // second deck unique deck_id
  useEffect(() => {

    axios.get(secondShuffle)
    .then(res => {
      setSecondDeckID(res.data.deck_id)
      // console.log(res.data.deck_id) // just Testing
    })
    .catch(error => {
    console.log("there was an error with fetching card data: " + error);
    })
}, []);

  // URL for 1st and 2nd deck of cards
  var cardUrl = `https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=1`
  var secondCardDeck = `https://deckofcardsapi.com/api/deck/${secondDeckID}/draw/?count=1`

  // console.log('cardUrl: ' + cardUrl); // just Testing
  // console.log('secondCardUrl: ' + secondCardDeck) // just Testing

  // fetch card data
      useEffect(() => {

          axios.get(cardUrl)
          .then(res => {
          setCard(res.data.cards[0]);
          setCardValue(res.data.cards[0].value[0])
          // console.log(res.data.cards[0]);

          })
          .catch(error => {
          console.log("there was an error with fetching card data: " + error);
          })
      }, []);

      // fetch card data
      useEffect(() => {

        axios.get(secondCardDeck)
        .then(res => {
        setSecondCard(res.data.cards[0]);
        setSecondCardValue(res.data.cards[0].value[0])
        // console.log(res.data.cards[0]);

        })
        .catch(error => {
        console.log("there was an error with fetching card data: " + error);
        })
    }, []);

    // show or close div missing card
    const toggle = () => 
    setIsShown(isShown => !isShown);

    // show or close history div
    const historyToggle = () => {
    setShowHistory(showHistory => !showHistory);
    if (btnMsg === 'Game History') {
      setBtnMsg('Close History')
    } else {
      setBtnMsg('Game History');
    }
    }

    // numerical values for cards.. if card is "King" -> it will show "K" and assign value of '13' to it
      const cardMap = {
          2: 2,
          3: 3,
          4: 4,
          5: 5,
          6: 6,
          7: 7,
          8: 8,
          9: 9,
          1: 10, //10 == "1" == 10 -> aplikacja pobiera pierwsza litere z nazwy karty czyli z 10 bedzie pobrana jedynka "1"
          'J': 11,
          'Q': 12,
          'K': 13,
          'A': 14,
      }

      // cardMap modified for history
      const historyMap = {
        2: 2,
        3: 3,
        4: 4,
        5: 5,
        6: 6,
        7: 7,
        8: 8,
        9: 9,
        1: 10, //10 == "1" == 10 -> aplikacja pobiera pierwsza litere z nazwy karty czyli z 10 bedzie pobrana jedynka "1"
        'J': 'J',
        'Q': 'Q',
        'K': 'K',
        'A': 'A',
    }
  
      // HIGHER logika gry - daj +0.1 jesli gracz zgadnal prawidlowo
    const handleHigher = (e) => {
      if (cardMap[cardValue] < cardMap[secondCardValue]) {
        setScore(score + 0.1);
        setMessage('You got it!')
      } else {
        setMessage('Try again :)')
      }
  }

  // funkcje ktore beda uzyte w przypadku nacisniecia guzika "higher"
    const higherFuncs = () => {
      toggle();
      handleHigher();
      setTimeout(() => window.location.reload(), 1000);
      // window.location.reload()
      setRound(round + 1);
      setHistory([...history, {
        left: cardValue,
        right: secondCardValue,
        choice: 'higher'
      }]);
    }

    // LOWER logika gry - daj +0.1 jesli gracz zgadnal prawidlowo
    const handleLower = (e) => {
      if (cardMap[cardValue] > cardMap[secondCardValue]) {
        setScore(score + 0.1);
        setMessage('You got it!')
      } else {
        setMessage('Try again :)')
        
      }
    }

     // funkcje ktore beda uzyte w przypadku nacisniecia guzika "lower"
    const lowerFuncs = () => {
      toggle();
      handleLower();
      setTimeout(() => window.location.reload(), 1000);
      // window.location.reload()
      setRound(round + 1);
      setHistory([...history, {
        left: cardValue,
        right: secondCardValue,
        choice: 'lower'
      }]);
    }

    // zresetuj wszystko gdy gracz nacisnie "restart game"
    const restartGame = () => {
      setScore(0);
      setRound(0);
      setMessage(null);
      setHistory([{left: null, right: null, choice: null}])
    }

  return (
    <>
    {/* jezeli jest runda 30 to wtedy konczy sie mozliwosc grania - mozna zaczac od poczatku albo sprawdzic historie */}
 {round === 30 ? 
 <div className='startAgain'>
 <p>Current Round: {round} / 30</p>
 <p> Your Score: <span className="score">{score.toFixed(1)} </span></p>
 <br></br>
 <p>Would you like to start again?</p>
 <Button variant="outline-danger" onClick={restartGame}>Yes, restart game</Button>
 <Button variant="outline-success" onClick={historyToggle}>{btnMsg}</Button>
 </div>
  :
 <>
      <div className="App">
     
     <h1> Will the next card be..?</h1>
     <p className='red'>{history.right}</p>
     <p className='red'>{history.right}</p>

       <div className="buttons"> {/* .buttons display flex */}
       
       <Button variant="danger" onClick={higherFuncs}>HIGHER</Button>
       <p> OR </p>
       <Button variant="danger" onClick={lowerFuncs}>LOWER</Button>
       </div>
       <p>Current Round: {round} / 30</p>
       <p> Your Score: <span className="score">{score.toFixed(1)} </span></p>
       <p className='bold'>{message}</p> 
       
   </div>

<div className="deck">
{card !== null  ? 

<div className="card"> 
<img src={card.image} alt="card image" />
</div>

: 'fetching cards...'
}

{isShown &&       
<div className="card"> 
<img src={secondCard.image} alt="card image" />
</div>}

{!isShown && 
<div className='card'>
    <img src={cardImg} alt="card image" height="347.5px" />
</div>
}

</div>
<div className="restart">
<Button variant="outline-danger" onClick={restartGame}>Restart Game</Button>
<Button variant="outline-success" onClick={historyToggle}>{btnMsg}</Button>
</div>
   </>

   }
<div className='history'>


{history.map((card, i) => {
  return(
    (showHistory && card.left ? (
    <div className='historyResult'>
      <p className='fontChange'>Round {i}</p>
      <p>Left card value: <span className='bold'>{historyMap[card.left]}</span> vs. Right card value: <span className='bold'>{historyMap[card.right]}</span></p>
      <p>You chose: <span className='bold red'>{card.choice}</span></p>
      {card.left < card.right ? <p className='underline'>You won! (+0.1)</p> : <p className='underline'>You lost! (+0.0)</p>}
    </div>
    ) : <div className='displayNone'></div>))
})}

</div>
</>
  );
}

export default App;
