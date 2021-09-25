import React, { useContext } from "react";
import { ShowEditContext } from "./OpenNote";
import { EditNoteContext } from "./EditNoteContextProvider";
import { NoteContext } from "./NoteListContextProvider";
import { NormalizeTime } from "./NormalizeTime";
import ReactMarkdown from "react-markdown";

export default function Noteitem({ note }) {
  const [Notes, setNotes] = useContext(NoteContext);
  const [ShowEditPage, setShowEditPage] = useContext(ShowEditContext);
  const [CurrentEditNote, setCurrentEditNote] = useContext(EditNoteContext);

  const EditNoteHandle = () => {
    setShowEditPage((prev) => !prev);
  };

  const EditThisNote = (e) => {
    const NoteId = e.target.dataset.id;
    const EditThisNote = Notes.filter((note) => note.noteid === NoteId);
    setCurrentEditNote(EditThisNote[0]);
    EditNoteHandle();
  };

  return (
    <div
      data-id={`${note.noteid}`}
      onClick={(e) => EditThisNote(e)}
      title="Click to edit"
      className="Noteitem"
    >
      <h1 className="Noteitem-title">{note.title}</h1>
      <h2 data-plaintext="true" className="Noteitem-time">
        Lastest Update: {NormalizeTime(note.createdAt)}
      </h2>
      <ReactMarkdown className="Noteitem-paragraph">
        {note.paragraph}
      </ReactMarkdown>
    </div>
  );
}
