import React, { useCallback } from "react";
import { withRouter } from "react-router-dom";
import firebase from "../../config/firebase";
import { Form, Input, Button } from "antd";
import "./Signup.scss";

const Signup = ({ history }) => {
  const handleSignUp = useCallback(
    async event => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      console.log(email, password);
      try {
        await firebase
          .auth()
          .createUserWithEmailAndPassword(email.value, password.value);
        history.push("/");
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  return (
    <div>
      <h1>Sign up</h1>
      <Form onSubmit={handleSignUp}>
        <Input name="email" type="email" placeholder="Email" />
        <Input name="password" type="password" placeholder="Password" />
        <Button type="submit">Sign Up</Button>
      </Form>
    </div>
  );
};

export default withRouter(Signup);
