import React, { useState, useContext, useEffect } from "react";
import { NoteContext } from "../NoteListContextProvider";
import { EditNoteContext } from "../EditNoteContextProvider";
import { NormalizeTime } from "../NormalizeTime";
import MyEditor from "./TextEditor";

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
      <MyEditor CurrentEditNote={CurrentEditNote} />
    </div>
  );
}
