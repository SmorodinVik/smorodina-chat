// @ts-check

import React, { useEffect, useRef, useState } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { useFormik } from 'formik';
import { connect } from 'react-redux';
import { getNoun } from '../uitls.js';

const mapStateToProps = ({
  messages, currentChannelId, currentUser, channels,
}) => ({
  messages, currentChannelId, currentUser, channels,
});

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
  const [formDisabled, setFormDisabled] = useState(false);

  useEffect(() => {
    // @ts-ignore
    inputRef.current.focus();
    // @ts-ignore
    messagesEnd.current.scrollIntoView({ behavior: 'smooth' });
  });

  const filteredMessages = messages.filter(({ channelId }) => channelId === currentChannelId);
  const currentChannel = channels.find(({ id }) => id === currentChannelId);
  const channelName = currentChannel ? currentChannel.name : '';
  const messagesCount = filteredMessages.length;
  const messageDec = getNoun(messagesCount, 'сообщение', 'сообщения', 'сообщений');
  const messagesCountToString = `${messagesCount} ${messageDec}`;

  const f = useFormik({
    initialValues: {
      messageText: '',
    },
    onSubmit: ({ messageText }) => {
      setFormDisabled(true);
      socket.emit('newMessage', {
        body: messageText,
        channelId: currentChannelId,
        username: currentUser,
      }, (response) => {
        if (response.status === 'ok') {
          setFormDisabled(false);
          f.resetForm();
        }
      });
    },
  });

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>{`# ${channelName}`}</b>
          </p>
          <span className="text-muted">{messagesCountToString}</span>
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
                disabled={formDisabled}
              />
              <Form.Control.Feedback type="invalid">Проблемы с сетью</Form.Control.Feedback>
              <Button variant="outline-primary" type="submit" disabled={!f.values.messageText || formDisabled}>
                Отправить
              </Button>
            </InputGroup>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, null)(MessageBox);
