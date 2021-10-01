// @ts-check

import React, { useEffect, useRef, useState } from 'react';
import {
  Form, Button, Modal,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import * as actions from '../../storeSlices/index.js';
import { validateChannelName } from '../../uitls.js';

const mapStateToProps = ({ channels }) => ({
  channelNames: channels.map(({ name }) => name),
  channels: channels.map(({ name }) => name),
});

const actionCreators = {
  changeChannel: actions.changeChannel,
};

const NewChannelModal = ({
  newChannelModalShow, setNewChannelModalShow, socket, changeChannel, channelNames,
}) => {
  const { t } = useTranslation();

  const [formDisabled, setFormDisabled] = useState(false);
  const [formInvalid, setFormInvalid] = useState(false);
  const [useError, setError] = useState('');

  const handleClose = () => setNewChannelModalShow(false);
  const inputRef = useRef();

  useEffect(() => {
    if (inputRef.current) {
      // @ts-ignore
      inputRef.current.focus();
    }
  });

  const f = useFormik({
    initialValues: {
      channelName: '',
    },
    onSubmit: ({ channelName }) => {
      const validate = validateChannelName(channelName, channelNames);
      if (!validate) {
        setFormInvalid(false);
        setFormDisabled(true);
        socket.emit('newChannel', {
          name: channelName,
        }, (response) => {
          if (response.status === 'ok') {
            setFormDisabled(false);
            const { id } = response.data;
            changeChannel({ id });
            f.resetForm();
            handleClose();
          }
        });
      } else {
        setError(t(validate));
        setFormInvalid(true);
      }
    },
  });

  return (
    <Modal
      show={newChannelModalShow}
      onHide={handleClose}
      backdrop="static"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {t('modals.addChannel')}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={f.handleSubmit}>
          <Form.Control
            ref={inputRef}
            type="text"
            name="channelName"
            autoComplete="channelName"
            id="channelName"
            onChange={f.handleChange}
            value={f.values.channelName}
            disabled={formDisabled}
            isInvalid={formInvalid}
            data-testid="add-channel"
          />
          <Form.Control.Feedback type="invalid">{useError}</Form.Control.Feedback>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              {t('modals.buttons.cancel')}
            </Button>
            <Button variant="primary" type="submit" disabled={formDisabled}>
              {t('modals.buttons.send')}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default connect(mapStateToProps, actionCreators)(NewChannelModal);
