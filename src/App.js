import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';

import Book from './Components/Book';
import Home from './Components/Home';
import SearchBar from './Components/SearchBar';

import history from './utils/history';

function App() {
  return (
    <Router history={history}>
      <SearchBar />

      <div className="container" id="app">
        <Switch>
          <Route path="(/|/result)" component={Home} />
          <Route path="/book/:isbn" component={Book} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
