// @ts-check

import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import MessageForm from './MessageForm.jsx';

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
  messages, currentChannelId, channels, socket,
}) => {
  const messagesEnd = useRef();
  const { t } = useTranslation();

  useEffect(() => {
    // @ts-ignore
    messagesEnd.current.scrollIntoView({ behavior: 'smooth' });
  });

  const filteredMessages = messages.filter(({ channelId }) => channelId === currentChannelId);
  const currentChannel = channels.find(({ id }) => id === currentChannelId);
  const channelName = currentChannel ? currentChannel.name : '';
  const count = filteredMessages.length;
  const messagesCountToString = t('chatPage.messages.message', { count });

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
        <MessageForm socket={socket} />
      </div>
    </div>
  );
};

export default connect(mapStateToProps, null)(MessageBox);
