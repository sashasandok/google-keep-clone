import React, { useCallback, useContext } from "react";
import firebase from "../../config/firebase";
import { Input, Button } from "antd";
import { Link, Redirect, withRouter } from "react-router-dom";
import "./Login.scss";
import { AuthContext } from "../../auth/Auth";

const Login = ({ history }) => {
  const handleLogin = useCallback(
    async event => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await firebase
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
        history.push("/");
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <div className="login-form-layout">
      <h2>Log in</h2>
      <form onSubmit={handleLogin} className="login-form">
        <Input name="email" type="email" placeholder="Email" />
        <Input name="password" type="password" placeholder="Password" />
        <Button htmlType="submit">Log in</Button>
        Or <Link to="/signup">register now!</Link>
      </form>
    </div>
  );
};

export default withRouter(Login);
