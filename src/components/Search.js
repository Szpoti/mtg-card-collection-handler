import React, { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { ColorContext } from "./ColorProvider";

const Search = (props) => {
  let [cardTitle, setCardTitleState] = useState(String.empty);
  const setCardTitle = (e) => {
    setCardTitleState(e.target.value);
  };

  const searchForCards = async () => {
    if (cardTitle !== undefined && cardTitle.length > 2) {
      handleSearchBarProperties("off");
      props.setLoadedCards([]);
      props.setIsLoading(true);
      const title = cardTitle;
      const cards = await props.cardService.search(title);
      const filteredCards = await props.cardService.useFilter(
        cards,
        props.colors
      );
      props.setLoadedCards(filteredCards);
      props.setIsLoading(false);
    } else {
      handleSearchBarProperties("on");
    }
  };

  const handleSearchBarProperties = (turnTo) => {
    switch (turnTo) {
      case "on":
        document.getElementById("searchBar").style.borderColor = "red";
        document.getElementById("searchBarErrorMsg").innerHTML =
          "Please input at least 3 characters to search for";
        break;
      case "off":
        document.getElementById("searchBar").style.borderColor = "";
        document.getElementById("searchBarErrorMsg").innerHTML = "";
        break;
      default:
        console.log(
          "Invalid value for 'turnTo'. Should have been 'on' or 'off', but was ",
          turnTo
        );
        break;
    }
  };

  return (
    <div className="input-group input-focus justify-content-center justify-content-md-end">
      <input
        id="searchBar"
        type="search"
        placeholder="Search by card name ..."
        className="form-control border-right-0 search-input"
        onChange={setCardTitle}
      />
      <div className="input-group-prepend" onClick={searchForCards}>
        <span className="input-group-text bg-white">
          <FontAwesomeIcon icon={faSearch} />
        </span>
      </div>
    </div>
  );
};

export default Search;
