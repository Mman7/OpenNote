import React, { useState, useContext, useEffect } from "react";
import { NoteContext } from "../Context/NoteListContextProvider";
import { EditNoteContext } from "../Context/EditNoteContextProvider";
import { NormalizeTime } from "../Logical-Javascript/NormalizeTime";
import TextEditor from "./TextEditor";

export default function NoteView() {
  const [Notes, setNotes] = useContext(NoteContext);
  const [CurrentEditNote, setCurrentEditNote] = useContext(EditNoteContext);

  return (
    <div className="Edit-NoteView">
      <input
        className="Edit-title"
        defaultValue={CurrentEditNote?.title}
      ></input>
      <input
        className="Edit-Date"
        defaultValue={NormalizeTime(CurrentEditNote?.createdAt)}
      ></input>
      <TextEditor CurrentEditNote={CurrentEditNote} />
    </div>
  );
}
