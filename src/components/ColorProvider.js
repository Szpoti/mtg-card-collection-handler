import React, { useState, createContext } from "react";

export const ColorContext = createContext();

export const ColorProvider = (props) => {
  const [colors, setColors] = useState([]);
  return (
    <ColorContext.Provider value={[colors, setColors]}>
      {props.children}
    </ColorContext.Provider>
  );
};
