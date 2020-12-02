import React from "react";
import { Link } from "react-router-dom";
import { Col, Row } from "react-bootstrap";

const LoadedCardsDisplayer = (props) => {
  const saveData = () => {
    if (props.dataToSave !== undefined) {
      console.log("Saving cards");
      const data = props.dataToSave;
      data.saveAllCards(data.allCards);
      data.saveCardsToDisplay(data.cardsToDisplay);
      data.saveCurrentPage(data.currentPage);
    }
  };
  if (props.loadedCards === null) {
    return <div>Sorry, no cards found...please try again</div>;
  } else if (props.loadedCards !== undefined && props.loadedCards.length >= 0) {
    return (
      <Row className="d-flex flex-wrap">
        {props.loadedCards.map((card) => {
          let cardImage = card.imageUri;
          if (card.layout === "transform" || card.layout === "modal_dfc") {
            cardImage = card.cardImages[0];
            console.log(cardImage);
          }

          return (
            <Col key={card.id} xs={4} md={3} className="p-3">
              <Link to={`/card/${card.id}`} onClick={saveData}>
                <img
                  src={
                    cardImage === null
                      ? "/img/missing-card-image.jpg"
                      : cardImage
                  }
                  className="img-fluid zoom"
                  alt="Card"
                ></img>
              </Link>
              <h5 style={{ textAlign: "center" }}>{card.name}</h5>
            </Col>
          );
        })}
      </Row>
    );
  }
};

export default LoadedCardsDisplayer;
