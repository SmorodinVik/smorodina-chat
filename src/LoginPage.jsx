// @ts-check

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
    <div className="container p-3">
      <h2 className="text-center mt-5 mb-4">Войти</h2>
      <Form onSubmit={f.handleSubmit}>
        <Form.Group>
          <Form.Label htmlFor="username">Username</Form.Label>
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
          <Form.Label htmlFor="password">Password</Form.Label>
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
  );
};

export default LoginPage;
