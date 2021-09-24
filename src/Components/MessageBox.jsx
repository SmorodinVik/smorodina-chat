// @ts-check

import React, { useEffect, useRef } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { useFormik } from 'formik';
// import axios from 'axios';
import { connect } from 'react-redux';
// import routes from '../routes.js';
import * as actions from '../storeSlices/index.js';

const mapStateToProps = ({
  messages, currentChannelId, currentUser, channels,
}) => ({
  messages, currentChannelId, currentUser, channels,
});

const actionCreators = {
  fetchData: actions.fetchData,
};

const renderMessages = (list) => {
  if (list.length === 0) {
    return null;
  }
  return list.map(({ id, username, body }) => (
    <div className="text-break mb-2" key={id}>
      <b>{username}</b>
      {': '}
      {body}
    </div>
  ));
};

const MessageBox = ({
  messages, currentChannelId, currentUser, channels, socket,
}) => {
  const inputRef = useRef();
  const messagesEnd = useRef();

  useEffect(() => {
    inputRef.current.focus();
    messagesEnd.current.scrollIntoView({ behavior: 'smooth' });
  });

  const filteredMessages = messages.filter(({ channelId }) => channelId === currentChannelId);
  const currentChannel = channels.find(({ id }) => id === currentChannelId);
  const channelName = currentChannel ? currentChannel.name : '';

  const f = useFormik({
    initialValues: {
      messageText: '',
    },
    onSubmit: ({ messageText }) => {
      socket.emit('newMessage', {
        body: messageText,
        channelId: currentChannelId,
        username: currentUser,
      });
      f.resetForm();
    },
  });

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>{`# ${channelName}`}</b>
          </p>
          <span className="text-muted">{`${filteredMessages.length} сообщений`}</span>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5">
          {renderMessages(filteredMessages)}
          <div ref={messagesEnd} />
        </div>
        <div className="mt-auto px-5 py-3">
          <Form onSubmit={f.handleSubmit}>
            <InputGroup className="mb-3">
              <Form.Control
                ref={inputRef}
                type="text"
                placeholder="Введите сообщение..."
                name="messageText"
                autoComplete="messageText"
                id="messageText"
                onChange={f.handleChange}
                value={f.values.messageText}
              />
              <Form.Control.Feedback type="invalid">Проблемы с сетью</Form.Control.Feedback>
              <Button variant="outline-primary" type="submit" disabled={!f.values.messageText}>
                Отправить
              </Button>
            </InputGroup>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, actionCreators)(MessageBox);
