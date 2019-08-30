import React from "react";

import history from "../../utils/history.js";

import "./search.css";

function Search() {
  function onKeyDown(e) {
    // Enter key
    console.log(e.keyCode);
    console.log(history);
    if (e.keyCode === 13) {
      history.push("/result");
    }
  }

  console.log(">>>", history);

  return (
    <div id="search" onKeyDown={onKeyDown}>
      <p>Find the cheapeast store</p>
      <div class="field">
        <p class="control has-icons-left">
          <input
            class="input"
            placeholder="Enter an ISBN, book title or author"
            type="text"
          />
          <span class="icon is-small is-left">
            <i class="fas fa-search"></i>
          </span>
        </p>
      </div>
    </div>
  );
}

export default Search;
