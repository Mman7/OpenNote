import React, { useContext } from "react";
import { ShowEditContext } from "./OpenNote";
import { EditNoteContext } from "./Context/EditNoteContextProvider";

export default function SearchBar() {
  const [Edit, setShowEdit, setSidebar] = useContext(ShowEditContext);
  const [CurrentEditNote, setCurrentEditNote] = useContext(EditNoteContext);

  //TODO: New Note btn function
  const AddNote = () => {
    setShowEdit((prev) => !prev);
    setCurrentEditNote("");
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
