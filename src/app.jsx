// @ts-check

import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import store from './store.js';
import './i18n.js';
import Router from './Components/Router.jsx';

const container = document.getElementById('chat');

export default () => {
  ReactDOM.render(
    <Provider store={store}>
      <Router />
    </Provider>,
    container,
  );
};
