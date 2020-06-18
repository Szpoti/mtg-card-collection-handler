import React from "react";
import { Link } from "react-router-dom";
import { Col, Row } from "react-bootstrap";

const LoadedCardsDisplayer = (props) => {
  if (props.loadedCards !== undefined || props.loadedCards.length <= 0) {
    return (
      <Row className="d-flex flex-wrap">
        {props.loadedCards.map((card) => (
          <Col key={card.id} xs={4} md={3} className="p-3">
            <Link to={`/${card.name}/${card.id}`}>
              <img
                src={
                  card.image_uris === undefined ? "" : card.image_uris.normal
                }
                className="img-fluid zoom"
                alt="Card"
              ></img>
              <p style={{ textAlign: "center" }}>{card.name}</p>
            </Link>
          </Col>
        ))}
      </Row>
    );
  } else {
    return <div>No cards found</div>;
  }
};

export default LoadedCardsDisplayer;
