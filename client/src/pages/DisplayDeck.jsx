import React, {useEffect, useState} from "react"
import { useParams } from "react-router-dom"

export default function DisplayDeck(){
    const { deckId } = useParams()
    console.log(deckId)
    const set = "SOR"
    const number = "100"
    const [cards, setCards] = useState({LeaderCards: [], BaseCards: [], DeckCards: []})
    useEffect(() => {
            async function fetchData() {
                try {
                    // const response = await fetch(`http://localhost:3000/api/card?number=${number}&set=${set}`); // Pauses execution until fetch completes
                    const response = await fetch(`http://localhost:3000/api/deck/${deckId}`);
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    const data = await response.json(); // Pauses execution until JSON parsing completes
                    console.log(data);
                    //setCards(data)
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            }
            fetchData();
        }, [])
    // TODO: display the deck that was returned
}