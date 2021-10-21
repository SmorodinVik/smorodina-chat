// @ts-check

import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';

import '../assets/application.scss';

import ReactDOM from 'react-dom';
import io from 'socket.io-client';

import init from './init.jsx';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const run = async () => {
  const container = document.getElementById('chat');
  const socket = await io({ transports: ['websocket'] });
  ReactDOM.render(init(socket), container);
};

run();
