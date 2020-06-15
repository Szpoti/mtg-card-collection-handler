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

const App = (props) => {
  const [loadedCards, setLoadedCards] = useState([]);

  useEffect(() => {
    console.log("In use effect");
    const cardService = new OfflineCardService();
    cardService.getAll().then((cards) => {
      setLoadedCards(cards);
      console.log(cards);
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
      <Container>
        <Row className="d-flex flex-wrap">
          {loadedCards.map((card) => (
            <Col key={card.multiverseid} xs={4} md={3} className="p-3">
              <p>
                {card.name}, multiverseid: {card.multiverseid}
              </p>
              <img src={card.imageUrl} className="img-fluid" alt="Card"></img>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default App;
