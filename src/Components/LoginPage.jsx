// @ts-nocheck

import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import {
  Button, Form, Card, FloatingLabel,
} from 'react-bootstrap';
import { useHistory, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import useAuth from '../hooks/index.jsx';
import routes from '../routes.js';

const LoginPage = () => {
  const inputRef = useRef();
  const auth = useAuth();
  const history = useHistory();
  const { t } = useTranslation();
  const [authFailed, setAuthFailed] = useState(false);
  const [formDisabled, setFormDisabled] = useState(false);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const f = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async ({ username, password }) => {
      setFormDisabled(true);
      try {
        const res = await axios.post(routes.loginPath(), { username, password });
        auth.logIn();
        localStorage.setItem('userId', JSON.stringify(res.data));
        history.push('/');
      } catch (err) {
        setAuthFailed(true);
        setFormDisabled(false);
        inputRef.current.select();
      }
    },
  });

  return (
    <div className="d-flex flex-column h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-md-4">
          <Card className="shadow-sm">
            <Card.Body className="p-5">
              <Form onSubmit={f.handleSubmit}>
                <h2 className="text-center mb-4">{t('loginPage.header')}</h2>
                <Form.Group>
                  <FloatingLabel
                    controlId="username"
                    label={t('loginPage.name')}
                    className="mb-3"
                  >
                    <Form.Control
                      ref={inputRef}
                      placeholder={t('loginPage.name')}
                      name="username"
                      autoComplete="username"
                      required
                      id="username"
                      isInvalid={authFailed}
                      onChange={f.handleChange}
                      value={f.values.username}
                      disabled={formDisabled}
                    />
                  </FloatingLabel>
                </Form.Group>
                <Form.Group>
                  <FloatingLabel
                    controlId="password"
                    label={t('loginPage.pass')}
                    className="mb-3"
                  >
                    <Form.Control
                      type="password"
                      placeholder={t('loginPage.pass')}
                      name="password"
                      required
                      id="password"
                      isInvalid={authFailed}
                      onChange={f.handleChange}
                      value={f.values.password}
                      disabled={formDisabled}
                    />
                    <Form.Control.Feedback type="invalid">{t('loginPage.errors.wrongNameOrPass')}</Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>
                <Button className="w-100 mb-3" variant="outline-primary" type="submit" disabled={formDisabled}>
                  {t('loginPage.enterBtn')}
                </Button>
              </Form>
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                <span>{t('loginPage.noAcc')}</span>
                <Link to="/signup">{t('loginPage.registration')}</Link>
              </div>
            </Card.Footer>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
