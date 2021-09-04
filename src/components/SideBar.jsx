import React, { useContext } from "react";

import { SignOut, getCurrentUser } from "./FireBaseApi";

export default function SideBar({ Sidebar, setisLogin }) {
  const SignOutHandle = () => {
    SignOut();
    setisLogin(false);
  };

  return (
    <div className={`Sidebar ${Sidebar ? "SideBarDisplay" : ""}`}>
      <button>
        <img src={getCurrentUser()} alt="" />
      </button>

      <button className="SignOut" onClick={SignOutHandle}>
        SignOut
      </button>
    </div>
  );
}
