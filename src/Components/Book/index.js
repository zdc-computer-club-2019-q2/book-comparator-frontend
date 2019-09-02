import React, { useState } from 'react';

import useFetch from '../../utils/useFetch';

import Recommendations from './Recommendations';

import Loader from '../Loader';

import './book.css';

import brandOpenTrolley from '../../images/brand-open-trolley.png';
import brandBookRepository from '../../images/brand-book-repository.png';
import brandKinokuniya from '../../images/brand-kinokuniya.jpg';

function formatPrice(price) {
  return `$ ${price}`;
}

function BookDetail({ isbn, author, title, description, categories = [] }) {
  return (
    <div className="book">
      <div className="book__copy">
        <div className="book__isbn">{isbn}</div>
        <div className="book__title">{title}</div>
        <div className="book__author">by <b>{author}</b></div>
        <div className="book__description">{description}</div>

        {categories.map(category => (
          <div key={category} className="book-tag">
            {category}
          </div>
        ))}
      </div>
    </div>
  );
}

function Store({ brand, price, url, handleClick }) {
  return (
    <div className="store">
      <div className="store__logo-wrapper">
        <div
          className="store__logo"
          style={{backgroundImage: `url(${brand})`}}
        />
      </div>
      <div className="store__price">{formatPrice(price)}</div>
      <div className="store__buy-btn">
        <button
          className="store__buy-btn-cta"
          onClick={() => handleClick(brand, url)}
        >
          Buy
        </button>
      </div>
    </div>
  );
}

function Redirect({ brand, open, setOpen, handleContinue }) {
  return (
    <div className={`modal ${open ? "is-active" : ""}`}>
      <div className="modal-background"></div>
      <div className="modal-card">
        <section className="modal-card-body">
          <div className="modal-card-details ">
            <div className="modal-card-header">
              <div>Buying book at </div>
              <img src={brand} alt="brand" />
            </div>
            <small>You will be redirected to external website</small>
          </div>
          <div className="modal-card-buttons">
            <input
              className="button cancel"
              type="submit"
              value="CANCEL"
              onClick={() => setOpen(false)}
            />
            <input
              className="button continue is-light"
              type="reset"
              value="CONTINUE"
              onClick={handleContinue}
            />
          </div>
        </section>
      </div>
      <button
        className="modal-close is-large"
        aria-label="close"
        onClick={() => setOpen(false)}
      ></button>
    </div>
  );
}

const BRAND_IMAGE_MAP = {
  opentrolley: brandOpenTrolley,
  bookdepository: brandBookRepository,
  kinokuniya: brandKinokuniya
};

function Book({ match }) {
  const { isbn } = match.params;
  const [open, setOpen] = useState(false);
  const [brand, setBrand] = useState("");
  const [url, setUrl] = useState("");

  const { response } = useFetch(`/api/book?isbn=${isbn}`);

  const { offers, author, title, description, image, categories, recommendation } = response;

  if (!author) {
    return <p>Book does not exist</p>;
  }

  const finalAuthor = author.join ? author.join("; ") : author; // author can be an array

  const handleClick = (brand, url) => {
    setBrand(brand);
    setUrl(url);
    setOpen(true);
  };

  const handleContinue = () => {
    window.open(url);
  };

  return (
    <div id="book">
      <div className="book__row">
        <div
          className="book__cover"
          style={{
            backgroundImage: `url(${image})`,
          }}
        />

        <div className="book__details">
          <BookDetail
            author={finalAuthor}
            title={title}
            description={description}
            categories={categories}
            isbn={isbn}
          />

          <div className="stores">
            <h1 className="header">Stores</h1>
            {
              offers.map(offer => {
                if (offer.price) {
                  return (
                    <Store
                      key={offer.site}
                      brand={BRAND_IMAGE_MAP[offer.site]}
                      price={offer.price}
                      url={offer.url}
                      handleClick={handleClick}
                    />
                  );
                }

                return null;
              })
            }
          </div>
        </div>
      </div>

      <Recommendations recommendation={recommendation} className="recommendations-wrapper" />

      <Redirect
        brand={brand}
        open={open}
        setOpen={setOpen}
        handleContinue={handleContinue}
      />
    </div>
  );
}

export default Book;
