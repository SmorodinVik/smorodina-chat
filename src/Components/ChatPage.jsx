// @ts-check

import React, { useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import { connect } from 'react-redux';
import routes from '../routes.js';
import * as actions from '../storeSlices/index.js';
import Channels from './Channels.jsx';
import MessageBox from './MessageBox.jsx';

const actionCreators = {
  fetchData: actions.fetchData,
  addMessage: actions.addMessage,
  setUser: actions.setUser,
};

const socket = io();

const Chat = ({ fetchData, addMessage, setUser }) => {
  useEffect(() => {
    const { token, username } = JSON.parse(localStorage.getItem('userId'));

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const getData = async () => {
      const res = await axios.get(routes.dataPath(), config);
      fetchData({ data: res.data });
    };

    getData();
    setUser({ user: username });
  }, []);

  useEffect(() => {
    socket.on('newMessage', (message) => {
      addMessage({ message });
    });
    return () => {
      socket.off();
    };
  });

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <Channels />
        <MessageBox socket={socket} />
      </div>
    </div>
  );
};

export default connect(null, actionCreators)(Chat);
