import React, { useState, useContext } from "react";
import { ColorContext } from "./ColorProvider";

const Filter = (props) => {
  const [colors, setColors] = useContext(ColorContext);

  const handleColorCheck = (e) => {
    if (e.target.checked) {
      setColors([...colors, e.target.value]);
      props.setHomeColors([...colors, e.target.value]);
    } else {
      setColors(colors.filter((color) => color !== e.target.value));
      props.setHomeColors(colors.filter((color) => color !== e.target.value));
    }
    console.log("Colors: ", colors);
  };

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
          value="B"
          onClick={handleColorCheck.bind(this)}
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
          value="W"
          onClick={handleColorCheck.bind(this)}
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
          value="U"
          onClick={handleColorCheck.bind(this)}
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
          value="R"
          onClick={handleColorCheck.bind(this)}
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
          value="G"
          onClick={handleColorCheck.bind(this)}
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
