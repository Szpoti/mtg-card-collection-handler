import React from "react";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";

const NewDeckModal = (props) => {
  return (
    <Modal show={props.show}>
      <Modal.Header>
        <Modal.Title>Create a new deck</Modal.Title>
      </Modal.Header>

      <Modal.Body>Info here</Modal.Body>
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
