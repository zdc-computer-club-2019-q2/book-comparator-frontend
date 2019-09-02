import React from "react";

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
            <hr class="new"></hr>
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

const BRAND_IMAGE_MAP = {
    opentrolley: brandOpenTrolley,
    bookdepository: brandBookRepository,
    kinokuniya: brandKinokuniya
};

function Book({ match }) {
    const { isbn } = match.params;

    const { response } = useFetch(`/api/book?isbn=${isbn}`);

    if (response === null) {
        return <p>Loading ...</p>;
    }

    const { offers, author, title, description, image, categories } = response;

    if (!author) {
        return <p>Book does not exist</p>;
    }

    const finalAuthor = author.join ? author.join("; ") : author; // author can be an array

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
                    return <Store key={offer.site} brand={BRAND_IMAGE_MAP[offer.site]} price={offer.price} />;
                }
            })}
            <Redirect />
        </div>
    );
}

export default Book;
