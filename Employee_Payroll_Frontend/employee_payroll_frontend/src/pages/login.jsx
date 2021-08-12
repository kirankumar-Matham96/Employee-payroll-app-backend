import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import '../style/login.scss';
import { IoPersonCircleOutline } from 'react-icons/io5';
import Title from '../components/title';
import Rigister from './register';

const schema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().min(8).max(20).required(),
});

const Login = () => {
  const [initialState, setInitialState] = useState({
    email: '',
    password: '',
  });
  return (
    <div className="login-page">
      <div className="login-card">
        <div>
          <Title />
        </div>
        <h5>Login here</h5>
        <div className="icon-div">
          <IoPersonCircleOutline className="icon" />
        </div>
        <Formik
          validationSchema={schema}
          onSubmit={'hehe'}
          initialValues={initialState}
        >
          {({ handleSubmit, handleChange, errors, touched, values }) => {
            return (
              <Form className="login-form">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    isValid={touched.email && !errors.email}
                    isInvalid={!!errors.email}
                    placeholder="Email"
                    autoComplete="off"
                    // required
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    isValid={touched.password && !errors.password}
                    isInvalid={!!errors.password}
                    placeholder="Password"
                    autoComplete="off"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Login
                </Button>
              </Form>
            );
          }}
        </Formik>
        <div>
          <Link to="/">Create Account</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
