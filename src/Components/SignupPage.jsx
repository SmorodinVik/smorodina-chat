// @ts-nocheck

import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import {
  Button, Form, Card, FloatingLabel,
} from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import axios from 'axios';
import useAuth from '../hooks/index.jsx';
import routes from '../routes.js';

const SignUpPage = () => {
  const inputRef = useRef();
  const auth = useAuth();
  const history = useHistory();
  const { t } = useTranslation();

  const [formDisabled, setFormDisabled] = useState(false);
  const [signupError, setSignupError] = useState(null);

  useEffect(() => {
    auth.logOut();
  }, []);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const validationSchema = yup.object().shape({
    username: yup
      .string()
      .required(t('signupPage.errors.required'))
      .min(3, t('signupPage.errors.from3To20Symb'))
      .max(20, t('signupPage.errors.from3To20Symb')),
    password: yup
      .string()
      .required(t('signupPage.errors.required'))
      .min(6, t('signupPage.errors.notLessThan6Symb')),
    confirmPassword: yup
      .string()
      .required(t('signupPage.errors.required'))
      .oneOf([yup.ref('password')], 'signupPage.errors.passwordsMustMatch'),
  });

  const f = useFormik({
    validationSchema,
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    onSubmit: async ({ username, password }) => {
      try {
        setFormDisabled(true);
        setSignupError(null);
        const res = await axios.post(routes.signupPath(), { username, password });
        auth.logIn();
        localStorage.setItem('userId', JSON.stringify(res.data));
        history.push('/');
      } catch (err) {
        setFormDisabled(false);
        if (err.response.status === 409) {
          setSignupError('signupPage.errors.userAlreadyExists');
        }
        console.log(err);
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
                <h2 className="text-center mb-4">{t('signupPage.header')}</h2>
                <Form.Group>
                  <FloatingLabel
                    controlId="username"
                    label={t('signupPage.name')}
                    className="mb-3"
                  >
                    <Form.Control
                      ref={inputRef}
                      placeholder={t('signupPage.name')}
                      name="username"
                      autoComplete="username"
                      required
                      id="username"
                      isInvalid={f.errors.username || signupError}
                      onChange={f.handleChange}
                      value={f.values.username}
                      disabled={formDisabled}
                    />
                    <Form.Control.Feedback type="invalid" tooltip>{t(f.errors.username)}</Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>
                <Form.Group>
                  <FloatingLabel
                    controlId="password"
                    label={t('signupPage.pass')}
                    className="mb-3"
                  >
                    <Form.Control
                      type="password"
                      placeholder={t('signupPage.pass')}
                      name="password"
                      required
                      id="password"
                      isInvalid={f.errors.password || signupError}
                      onChange={f.handleChange}
                      value={f.values.password}
                      disabled={formDisabled}
                    />
                    <Form.Control.Feedback type="invalid" tooltip>{t(f.errors.password)}</Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>
                <Form.Group>
                  <FloatingLabel
                    controlId="confirmPassword"
                    label={t('signupPage.confirmPass')}
                    className="mb-3"
                  >
                    <Form.Control
                      type="password"
                      placeholder={t('signupPage.confirmPass')}
                      name="confirmPassword"
                      required
                      id="confirmPassword"
                      isInvalid={f.errors.confirmPassword || signupError}
                      onChange={f.handleChange}
                      value={f.values.confirmPassword}
                      disabled={formDisabled}
                    />
                    <Form.Control.Feedback type="invalid" tooltip>{t(f.errors.confirmPassword) || t(signupError)}</Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>
                <Button className="w-100 mb-3" variant="outline-primary" type="submit" disabled={formDisabled}>
                  {t('signupPage.regBtn')}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
