import React, {useState} from 'react';
import './search.css';

function Search() {
    const [key, setKey] = useState(""); // key string for search, using https://reactjs.org/docs/hooks-intro.html

    function onClickSearchBtn(e) {
        e.preventDefault();
        // TODO: What to do when the user clicked Search button?
        console.log(key);
    }

    return (
        <div id="search">
            <input
                className="input"
                onChange={e => setKey(e.target.value)} placeholder="Search your book here" value={key}/>
            <button
                className="button"
                onClick={onClickSearchBtn}>Search!</button>
            <p className="debug">
                For debug: the key you input is: {key}
            </p>
        </div>
    );
}

export default Search;
