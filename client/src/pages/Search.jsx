import React, {useEffect, useState} from "react"
import { useSearchParams } from "react-router-dom"
import "./displayStyles.css"

export default function Search() {
    const [searchParams, setSearchParams] = useSearchParams()
    const q = searchParams.get("q") || ""
    
    const [cards, setCards] = useState({LeaderCards: [], BaseCards: [], DeckCards: []})

    const style = {"margin": "0.5%"}
    const center = {"textAlign": "center"}

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`http://localhost:3000/api/search?q=${q}`); // Pauses execution until fetch completes
                if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json(); // Pauses execution until JSON parsing completes
                console.log(data);
                setCards(data)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, [])

    return (
        <>
            <h1 style={center}>Card Search Results</h1>
            <div style={center}>
                <form action="/search">
                    <input type="text" placeholder="Search.." defaultValue={q} name="q"/>
                </form>
            </div>
            { cards.LeaderCards.length > 0 && 
            <div>
                <h1 style={center}>Leader Cards</h1>
                <div className="deck-card-grid">
                    {cards.LeaderCards.map(card => 
                        <img src={card.FrontArt} alt={card.Name} style={{ width: "100%", margin: "0.5%" }} key={card._id}/>
                    )}
                </div>
            </div>
            }
            { cards.BaseCards.length > 0 &&
            <div>
            <h1 style={center}>Base Cards</h1>
                <div className="deck-card-grid">
                    {cards.BaseCards.map(card => 
                        <img src={card.FrontArt} alt={card.Name} style={{ width: "100%", margin: "0.5%" }} key={card._id}/>
                    )}
                </div>
            </div>
            }
            { cards.DeckCards.length > 0 &&
            <div>
            <h1 style={center}>Deck Cards</h1>
                <div className="deck-card-grid">
                    {cards.DeckCards.map(card => 
                        <img src={card.FrontArt} alt={card.Name} style={{ width: "100%", margin: "0.5%" }} key={card._id}/>
                    )}
                </div>
            </div>
            }
        </>
    )
}
