import React, { useContext } from "react";
import { ShowEditContext } from "./OpenNote";
import { EditNoteContext } from "./EditNoteContextProvider";
import { NoteContext } from "./NoteListContextProvider";
import { NormalizeTime } from "./NormalizeTime";
import ReactMarkdown from "react-markdown";

export default function Noteitem({ note }) {
  const [ShowEdit, setShowEdit] = useContext(ShowEditContext);
  const [Notes, setNotes] = useContext(NoteContext);
  const [CurrentEditNote, setCurrentEditNote] = useContext(EditNoteContext);

  const EditNoteHandle = () => {
    setShowEdit((prev) => !prev);
  };

  const EditThisNote = (e) => {
    const EditNoteTitel = e.target.firstChild.innerText;
    setCurrentEditNote(EditNoteTitel);
    EditNoteHandle();
  };
  return (
    <div
      onClick={(e) => EditThisNote(e)}
      title="Click to edit"
      className="Noteitem"
    >
      <h1 className="Noteitem-title">{note.title}</h1>
      <h2 className="Noteitem-time">
        Lastest Update: {NormalizeTime(note.createdAt)}
      </h2>
      <ReactMarkdown className="Noteitem-paragraph">
        {note.paragraph}
      </ReactMarkdown>
    </div>
  );
}
