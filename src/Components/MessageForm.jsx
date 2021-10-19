// @ts-check

import React, { useEffect, useRef, useState } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';

const mapStateToProps = ({ channels, currentUser, currentChannelId }) => ({
  channels, currentUser, currentChannelId,
});

const MessageForm = ({
  currentChannelId, currentUser, socket,
}) => {
  const inputRef = useRef();
  const { t } = useTranslation();
  const [formDisabled, setFormDisabled] = useState(false);

  useEffect(() => {
    // @ts-ignore
    inputRef.current.focus();
  });

  const f = useFormik({
    initialValues: {
      messageText: '',
    },
    onSubmit: ({ messageText }) => {
      setFormDisabled(true);
      const newMessage = {
        body: messageText,
        channelId: currentChannelId,
        username: currentUser,
      };
      socket.emit('newMessage', newMessage, (response) => {
        if (response.status === 'ok') {
          setFormDisabled(false);
          f.resetForm();
        }
      });
    },
  });

  return (
    <div className="mt-auto px-5 py-3">
      <Form onSubmit={f.handleSubmit}>
        <InputGroup className="mb-3">
          <Form.Control
            ref={inputRef}
            id="messageText"
            type="text"
            placeholder={t('chatPage.enterMessage')}
            name="messageText"
            onChange={f.handleChange}
            value={f.values.messageText}
            disabled={formDisabled}
            data-testid="new-message"
          />
          <Button variant="outline-primary" type="submit" disabled={!f.values.messageText || formDisabled}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="25" height="25" fill="currentcolor">
              <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
            </svg>
            <span className="visually-hidden">
              {t('chatPage.sendMessage')}
            </span>
          </Button>
        </InputGroup>
      </Form>
    </div>
  );
};

export default connect(mapStateToProps, null)(MessageForm);
