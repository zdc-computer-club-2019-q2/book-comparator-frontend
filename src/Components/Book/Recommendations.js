import React from 'react';
import { Link } from 'react-router-dom';

function Book({ title, isbn, author, image }) {
  return (
    <Link className="recommendation__book" to={`/book/${isbn}`}>
      <div
        className="recommendation__book__cover"
        style={{ backgroundImage: `url(${image}` }}
      />
      <div className="recommendation__book__title">{title}</div>
      <div className="recommendation__book__author">by <b>{author}</b></div>
    </Link>
  );
}

function Recommendations({ recommendation, className }) {
  return (
    <div className={className}>
      <h1 className="header-2">Books You Might Also Like</h1>

      <div className="recommendations">
        {
          recommendation.map((book, i) => (
            <Book {...book} key={`recommendation-book-${i}`} />
          ))
        }
      </div>
    </div>
  );
}

export default Recommendations;
