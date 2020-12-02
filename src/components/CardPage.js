import React, { useEffect, useState, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import LiveCardService from "../services/LiveCardService";
import Loader from "./Loader";
import Badge from "react-bootstrap/Badge";

const CardPage = (props) => {
  const cardService = new LiveCardService();
  const [isLoading, setIsLoading] = useState(true);
  const [prints, setPrints] = useState([]);
  const [card, setCard] = useState(null);
  const textDisplayer = useRef();
  const mainPageRef = useRef();
  let symbols = [];
  let legalities = [];
  let isCardLegalIn = [];

  async function fetchSymbols() {
    symbols = await cardService.getSymbols();
    if (textDisplayer.current !== null) {
      if (
        card.layout === "split" ||
        card.layout === "transform" ||
        card.layout === "modal_dfc"
      ) {
        console.log(card.cardFaces);
        textDisplayer.current.innerHTML = textDisplayForSpecialCards();
      } else if (card.layout === "normal") {
        textDisplayer.current.innerHTML = insertSvgs(card.text);
      }
      mainPageRef.current.style = mainPageShow;
      setIsLoading(false);
    }
  }

  const setImage = () => {
    if (card.layout === "transform" || card.layout === "modal_dfc") {
      return (
        <div className="scene">
          <div className="imageCard">
            <img
              id="cardFront"
              className="cardImage cardImageFront"
              src={card.cardImages[0]}
              alt={card.name}
            ></img>
            <img
              id="cardBack"
              className="cardImage cardImageBack"
              src={card.cardImages[1]}
              alt={card.name}
            ></img>
          </div>
        </div>
      );
    } else {
      return (
        <div class="imageCard">
          <img
            id="cardFront"
            className="cardImage cardImageFront"
            src={card.imageUri}
            alt={card.name}
          ></img>
        </div>
      );
    }
  };

  const loadOtherPrints = async (mainCard) => {
    const newPrints = await cardService.getOtherPrints(mainCard.oracleId);
    setPrints(newPrints);
  };

  const loadCardIfNotCached = async () => {
    if (props.card !== undefined) {
      if (props.card.imageUri === null) {
        props.card.imageUri = "/img/missing-card-image.jpg";
      }
      setCard(props.card);
    } else {
      const cardId = props.match.params.id;
      const apiCard = await cardService.getCardBy(cardId);
      console.log(apiCard);

      if (apiCard.imageUri === null) {
        apiCard.imageUri = "/img/missing-card-image.jpg";
      }
      setCard(apiCard);
    }
  };

  useEffect(() => {
    loadCardIfNotCached();
  }, []);

  useEffect(() => {
    if (card !== null) {
      loadOtherPrints(card);
      fetchSymbols();
    }
  }, [card]);

  const capitalize = (s) => {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  const textDisplayForSpecialCards = () => {
    const firstText = insertSvgs(card.cardFaces[0]);
    const secondText = insertSvgs(card.cardFaces[1]);
    return firstText + " // " + secondText;
  };

  const insertSvgs = (fullText) => {
    if (fullText !== undefined) {
      let newText = fullText;
      let tokens = [];

      symbols.forEach((symbol) => {
        if (newText.includes(symbol.sym)) {
          tokens.push(symbol);
        }
      });

      tokens.forEach((token) => {
        let url = token.uri;
        let alt = token.sym;
        let tag = `<img src=${url} alt=sym style="width: 6%;height: auto;"></img>`;
        while (newText.includes(alt)) {
          newText = newText.replace(alt, tag);
        }
      });
      return newText;
    } else {
      return "Text not found";
    }
  };

  const displayLegalities = () => {
    for (let key in card.legalities) {
      if (card.legalities.hasOwnProperty(key)) {
        console.log(key, card.legalities[key]);
      }
    }
  };

  const returnDetails = () => {
    console.log("card:" + card);
    for (let key in card.legalities) {
      if (card.legalities.hasOwnProperty(key)) {
        legalities.push(key);
        isCardLegalIn.push(card.legalities[key]);
      }
    }
    return (
      <Container>
        <Loader isLoading={isLoading}></Loader>
        <div id="mainPage" style={mainPage} ref={mainPageRef}>
          <div style={content}>
            {setImage()}
            <div style={detailsStyle}>
              <span>
                <strong>Name:</strong> {card.name}
              </span>
              <br />
              <span>
                <strong>Rarity:</strong> {capitalize(card.rarity)}
              </span>
              <br />
              <span>
                <strong>Expansion set:</strong> {card.setName} (
                {card.set.toUpperCase()})
              </span>
              <br />
              <span>
                <strong>Type:</strong> {card.type}
              </span>
              <br />
              <span>
                <strong>Price trend:</strong>
                {card.price}
              </span>
              <br />
              <div
                ref={textDisplayer}
                id="cardText"
                className="textStyle"
                style={textStyle}
              ></div>
            </div>
          </div>

          <Row>
            {legalities.map((l, i) => {
              if (isCardLegalIn[i] === "legal") {
                return (
                  <Col
                    style={{
                      border: "1px solid #0d5a00",
                      backgroundColor: "#acf6b0",
                    }}
                    xs={3}
                  >
                    <strong>{capitalize(l)}</strong> :{" "}
                    <Badge variant="success">
                      {capitalize(isCardLegalIn[i])}
                    </Badge>
                  </Col>
                );
              } else {
                return (
                  <Col
                    style={{
                      border: "1px solid #5a0000",
                      backgroundColor: "#f6acac",
                    }}
                    xs={3}
                  >
                    <strong>{capitalize(l)}</strong> :{" "}
                    <Badge variant="danger">
                      {capitalize(isCardLegalIn[i])}
                    </Badge>
                  </Col>
                );
              }
            })}
          </Row>

          <table style={tableStyle}>
            <thead>
              <tr>
                <th>Set name</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {prints.map((cardPrint) => (
                <tr>
                  <td>
                    <Link to={`/card/${cardPrint.id}`}>
                      {cardPrint.setName}
                    </Link>
                  </td>
                  <td>{cardPrint.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    );
  };

  const loadNewCard = () => {
    setCard(null);
    loadCardIfNotCached();
  };

  if (card === null) {
    console.log("Loading...");
    return (
      <div id="mainPage" style={mainPage}>
        <Container>
          <Loader isLoading={isLoading}></Loader>
        </Container>
      </div>
    );
  } else if (props.match.params.id !== card.id) {
    console.log("Loading new card");
    loadNewCard();
  } else {
    console.log("Returning details");
    return returnDetails();
  }
};

const mainPage = {
  display: "none",
};

const mainPageShow = {
  display: "auto",
};

const tableStyle = {
  width: "100%",
};

const textStyle = {
  border: "black 0.5px solid",
  overflow: "hidden",
  whiteSpace: "pre-wrap",
};

const content = {
  padding: "20px",
  overflow: "hidden",
};

const detailsStyle = {
  marginLeft: "15px",
  display: "block",
  margin: "2px 0 0 0",
  fontSize: "200%",
};

export default CardPage;
