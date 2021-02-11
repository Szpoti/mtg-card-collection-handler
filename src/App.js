import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import LiveCardService from "./services/LiveCardService";
import DetailedCard from "./components/DetailedCard";
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import Registration from "./components/Registration";
import UserLoginService from "./services/UserLoginService";
import AdvancedSearch from "./components/AdvancedSearch";
import DecksPage from "./components/DecksPage";
import DeckService from "./services/DeckService";

const App = (props) => {
  const cardService = new LiveCardService();
  const authService = new UserLoginService();
  const deckService = new DeckService();
  return (
    <div>
      <Router>
        <Header />
        <Route
          exact
          key="home"
          path="/"
          render={() => (
            <HomePage cardService={cardService} authService={authService} />
          )}
        ></Route>
        <Route key="card" path="/card/:id" component={DetailedCard}></Route>
        <Route
          key="registration"
          path="/registration"
          render={() => <Registration authService={authService} />}
        ></Route>
        <Route
          key="search"
          path="/search/:page?"
          render={(props) => (
            <AdvancedSearch cardService={cardService} match={props.match} />
          )}
        ></Route>
        <Route
          key="decks"
          path="/decks"
          render={(props) => <DecksPage deckService={deckService}></DecksPage>}
        ></Route>
      </Router>
    </div>
  );
};

export default App;
