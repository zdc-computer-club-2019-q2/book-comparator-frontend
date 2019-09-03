import React from "react";

import useFetch from "../../../utils/useFetch";

import Loader from "../../Loader";

import "./searchResult.css";

function Result({ author, title, onClick, isbn, categories }) {
    return (
        <div className="search-result" onClick={onClick}>
            <div
                className="search-result__image"
                style={{
                    backgroundImage: `url(/api/image?isbn=${isbn})`
                }}
            />
            <div className="search-result__copy">
                <div className="search-result__title">{title.toUpperCase()}</div>
                <div className="search-result__author">
                    by <span>{author}</span>
                </div>
                {categories.map(category => (
                    <div className="book-tag search-result__tag book-tag--bestseller">{category}</div>
                ))}
            </div>
        </div>
    );
}

function SearchResult({ location, history }) {
    const urlParams = new URLSearchParams(location.search);
    const searchTerm = urlParams.get("q");

    const { response, error } = useFetch(`/api/search?q=${searchTerm}`);

    function onClickSearchResult(isbn) {
        history.push(`/book/${isbn}`);
    }

    if (error !== null) {
        window.alert(error);
        return;
    }

    return (
        <div className="search-results">
            {!response && <Loader />}
            {response && (
                <React.Fragment>
                    <div className="search-results__number">
                        Showing <b>{response.results_count}</b> result{response.results_count > 1 ? "s" : ""}.
                    </div>
                    {response.results.map((result, i) => (
                        <div className="search-results__result" key={`search-result-${i}`}>
                            <Result
                                {...result}
                                onClick={() => {
                                    onClickSearchResult(result.isbn);
                                }}
                                bestSeller
                            />
                        </div>
                    ))}
                </React.Fragment>
            )}
        </div>
    );
}

export default SearchResult;
