import React, { useContext, useEffect } from "react";
import { ShowEditContext } from "../OpenNote";
import { isDifferentContext } from "../Context/NoteIsDifferentProvider";
import { NoteContext } from "../Context/NoteListContextProvider";
import { EditNoteContext } from "../Context/EditNoteContextProvider";
import { SaveNote_To_DataBase, getData_From_DataBase } from "../FireBaseApi";
import { GlobalNoteContext } from "../Context/GlobalValueContext";

export default function ViewNavBar() {
  const [Notes, setNotes, UpdateList] = useContext(NoteContext);
  const [, setShowEdit] = useContext(ShowEditContext);
  const [isDifferent, setisDifferent] = useContext(isDifferentContext);
  const [CurrentEditNote, setCurrentEditNote] = useContext(EditNoteContext);
  const [GlobalValueContext, setGlobalValueContext] =
    useContext(GlobalNoteContext);

  const BackToNotePage = async () => {
    setShowEdit((prev) => !prev);

    //clean CurrentEditNote and GlobalValueContext
    setCurrentEditNote(null);
    setGlobalValueContext(null);

    // keep update
    UpdateList();
  };

  const isDifferentHandler = () => (isDifferent ? "Save-Note-btn-show" : "");

  //TODO make a isLoading
  const saveChangesHandler = async () => {
    await SaveNote_To_DataBase(GlobalValueContext);
    await setisDifferent(false);
    await UpdateList();
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
    </div>
  );
}
