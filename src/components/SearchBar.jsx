import React, { useState, useContext, useEffect } from "react";
import { ShowEditContext } from "./OpenNote";
import { EditNoteContext } from "./Context/EditNoteContextProvider";
import { FormControl } from "react-bootstrap";
import { includes } from "lodash";
import { NoteContext } from "./Context/NoteListContextProvider";

export default function SearchBar() {
  const [Notes, setNotes, , hadSearchBarValue, sethadSearchBarValue] =
    useContext(NoteContext);
  const [Edit, setShowEdit, setSidebar] = useContext(ShowEditContext);
  const [CurrentEditNote, setCurrentEditNote] = useContext(EditNoteContext);

  const AddNote = () => {
    setShowEdit((prev) => !prev);
    setCurrentEditNote("");
    setSidebar(false);
  };

  const SearchHandler = (e) => {
    const value = e?.target.value;
    sethadSearchBarValue(value);
  };

  return (
    <div className="Searchbar">
      <i className="fas fa-search"></i>
      <FormControl onChange={(e) => SearchHandler(e)}></FormControl>
      <button className="Add-btn" onClick={AddNote}>
        <i className="fas fa-plus-square"></i>
      </button>
    </div>
  );
}
