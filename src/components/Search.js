import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Search = (props) => {
  const [cardTitle, setCardTitle] = useState(String.empty);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (props.onChange !== undefined) {
      props.onChange(errorMessage);
    }
  }, [errorMessage, props]);

  const searchForCards = async () => {
    if (cardTitle !== undefined && cardTitle.length > 2) {
      setErrorMessage("");
      props.setLoadedCards([]);
      props.setIsLoading(true);
      const title = cardTitle;
      const cards = await props.cardService.search(title, props.colors);
      if (cards == null) {
        setErrorMessage("Invalid input! Please try again.");
      }
      props.setLoadedCards(cards);
      props.setIsLoading(false);
    } else {
      setErrorMessage("Please input at least 3 characters to search for!");
    }
  };

  return (
    <div className="input-group input-focus justify-content-center justify-content-lg-start">
      <input
        type="search"
        placeholder="Search by card name ..."
        className="form-control border-right-0 search-input"
        onChange={(e) => setCardTitle(e.target.value)}
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
