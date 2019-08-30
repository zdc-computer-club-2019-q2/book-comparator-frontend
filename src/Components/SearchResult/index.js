import React, { useState } from "react";

import "./searchResult.css";

import fbs_1 from "../../images/fbs_1.jpg";

const INITIAL_RESULTS = [{
  author: 'Agatha Christie',
  imageUrl: fbs_1,
  title: 'The ABC Murders',
}, {
  author: 'Agatha Christie',
  imageUrl: fbs_1,
  title: 'The ABC Murders',
}];


function Result({ author, imageUrl, title, bestSeller = false }) {
  return (
    <div className="search-result">
      <div
        className="search-result__image"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <div className="search-result__copy">
        <div className="search-result__title">{title.toUpperCase()}</div>
        <div className="search-result__author">by <span>{author}</span></div>
        {
          bestSeller && (
            <div className="book-tag search-result__tag book-tag--bestseller">Best Seller</div>
          )
        }
      </div>
    </div>
  );
}

function SearchResult() {
  const [key, setKey] = useState("");
  const [results, setResults] = useState(INITIAL_RESULTS);

  function onClickSearchResult(e) {
    e.preventDefault();
    // TODO: link to Book
    console.log(key);
  }

  return (
    <div className="search-results">
      <div className="search-results__number">Showing <b>{results.length}</b> result{results.length > 1 ? 's' : ''}.</div>
      {
        results.map((result) => (
          <div className="search-results__result">
            <Result
              {...result}
              onClick={onClickSearchResult}
              bestSeller
            />
          </div>
        ))
      }
    </div>
  );
}

export default SearchResult;
