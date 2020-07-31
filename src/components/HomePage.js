import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import Loader from "./Loader";
import Login from "./Login";
import { Container, Col, Row, Button } from "react-bootstrap";
import LoadedCardsDisplayer from "./LoadedCardsDisplayer";
import Pagination from "./Pagination";
import Search from "./Search";
import Filter from "./Filter";
import { ColorProvider } from "./ColorProvider";
import DetailedCard from "./DetailedCard";

const HomePage = (props) => {
  const [user, setUser] = useState();
  const authService = props.authService;
  const cardService = props.cardService;
  const [loadedCards, setLoadedCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [colors, setColors] = useState([]);

  useEffect(() => {
    cardService.getAll(loadCards);
    new IntersectionObserver(function (e, o) {
      if (e[0].intersectionRatio > 0) {
        document.documentElement.removeAttribute("class");
      } else {
        document.documentElement.setAttribute("class", "stuck");
      }
    }).observe(document.querySelector(".trigger"));
  }, [cardService]);

  const loadCards = (cards) => {
    setLoadedCards(cards);
    setIsLoading(false);
  };

  const handleLogout = () => {
    authService.logOut()
    .then(r => setUser());
  };

  const LoginBar = (props) => {
    let block;
    if (user === undefined) {
      block = (
        <div>
          <Login authService={authService} setHomeUser={setUser} />
          <Row>
            <Col>
              <p className="text-md-center text-lg-right">
                Doesn't have an account yet?
                <Link to={`/registration`} className="ml-1">
                  Click to register.
                </Link>
              </p>
            </Col>
          </Row>
        </div>
      );
    } else {
      block = (
        <div>
          <Row>
            <Col>
              <p style={{ float: "right" }}>
                Logged in as <strong>{user.username}</strong>
              </p>
            </Col>
            <Col>
              <Button
                variant="primary"
                className="mb-2 mr-sm-2"
                onClick={handleLogout}
              >
                Log out
              </Button>
            </Col>
          </Row>
        </div>
      );
    }
    return block;
  };

  return (
    <div>
      <Route
        exact
        path="/"
        render={(props) => (
          <React.Fragment>
            <ColorProvider>
              <Container>
                <Container className="p-3">
                  <LoginBar />
                  <Row className="pt-3">
                    <Col xs={12} md={6} className="order-1 order-md-0">
                      <Pagination />
                    </Col>
                    <Col
                      xs={12}
                      md={6}
                      className="order-0 order-md-1 py-3 py-md-0"
                    >
                      <Search
                        cardService={cardService}
                        setLoadedCards={setLoadedCards}
                        setIsLoading={setIsLoading}
                        colors={colors}
                      />
                      <ColorProvider>
                        <Filter setHomeColors={setColors} />
                      </ColorProvider>
                      <p id="searchBarErrorMsg"></p>
                    </Col>
                  </Row>
                </Container>
                <Loader isLoading={isLoading} />
                <Container>
                  <LoadedCardsDisplayer loadedCards={loadedCards} />
                </Container>
                <Container className="p-3">
                  <Row>
                    <Col>
                      <Pagination />
                    </Col>
                  </Row>
                </Container>
              </Container>
            </ColorProvider>
          </React.Fragment>
        )}
      />

      {loadedCards.map((card) => (
        <Route
          key={card.id}
          path={`/${card.name}/${card.id}`}
          render={(props) => (
            <React.Fragment>
              <DetailedCard card={card}></DetailedCard>
            </React.Fragment>
          )}
        ></Route>
      ))}
    </div>
  );
};

export default HomePage;
