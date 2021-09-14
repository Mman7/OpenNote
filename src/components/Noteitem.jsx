import React, { useContext } from "react";
import { ShowEditContext } from "./OpenNote";

export default function Noteitem({ note }) {
  const [, setShowEdit] = useContext(ShowEditContext);

  const EditNoteHandle = () => {
    setShowEdit((prev) => !prev);
  };

  return (
    <div onClick={EditNoteHandle} title="Click to edit" className="Noteitem">
      <div className="Noteitem-Container">
        <h1 className="Noteitem-title">{note.title}</h1>
        <h2 className="Noteitem-time">Date:040427</h2>
        <p className="Noteitem-paragraph">{note.paragraph}</p>
      </div>
    </div>
  );
}
