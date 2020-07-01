import React from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Link } from "react-router-dom";

const CardPage = (props) => {
  const capitalize = (s) => {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  return (
    <Container>
      <div style={content}>
        <img
          src={props.card.imageUri}
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
            <strong>Expansion set:</strong> {props.card.setName} (
            {props.card.set.toUpperCase()})
          </span>
          <br />
          <span>
            <strong>Type:</strong> {props.card.type}
          </span>
          <br />
          <span>
            <strong>Price trend:</strong>
            {props.card.price}
          </span>
          <br />
          <div className="textStyle" style={textStyle}>
            {props.card.text}
          </div>
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
          {props.prints.map((cardPrint) => (
            <tr>
              <td>
                <Link to={`/${cardPrint.name}/${cardPrint.id}`}>
                  {cardPrint.setName}
                </Link>
              </td>
              <td>{cardPrint.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
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
