import React, { useState, useContext, useEffect } from "react";
import { NoteContext } from "../NoteListContextProvider";
import { EditNoteContext } from "../EditNoteContextProvider";
import { NormalizeTime } from "../NormalizeTime";

export default function NoteView() {
  const [Notes, setNotes] = useContext(NoteContext);
  const [CurrentEditNote, setCurrentEditNote] = useContext(EditNoteContext);
  const [Note, setNote] = useState({});

  useEffect(() => {
    const Edit = Notes.filter((note) => note.title === CurrentEditNote);
    setNote(Edit[0]);
  }, [CurrentEditNote]);

  const ThisNote = () => (Note !== undefined ? Note : "");

  return (
    <div className="Edit-NoteView">
      <input className="Edit-title" defaultValue={ThisNote().title}></input>
      <input
        className="Edit-Date"
        defaultValue={NormalizeTime(ThisNote().createdAt)}
      ></input>
      <textarea
        className="Edit-Note-Section"
        defaultValue={ThisNote().paragraph}
      ></textarea>
    </div>
  );
}
