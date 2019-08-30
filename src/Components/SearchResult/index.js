import React, { useState } from "react";

import "./searchResult.css";

import fbs_1 from "../../images/fbs_1.jpg";

function Result({ author, imageUrl, title, tag }) {
  return (
    <>
      <div class="columns is-mobile">
        <div class="column is-one-fifth">
          <figure class="image is-4by5">
            <img src={imageUrl} alt="book" />
          </figure>
        </div>
        <div class="column details">
          <p class="title is-6">{title.toUpperCase()}</p>
          <p>
            <small>by {author}</small>
          </p>
          <p class="tag is-warning">{tag ? tag.toUpperCase() : "TAG"}</p>
        </div>
      </div>
      <hr />
    </>
  );
}

function SearchResult() {
  const [key, setKey] = useState("");

  function onClickSearchResult(e) {
    e.preventDefault();
    // TODO: link to Book
    console.log(key);
  }

  return (
    <div id="search-result">
      <p className="results">
        Showing <b>1</b> result.
      </p>
      <Result
        author="Agatha Christie"
        imageUrl={fbs_1}
        title="The ABC Murders"
        onClick={onClickSearchResult}
      />
    </div>
  );
}

export default SearchResult;
