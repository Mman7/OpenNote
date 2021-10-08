import React, { useContext, useState, createRef } from "react";
import { isSignInChecker } from "./FireBaseApi";
import { Form, Button } from "react-bootstrap";
import { GoogleSignIn } from "./FireBaseApi";
import { isLoadingContext } from "./Context/LoadingContextProvider";
import { SignInWithEmail } from "./FireBaseApi";
import SignInPage from "./SignIn";

const EmailRef = createRef();
const PasswordRef = createRef();

export default function LandingPage({ isLogin, setisLogin }) {
  const [isLoading, ChangeIsLoading] = useContext(isLoadingContext);
  const [ShowSignUpPage, setShowSignUpPage] = useState(false);
  const setisLoginState = setisLogin;
  isSignInChecker(setisLoginState);

  const ShowSignUpPageHandler = () => {
    setShowSignUpPage((prev) => !prev);
  };
  //FIXME if account is not exist , then show up
  //FIXME if account is existed , then show up
  //*DOC* https://sweetalert2.github.io/#download */

  const LoginHandle = async (e) => {
    e.preventDefault();
    ChangeIsLoading();
    await GoogleSignIn(setisLoginState);
  };

  const SignIn = (e) => {
    e.preventDefault();
    const email = EmailRef.current.value;
    const password = PasswordRef.current.value;
    SignInWithEmail(email, password);
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
          <Form>
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
            <Button onClick={(e) => SignIn(e)} variant="primary" type="submit">
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
