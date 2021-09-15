// @ts-check

import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  // useRouteMatch,
  // useParams,
} from 'react-router-dom';
import { Button, Navbar } from 'react-bootstrap';

import LoginPage from './LoginPage.jsx';
import ErrorPage from './ErrorPage.jsx';
import ChatPage from './ChatPage.jsx';
import authContext from '../contexts/index.jsx';
import useAuth from '../hooks/index.jsx';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };

  return (
    <authContext.Provider value={{ loggedIn, logIn, logOut }}>
      {children}
    </authContext.Provider>
  );
};

const PrivateRoute = ({ children }) => {
  const auth = useAuth();

  return (
    <Route
      exact
      path="./"
      render={({ location }) => (auth.loggedIn
        ? children
        : <Redirect to={{ pathname: './login', state: { from: location } }} />)}
    />
  );
};

const LogOutBtn = () => {
  const auth = useAuth();

  return auth.loggedIn
    ? <Button variant="primary" onClick={auth.logOut} as={Link} to="/login">Выйти</Button>
    : null;
};

export default () => (
  <div className="d-flex flex-column h-100">
    <AuthProvider>
      <Router>
        <Navbar bg="light" expand="lg">
          <div className="container">
            <Navbar.Brand as={Link} to="/">Smorodina Chat</Navbar.Brand>
            <LogOutBtn />
          </div>
        </Navbar>
        <div className="container-fluid h-100">
          <Switch>
            <PrivateRoute>
              <ChatPage />
            </PrivateRoute>
            <Route path="/login">
              <LoginPage />
            </Route>
            <Route path="/">
              <ErrorPage />
            </Route>
          </Switch>
        </div>
      </Router>
    </AuthProvider>
  </div>
);
