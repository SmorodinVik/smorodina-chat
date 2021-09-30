// @ts-check

import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import store from './store.js';
import './i18n.js';
import App from './Components/App.jsx';

export default (x) => {
  console.log(x);
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('chat'),
  );
};
