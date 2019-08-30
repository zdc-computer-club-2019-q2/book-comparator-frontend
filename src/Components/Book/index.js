import React from "react";

import "./book.css";

import brandAmazon from "../../images/brand-amazon.jpg";
import brandBookRepository from "../../images/brand-book-repository.png";
import brandKinokuniya from "../../images/brand-kinokuniya.jpg";
import fbs_1 from "../../images/fbs_1.jpg";

function BookDetail({ author, imageUrl, title, tag }) {
  return (
    <div class="columns is-mobile">
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
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam elementum
          enim in nulla imperdiet cursus. Vestibulum nec mollis libero. Nulla
          tristique convallis tellus sed consequat. Vestibulum vitae turpis non
          lorem lacinia rhoncus nec a nibh. Ut sollicitudin neque ligula, sit
          amet tincidunt orci semper eget. Sed facilisis volutpat lectus id
          ornare. Proin mollis a arcu ut tincidunt.
        </p>
        <p class="tag is-warning">{tag ? tag.toUpperCase() : "TAG"}</p>
      </div>
    </div>
  );
}

function Store({ brand, price }) {
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
          <button class="button is-light">Buy</button>
        </div>
      </div>
    </>
  );
}

function Redirect() {
  // TODO: link to external website
  return (
    <div class="modal">
      <div class="modal-background"></div>
      <div class="modal-card">
        <section class="modal-card-body">
          <h1>Buying book at kinokuniya</h1>
          <p>You will be redirected to external website</p>
          <div>
            <input class="button" type="submit" value="Submit input" />
            <input class="button" type="reset" value="Reset input" />
          </div>
        </section>
      </div>
      <div class="modal-content"></div>
      <button class="modal-close is-large" aria-label="close"></button>
    </div>
  );
}

function Book() {
  return (
    <div id="book">
      <BookDetail
        author="Agatha Christie"
        imageUrl={fbs_1}
        title="The ABC Murders"
      />
      <Store brand={brandAmazon} price="$12.00" />
      <Store brand={brandBookRepository} price="$12.00" />
      <Store brand={brandKinokuniya} price="$12.00" />
      <Redirect />
    </div>
  );
}

export default Book;
