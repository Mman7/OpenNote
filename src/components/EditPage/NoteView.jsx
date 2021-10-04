import React, { useState, useContext, useEffect, useRef } from "react";
import { NoteContext } from "../Context/NoteListContextProvider";
import { EditNoteContext } from "../Context/EditNoteContextProvider";
import { GlobalNoteContext } from "../Context/GlobalValueContext";
import { NormalizeTime } from "../Logical-Javascript/NormalizeTime";
import TextEditor from "./TextEditor";

export default function NoteView() {
  const [Notes, setNotes] = useContext(NoteContext);
  const [GlobalValueContext, setGlobalValueContext] =
    useContext(GlobalNoteContext);
  const [CurrentEditNote, setCurrentEditNote] = useContext(EditNoteContext);
  const [Title, setTitle] = useState("");
  const [Paragraph, setParagraph] = useState("");

  const title = useRef(null);
  const date = useRef(null);

  const UpdateGlobalContent = () => {
    // update title and paragraph to global Content
    setGlobalValueContext((prev) => ({ ...prev, title: Title }));
    setGlobalValueContext((prev) => ({ ...prev, paragraph: Paragraph }));
  };

  const titleHandler = (e) => {
    // update title
    setTitle(e.target.value);
  };

  //FIXME : when click to the note  //* Title doest update to global

  useEffect(() => {
    UpdateGlobalContent();
  }, [Title, Paragraph]);

  useEffect(() => {
    const noteTitle = title.current;
    const noteDate = date.current;
    //if CurrentEditNote value is undefined automatic change to New Document
    noteTitle.value = CurrentEditNote?.title ?? "New Document";
    noteDate.value = NormalizeTime(CurrentEditNote?.createdAt) ?? "";
  }, [CurrentEditNote]);

  return (
    <div className="Edit-NoteView">
      <input
        onChange={(e) => titleHandler(e)}
        className="Edit-title"
        ref={title}
      ></input>
      <input className="Edit-Date" ref={date}></input>
      <TextEditor
        UpdateGlobalContent={UpdateGlobalContent}
        setParagraph={setParagraph}
        CurrentEditNote={CurrentEditNote}
        setCurrentEditNote={setCurrentEditNote}
      />
    </div>
  );
}
