import React, { useState, useEffect } from "react";
import Loader from "./Loader";
import { Container, Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import LoadedCardsDisplayer from "./LoadedCardsDisplayer";
import Pagination from "./Pagination";

const HomePage = (props) => {
  const cardService = props.cardService;
  const [loadedCards, setLoadedCards] = useState([]);
  let [cardTitle, setCardTitleState] = useState(String.empty);
  const [isLoading, setIsLoading] = useState(true);

  const setCardTitle = (e) => {
    setCardTitleState(e.target.value);
  };

  const searchForCards = async () => {
    if (cardTitle !== undefined && cardTitle.length > 2) {
      handleSearchBarProperties("off");
      setLoadedCards([]);
      setIsLoading(true);
      const title = cardTitle;
      const cards = await cardService.search(title);
      setLoadedCards(cards);
      setIsLoading(false);
    } else {
      handleSearchBarProperties("on");
    }
  };

  const handleSearchBarProperties = (turnTo) => {
    switch (turnTo) {
      case "on":
        document.getElementById("searchBar").style.borderColor = "red";
        document.getElementById("searchBarErrorMsg").innerHTML =
          "Please input at least 3 characters to search for";
        break;
      case "off":
        document.getElementById("searchBar").style.borderColor = "";
        document.getElementById("searchBarErrorMsg").innerHTML = "";
        break;
      default:
        console.log(
          "Invalid value for 'turnTo'. Should have been 'on' or 'off', but was ",
          turnTo
        );
        break;
    }
  };

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
    <Container>
      <Container className="p-3">
        <Row className="pt-3">
          <Col xs={12} md={6} className="order-1 order-md-0">
            <Pagination />
          </Col>
          <Col xs={12} md={6} className="order-0 order-md-1 py-3 py-md-0">
            <div className="input-group input-focus justify-content-center justify-content-md-end">
              <input
                id="searchBar"
                type="search"
                placeholder="Search by card name ..."
                className="form-control border-right-0 search-input"
                value={cardTitle}
                onChange={setCardTitle}
              />
              <div className="input-group-prepend" onClick={searchForCards}>
                <span className="input-group-text bg-white">
                  <FontAwesomeIcon icon={faSearch} />
                </span>
              </div>
            </div>
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
  );
};
export default HomePage;
