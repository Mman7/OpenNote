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
  const [Title, setTitle] = useState(null);
  const [date, setdate] = useState(null);
  const [Paragraph, setParagraph] = useState("");

  const UpdateGlobalContent = () => {
    // update title and paragraph to global Content
    setGlobalValueContext((prev) => ({ ...prev, title: Title }));
    setGlobalValueContext((prev) => ({ ...prev, paragraph: Paragraph }));
  };

  const titleHandler = (e) => {
    // update title
    setTitle(e.target.value);
  };

  useEffect(() => {
    //Everytime it change update to Global Content
    UpdateGlobalContent();
  }, [Title, Paragraph]);

  useEffect(() => {
    // if CurrentEditNote value is undefined automatic change to New Document
    // intial Current Content when user click on
    setTitle(CurrentEditNote?.title ?? "New Document");
    setdate(NormalizeTime(CurrentEditNote?.createdAt) ?? "");
  }, [CurrentEditNote]);

  return (
    <div className="Edit-NoteView">
      <input
        defaultValue={Title}
        onChange={(e) => titleHandler(e)}
        className="Edit-title"
      ></input>
      <input defaultValue={date} className="Edit-Date"></input>
      <TextEditor setParagraph={setParagraph} />
    </div>
  );
}
