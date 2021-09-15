// @ts-nocheck

import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import { Button, Form, Card } from 'react-bootstrap';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';
// import * as yup from 'yup';
import useAuth from '../hooks/index.jsx';
import routes from '../routes.js';

const LoginPage = () => {
  const inputRef = useRef();
  const auth = useAuth();
  const history = useHistory();
  const [authFailed, setAuthFailed] = useState(false);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const f = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async ({ username, password }) => {
      try {
        const res = await axios.post(routes.loginPath(), { username, password });
        auth.logIn();
        localStorage.setItem('userId', JSON.stringify(res.data));
        history.push('/');
      } catch (err) {
        setAuthFailed(true);
        inputRef.current.select();
      }
    },
  });

  return (
    <div className="row justify-content-center align-content-center h-100">
      <div className="col-md-4">
        <Card className="shadow-sm">
          <Card.Body className="p-5">
            <Form onSubmit={f.handleSubmit}>
              <h2 className="text-center mb-4">Войти</h2>
              <Form.Group>
                <Form.Control
                  ref={inputRef}
                  placeholder="Ваш ник"
                  name="username"
                  autoComplete="username"
                  required
                  id="username"
                  isInvalid={authFailed}
                  onChange={f.handleChange}
                  value={f.values.username}
                />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  placeholder="Пароль"
                  name="password"
                  autoComplete="password"
                  required
                  id="password"
                  isInvalid={authFailed}
                  onChange={f.handleChange}
                  value={f.values.password}
                />
                <Form.Control.Feedback type="invalid">Неверные имя пользователя или пароль</Form.Control.Feedback>
              </Form.Group>
              <Button className="w-100 mb-3" variant="outline-primary" type="submit">
                Войти
              </Button>
            </Form>
          </Card.Body>
          <Card.Footer className="p-4">
            <div className="text-center">
              <span>Нет аккаунта? </span>
              <Link to="/signup">Регистрация</Link>
            </div>
          </Card.Footer>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
