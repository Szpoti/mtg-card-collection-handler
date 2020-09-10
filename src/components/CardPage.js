import React, { useEffect, useState, useRef } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import LiveCardService from "../services/LiveCardService";
import Loader from "./Loader";

const CardPage = (props) => {
  const cardService = new LiveCardService();
  const [isLoading, setIsLoading] = useState(true);
  const [prints, setPrints] = useState([]);
  const [card, setCard] = useState(null);
  const textDisplayer = useRef();
  const mainPageRef = useRef();

  async function fetchSymbols() {
    symbols = await cardService.getSymbols();
    if (textDisplayer.current !== null) {
      textDisplayer.current.innerHTML = insertSvgs(card.text);
      setIsLoading(false);
    }
  }

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

      if (apiCard.imageUri === null) {
        apiCard.imageUri = "/img/missing-card-image.jpg";
      }
      setCard(apiCard);
    }
  };

  let symbols = [];

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
      if (mainPageRef.current !== null) {
        mainPageRef.current.style = { mainPageShow };
      }
      return newText;
    } else {
      if (mainPageRef.current !== null) {
        mainPageRef.current.style = { mainPageShow };
      }
      return "Text not found";
    }
  };

  const returnDetails = () => {
    return (
      <Container>
        <Loader isLoading={isLoading}></Loader>
        <div id="mainPage" style={mainPage} ref={mainPageRef}>
          <div style={content}>
            <img
              src={card.imageUri}
              alt={card.name}
              style={cardImageStyle}
            ></img>
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
                    <Link to={`/card/${cardPrint.name}/${cardPrint.id}`}>
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
    return (
      <div id="mainPage" style={mainPage}>
        <Container>
          <Loader isLoading={isLoading}></Loader>
        </Container>
      </div>
    );
  } else if (props.match.params.id !== card.id) {
    loadNewCard();
  } else {
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

const cardImageStyle = {
  width: "30%",
  heigth: "auto",
  border: "solid black 3px",
  borderRadius: "1%",
  marginRight: "15px",
  float: "left",
};

export default CardPage;
