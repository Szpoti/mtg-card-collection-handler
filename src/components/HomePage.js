import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import Loader from "./Loader";
import Login from "./Login";
import { Alert, Container, Col, Row, Button } from "react-bootstrap";
import LoadedCardsDisplayer from "./LoadedCardsDisplayer";
import Pagination from "./Pagination";
import Search from "./Search";
import Filter from "./Filter";
import { ColorProvider } from "./ColorProvider";

const HomePage = (props) => {
  const [user, setUser] = useState();
  const authService = props.authService;
  const cardService = props.cardService;
  const [loadedCards, setLoadedCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [colors, setColors] = useState([]);
  const [searchErrorMessage, setSearchErrorMessage] = useState("");

  useEffect(() => {
    cardService.getAll(loadCards);
  }, [cardService]);

  const loadCards = (cards) => {
    setLoadedCards(cards);
    setIsLoading(false);
  };

  const handleLogout = () => {
    authService.logOut().then((r) => setUser());
  };

  const handleSearchOutput = (message) => setSearchErrorMessage(message);

  return (
    <div>
      <Route
        exact
        path="/"
        render={(props) => (
          <React.Fragment>
            <ColorProvider>
              <Container>
                <Row>
                  <Col xs={12} lg={6}>
                    <Search
                      cardService={cardService}
                      setLoadedCards={setLoadedCards}
                      setIsLoading={setIsLoading}
                      colors={colors}
                      onChange={handleSearchOutput.bind(this)}
                    />
                    <div className="pt-4 text-center text-lg-left">
                      <ColorProvider>
                        <Filter setHomeColors={setColors} isDisabled={false} />
                      </ColorProvider>
                    </div>
                    {0 < searchErrorMessage.length && (
                      <Alert
                        key="searchBarError"
                        variant="danger"
                        className="text-center text-lg-left"
                      >
                        {searchErrorMessage}
                      </Alert>
                    )}
                  </Col>
                  <Col xs={12} className="d-lg-none">
                    <hr />
                  </Col>
                  {user === undefined ? (
                    <Col xs={12} lg={6}>
                      <Login authService={authService} setHomeUser={setUser} />
                      <p className="text-center text-lg-right">
                        Doesn't have an account yet?
                        <Link to={`/registration`} className="ml-1">
                          Click to register.
                        </Link>
                      </p>
                    </Col>
                  ) : (
                    <Col xs={12} lg={6} className="text-center text-lg-right">
                      <p>
                        Logged in as <strong>{user.username}</strong>
                      </p>
                      <Button variant="primary" onClick={handleLogout}>
                        Log out
                      </Button>
                    </Col>
                  )}
                </Row>
                <Loader isLoading={isLoading} />
                <Container>
                  <LoadedCardsDisplayer loadedCards={loadedCards} />
                </Container>
              </Container>
            </ColorProvider>
          </React.Fragment>
        )}
      />
    </div>
  );
};

export default HomePage;
