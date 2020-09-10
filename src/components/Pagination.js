import React, { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Pagination(props) {
  if (props.currentPage === undefined || props.cards.length < 33) {
    return null;
  }

  const ALLPAGES = props.cards.length / 32;

  const changeCurrentPage = (val) => {
    props.setCurrentPage(val);
  };

  const Pages = () => {
    const buttons = [];
    for (let i = 0; i <= ALLPAGES; i++) {
      if (i + 1 === props.currentPage) {
        buttons.push(
          <li className="page-item active">
            <Link
              to={`/search/${i + 1}`}
              className="page-link"
              onClick={() => changeCurrentPage(i + 1)}
              //onClick={props.setCurrentPage(i + 1)}
            >
              {i + 1}
            </Link>
          </li>
        );
      } else {
        buttons.push(
          <li className="page-item">
            <Link
              to={`/search/${i + 1}`}
              className="page-link"
              onClick={() => changeCurrentPage(i + 1)}
            >
              {i + 1}
            </Link>
          </li>
        );
      }
    }

    return buttons;
  };

  return (
    <nav className="d-flex justify-content-center">
      <ul className="pagination">
        <li className="page-item disabled">
          <Link
            to={`/search/${props.currentPage - 1}`}
            onClick={() => changeCurrentPage(props.currentPage - 1)}
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
            onClick={() => changeCurrentPage(props.currentPage + 1)}
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

const getCardsToDisplay = (currentPage, cards) => {
  let startIndex = (currentPage - 1) * 32;
  let endIndex = startIndex + 32;
  return cards.slice(startIndex, endIndex);
};

export const getPaginationCards = (currentPage, cards) => {
  return getCardsToDisplay(currentPage, cards);
};
