import React, { useState, useEffect } from "react";
import Loader from "./Loader";
import { Container, Col, Row } from "react-bootstrap";
import LoadedCardsDisplayer from "./LoadedCardsDisplayer";
import Pagination from "./Pagination";
import Search from "./Search";
import Filter from "./Filter";
import { ColorProvider } from "./ColorProvider";

const HomePage = (props) => {
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

  return (
    <ColorProvider>
      <Container>
        <Container className="p-3">
          <Row className="pt-3">
            <Col xs={12} md={6} className="order-1 order-md-0">
              <Pagination />
            </Col>
            <Col xs={12} md={6} className="order-0 order-md-1 py-3 py-md-0">
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
  );
};
export default HomePage;
