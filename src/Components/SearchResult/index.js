import React from "react";
import useFetch from "../../utils/useFetch";

import "./searchResult.css";

function Result({ author, imageUrl, title, bestSeller = false }) {
  return (
    <div className="search-result">
      <div
        className="search-result__image"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <div className="search-result__copy">
        <div className="search-result__title">{title.toUpperCase()}</div>
        <div className="search-result__author">
          by <span>{author}</span>
        </div>
        {bestSeller && (
          <div className="book-tag search-result__tag book-tag--bestseller">
            Best Seller
          </div>
        )}
      </div>
    </div>
  );
}

function SearchResult({ location }) {
  const urlParams = new URLSearchParams(location.search);
  const searchTerm = urlParams.get("q");

  const { response, error } = useFetch(`/api/search?q=${searchTerm}`);

  function onClickSearchResult(e) {
    e.preventDefault();
    // TODO: link to Book
  }

  if (error !== null) {
    window.alert(error);
    return;
  }

  if (response === null) {
    return <p>Loading ...</p>;
  }

  const { results, results_count } = response;

  return (
    <div className="search-results">
      <div className="search-results__number">
        Showing <b>{results_count}</b> result{results_count > 1 ? "s" : ""}.
      </div>
      {results.map(result => (
        <div className="search-results__result">
          <Result {...result} onClick={onClickSearchResult} bestSeller />
        </div>
      ))}
    </div>
  );
}

export default SearchResult;
