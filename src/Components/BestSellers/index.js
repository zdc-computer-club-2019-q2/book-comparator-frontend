import React from "react";
import useFetch from "../../utils/useFetch";

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
    // TODO: link to Book
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

function BestSellers() {
    let { response: fiction } = useFetch("/api/bestseller?type=fiction");
    let { response: nonfiction } = useFetch("/api/bestseller?type=nonfiction");

    return (
        <div id="bestsellers">
            <div className="bestsellers__section">
                <Header type="Fiction" />
                <div class="bestsellers">
                    {fiction &&
                        fiction.results
                            .slice(0, 6)
                            .map(({ isbn, author, title, bestseller_weeks }) => (
                                <BestSeller
                                    author={author}
                                    imageUrl={getImageURL(isbn)}
                                    title={title}
                                    isbn={isbn}
                                    tag={`${bestseller_weeks} weeks`}
                                />
                            ))}
                </div>
            </div>

            <div className="bestsellers__section">
                <Header type="Non Fiction" />
                <div className="bestsellers">
                    {nonfiction &&
                        nonfiction.results
                            .slice(0, 6)
                            .map(({ isbn, author, title, bestseller_weeks }) => (
                                <BestSeller
                                    author={author}
                                    imageUrl={getImageURL(isbn)}
                                    title={title}
                                    isbn={isbn}
                                    tag={`${bestseller_weeks} weeks`}
                                />
                            ))}
                </div>
            </div>
        </div>
    );
}

export default BestSellers;
