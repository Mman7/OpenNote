import React from "react";

export default function NavBar({ setSidebar }) {
  const SideBarHandle = () => {
    setSidebar((prev) => !prev);
  };

  return (
    <div className="Navbar">
      <button onClick={SideBarHandle}>
        <i className="fas fa-bars"></i>
      </button>
    </div>
  );
}
