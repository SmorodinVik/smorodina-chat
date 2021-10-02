// @ts-check

import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from 'react-router-dom';
import { Button, Navbar } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import LoginPage from './LoginPage.jsx';
import ErrorPage from './ErrorPage.jsx';
import ChatPage from './ChatPage.jsx';
import SignupPage from './SignupPage.jsx';
import authContext from '../contexts/index.jsx';
import useAuth from '../hooks/index.jsx';

const AuthProvider = ({ children }) => {
  const isLogged = !!localStorage.getItem('userId');
  const [loggedIn, setLoggedIn] = useState(isLogged);
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

/* const PrivateRoute = ({ children, path }) => {
  const auth = useContext(authContext);

  return (
    <Route
      exact
      path={path}
      render={({ location }) => (auth.loggedIn
        ? children
        : <Redirect to={{ pathname: './login', state: { from: location } }} />)}
    />
  );
}; */

const LogOutBtn = () => {
  const auth = useAuth();
  const { t } = useTranslation();

  // @ts-ignore
  return auth.loggedIn
    // @ts-ignore
    ? <Button variant="primary" onClick={auth.logOut} as={Link} to="/login">{t('exitBtn')}</Button>
    : null;
};

const App = ({ socket }) => {
  const { t } = useTranslation();

  return (
    <div className="d-flex flex-column h-100">
      <AuthProvider>
        <Router>
          <Navbar className="shadow-sm" bg="light" expand="lg">
            <div className="container">
              <Navbar.Brand as={Link} to="/">{t('logo')}</Navbar.Brand>
              <LogOutBtn />
            </div>
          </Navbar>
          <Switch>
            <Route path="/login">
              <LoginPage />
            </Route>
            <Route path="/signup">
              <SignupPage />
            </Route>
            <Route
              exact
              path="/"
              render={({ location }) => (localStorage.getItem('userId')
                ? <ChatPage socket={socket} />
                : <Redirect to={{ pathname: './login', state: { from: location } }} />)}
            />
            <Route path="*">
              <ErrorPage />
            </Route>
          </Switch>
        </Router>
      </AuthProvider>
    </div>
  );
};

export default App;
