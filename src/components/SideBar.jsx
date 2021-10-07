import React from "react";

import { SignOut, getCurrentUser } from "./FireBaseApi";

export default function SideBar({ Sidebar, setisLogin }) {
  const SignOutHandle = () => {
    const isLoginState = setisLogin;
    SignOut(isLoginState);
  };

  return (
    <div className={`Sidebar ${Sidebar ? "SideBarDisplay" : ""}`}>
      <div className="User-Info">
        <a>
          <img src={getCurrentUser()?.photoURL} alt="User Img" />
        </a>
        <h1 className="user-display-name">{getCurrentUser()?.displayName}</h1>
        <h1 className="user-email">{getCurrentUser()?.email}</h1>
      </div>
      <button className="hey">hey2</button>
      <button>hey3</button>
      <button>hey4</button>
      <button className="SignOut" onClick={SignOutHandle}>
        SignOut
      </button>
    </div>
  );
}
