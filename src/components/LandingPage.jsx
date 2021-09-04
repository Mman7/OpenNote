import React, { useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import NoteImage from "../Image_Source/Note.jpg";

import { GoogleSignIn } from "./FireBaseApi";

export default function LandingPage({ isLogin, setisLogin }) {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log("user login now change state");
      setisLogin(true);
    } else {
      console.log("user not login");
    }
  });
  const LoginHandle = (e) => {
    e.preventDefault();
    GoogleSignIn();
  };

  return (
    <div className={`Landing-Page ${isLogin ? "isLogin" : "nothign"}`}>
      <div className="Login">
        <div className="image">
          <p>
            Your Notes<br></br>You decise
          </p>
          <img src={NoteImage} alt="Note" />
        </div>
        <form action="submit">
          <input type="text" placeholder="User" />
          <input type="text" placeholder="Password" />
          <section className="Provider-SignIn">
            Other Ways:
            <button onClick={LoginHandle}>
              <i className="fab fa-google"></i>
            </button>
          </section>
        </form>
      </div>
    </div>
  );
}
