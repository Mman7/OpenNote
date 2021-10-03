import React, { useState, useContext, useEffect } from "react";
import { NoteContext } from "../Context/NoteListContextProvider";
import { EditNoteContext } from "../Context/EditNoteContextProvider";
import { NormalizeTime } from "../Logical-Javascript/NormalizeTime";
import TextEditor from "./TextEditor";

export default function NoteView() {
  const [Notes, setNotes] = useContext(NoteContext);
  const [CurrentEditNote, setCurrentEditNote] = useContext(EditNoteContext);

  useEffect(() => {
    const noteTitle = document.querySelector(".Edit-title");
    const noteDate = document.querySelector(".Edit-Date");
    noteTitle.value = CurrentEditNote?.title;
    noteDate.value = NormalizeTime(CurrentEditNote?.createdAt);
  }, [CurrentEditNote]);

  return (
    <div className="Edit-NoteView">
      <input className="Edit-title"></input>
      <input className="Edit-Date"></input>
      <TextEditor CurrentEditNote={CurrentEditNote} />
    </div>
  );
}
