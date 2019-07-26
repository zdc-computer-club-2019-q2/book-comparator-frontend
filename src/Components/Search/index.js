import React, { useState } from "react";
import "./search.css";
import logo from "../../images/simplye2.png";

function Search() {
  const [key, setKey] = useState(""); // key string for search, using https://reactjs.org/docs/hooks-intro.html

  function onClickSearchBtn(e) {
    e.preventDefault();
    // TODO: What to do when the user clicked Search button?
    console.log(key);
  }

  return (
    <div id="search">
      <div>
        <img src={logo} />
      </div>
      <div id="searchfield">
        <input
          align="middle"
          className="input"
          onChange={e => setKey(e.target.value)}
          placeholder="Search..."
          value={key}
        />
        <button className="button" onClick={onClickSearchBtn}>
          Search!
        </button>
      </div>
      <p className="debug">For debug: the key you input is: {key}</p>
    </div>
  );
}

export default Search;
