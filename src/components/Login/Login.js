import React, { useCallback, useContext } from 'react';
import PropTypes from 'prop-types';
import firebase from '../../config/firebase';
import { Form, Input, Button } from 'antd';
import { Link, Redirect, withRouter } from 'react-router-dom';
import './Login.scss';
import { AuthContext } from '../../auth/Auth';

const Login = ({ history }) => {
  const handleLogin = useCallback(
    async event => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await firebase
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
        history.push('/');
      } catch (error) {
        alert(error);
      }
    },
    [history],
  );

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <div className="login-form-layout">
      <h2>Log in</h2>
      <Form onSubmit={handleLogin} className="login-form">
        <Input name="email" type="email" placeholder="Email" />
        <Input name="password" type="password" placeholder="Password" />
        <div className="submit-block">
          <Button htmlType="submit">Log in</Button>
          or
          <Link to="/signup" className="signup-link">
            register now!
          </Link>
        </div>
      </Form>
    </div>
  );
};

Login.propTypes = {
  history: PropTypes.instanceOf(Object),
};

export default withRouter(Login);
