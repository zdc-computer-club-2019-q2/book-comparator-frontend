import React from 'react';
import useFetch from '../../../utils/useFetch';

import Loader from '../../Loader';

import './bestSellers.css';

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

function BestSellers() {
    let { response: fiction } = useFetch("/api/bestseller?type=fiction");
    let { response: nonfiction } = useFetch("/api/bestseller?type=nonfiction");

    return (
        <div id="bestsellers">
          {(!fiction && !nonfiction) && <Loader />}

          {
            fiction && (
              <div className="bestsellers__section">
                <Header type="Fiction" />
                <div className="bestsellers">
                  {
                    fiction.results
                      .slice(0, 6)
                      .map(({ isbn, author, title, bestseller_weeks }, i) => (
                        <BestSeller
                          author={author}
                          imageUrl={getImageURL(isbn)}
                          title={title}
                          isbn={isbn}
                          tag={`${bestseller_weeks} weeks`}
                          key={`fiction-best-seller-${i}`}
                        />
                      ))
                  }
                </div>
              </div>
            )
          }

          {
            nonfiction && (
              <div className="bestsellers__section">
                <Header type="Non Fiction" />
                <div className="bestsellers">
                  {
                    nonfiction.results
                      .slice(0, 6)
                      .map(({ isbn, author, title, bestseller_weeks }, i) => (
                        <BestSeller
                          author={author}
                          imageUrl={getImageURL(isbn)}
                          title={title}
                          isbn={isbn}
                          tag={`${bestseller_weeks} weeks`}
                          key={`non-fiction-best-seller-${i}`}
                        />
                      ))
                  }
                </div>
              </div>
            )
          }
        </div>
    );
}

export default BestSellers;