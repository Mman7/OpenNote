import React, { useContext, useState, createRef } from "react";

import { isSignInChecker, SignInWithEmail, GoogleSignIn } from "./FireBaseApi";

import { Form, Button } from "react-bootstrap";

import { isLoadingContext } from "./Context/LoadingContextProvider";

import SignInPage from "./SignIn";
import PopUp from "./PopUp";

import "bootstrap/dist/css/bootstrap.min.css";

const EmailRef = createRef();
const PasswordRef = createRef();

export default function LandingPage({ isLogin, setisLogin }) {
  const [isLoading, ChangeIsLoading] = useContext(isLoadingContext);
  const [ShowSignUpPage, setShowSignUpPage] = useState(false);

  const isSignInCheckerHandler = async () => {
    isSignInChecker(setisLogin)
      .then(() => setisLogin(true))
      .catch((err) => console.log(err));
  };

  //intial signin
  isSignInCheckerHandler();

  const ShowSignUpPageHandler = () => {
    setShowSignUpPage((prev) => !prev);
  };

  const LoginHandle = async (e) => {
    e.preventDefault();
    ChangeIsLoading();
    await GoogleSignIn();
  };

  const Login = async (e) => {
    try {
      e.preventDefault();
      const email = EmailRef.current.value;
      const password = PasswordRef.current.value;
      const isSignIn = await SignInWithEmail(email, password);
    } catch (err) {
      PopUp(err.code);
    }
  };

  return (
    <div className={`Landing-Page ${isLogin ? "isLogin" : "nothign"}`}>
      {ShowSignUpPage ? (
        <SignInPage ShowSignUpPageHandler={ShowSignUpPageHandler} />
      ) : (
        <div className="Login">
          <div className="image">
            <p>Welcome to OpenNote</p>
          </div>
          <Form className="Login-form">
            <h1 className="Login-text">Login</h1>
            <Form.Group className="mb-1" controlId="formBasicEmail">
              <Form.Label className="form-label">Email address</Form.Label>
              <Form.Control
                ref={EmailRef}
                type="email"
                placeholder="Enter email"
              />
            </Form.Group>

            <Form.Group className="mb-1" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                ref={PasswordRef}
                type="password"
                placeholder="Password"
              />
            </Form.Group>
            <Button onClick={(e) => Login(e)} variant="primary" type="submit">
              Login
            </Button>
            <Form.Group className="Provider-SignIn">
              <Button onClick={LoginHandle}>
                <i className="fab fa-google"></i>
              </Button>
            </Form.Group>
            <Form.Group className="sign-in-section">
              <h5>Don't have an account?</h5>
              <Button onClick={ShowSignUpPageHandler}>Create Account</Button>
            </Form.Group>
          </Form>
        </div>
      )}
    </div>
  );
}
