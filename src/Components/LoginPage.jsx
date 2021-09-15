// @ts-nocheck

import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import * as yup from 'yup';

const LoginPage = () => {
  const inputRef = useRef();
  const [authFailed, setAuthFailed] = useState(false);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const f = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: ({ username, password }) => {
      const schema = yup
        .string()
        .min(6)
        .required();
      try {
        schema.validateSync(username);
        schema.validateSync(password);
      } catch (err) {
        setAuthFailed(true);
      }
    },
  });

  return (
    <div className="row justify-content-center align-content-center h-100">
      <div className="col-md-3">
        <div className="card shadow-sm">
          <div className="card-body p-5">
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
              <Button variant="outline-primary" type="submit">
                Войти
              </Button>
            </Form>
          </div>
          <div className="card-footer p-4">
            <div className="text-center">
              <span>Нет аккаунта? </span>
              <a href="/signup">Регистрация</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
