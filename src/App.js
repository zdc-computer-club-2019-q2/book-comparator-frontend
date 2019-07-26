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
          <div>
            <h1 className="large-title">Bookaholic</h1>
            <h2 className="small-title">The Trusted Book Comparison Site</h2>
          </div>
          <nav>
            <ul className="main-nav">
              <li className="nav-item">
                <Link to="/">Search</Link>
              </li>
              <li className="nav-item">
                <Link to="/9780060853983">Mock result page</Link>
              </li>
              <li className="nav-item">
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
