import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import OfflineCardService from "./services/OfflineCardService";
import LiveCardService from "./services/LiveCardService";
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import Registration from "./components/Registration";
import UserLoginService from "./services/UserLoginService";

const App = (props) => {
  const [user, setUser] = useState();
  const cardService = new LiveCardService();
  const authService = new UserLoginService();
  return (
    <div>
      <Router>
        <Header />
        <Route
          key="home"
          path="/"
          render={() => (
            <HomePage
              user={user}
              setMainUser={setUser}
              cardService={cardService}
              authService={authService}
            />
          )}
        ></Route>
        <Route
          key="registration"
          path="/registration"
          render={() => (
            <Registration setMainUser={setUser} authService={authService} />
          )}
        ></Route>
      </Router>
    </div>
  );
};

export default App;
