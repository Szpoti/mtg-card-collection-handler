import { Modal } from "bootstrap";
import React, { useEffect, useState } from "react";
import { Col, Row, Container, Button } from "react-bootstrap";
import NewDeckModal from "./NewDeckModal";

const DecksPage = (props) => {
  const [decks, setDecks] = useState({});
  const [show, setShow] = useState(false);

  useEffect(() => {});

  return (
    <Container className="ml-1">
      <Row>
        <div>
          <Col className="h4 text-center">Your Decks</Col>
          <Button onClick={() => setShow(true)}>New deck</Button>

          {/*{decks.forEach((deck) => {
          return <Col>{deck.name}</Col>;
        })}*/}
        </div>
      </Row>
      <NewDeckModal show={show} handleClose={() => setShow(false)} />
    </Container>
  );
};

export default DecksPage;
