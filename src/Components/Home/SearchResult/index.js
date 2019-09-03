import React from "react";

import useFetch from "../../../utils/useFetch";

import Loader from "../../Loader";

import "./searchResult.css";

function Result({ author, title, onClick, isbn, bestSeller = false }) {
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
                {bestSeller && <div className="book-tag search-result__tag book-tag--bestseller">Best Seller</div>}
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

    if (!response) {
        return <Loader />;
    }

    const { results, results_count } = response;

    return (
        <div className="search-results">
            {
                <React.Fragment>
                    <div className="search-results__number">
                        Showing <b>{results_count}</b> result{results_count > 1 ? "s" : ""}.
                    </div>
                    {results.map((result, i) => (
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
            }
        </div>
    );
}

export default SearchResult;
