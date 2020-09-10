import React from "react";
import { Link } from "react-router-dom";

const itemPerPage = 32;

export default function Pagination(props) {
  if (props.currentPage === undefined || props.cards.length <= itemPerPage) {
    return null;
  }

  const totalPage = Math.ceil(props.cards.length / itemPerPage);

  const buttonTemplate = (cssClassName, pageNumber, text, ariaLabel) => {
    if (pageNumber <= 0 || totalPage < pageNumber) {
      cssClassName += " disabled";
    }
    return <li className={cssClassName}>
      <Link
        to={`/search/${pageNumber}`}
        className="page-link"
        onClick={() => props.setCurrentPage(pageNumber)}
        aria-label={ariaLabel}
        >
        {text}
      </Link>
    </li>;
  }

  const Pages = () => {
    const buttons = [];
    for (let i = 1; i <= totalPage; i++) {
      let cssClassName = "page-item";
      if (i === props.currentPage) {
        cssClassName += " active";
      }
      buttons.push(buttonTemplate(cssClassName, i, i, `Page ${i}`));
    }
    return buttons;
  };

  return (
    <nav className="d-flex justify-content-center">
      <ul className="pagination">
        {buttonTemplate("page-item", props.currentPage - 1, <span aria-hidden="true">&laquo;</span>, "Previous page")}
        <Pages />
        {buttonTemplate("page-item", props.currentPage + 1, <span aria-hidden="true">&raquo;</span>, "Next page")}
      </ul>
    </nav>
  );
}

export const getPaginationCards = (currentPage, cards) => {
  const startIndex = (currentPage - 1) * itemPerPage;
  const endIndex = startIndex + itemPerPage;
  return cards.slice(startIndex, endIndex);
}
