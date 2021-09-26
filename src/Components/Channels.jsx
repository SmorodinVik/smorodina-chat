// @ts-check

import React, { useState } from 'react';
import {
  Button, Nav, Dropdown, ButtonGroup,
} from 'react-bootstrap';
import { connect } from 'react-redux';
import * as actions from '../storeSlices/index.js';
import NewChannelModal from './Modals/NewChannelModal.jsx';
import RemoveChannelModal from './Modals/RemoveChannelModal.jsx';
import RenameChannelModal from './Modals/RenameChannelModal.jsx';

const mapStateToProps = ({ channels, currentChannelId }) => ({
  channels, currentChannelId,
});

const actionCreators = {
  changeChannel: actions.changeChannel,
};

const Channels = ({
  channels, currentChannelId, changeChannel, socket,
}) => {
  const [newChannelModalShow, setNewChannelModalShow] = useState(false);
  const [renameChannelModalShow, setRenameChannelModalShow] = useState(false);
  const [removeChannelModalShow, setRemoveChannelModalShow] = useState(false);
  const [selectedChannelId, setSelectedChannelId] = useState(null);

  const handleClick = (id) => () => changeChannel({ id });

  const handleRemoveChannel = (id) => () => {
    setSelectedChannelId(id);
    setRemoveChannelModalShow(true);
  };

  const handleRenameChannel = (id) => () => {
    setSelectedChannelId(id);
    setRenameChannelModalShow(true);
  };

  const buildChannelList = (list) => {
    if (list.length === 0) {
      return null;
    }
    return list.map(({ id, name, removable }) => {
      const variant = id === currentChannelId ? 'secondary' : 'secondary-outline';
      if (!removable) {
        return (
          <Nav.Item className="w-100" key={id}>
            <Button variant={variant} className="w-100 rounded-0 text-left" onClick={handleClick(id)}>
              <span className="me-1"># </span>
              {name}
            </Button>
          </Nav.Item>
        );
      }
      return (
        <Nav.Item className="w-100" key={id}>
          <Dropdown as={ButtonGroup}>
            <Button variant={variant} className="w-100 rounded-0 text-left text-truncate" onClick={handleClick(id)}>
              <span className="me-1"># </span>
              {name}
            </Button>
            <Dropdown.Toggle split variant={variant} />
            <Dropdown.Menu>
              <Dropdown.Item onClick={handleRenameChannel(id)}>Переименовать</Dropdown.Item>
              <Dropdown.Item onClick={handleRemoveChannel(id)}>Удалить</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav.Item>
      );
    });
  };

  return (
    <div className="col-4 col-md-2 border-end pt-5 px-4 bg-light">
      <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
        <span style={{ fontSize: '20px' }}>Каналы</span>
        <button type="button" className="p-0 text-primary btn btn-group-vertical" onClick={() => setNewChannelModalShow(true)}>
          <span>+</span>
        </button>
      </div>
      <Nav className="flex-column">
        {buildChannelList(channels)}
      </Nav>
      <NewChannelModal
        newChannelModalShow={newChannelModalShow}
        setNewChannelModalShow={setNewChannelModalShow}
        socket={socket}
      />
      <RemoveChannelModal
        removeChannelModalShow={removeChannelModalShow}
        setRemoveChannelModalShow={setRemoveChannelModalShow}
        channelId={selectedChannelId}
        socket={socket}
      />
      {renameChannelModalShow && (
      <RenameChannelModal
        renameChannelModalShow={renameChannelModalShow}
        setRenameChannelModalShow={setRenameChannelModalShow}
        channelId={selectedChannelId}
        socket={socket}
      />
      )}
    </div>
  );
};

export default connect(mapStateToProps, actionCreators)(Channels);
