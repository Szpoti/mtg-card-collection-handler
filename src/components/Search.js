import React, { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Search = (props) => {
  let [cardTitle, setCardTitleState] = useState(String.empty);
  const setCardTitle = (e) => {
    setCardTitleState(e.target.value);
  };

  const searchForCards = async () => {
    if (cardTitle !== undefined && cardTitle.length > 2) {
      handleSearchBarProperties("off", "");
      props.setLoadedCards([]);
      props.setIsLoading(true);
      const title = cardTitle;
      const cards = await props.cardService.search(title, props.colors);
      if (cards == null) {
        handleSearchBarProperties("on", "Invalid input, please try again");
      }
      props.setLoadedCards(cards);
      props.setIsLoading(false);
    } else {
      handleSearchBarProperties(
        "on",
        "Please input at least 3 characters to search for"
      );
    }
  };

  const handleSearchBarProperties = (turnTo, msg) => {
    switch (turnTo) {
      case "on":
        document.getElementById("searchBar").style.borderColor = "red";
        document.getElementById("searchBarErrorMsg").innerHTML = msg;
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
    <div className="input-group input-focus justify-content-center justify-content-lg-start">
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
