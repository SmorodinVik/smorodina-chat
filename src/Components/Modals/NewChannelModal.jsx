// @ts-check

import React, { useEffect, useRef } from 'react';
import {
  Form, Button, Modal,
} from 'react-bootstrap';
import { useFormik } from 'formik';
// import axios from 'axios';
import { connect } from 'react-redux';
// import routes from '../routes.js';
import * as actions from '../../storeSlices/index.js';

const mapStateToProps = ({ channels }) => ({
  channels: channels.map(({ name }) => name),
});

const actionCreators = {
  changeChannel: actions.changeChannel,
};

const NewChannelModal = ({
  newChannelModalShow, setNewChannelModalShow, socket, changeChannel,
}) => {
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
      socket.emit('newChannel', {
        name: channelName,
      }, (response) => {
        if (response.status === 'ok') {
          const { id } = response.data;
          changeChannel({ id });
          f.resetForm();
          handleClose();
        }
      });
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
          Добавить канал
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
              Добавить
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default connect(mapStateToProps, actionCreators)(NewChannelModal);
