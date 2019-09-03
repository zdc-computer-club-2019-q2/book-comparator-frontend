import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

import './search.css';

function Search({ history }) {
  const [focus, setFocus] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [error, setError] = useState();
  const [value, setValue] = useState();

  function onKeyDown(e) {
    // Enter key
    if (e.keyCode === 13) {
      history.push(`/result?q=${value}`);
    }
  }

  function onFocus() {
    setFocus(true);

    setTimeout(() => {
      setShowTooltip(true);
    }, 2000);

    setTimeout(() => {
      setShowTooltip(false);
    }, 7000);
  }

  function onBlur() {
    setFocus(false);
  }

  const inputClassNames = ["search-input"];
  if (focus) {
    inputClassNames.push("search-input--focused");
  }

  const errorClassNames = ["search__error"];
  if (error) {
    errorClassNames.push("search__error--display");
  }

  const tooltipClassNames = ["search__tooltip"];
  if (showTooltip) {
    tooltipClassNames.push("search__tooltip--display");
  }

  return (
    <div id="search" onKeyDown={onKeyDown}>
      <div className="search-instruction">Find the cheapest store</div>
      <div className={inputClassNames.join(" ")}>
        <span className="icon is-small is-left">
          <i className="fas fa-search"></i>
        </span>

        <input
          placeholder="Enter an ISBN, book title or author"
          type="text"
          value={value}
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={e => {
            setValue(e.target.value);
            setError();
          }}
        />
      </div>
      {/*<div className={errorClassNames.join(" ")}>*/}
      {/*  {"Oops, there is no book match '"}*/}
      {/*  <span>{error}</span>*/}
      {/*  {"'."}*/}
      {/*</div>*/}
      <div className={tooltipClassNames.join(" ")}>
        Press enter to start searching.
      </div>
    </div>
  );
}

export default withRouter(Search);
