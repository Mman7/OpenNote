import React, { createRef } from "react";
import { Form, Button } from "react-bootstrap";
import { createAccountWithEmail } from "./FireBaseApi";

const EmailRef = createRef();
const PasswordRef = createRef();

export default function SignInPage({ ShowSignUpPageHandler }) {
  const createAccountHandler = () => {
    createAccountWithEmail();
  };
  return (
    <div className="sign-in-page">
      <Form>
        <h1>Sign Up</h1>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control ref={EmailRef} type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            ref={PasswordRef}
            type="password"
            placeholder="Password"
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
        <button
          onClick={ShowSignUpPageHandler}
          className="back-to-login-wrapper"
        >
          <i className="fas fa-caret-left back-to-login"></i>
          <h2>Back to Login</h2>
        </button>
      </Form>
    </div>
  );
}