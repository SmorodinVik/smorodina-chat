// @ts-check

import React, { useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import routes from '../routes.js';
import * as actions from '../storeSlices/index.js';
import Channels from './Channels.jsx';
import MessageBox from './MessageBox.jsx';

const mapStateToProps = ({ currentChannelId }) => ({ currentChannelId });

const actionCreators = {
  fetchDataRequest: actions.fetchDataRequest,
  fetchDataFailure: actions.fetchDataFailure,
  fetchDataSuccess: actions.fetchDataSuccess,
  addMessage: actions.addMessage,
  setUser: actions.setUser,
  addChannel: actions.addChannel,
  removeChannel: actions.removeChannel,
  changeChannel: actions.changeChannel,
  renameChannel: actions.renameChannel,
};

const Chat = ({
  socket,
  currentChannelId,
  changeChannel,
  fetchDataRequest,
  fetchDataFailure,
  fetchDataSuccess,
  addMessage,
  addChannel,
  removeChannel,
  setUser,
  renameChannel,
}) => {
  useEffect(() => {
    const { token, username } = JSON.parse(localStorage.getItem('userId'));

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const fetchData = async () => {
      fetchDataRequest();
      try {
        const res = await axios.get(routes.dataPath(), config);
        fetchDataSuccess({ data: res.data });
      } catch (e) {
        console.log(e);
        fetchDataFailure();
      }
    };

    fetchData();
    setUser({ user: username });
  }, []);

  useEffect(() => {
    socket.on('newMessage', (message) => {
      addMessage({ message });
    });
    socket.on('newChannel', (channel) => {
      addChannel({ channel });
    });
    socket.on('removeChannel', ({ id }) => {
      if (id === currentChannelId) {
        changeChannel({ id: 1 });
      }
      removeChannel({ id });
    });
    socket.on('renameChannel', (channel) => {
      renameChannel({ channel });
    });

    return () => {
      socket.off();
    };
  });

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <Channels socket={socket} />
        <MessageBox socket={socket} />
      </div>
    </div>
  );
};

export default connect(mapStateToProps, actionCreators)(Chat);
