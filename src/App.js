import React, { useState, useEffect } from "react";
import styled from "styled-components";
import "./App.css";

const App = (props) => {
  const mtg = require("mtgsdk");

  const [loadedCards, setLoadedCards] = useState([]);

  useEffect(() => {
    console.log("In use effect");
    mtg.card
      .where({
        supertypes: "legendary",
        subtypes: "demon",
        types: "creature",
        colors: "black",
        page: 0,
      })
      .then((cards) => {
        return cards.filter((card) => card.multiverseid !== undefined);
      })
      .then((cards) => {
        setLoadedCards(cards);
        console.log(cards);
      });
  }, []);

  return (
    <div style={parentDiv}>
      {loadedCards.map((card) => (
        <div key={card.multiverseid} style={child}>
          <p>
            {card.name}, multiverseid: {card.multiverseid}
          </p>
          <img src={card.imageUrl} alt="Missing"></img>
        </div>
      ))}
    </div>
  );
};

const parentDiv = {
  display: "flex",
  flexWrap: "wrap",
};

const child = {
  fontSize: "150%",
  flex: "1 0 21%",
  margin: "5px",
};

export default App;
