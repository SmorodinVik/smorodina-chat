// @ts-check

import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';

import '../assets/application.scss';

import ReactDOM from 'react-dom';
import io from 'socket.io-client';

import run from './init.jsx';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

export default run;

const container = document.getElementById('chat');

if (container) {
  const socket = io({ transports: ['websocket'] });
  ReactDOM.render(run(socket), document.getElementById('chat'));
}
