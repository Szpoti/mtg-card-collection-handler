import React, { useState, useEffect } from "react";
import styled from "styled-components";
import "./App.css";
import OfflineCardService from "./services/OfflineCardService";
import LiveCardService from "./services/LiveCardService";
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
const cardService = new LiveCardService();

const App = (props) => {
  const [loadedCards, setLoadedCards] = useState([]);
  let [cardTitle] = useState(String.empty);
  const toggleLoader = () => {
    const loader = document.getElementById("loader");
    if (loader.style.display === "none") {
      loader.style.display = "block";
    } else {
      loader.style.display = "none";
    }
  };

  const setCardTitle = (e) => {
    cardTitle = e.target.value;
  };

  const searchForCards = () => {
    setLoadedCards([]);
    toggleLoader();
    const title = cardTitle;
    cardService.search(title).then((cards) => {
      setLoadedCards(cards);
      console.log(cards);
      toggleLoader();
    });
  };

  useEffect(() => {
    console.log("In use effect");
    cardService.getAll().then((cards) => {
      setLoadedCards(cards);
      console.log(cards);
      toggleLoader();
    });

    new IntersectionObserver(function (e, o) {
      if (e[0].intersectionRatio > 0) {
        document.documentElement.removeAttribute("class");
      } else {
        document.documentElement.setAttribute("class", "stuck");
      }
    }).observe(document.querySelector(".trigger"));
  }, []);

  return (
    <div>
      <span className="position-absolute trigger"></span>
      <Navbar expand="lg" className="sticky-top">
        <Container>
          <Navbar.Brand href="#" className="mx-auto">
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
                  <a className="page-link" href="#" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                  </a>
                </li>
                <li className="page-item active">
                  <a className="page-link" href="#">
                    1
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    2
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    3
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#" aria-label="Next">
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
                  <FontAwesomeIcon
                    icon={faSearch}
                    onClick={searchForCards.bind()}
                  />
                </span>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <div id="loader"></div>
      <Container>
        <Row className="d-flex flex-wrap">
          {loadedCards.map((card) => (
            <Col key={card.multiverseid} xs={4} md={3} className="p-3">
              <img
                src={card.imageUrl}
                className="img-fluid zoom"
                alt="Card"
              ></img>
              <p style={{ textAlign: "center" }}>{card.name}</p>
            </Col>
          ))}
        </Row>
      </Container>
      <Container className="p-3">
        <Row>
          <Col>
            <nav className="d-flex justify-content-center">
              <ul className="pagination">
                <li className="page-item disabled">
                  <a className="page-link" href="#" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                  </a>
                </li>
                <li className="page-item active">
                  <a className="page-link" href="#">
                    1
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    2
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    3
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#" aria-label="Next">
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
