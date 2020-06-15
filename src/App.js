import React, { useState, useEffect } from "react";
import styled from "styled-components";
import "./App.css";
import OfflineCardService from "./services/OfflineCardService";
import LiveCardService from "./services/LiveCardService";
import { Container, Col, Row } from "react-bootstrap";

const App = (props) => {
  const [loadedCards, setLoadedCards] = useState([]);

  useEffect(() => {
    console.log("In use effect");
    const cardService = new OfflineCardService();
    cardService.getAll().then((cards) => {
      setLoadedCards(cards);
      console.log(cards);
    });
  }, []);

  return (
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
  );
};

export default App;
