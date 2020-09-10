import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import CardPage from "./CardPage";

const DetailedCard = (props) => {
  return (
    <div>
      <Container className="mt-3">
        <Link to="/">
          <h3>
            <img
              src="https://c2.scryfall.com/file/scryfall-symbols/card-symbols/Q.svg"
              alt="untap"
              style={{ width: "2%", height: "auto" }}
            ></img>
            Go back
          </h3>
        </Link>
      </Container>
      <CardPage card={props.card} match={props.match} />
    </div>
  );
};

export default DetailedCard;
