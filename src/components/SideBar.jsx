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
          {getCurrentUser()?.photoURL ? (
            <img src={getCurrentUser()?.photoURL} alt="User Img" />
          ) : (
            <i className="fas fa-user-circle default-avatar"></i>
          )}
        </a>
        <h1 className="user-display-name">{getCurrentUser()?.displayName}</h1>
        <h1 className="user-email">{getCurrentUser()?.email}</h1>
      </div>
      {/* <button className="hey">build</button> */}
      <h2 className="hey">App v1.03</h2>
      <button className="SignOut" onClick={SignOutHandle}>
        SignOut
      </button>
    </div>
  );
}
