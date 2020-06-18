import React from "react";
import { Link } from "react-router-dom";

const DetailedCard = (props) => {
  const price = () => {
    return props.card.prices.usd != null
      ? `${props.card.prices.usd}$`
      : `${props.card.prices.eur}€`;
  };

  const capitalize = (s) => {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  const displayPrice = (price) => {
    return price !== "null€" ? price : "price not found";
  };
  console.log("Card:", props.card);
  return (
    <div>
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
      <div style={content}>
        <img
          src={props.card.image_uris.border_crop}
          alt={props.card.name}
          style={cardImageStyle}
        ></img>
        <div style={detailsStyle}>
          <span>
            <strong>Name:</strong> {props.card.name}
          </span>
          <br />
          <span>
            <strong>Rarity:</strong> {capitalize(props.card.rarity)}
          </span>
          <br />
          <span>
            <strong>Expansion set:</strong> {props.card.set_name} (
            {props.card.set.toUpperCase()})
          </span>
          <br />
          <span>
            <strong>Type:</strong> {props.card.type_line}
          </span>
          <br />
          <span>
            <strong>Price trend:</strong>
            {displayPrice(price())}
          </span>
          <br />
          <div className="textStyle" style={textStyle}>
            {props.card.oracle_text}
          </div>
        </div>
      </div>
      <table style={tableStyle}></table>
    </div>
  );
};

const tableStyle = {
  width: "100%",
};

const textStyle = {
  border: "black 0.5px solid",
  overflow: "hidden",
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

export default DetailedCard;
