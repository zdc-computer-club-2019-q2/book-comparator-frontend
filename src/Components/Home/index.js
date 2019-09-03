import React from 'react';
import { withRouter, Link } from 'react-router-dom';

import Search from './Search';

import BestSellers from './BestSellers';
import SearchResult from './SearchResult';

const LOGO = require('../../images/logo.png');

function Home(props) {
  const { pathname } = props.location;

  return (
    <React.Fragment>
      <div className="home-nav-link">
        <Link to="/" className="nav-link">
          <img src={LOGO} className="logo"/>
          Bookcamp
        </Link>
      </div>

      <Search />

      { pathname === '/' ? <BestSellers /> : <SearchResult {...props} /> }
    </React.Fragment>
  );
}

export default withRouter(Home);
