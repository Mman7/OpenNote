import React, { useContext, useEffect } from "react";
import { NoteContext } from "./Context/NoteListContextProvider";
import Noteitem from "./Noteitem";

export default function NoteList() {
  const [Notes, setNotes, , hadSearchBarValue] = useContext(NoteContext);

  // Notes.filter((note) => note.title.toLowerCase().includes(value))
  // noteitem base on search bar value

  const Note = () =>
    Notes?.filter((note) =>
      note.title.toLowerCase().includes(hadSearchBarValue)
    ).map((note) => <Noteitem key={note.noteid} note={note} />);

  return <div className="NoteList">{Note()}</div>;
}
