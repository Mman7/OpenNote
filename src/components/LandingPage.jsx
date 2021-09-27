import React from "react";
import { isSignInChecker } from "./FireBaseApi";

import { GoogleSignIn } from "./FireBaseApi";

export default function LandingPage({ isLogin, setisLogin }) {
  const setisLoginState = setisLogin;
  isSignInChecker(setisLoginState);

  const LoginHandle = (e) => {
    e.preventDefault();
    GoogleSignIn(setisLoginState);
  };

  return (
    <div className={`Landing-Page ${isLogin ? "isLogin" : "nothign"}`}>
      <div className="Login">
        <div className="image">
          <p>Welcome to OpenNote</p>
        </div>
        <form action="submit">
          <h1>Login</h1>
          <input type="text" placeholder="User" />
          <input type="text" placeholder="Password" />
          <section className="Provider-SignIn">
            <fieldset>
              <legend>or</legend>
              <button onClick={LoginHandle}>
                <i className="fab fa-google"></i>
              </button>
            </fieldset>
          </section>
        </form>
      </div>
    </div>
  );
}
