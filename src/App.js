import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import OfflineCardService from "./services/OfflineCardService";
import LiveCardService from "./services/LiveCardService";
import Header from "./components/Header";
import HomePage from "./components/HomePage";

const App = (props) => {
  const cardService = new LiveCardService();
  return (
    <div>
      <Router>
        <Header />
        <HomePage cardService={cardService} />
      </Router>
    </div>
  );
};

export default App;
