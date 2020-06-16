import React from "react";
import { Col, Row } from "react-bootstrap";

const LoadedCardsDisplayer = (props) => {
  console.log("'loadedCardsDisplayer' invoked!");
  console.log("'loadedCardsDisplayer' props: ", props.loadedCards);
  if (!props.loadedCards.includes(undefined)) {
    return (
      <Row className="d-flex flex-wrap">
        {props.loadedCards.map((card) => (
          <Col key={card.id} xs={4} md={3} className="p-3">
            <img
              src={card.image_uris.normal}
              className="img-fluid zoom"
              alt="Card"
            ></img>
            <p style={{ textAlign: "center" }}>{card.name}</p>
          </Col>
        ))}
      </Row>
    );
  } else {
    return <div>No cards found</div>;
  }
};

export default LoadedCardsDisplayer;
