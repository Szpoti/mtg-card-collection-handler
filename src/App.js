import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import OfflineCardService from "./services/OfflineCardService";
import LiveCardService from "./services/LiveCardService";
import DetailedCard from "./components/DetailedCard";
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import Registration from "./components/Registration";
import UserLoginService from "./services/UserLoginService";
import AdvancedSearch from "./components/AdvancedSearch";

const App = (props) => {
  const cardService = new LiveCardService();
  const authService = new UserLoginService();
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
        <Route
          key="card"
          path="/card/:name/:id"
          component={DetailedCard}
        ></Route>
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
      </Router>
    </div>
  );
};

export default App;
