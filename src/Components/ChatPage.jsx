// @ts-check

import React, { useEffect, useRef, useState } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';
import axios from 'axios';
import routes from '../routes.js';

const Channels = () => {
  console.log('channels');
  return (
    <div className="col-4 col-md-2 border-end pt-5 px-4 bg-light">
      <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
        <span style={{ fontSize: '20px' }}>Каналы</span>
        <button type="button" className="p-0 text-primary btn btn-group-vertical">
          <span>+</span>
        </button>
      </div>
      <ul className="nav flex-column nav-pills nav-fill px-0">
        <li className="nav-item w-100" key="1">
          general
        </li>
        <li className="nav-item w-100" key="2">
          random
        </li>
      </ul>
    </div>
  );
};

const Chat = () => {
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

export default () => {
  useEffect(() => {
    const { token } = JSON.parse(localStorage.getItem('userId'));
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const getData = async () => {
      const res = await axios.get(routes.dataPath(), config);
    };
    const timerId = setInterval(getData, 1000);
    return () => clearInterval(timerId);
  });

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <Channels />
        <Chat />
      </div>
    </div>
  );
};
