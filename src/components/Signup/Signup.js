import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import firebase from '../../config/firebase';
import { Form, Input, Button } from 'antd';
import './Signup.scss';

const Signup = ({ history }) => {
  const handleSignUp = useCallback(
    async event => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await firebase
          .auth()
          .createUserWithEmailAndPassword(email.value, password.value);
        history.push('/');
      } catch (error) {
        alert(error);
      }
    },
    [history],
  );

  return (
    <div className="register-form-layout">
      <h1>Sign up</h1>
      <Form onSubmit={handleSignUp} className="register-form">
        <Input name="email" type="email" placeholder="Email" />
        <Input name="password" type="password" placeholder="Password" />
        <Button htmlType="submit">Sign Up</Button>
      </Form>
    </div>
  );
};

Signup.propTypes = {
  history: PropTypes.instanceOf(Object),
};

export default withRouter(Signup);
