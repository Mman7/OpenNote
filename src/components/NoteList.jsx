import React, { useContext, useEffect } from "react";
import { NoteContext } from "./Context/NoteListContextProvider";
import Noteitem from "./Noteitem";

export default function NoteList() {
  const [Notes, setNotes, , hadSearchBarValue] = useContext(NoteContext);

  const searchBarValueHandler = () => (hadSearchBarValue !== "" ? true : false);

  // Notes.filter((note) => note.title.toLowerCase().includes(value))
  // noteitem base on search bar value
  const ULT = () =>
    Notes.filter((note) =>
      note.title.toLowerCase().includes(hadSearchBarValue)
    ).map((note) => <Noteitem key={note.noteid} note={note} />);

  return <div className="NoteList">{ULT()}</div>;
}
