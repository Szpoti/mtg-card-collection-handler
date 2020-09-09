import React, { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Pagination(props) {
  useEffect(() => {}, [props.cards]);

  console.log("props.currentPage", props.currentPage);
  console.log("props.cards.length", props.cards.length);
  if (props.currentPage === undefined || props.cards.length < 33) {
    return null;
  }
  const ALLPAGES = props.cards.length / 32;

  const Pages = () => {
    const buttons = [];
    for (let i = 0; i <= ALLPAGES; i++) {
      if (i === props.currentPage) {
        buttons.push(
          <li className="page-item active">
            <Link to={`/search/${i + 1}`} className="page-link">
              {i + 1}
            </Link>
          </li>
        );
      } else {
        buttons.push(
          <li className="page-item">
            <Link to={`/search/${i + 1}`} className="page-link">
              {i + 1}
            </Link>
          </li>
        );
      }
    }

    return buttons;
  };

  const getCardsToDisplay = () => {
    let startIndex = (props.currentPage - 1) * 32;
    let endIndex = startIndex + 32;
    let arr = props.cards.slice(startIndex, endIndex);
    console.log("arr", arr);
    return arr;
  };

  props.setCardsToDisplay(getCardsToDisplay());

  return (
    <nav className="d-flex justify-content-center">
      <ul className="pagination">
        <li className="page-item disabled">
          <Link
            to={`/search/${props.currentPage - 1}`}
            className="page-link"
            aria-label="Previous"
          >
            <span aria-hidden="true">&laquo;</span>
          </Link>
        </li>
        <Pages />
        <li className="page-item">
          <Link
            to={`/search/${props.currentPage + 1}`}
            className="page-link"
            aria-label="Next"
          >
            <span aria-hidden="true">&raquo;</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
