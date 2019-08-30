import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";

import Book from "./Components/Book/index";
import BestSellers from "./Components/BestSellers";
import Search from "./Components/Search/index";
import SearchResult from "./Components/SearchResult/index";

import history from "./utils/history";

function App() {
  return (
    <Router history={history}>
      <div className="container" id="app">
        <Search />

        <Route path="/" exact component={BestSellers} />
        <Switch>
          <Route path="/result" component={SearchResult} />
          <Route path="/book/:isbn" component={Book} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
