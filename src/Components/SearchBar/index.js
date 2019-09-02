import React from 'react';
import { withRouter } from 'react-router-dom';

import './searchBar.css';

function SearchBar(props) {
  const { pathname } = props.location;

  if (pathname === '/' || pathname === '/result') return null;

  function onKeyDown(e) {
    if (e.keyCode === 13) {
      props.history.push(`/result?q=${e.target.value}`);
    }
  }

  return (
    <div className="search-bar" onKeyDown={onKeyDown}>
      <div className="search-bar__input">
          <span className="icon is-small is-left">
            <i className="fas fa-search"></i>
          </span>

        <input
          placeholder="Enter an ISBN, book title or author"
          type="text"
        />
      </div>
    </div>
  );
}

export default withRouter(SearchBar);
