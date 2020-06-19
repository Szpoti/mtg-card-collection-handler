import React, { useContext } from "react";
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
  };

  const cardColors = [
    { id: "B", name: "Black" },
    { id: "W", name: "White" },
    { id: "U", name: "Blue" },
    { id: "R", name: "Red" },
    { id: "G", name: "Green" },
  ];

  return (
    <div className="text-center text-md-right mt-3">
      {cardColors.map((cardColor) => {
        return (
          <span
            key={`${cardColor.id}-${cardColor.name}`}
            className="ml-1 align-middle text-nowrap"
          >
            <input
              type="checkbox"
              value={cardColor.id}
              onClick={handleColorCheck.bind(this)}
              id={"color-" + cardColor.name}
              className="mr-1"
            ></input>
            <label htmlFor={`color-${cardColor.name}`}>
              {cardColor.name}
              <img
                src={
                  "https://img.scryfall.com/symbology/" + cardColor.id + ".svg"
                }
                alt={cardColor.name + " mana"}
                className="mx-1 align-text-top"
                style={{ width: 22 }}
              ></img>
            </label>
          </span>
        );
      })}
    </div>
  );
};

export default Filter;
