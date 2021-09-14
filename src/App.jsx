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

import LoginPage from './LoginPage.jsx';

export default () => (
  <Router>
    <Navbar bg="light" expand="lg">
      <Navbar.Brand as={Link} to="/">Smorodina Chat</Navbar.Brand>
    </Navbar>
    <div className="container-fluid h-100">
      <Switch>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/">
          <LoginPage />
        </Route>
      </Switch>
    </div>
  </Router>
);
