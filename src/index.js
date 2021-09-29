// @ts-check
import App from './Components/App.jsx';

import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';

import '../assets/application.scss';

import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import store from './store.js';
import './i18n.js';
import Rollbar from 'rollbar';

const rollbar = new Rollbar({
  accessToken: '67a72f81ceaa4a43935bee63a61e986e',
  captureUncaught: true,
  captureUnhandledRejections: true,
});

rollbar.log('Hello from Smorodina!');

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const container = document.querySelector('#chat');

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  container,
);
