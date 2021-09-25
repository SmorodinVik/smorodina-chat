// @ts-check

import React from 'react';
import {
  Button, Modal,
} from 'react-bootstrap';

const RemoveChannelModal = ({
  removeChannelModalShow, setRemoveChannelModalShow, channelId, socket,
}) => {
  const handleClose = () => setRemoveChannelModalShow(false);

  const removeChannel = (id) => () => {
    socket.emit('removeChannel', { id }, (response) => {
      if (response.status === 'ok') {
        handleClose();
      }
    });
  };

  return (
    <Modal
      show={removeChannelModalShow}
      onHide={handleClose}
      backdrop="static"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>
          Удалить канал
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">Уверены?</p>
        <div className="d-flex justify-content-end">
          <Button variant="secondary" onClick={handleClose}>
            Отменить
          </Button>
          <Button variant="danger" onClick={removeChannel(channelId)} className="btn-space">
            Удалить
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveChannelModal;
