import React, { useContext } from "react";
import { ShowEditContext } from "../OpenNote";
import { isDifferentContext } from "../Context/NoteIsDifferentProvider";
import { EditNoteContext } from "../Context/EditNoteContextProvider";
import { NewNote } from "../FireBaseApi";

export default function ViewNavBar() {
  const [, setShowEdit] = useContext(ShowEditContext);
  const [isDifferent, setisDifferent] = useContext(isDifferentContext);
  const [CurrentEditNote, setCurrentEditNote] = useContext(EditNoteContext);

  const BackToNotePage = () => {
    setShowEdit((prev) => !prev);
    //clean CurrentEditNote
    setCurrentEditNote();
  };

  const isDifferentHandler = () => (isDifferent ? "Save-Note-btn-show" : "");

  const saveChangesHandler = () => {
    console.log(CurrentEditNote);
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
