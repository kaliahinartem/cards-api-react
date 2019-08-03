import React, { Component } from 'react';
import './Card.css';

class Card extends Component {
    constructor(props) {
        super(props);
        let angle = Math.floor(Math.random() * 90 - 45);
        let xPos = Math.floor(Math.random() * 40 - 20);
        let yPos = Math.floor(Math.random() * 40 - 20);
        let transform = `translate(${xPos}px, ${yPos}px) rotate(${angle}deg)`;
        this._transform = {
            transform: transform
        }
    }
    render() {
        return (
            <img
                className="Card"
                src={this.props.image}
                alt={this.props.name}
                style={this._transform}
            />
        )
    }
}

export default Card;