// @ts-nocheck

import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import { Button, Form, Card } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import axios from 'axios';
// import * as yup from 'yup';
import useAuth from '../hooks/index.jsx';
import routes from '../routes.js';

const SignUpPage = () => {
  const inputRef = useRef();
  const auth = useAuth();
  const history = useHistory();
  const { t } = useTranslation();

  const [formDisabled, setFormDisabled] = useState(false);
  const [nameError, setNameError] = useState(null);
  const [passError, setPassError] = useState(null);
  const [confirmPassError, setConfirmPassError] = useState(null);

  useEffect(() => {
    auth.logOut();
  }, []);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const resetErrors = () => {
    setNameError(null);
    setPassError(null);
    setConfirmPassError(null);
  };

  const nameValidate = (name) => {
    const schema = yup
      .string()
      .min(3, t('signupPage.errors.notLessThan3Symb'))
      .max(20, t('signupPage.errors.notMoreThan20Symb'))
      .required(t('signupPage.errors.required'));
    try {
      schema.validateSync(name);
      return null;
    } catch (err) {
      return err.message;
    }
  };

  const passValidate = (pass) => {
    const schema = yup
      .string()
      .min(6, t('signupPage.errors.notLessThan6Symb'))
      .required(t('signupPage.errors.required'));
    try {
      schema.validateSync(pass);
      return null;
    } catch (err) {
      return err.message;
    }
  };

  const f = useFormik({
    initialValues: {
      username: '',
      password: '',
      passwordConfirmation: '',
    },
    onSubmit: async ({ username, password, passwordConfirmation }) => {
      resetErrors();

      const nameValidation = nameValidate(username);
      if (nameValidation) {
        setNameError(nameValidation);
        inputRef.current.select();
        return;
      }

      const passValidation = passValidate(password);
      if (passValidation) {
        setPassError(passValidation);
        return;
      }

      if (password !== passwordConfirmation) {
        setConfirmPassError(t('signupPage.errors.passwordsMustMatch'));
        return;
      }
      try {
        setFormDisabled(true);
        const res = await axios.post(routes.signupPath(), { username, password });
        auth.logIn();
        localStorage.setItem('userId', JSON.stringify(res.data));
        history.push('/');
      } catch (err) {
        setFormDisabled(false);
        if (err.response.status === 409) {
          setNameError(t('signupPage.errors.userAlreadyExists'));
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
                  <Form.Control
                    ref={inputRef}
                    placeholder={t('signupPage.name')}
                    name="username"
                    autoComplete="username"
                    required
                    id="username"
                    isInvalid={nameError}
                    onChange={f.handleChange}
                    value={f.values.username}
                    disabled={formDisabled}
                  />
                  <Form.Control.Feedback type="invalid">{nameError}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                  <Form.Control
                    type="password"
                    placeholder={t('signupPage.pass')}
                    name="password"
                    required
                    id="password"
                    isInvalid={passError}
                    onChange={f.handleChange}
                    value={f.values.password}
                    disabled={formDisabled}
                  />
                  <Form.Control.Feedback type="invalid">{passError}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                  <Form.Control
                    type="password"
                    placeholder={t('signupPage.passConf')}
                    name="passwordConfirmation"
                    required
                    id="passwordConfirmation"
                    isInvalid={confirmPassError}
                    onChange={f.handleChange}
                    value={f.values.passwordConfirmation}
                    disabled={formDisabled}
                  />
                  <Form.Control.Feedback type="invalid">{confirmPassError}</Form.Control.Feedback>
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
