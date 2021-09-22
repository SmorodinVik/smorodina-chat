// @ts-check
import App from './Components/App.jsx';

import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';

import '../assets/application.scss';

import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
// import store from './store.js';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const container = document.querySelector('#chat');

/* ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  ,
  container,
); */

ReactDOM.render(
  <App />,
  container,
);

