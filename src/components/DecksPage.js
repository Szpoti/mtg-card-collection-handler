import { Modal } from "bootstrap";
import React, { useEffect, useState } from "react";
import { Col, Row, Container, Button } from "react-bootstrap";
import NewDeckModal from "./NewDeckModal";

const DecksPage = (props) => {
  const deckService = props.deckService;
  const [decks, setDecks] = useState({});
  const [show, setShow] = useState(false);
  const [response, setResponse] = useState();

  useEffect(() => {
    async function getDecksOf() {
      const decks = await deckService.getDecks(localStorage.getItem("userId"));
      console.log(decks);
    }
    getDecksOf();
  });

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
      <NewDeckModal
        deckService={deckService}
        show={show}
        handleClose={() => setShow(false)}
      />
    </Container>
  );
};

export default DecksPage;
