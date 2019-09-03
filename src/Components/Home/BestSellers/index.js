import React from "react";
import useFetch from "../../../utils/useFetch";

import Loader from "../../Loader";

import "./bestSellers.css";

function Header({ type }) {
    return (
        <h1 className="header">
            {type} Best Sellers
            <span className="icon is-small is-left">
                <i className="fas fa-chevron-right"></i>
            </span>
        </h1>
    );
}

function BestSeller({ author, imageUrl, tag, title, isbn }) {
    const url = "/book/" + isbn;
    return (
        <a href={url} className="card__container">
            <div className="card">
                <div className="card__image" style={{ backgroundImage: `url(${imageUrl})` }} />
                <div className="card__copy">
                    <div className="media">
                        <div className="media-content">
                            <span className="book-tag card__tag">{tag ? tag.toUpperCase() : "TAG"}</span>
                            <div className="card__title">{title.toUpperCase()}</div>
                            <div className="card__author">
                                by <span>{author}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </a>
    );
}

function getImageURL(isbn) {
    return `/api/image?isbn=${isbn}`;
}

const LISTS = {
    "hardcover-fiction": "Hardcover Fiction",
    "hardcover-nonfiction": "Hardcover Nonfiction",
    "young-adult": "Young Adult",
    travel: "Travel",
    education: "Education"
};

function Item({ listName, displayName }) {
    let { response } = useFetch(`/api/bestseller?type=${listName}`);

    return (
        <div className="bestsellers__section">
            <Header type={displayName} />
            <div className="bestsellers">
                {!response ? (
                    <Loader />
                ) : (
                    response.results
                        .slice(0, 6)
                        .map(({ isbn, author, title, bestseller_weeks }, i) => (
                            <BestSeller
                                author={author}
                                imageUrl={getImageURL(isbn)}
                                title={title}
                                isbn={isbn}
                                tag={bestseller_weeks === 0 ? 'new' : `${bestseller_weeks} weeks`}
                                key={`fiction-best-seller-${i}`}
                            />
                        ))
                )}
            </div>
        </div>
    );
}

function BestSellers() {
    return (
        <div id="bestsellers">
            {Object.keys(LISTS).map(listName => (
                <Item key={listName} listName={listName} displayName={LISTS[listName]} />
            ))}
        </div>
    );
}

export default BestSellers;
