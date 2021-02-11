import React from "react";
import { Form } from "react-bootstrap";
import { Button, Row, Modal, Col } from "react-bootstrap";

const NewDeckModal = (props) => {
  return (
    <Modal show={props.show}>
      <Modal.Header>
        <Modal.Title>Create a new deck</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Deck name</Form.Label>
            <Form.Control placeholder="Deck name"></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Deck format</Form.Label>
            <Form.Control
              as="select"
              value={props.format}
              onChange={(e) => {
                props.setFormat(e.target.value);
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
        <Button variant="primary" onClick={props.handleClose}>
          Create Deck
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NewDeckModal;
