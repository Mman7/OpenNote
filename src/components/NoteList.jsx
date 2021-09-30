import React, { useContext } from "react";
import { NoteContext } from "./Context/NoteListContextProvider";
import Noteitem from "./Noteitem";

export default function NoteList() {
  const [Notes, setNotes] = useContext(NoteContext);

  return (
    <div className="NoteList">
      {Notes.map((note) => (
        <Noteitem key={note.noteid} note={note} />
      ))}
    </div>
  );
}
