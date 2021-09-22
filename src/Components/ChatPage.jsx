// @ts-check

import React, { useEffect, useRef, useState } from 'react';
import {
  Form, Button, InputGroup, Nav, Dropdown, ButtonGroup,
} from 'react-bootstrap';
import axios from 'axios';
import { connect } from 'react-redux';
import routes from '../routes.js';
import * as actions from '../storeSlices/index.js';

const mapStateToProps = (state) => state;

const actionCreators = {
  loadData: actions.loadData,
};

const Channels = ({ channels }) => {
  const buildChannelList = (list) => list.map(({ id, name, removable }) => {
    if (!removable) {
      return (
        <Nav.Item className="w-100" key={id}>
          <Button variant="secondary-outline" className="w-100 rounded-0 text-left">
            <span className="me-1"># </span>
            {name}
          </Button>
        </Nav.Item>
      );
    }
    return (
      <Nav.Item className="w-100" key={id}>
        <Dropdown as={ButtonGroup}>
          <Button variant="secondary-outline" className="w-100 rounded-0 text-left text-truncate">
            <span className="me-1"># </span>
            {name}
          </Button>
          <Dropdown.Toggle split variant="secondary-outline" />
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => alert('Rename')}>Переименовать</Dropdown.Item>
            <Dropdown.Item onClick={() => alert('Delete')}>Удалить</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Nav.Item>
    );
  });

  return (
    <div className="col-4 col-md-2 border-end pt-5 px-4 bg-light">
      <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
        <span style={{ fontSize: '20px' }}>Каналы</span>
        <button type="button" className="p-0 text-primary btn btn-group-vertical">
          <span>+</span>
        </button>
      </div>
      <Nav className="flex-column">
        {channels && buildChannelList(channels)}
      </Nav>
    </div>
  );
};

const MessageBox = () => {
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b># general</b>
          </p>
          <span className="text-muted"> 2 сообщения</span>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5">
          <div className="text-break mb-2">
            <b>admin</b>
            {': '}
            {'hello'}
          </div>
        </div>
        <div className="mt-auto px-5 py-3">
          <Form>
            <InputGroup className="mb-3">
              <Form.Control
                ref={inputRef}
                placeholder="Введите сообщение..."
                name="message"
                autoComplete="message"
                id="message"
              />
              <Form.Control.Feedback type="invalid">Проблемы с сетью</Form.Control.Feedback>
              <Button variant="outline-primary" type="submit">
                Отправить
              </Button>
            </InputGroup>
          </Form>
        </div>
      </div>
    </div>
  );
};

const Chat = ({ loadData = {}, channels = [] }) => {
  useEffect(() => {
    const { token } = JSON.parse(localStorage.getItem('userId'));
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const getData = async () => {
      const res = await axios.get(routes.dataPath(), config);
      loadData({ data: res.data });
    };
    getData();
  }, []);

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <Channels channels={channels} />
        <MessageBox />
      </div>
    </div>
  );
};

export default connect(mapStateToProps, actionCreators)(Chat);
