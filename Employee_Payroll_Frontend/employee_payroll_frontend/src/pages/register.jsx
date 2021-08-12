import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Col, Row, Button, Form } from 'react-bootstrap';
import { Formik } from 'formik';
import Service from '../services/user';
import * as Yup from 'yup';
import '../style/register.scss';
import Title from '../components/title';

class register extends Component {
  initialState = {
    isPasswordVisible: false,
    formValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      isPasswordVisible: false,
      formValues: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
      },
    };
  }

  passwordVisibilityHandler = () => {
    const setShowPassword = this.state.isPasswordVisible;
    this.setState({
      isPasswordVisible: !setShowPassword,
    });
  };

  handleSubmit = () => {
    const data = {
      firstName: this.state.formValues.firstName,
      lastName: this.state.formValues.lastName,
      email: this.state.formValues.email,
      password: this.state.formValues.password,
    };
    Service.register(data)
      .then((data) => console.log(`res data: ${data}`))
      .catch((err) => console.log('err: ', err));
  };

  render() {
    const { isPasswordVisible } = this.state;
    const schema = Yup.object().shape({
      firstName: Yup.string()
        .required('First Name is required')
        .min(2)
        .max(20)
        .matches('^[A-Za-z\\s]{1,20}'),
      lastName: Yup.string()
        .required('Last Name is required')
        .min(2)
        .max(20)
        .matches('^[A-Za-z]{1}[A-Za-z\\s]{1,20}'),
      email: Yup.string().email().required('Email is required'),
      password: Yup.string().required('password is required').min(8).max(20),
      confirmPassword: Yup.string()
        .required('Confirm Password is required')
        .matches(this.state.formValues.password),
    });
    return (
      <div className="register-page">
        <div className="register-card">
          <div>
            <Title />
            <h5>Register with us now</h5>
          </div>
          <Formik
            validationSchema={schema}
            // onSubmit={console.log('Submitted')}
            initialValues={this.initialState}
          >
            {({ handleChange, errors, values, touched }) => {
              return (
                <Form onSubmit={this.handleSubmit}>
                  <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridFirstName">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="firstName"
                        value={values.firstName}
                        onChange={handleChange}
                        isValid={touched.firstName && !errors.firstName}
                        isInvalid={!!errors.firstName}
                        placeholder="Kiran kumar"
                        autoComplete="off"
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.firstName}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridLastName">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="lastName"
                        value={values.lastName}
                        onChange={handleChange}
                        isValid={touched.lastName && !errors.lastName}
                        isInvalid={!!errors.lastName}
                        placeholder="Matham"
                        autoComplete="off"
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.lastName}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>

                  <Form.Group className="mb-3" controlId="formGridEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      isValid={touched.email && !errors.email}
                      isInvalid={!!errors.email}
                      placeholder="kiran.matham@gmail.com"
                      autoComplete="off"
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.email}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Text type="muted" className="muted_text">
                    You can use letters, numbers & periods
                  </Form.Text>

                  <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type={isPasswordVisible ? 'text' : 'password'}
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

                    <Form.Group as={Col} controlId="formGridConfirmPassword">
                      <Form.Label>Confirm Password</Form.Label>
                      <Form.Control
                        type={isPasswordVisible ? 'text' : 'password'}
                        name="confirmPassword"
                        value={values.confirmPassword}
                        onChange={handleChange}
                        isValid={
                          touched.confirmPassword && !errors.confirmPassword
                        }
                        isInvalid={!!errors.confirmPassword}
                        placeholder="Confirm Password"
                      />
                    </Form.Group>
                  </Row>
                  <Form.Text type="muted" className="muted_text">
                    Use 8 or more characters with a mix of letters, numbers &
                    symbols
                  </Form.Text>

                  <Form.Group className="mb-3" id="formGridCheckbox">
                    <Form.Check
                      type="checkbox"
                      label="Show password"
                      onClick={this.passwordVisibilityHandler}
                    />
                  </Form.Group>

                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                </Form>
              );
            }}
          </Formik>
          <Link to="/login" className="linkInRegister">
            Login instead
          </Link>
        </div>
      </div>
    );
  }
}

export default register;
