import React, { useState, useContext, useEffect, createRef } from "react";
import { NoteContext } from "../Context/NoteListContextProvider";
import { EditNoteContext } from "../Context/EditNoteContextProvider";
import { GlobalNoteContext } from "../Context/GlobalValueContext";
import { isDifferentContext } from "../Context/NoteIsDifferentProvider";
import { NormalizeTime } from "../Logical-Javascript/NormalizeTime";
import TextEditor from "./TextEditor";

let titleRef = createRef();

export default function NoteView() {
  const [Notes, setNotes] = useContext(NoteContext);
  const [GlobalValueContext, setGlobalValueContext] =
    useContext(GlobalNoteContext);
  const [CurrentEditNote, setCurrentEditNote] = useContext(EditNoteContext);
  const [, , isAnyDifferent] = useContext(isDifferentContext);

  const [Title, setTitle] = useState(null);
  const [date, setdate] = useState(null);
  const [Paragraph, setParagraph] = useState("");

  const UpdateGlobalContent = () => {
    // update title and paragraph to global Content
    setGlobalValueContext((prev) => ({
      ...prev,
      title: titleRef.current.value,
    }));
    setGlobalValueContext((prev) => ({ ...prev, paragraph: Paragraph }));
  };

  const titleHandler = (e) => {
    // update title
    setTitle(e.target.value);
    UpdateGlobalContent();
  };

  useEffect(() => {
    UpdateGlobalContent();
    //Everytime it change update to Global Content
    const normalizeContent = JSON.parse(JSON.stringify(Paragraph));
    const parsedCurrentEditingNote = JSON.parse(
      CurrentEditNote?.paragraph ?? "{}"
    );
    const globalTitle = GlobalValueContext?.title;
    const currentEditTitle = CurrentEditNote?.title;
    isAnyDifferent(
      [normalizeContent, parsedCurrentEditingNote],
      [globalTitle, currentEditTitle]
    );
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
        ref={titleRef}
        onChange={(e) => titleHandler(e)}
        className="Edit-title"
      ></input>
      <input defaultValue={date} className="Edit-Date"></input>
      <TextEditor setParagraph={setParagraph} />
    </div>
  );
}
