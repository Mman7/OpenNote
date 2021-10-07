import React, { useContext } from "react";
import { isSignInChecker } from "./FireBaseApi";
import { Form, Button } from "react-bootstrap";
import { GoogleSignIn } from "./FireBaseApi";
import { isLoadingContext } from "./Context/LoadingContextProvider";

export default function LandingPage({ isLogin, setisLogin }) {
  const [isLoading, ChangeIsLoading] = useContext(isLoadingContext);
  const setisLoginState = setisLogin;
  isSignInChecker(setisLoginState);

  const LoginHandle = async (e) => {
    e.preventDefault();
    ChangeIsLoading();
    await GoogleSignIn(setisLoginState);
  };

  return (
    <div className={`Landing-Page ${isLogin ? "isLogin" : "nothign"}`}>
      <div className="Login">
        <div className="image">
          <p>Welcome to OpenNote</p>
        </div>

        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="form-label">Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
          <Form.Group className="Provider-SignIn">
            <Button onClick={LoginHandle}>
              <i className="fab fa-google"></i>
            </Button>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
}
