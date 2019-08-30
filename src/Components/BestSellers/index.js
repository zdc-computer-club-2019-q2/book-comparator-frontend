import React from "react";

import "./bestSellers.css";

import fbs_1 from "../../images/fbs_1.jpg";
import fbs_2 from "../../images/fbs_2.jpg";
import fbs_3 from "../../images/fbs_3.jpg";
import nfbs_1 from "../../images/nfbs_1.jpg";

function Header({ type }) {
  return (
    <h1 className="header">
      {type} Best Sellers
      <span class="icon is-small is-left">
        <i class="fas fa-chevron-right"></i>
      </span>
    </h1>
  );
}

function BestSeller({ author, imageUrl, tag, title, isbn}) {
  // TODO: link to Book
  const url = "/book/" + isbn;
  return (
    <a href={url}>
      <div className="card">
        <div
            className="card__image"
            style={{ backgroundImage: `url(${imageUrl})` }}
        />
        <div className="card__copy">
          <div className="media">
            <div className="media-content">
              <span className="book-tag card__tag">{tag ? tag.toUpperCase() : "TAG"}</span>
              <div className="card__title">{title.toUpperCase()}</div>
              <div className="card__author">by <span>{author}</span></div>
            </div>
          </div>
        </div>
      </div>
     </a>
  );
}

function BestSellers() {
  const domain = "https://book-comparator-frontend-git-mockups.zdc-computer-club-2019-q2.now.sh";
  let url_fiction = fetch("/api/bestseller?type=fiction", []);
  let url_nonfiction = fetch("/api/bestseller?type=nonfiction", []);
  fetch(domain + "/api/search?q=abc", { mode: 'cors' })
    .then(function(response) {
      response.json().then(function(data) {
        console.log(data);
      });
    })
    .catch(function(error) {

    })

  return (
    <div id="bestsellers">
      <div className="bestsellers__section">
        <Header type="Fiction" />
        <div class="bestsellers">
          <BestSeller
            author="Agatha Christie"
            imageUrl={fbs_1}
            title="The ABC Murders"
            isbn="1234"
          />
          <BestSeller author="Cecelia Ahern" imageUrl={fbs_2} title="The Gift" />
          <BestSeller
            author="Antoine de Saint-Exupéry"
            imageUrl={fbs_3}
            title="The Little Prince"
            isbn="1234"
          />
          <BestSeller
            author="Amy Newmark"
            imageUrl={nfbs_1}
            title="Chicken Soup for the Soul"
            isbn="1234"
          />
          <BestSeller
              author="Agatha Christie"
              imageUrl={fbs_1}
              title="The ABC Murders"
              isbn="1234"
          />
        </div>
      </div>
      
      <div className="bestsellers__section">
        <Header type="Non Fiction"/>
        <div className="bestsellers">
          <BestSeller
              author="Agatha Christie"
              imageUrl={fbs_1}
              title="The ABC Murders"
          />
          <BestSeller author="Cecelia Ahern" imageUrl={fbs_2} title="The Gift"/>
          <BestSeller
              author="Antoine de Saint-Exupéry"
              imageUrl={fbs_3}
              title="The Little Prince"
          />
          <BestSeller
              author="Amy Newmark"
              imageUrl={nfbs_1}
              title="Chicken Soup for the Soul"
          />
          <BestSeller
              author="Agatha Christie"
              imageUrl={fbs_1}
              title="The ABC Murders"
          />
        </div>
      </div>
    </div>
  );
}

export default BestSellers;
