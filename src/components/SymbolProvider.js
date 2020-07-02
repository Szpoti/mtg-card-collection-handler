import React, { useState, createContext } from "react";
import LiveCardService from "../services/LiveCardService";

export const SymbolContext = createContext();

export const SymbolProvider = (props) => {
  const cardService = new LiveCardService();
  const [symbol, setSymbol] = useState(cardService.getSymbols());
  return (
    <SymbolContext.Provider value={[symbol, setSymbol]}>
      {props.children}
    </SymbolContext.Provider>
  );
};
