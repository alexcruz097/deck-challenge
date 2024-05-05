import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [deckID, setDeckID] = useState("");
  const [cards, setCards] = useState([]);
  const [cardRemaining, setCardRemaining] = useState(null);
  // get the id of the deck
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(
          "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
        );
        setDeckID(response.deck_id);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const drawDeck = async () => {
    try {
      const data = await axios.get(
        `https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=1
    `
      );
      // push  image to array
      setCards([...cards, data.data.cards[0].image]);

      // set card remaining
      setCardRemaining(data.data.remaining)
      console.log(cardRemaining)
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <button onClick={drawDeck}>Game a Card</button>
      <div className="cards-container">
        {
          cards.map((img)=>{
            return <img src={img}/>
          })
        }
      </div>
    </>
  );
}

export default App;
