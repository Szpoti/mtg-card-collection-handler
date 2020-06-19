import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import LiveCardService from "../services/LiveCardService";
import CardPage from "./CardPage";

const DetailedCard = (props) => {
  const [prints, setPrints] = useState([]);
  const cardService = new LiveCardService();
  const [mainCard, setMainCard] = useState(null);

  const loadOtherPrints = async (prints_search_uri) => {
    const newPrints = await cardService.getOtherPrints(prints_search_uri);
    setPrints(newPrints);
  };

  useEffect(() => {
    setMainCard(props.card);
    loadOtherPrints(props.card.prints_search_uri);
  }, []);

  return (
    <div>
      <Container className="mt-3">
        <Link to="/">
          <h3>
            <img
              src="https://img.scryfall.com/symbology/Q.svg"
              alt="untap"
              style={{ width: "2%", height: "auto" }}
            ></img>
            Back to main page
          </h3>
        </Link>
      </Container>
      {prints.map((print) => (
        <Route
          path={`/${print.name}/${print.id}`}
          render={(props) => (
            <React.Fragment>
              <CardPage card={mainCard} prints={prints} />
            </React.Fragment>
          )}
        />
      ))}
    </div>
  );
};

export default DetailedCard;
