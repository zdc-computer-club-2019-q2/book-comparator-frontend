import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import './App.css';
import Search from './Components/Search/index';
import About from './Components/About/index';
import Result from './Components/Result/index';

function App() {
  return (
      <Router>
        <div id="app">
          <nav>
            <ul>
              <li>
                <Link to="/">Search</Link>
              </li>
              <li>
                <Link to="/9780060853983">Mock result page</Link>
              </li>
              <li>
                <Link to="/about/">About Us</Link>
              </li>
            </ul>
          </nav>

          <Route path="/" exact component={Search} />
          <Switch>
            <Route path="/about/" exact component={About} />
            <Route path="/:isbn/" component={Result} />
          </Switch>
        </div>
      </Router>

  );
}

export default App;
