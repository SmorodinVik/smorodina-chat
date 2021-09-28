// @ts-check

import React from 'react';
import {
  Button, Modal,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const RemoveChannelModal = ({
  removeChannelModalShow, setRemoveChannelModalShow, channelId, socket,
}) => {
  const { t } = useTranslation();

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
          {t('modals.deleteChannel')}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('modals.areYouShure')}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          {t('modals.buttons.cancel')}
        </Button>
        <Button variant="danger" onClick={removeChannel(channelId)} className="btn-space">
          {t('modals.buttons.delete')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RemoveChannelModal;
