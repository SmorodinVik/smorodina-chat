// @ts-check

import React, { useRef, useEffect, useState } from 'react';
import {
  Form, Button, Modal,
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { useFormik } from 'formik';
import validateChannelName from '../../uitls.js';

const mapStateToProps = ({ channels }) => ({
  channelNames: channels.map(({ name }) => name),
  channelsById: channels.reduce((acc, { id, name }) => ({ ...acc, [id]: name }), {}),
});

const RenameChannelModal = ({
  renameChannelModalShow, setRenameChannelModalShow, channelId, socket, channelNames, channelsById,
}) => {
  const handleClose = () => setRenameChannelModalShow(false);

  const [formDisabled, setFormDisabled] = useState(false);
  const [formInvalid, setFormInvalid] = useState(false);
  const [useError, setError] = useState('');

  const inputRef = useRef();

  useEffect(() => {
    if (inputRef.current) {
      // @ts-ignore
      inputRef.current.select();
    }
  }, []);

  const f = useFormik({
    initialValues: {
      channelName: channelsById[channelId],
    },
    onSubmit: ({ channelName }) => {
      const validate = validateChannelName(channelName, channelNames);
      if (!validate) {
        setFormInvalid(false);
        setFormDisabled(true);
        socket.emit('renameChannel', {
          id: channelId,
          name: channelName,
        }, (response) => {
          if (response.status === 'ok') {
            setFormDisabled(false);
            f.resetForm();
            handleClose();
          }
        });
      } else {
        setError(validate);
        setFormInvalid(true);
      }
    },
  });

  return (
    <Modal
      show={renameChannelModalShow}
      onHide={handleClose}
      backdrop="static"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>
          Переименовать канал
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
          />
          <Form.Control.Feedback type="invalid">{useError}</Form.Control.Feedback>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Отменить
            </Button>
            <Button variant="primary" type="submit" disabled={formDisabled}>
              Отправить
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default connect(mapStateToProps, null)(RenameChannelModal);
