// @ts-check

import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import { Button, Form } from 'react-bootstrap';

const LoginPage = () => {
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const f = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: ({ username, password }) => {
      console.log(username + password);
    },
  });

  return (
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
          isInvalid={false}
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
          isInvalid={false}
          onChange={f.handleChange}
          value={f.values.password}
        />
        <Form.Control.Feedback type="invalid">неверные имя пользователя или пароль</Form.Control.Feedback>
      </Form.Group>
      <Button variant="outline-primary" type="submit">
        Войти
      </Button>
    </Form>
  );
};

export default LoginPage;
