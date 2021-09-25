// @ts-check

import React, { useRef, useEffect } from 'react';
import {
  Form, Button, Modal,
} from 'react-bootstrap';
import { useFormik } from 'formik';

const RenameChannelModal = ({
  renameChannelModalShow, setRenameChannelModalShow, channelId, socket,
}) => {
  const handleClose = () => setRenameChannelModalShow(false);

  const inputRef = useRef();

  useEffect(() => {
    if (inputRef.current) {
      // @ts-ignore
      inputRef.current.focus();
    }
  });

  const f = useFormik({
    initialValues: {
      channelName: 'hello',
    },
    onSubmit: ({ channelName }) => {
      socket.emit('renameChannel', {
        id: channelId,
        name: channelName,
      }, (response) => {
        if (response.status === 'ok') {
          f.resetForm();
          handleClose();
        }
      });
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
          />
          <Form.Control.Feedback type="invalid">Проблемы с сетью</Form.Control.Feedback>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Отменить
            </Button>
            <Button variant="primary" type="submit">
              Переименовать
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RenameChannelModal;
