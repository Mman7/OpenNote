import React, { useContext, useState, useEffect, createRef } from "react";
import { ShowEditContext } from "./OpenNote";
import { EditNoteContext } from "./Context/EditNoteContextProvider";
import { NoteContext } from "./Context/NoteListContextProvider";
import { NormalizeTime } from "./Logical-Javascript/NormalizeTime";
import { GlobalNoteContext } from "./Context/GlobalValueContext";
import ReactQuill from "react-quill";
import useMediaQuery from "./PreviewTab/MediaQuery";

let mainRef = createRef();

export default function Noteitem({ note }) {
  const isLarge = useMediaQuery("(min-width: 750px)");
  const [Notes, setNotes] = useContext(NoteContext);
  const [ShowEditPage, setShowEditPage] = useContext(ShowEditContext);
  const [CurrentEditNote, setCurrentEditNote] = useContext(EditNoteContext);
  const [GlobalValueContext, setGlobalValueContext] =
    useContext(GlobalNoteContext);

  const EditNoteHandle = () => {
    if (isLarge) {
      console.log("Large");
    } else {
      setShowEditPage((prev) => !prev);
    }
  };

  const EditThisNote = (e) => {
    if (isLarge) {
      const NoteId = e.target.dataset.id;
      const EditThisNote = Notes.filter((note) => note.noteid === NoteId);
      setCurrentEditNote(EditThisNote[0]);
      setGlobalValueContext(EditThisNote[0]);
    } else {
      const NoteId = e.target.dataset.id;
      const EditThisNote = Notes.filter((note) => note.noteid === NoteId);
      setCurrentEditNote(EditThisNote[0]);
      setGlobalValueContext(EditThisNote[0]);
      EditNoteHandle();
    }
  };

  const modules = {
    toolbar: false,
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
      <ReactQuill
        className="Noteitem-paragraph"
        theme="snow"
        value={JSON.parse(note.paragraph)}
        ref={mainRef}
        readOnly={true}
        modules={modules}
      />
    </div>
  );
}
