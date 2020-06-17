import React from "react";
import "./App.css";
import OfflineCardService from "./services/OfflineCardService";
import LiveCardService from "./services/LiveCardService";
import Header from "./components/Header";
import HomePage from "./components/HomePage";

const App = (props) => {
  const cardService = new LiveCardService();
  return (
    <div>
      <Header />
      <HomePage cardService={cardService} />
    </div>
  );
};

export default App;
