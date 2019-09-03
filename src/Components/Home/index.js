import React from 'react';
import { withRouter, Link } from 'react-router-dom';

import Search from './Search';

import BestSellers from './BestSellers';
import SearchResult from './SearchResult';

function Home(props) {
  const { pathname } = props.location;

  return (
    <React.Fragment>
      <div className="home-nav-link">
        <Link to="/" className="nav-link">Home</Link>
      </div>

      <Search />

      { pathname === '/' ? <BestSellers /> : <SearchResult {...props} /> }
    </React.Fragment>
  );
}

export default withRouter(Home);
