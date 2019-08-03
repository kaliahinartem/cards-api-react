import React, { Component } from 'react';
import axios from 'axios';
import Card from './Card';
import './Deck.css'


const API_BASE_URL = "https://deckofcardsapi.com/api/deck";

class Deck extends Component {
    constructor(props) {
        super(props);
        this.state = {
            deck: null,
            cards: []
        };
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        axios.get(`${API_BASE_URL}/new/shuffle/?deck_count=1`).then(response => {
            this.setState({deck: response.data});
        });
    }

    async handleClick() {
        let deckId = this.state.deck.deck_id;
        
        try {
            let cardUrl = `${API_BASE_URL}/${deckId}/draw/?count=1`;
            let cardRequest = await axios.get(cardUrl);
            if (!cardRequest.data.success) {
                throw new Error("No cards in deck left");
            }
            let card = cardRequest.data.cards[0];
            this.setState(st => ({
                cards: [
                    ...st.cards,
                    {
                        id: card.code,
                        image: card.image,
                        name: `${card.value} of ${card.suit}`
                    }
                ]
            }));
        } catch (e) {
          alert(e);
        }
    }

    render() {
        let cards = this.state.cards.map(card => (
            <Card
                key={card.id}
                image={card.image}
                name={card.name}
            />
        ));
        return (
            <div className="Deck">
                <h1 className="Deck-title">Card Dealer</h1>
                <h2 className="Deck-title subtitle">A little demo made with React!</h2>
                <button onClick={this.handleClick} className="Deck-btn">
                    Get New Card
                </button>
                <div className="Deck-cards">
                    {cards}
                </div>
            </div>
        )
    }

}

export default Deck;