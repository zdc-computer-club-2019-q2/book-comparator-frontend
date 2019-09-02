import React, { useState } from "react";

import useFetch from "../../utils/useFetch";

import "./book.css";

import brandOpenTrolley from "../../images/brand-open-trolley.png";
import brandBookRepository from "../../images/brand-book-repository.png";
import brandKinokuniya from "../../images/brand-kinokuniya.jpg";

function BookDetail({ author, imageUrl, title, description, categories = [] }) {
  return (
    <div id="book-detail" class="columns is-mobile">
      <div class="column is-one-fifth">
        <figure class="image is-4by5">
          <img src={imageUrl} alt="book" />
        </figure>
      </div>
      <div class="column details">
        <p class="title is-6">{title.toUpperCase()}</p>
        <p>
          <small>by {author}</small>
        </p>
        <p>{description}</p>
        {categories.map(category => (
          <p key={category} class="tag is-warning">
            {category}
          </p>
        ))}
        <h1>Stores</h1>
      </div>
    </div>
  );
}

function Store({ brand, price, url, handleClick }) {
  return (
    <>
      <div class="columns is-mobile store">
        <div class="column is-offset-one-fifth">
          <figure class="image">
            <img src={brand} alt="brand" />
          </figure>
        </div>
        <div class="column details">
          <p class="title is-6">{price}</p>
        </div>
        <div class="column">
          <button
            class="button is-light"
            onClick={() => handleClick(brand, url)}
          >
            Buy
          </button>
        </div>
      </div>
      <hr class="new"></hr>
    </>
  );
}

function Redirect({ brand, open, setOpen, handleContinue }) {
  return (
    <div className={`modal ${open ? "is-active" : ""}`}>
      <div class="modal-background"></div>
      <div class="modal-card">
        <section class="modal-card-body">
          <div class="modal-card-details ">
            <div className="modal-card-header">
              <span>Buying book at </span>
              <img src={brand} alt="brand" />
            </div>
            <small>You will be redirected to external website</small>
          </div>
          <div className="modal-card-buttons">
            <input
              class="button cancel"
              type="submit"
              value="CANCEL"
              onClick={() => setOpen(false)}
            />
            <input
              class="button continue is-light"
              type="reset"
              value="CONTINUE"
              onClick={handleContinue}
            />
          </div>
        </section>
      </div>
      <button
        class="modal-close is-large"
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

  if (response === null) {
    return <p>Loading ...</p>;
  }

  const { offers, author, title, description, image, categories } = response;

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
      <BookDetail
        author={finalAuthor}
        imageUrl={image}
        title={title}
        description={description}
        categories={categories}
      />
      {offers.map(offer => {
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
      })}
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
