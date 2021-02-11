import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Button, Row, Modal, Col } from "react-bootstrap";

const NewDeckModal = (props) => {
  const [deckName, setDeckName] = useState("");
  const [format, setFormat] = useState(1);

  return (
    <Modal show={props.show}>
      <Modal.Header>
        <Modal.Title>Create a new deck</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Deck name</Form.Label>
            <Form.Control
              placeholder="Deck name"
              onChange={(e) => setDeckName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Deck format</Form.Label>
            <Form.Control
              as="select"
              value={format}
              onChange={(e) => {
                setFormat(e.target.value);
              }}
            >
              <option value={1}>Standard</option>
              <option value={2}>Commander</option>
            </Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleClose}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={async () => {
            const resp = await props.deckService.createDeck(
              deckName,
              localStorage.getItem("userId"),
              format
            );
            console.log(resp);
            props.handleClose();
          }}
        >
          Create Deck
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NewDeckModal;
