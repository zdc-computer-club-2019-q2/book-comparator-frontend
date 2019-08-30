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

function BestSeller({ author, imageUrl, tag, title }) {
  // TODO: link to Book
  return (
    <div class="column">
      <div class="card">
        <div class="card-image">
          <figure class="image is-4by5">
            <img src={imageUrl} alt="book" />
          </figure>
        </div>
        <div class="card-content">
          <div class="media">
            <div class="media-content">
              <span class="tag">{tag ? tag.toUpperCase() : "TAG"}</span>
              <p class="title is-6">{title.toUpperCase()}</p>
              <small>by {author}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BestSellers() {
  return (
    <div id="bestsellers">
      <Header type="Fiction" />
      <div class="columns is-8 is-mobile is-variable">
        <BestSeller
          author="Agatha Christie"
          imageUrl={fbs_1}
          title="The ABC Murders"
        />
        <BestSeller author="Cecelia Ahern" imageUrl={fbs_2} title="The Gift" />
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
      </div>
    </div>
  );
}

export default BestSellers;
