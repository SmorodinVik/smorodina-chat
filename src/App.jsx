// @ts-check

import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  // useRouteMatch,
  // useParams,
} from 'react-router-dom';
import { Navbar } from 'react-bootstrap';

import LoginPage from './Components/LoginPage.jsx';
import ErrorPage from './Components/ErrorPage.jsx';

export default () => (
  <div className="d-flex flex-column h-100">
    <Router>
      <Navbar bg="light" expand="lg">
        <div className="container">
          <Navbar.Brand as={Link} to="/">Smorodina Chat</Navbar.Brand>
        </div>
      </Navbar>
      <div className="container-fluid h-100">
        <Switch>
          <Route exact path="/">
            <LoginPage />
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/">
            <ErrorPage />
          </Route>
        </Switch>
      </div>
    </Router>
  </div>
);
