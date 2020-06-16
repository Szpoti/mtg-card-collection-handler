import React, { useState, useEffect } from "react";
import styled from "styled-components";
import "./App.css";
import OfflineCardService from "./services/OfflineCardService";
import LiveCardService from "./services/LiveCardService";
import Loader from "./components/Loader";
import {
  Container,
  Col,
  Button,
  Form,
  FormControl,
  Nav,
  Navbar,
  NavDropdown,
  Row,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import LoadedCardsDisplayer from "./components/LoadedCardsDisplayer";
const cardService = new LiveCardService();

const App = (props) => {
  const [loadedCards, setLoadedCards] = useState([]);
  let [cardTitle] = useState(String.empty);
  const [isLoading, setIsLoading] = useState(true);

  const setCardTitle = (e) => {
    cardTitle = e.target.value;
  };

  const searchForCards = () => {
    console.log("Searcing...setting loaded cards to []...");
    setLoadedCards([]);
    console.log("New loaded cards: ", loadedCards);
    setIsLoading(true);
    const title = cardTitle;
    cardService.search(title, loadCards);
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
  }, []);

  const loadCards = (cards) => {
    console.log("'loadCards': Setting loaded cards: ", cards);
    setLoadedCards(cards);
    console.log("'loadCards': Checking value of loadedCards: ", loadedCards);
    setIsLoading(false);
    console.log("'loadCards': Cards set!\n\n");
  };

  return (
    <div>
      <span className="position-absolute trigger"></span>
      <Navbar expand="lg" className="sticky-top">
        <Container>
          <Navbar.Brand href="/" className="mx-auto">
            Magic: The Gathering
          </Navbar.Brand>
        </Container>
      </Navbar>
      <Container className="p-3">
        <Row className="pt-3">
          <Col xs={12} md={6} className="order-1 order-md-0">
            <nav className="d-flex justify-content-center">
              <ul className="pagination">
                <li className="page-item disabled">
                  <a className="page-link" href="/" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                  </a>
                </li>
                <li className="page-item active">
                  <a className="page-link" href="/">
                    1
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="/">
                    2
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="/">
                    3
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="/" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                  </a>
                </li>
              </ul>
            </nav>
          </Col>
          <Col xs={12} md={6} className="order-0 order-md-1 py-3 py-md-0">
            <div className="input-group input-focus justify-content-center justify-content-md-end">
              <input
                type="search"
                placeholder="Search by card name ..."
                className="form-control border-right-0 search-input"
                value={cardTitle}
                onChange={setCardTitle}
              />
              <div
                className="input-group-prepend"
                onClick={searchForCards.bind()}
              >
                <span className="input-group-text bg-white">
                  <FontAwesomeIcon icon={faSearch} />
                </span>
              </div>
            </div>
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
            <nav className="d-flex justify-content-center">
              <ul className="pagination">
                <li className="page-item disabled">
                  <a className="page-link" href="/" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                  </a>
                </li>
                <li className="page-item active">
                  <a className="page-link" href="/">
                    1
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="/">
                    2
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="/">
                    3
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="/" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                  </a>
                </li>
              </ul>
            </nav>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default App;
