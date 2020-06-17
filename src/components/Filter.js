import React from "react";
import { noAuto } from "@fortawesome/fontawesome-svg-core";

const Filter = (props) => {
  const manaStyle = {
    width: "3%",
    height: "auto",
  };

  return (
    <div style={{ border: "black 1px solid" }}>
      <div>
        <h5>Colors</h5>
        <input
          type="checkbox"
          value="black"
          onClick={props.handleColorCheck.bind(this)}
        ></input>{" "}
        Black
        <img
          src="https://img.scryfall.com/symbology/B.svg"
          alt="Black mana"
          style={manaStyle}
        ></img>
        <br />
        <input
          type="checkbox"
          value="white"
          onClick={props.handleColorCheck.bind(this)}
        ></input>{" "}
        White
        <img
          src="https://img.scryfall.com/symbology/W.svg"
          alt="White mana"
          style={manaStyle}
        ></img>
        <br />
        <input
          type="checkbox"
          value="blue"
          onClick={props.handleColorCheck.bind(this)}
        ></input>{" "}
        Blue
        <img
          src="https://img.scryfall.com/symbology/U.svg"
          alt="Blue mana"
          style={manaStyle}
        ></img>
        <br />
        <input
          type="checkbox"
          value="red"
          onClick={props.handleColorCheck.bind(this)}
        ></input>{" "}
        Red
        <img
          src="https://img.scryfall.com/symbology/R.svg"
          alt="Red mana"
          style={manaStyle}
        ></img>
        <br />
        <input
          type="checkbox"
          value="green"
          onClick={props.handleColorCheck.bind(this)}
        ></input>{" "}
        Green
        <img
          src="https://img.scryfall.com/symbology/G.svg"
          alt="Green mana"
          style={manaStyle}
        ></img>
        <br />
      </div>
    </div>
  );
};
export default Filter;
