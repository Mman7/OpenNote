import React from "react";
import { SignOut, getCurrentUser } from "./FireBaseApi";

export default function SideBar({ Sidebar, setisLogin, closeSidebar }) {
  const SignOutHandle = () => {
    SignOut()
      .then(() => setisLogin(false))
      .catch((err) => console.log(err));
  };
  //*FIXME: fix user info styles
  return (
    <div className={`Sidebar ${Sidebar ? "SideBarDisplay" : ""}`}>
      <div className="Close-btn-wrapper">
        <button onClick={closeSidebar}>
          <i className="fas fa-chevron-left"></i>
        </button>
      </div>
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
