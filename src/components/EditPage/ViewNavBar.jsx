import React, { useContext, useEffect, useState } from "react";
import { ShowEditContext } from "../OpenNote";
import { isDifferentContext } from "../Context/NoteIsDifferentProvider";
import { NoteContext } from "../Context/NoteListContextProvider";
import { EditNoteContext } from "../Context/EditNoteContextProvider";
import { SaveNote_To_DataBase, Delete_Note } from "../FireBaseApi";
import { GlobalNoteContext } from "../Context/GlobalValueContext";
import { Dropdown } from "react-bootstrap";
import { PopCheck } from "../PopUp";
import "bootstrap/dist/css/bootstrap.min.css";

export default function ViewNavBar() {
  const [Notes, setNotes, UpdateList] = useContext(NoteContext);
  const [, setShowEdit] = useContext(ShowEditContext);
  const [isDifferent, setisDifferent] = useContext(isDifferentContext);
  const [CurrentEditNote, setCurrentEditNote] = useContext(EditNoteContext);
  const [GlobalValueContext, setGlobalValueContext] =
    useContext(GlobalNoteContext);
  const [showMenu, setshowMenu] = useState(false);

  const BackToNotePage = async () => {
    setShowEdit((prev) => !prev);

    //clean CurrentEditNote and GlobalValueContext
    setCurrentEditNote(null);
    setGlobalValueContext(null);

    // keep update
    UpdateList();
  };

  const isDifferentHandler = () => (isDifferent ? "Save-Note-btn-show" : "");

  const menuHandler = () => (showMenu ? "nav-note-menu-hidden" : "");

  const DeleteNoteHandler = () => {
    const noteThatSelected = GlobalValueContext.noteid;
    Delete_Note(noteThatSelected);
    BackToNotePage();
  };

  const saveChangesHandler = async () => {
    await SaveNote_To_DataBase(GlobalValueContext);
    await setisDifferent(false);
    await setshowMenu(true);
    await UpdateList();
    await PopCheck("Note Saved");
  };

  return (
    <div className="ViewNavBar">
      <button onClick={BackToNotePage}>
        <i className="fas fa-chevron-left"></i>
      </button>
      <button
        onClick={saveChangesHandler}
        className={`Save-Note-btn ${isDifferentHandler()}`}
      >
        <i className="fas fa-check-square"></i>
      </button>
      <Dropdown>
        <Dropdown.Toggle
          variant="success"
          id="dropdown-basic"
        ></Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item
            className="menu-fist-item "
            onClick={DeleteNoteHandler}
          >
            <h1>Delete</h1>
            <i className="fas fa-trash trash"></i>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}
