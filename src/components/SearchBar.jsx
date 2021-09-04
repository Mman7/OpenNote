import React, { useContext } from "react";
import { ShowEditContext } from "./OpenNote";

export default function SearchBar() {
  const [, setShowEdit, setSidebar] = useContext(ShowEditContext);
  const AddNote = () => {
    setShowEdit((prev) => !prev);
    setSidebar(false);
  };
  return (
    <div className="Searchbar">
      <i className="fas fa-search"></i>
      <input type="text" />
      <button className="Add-btn" onClick={AddNote}>
        <i className="fas fa-plus-square"></i>
      </button>
    </div>
  );
}
