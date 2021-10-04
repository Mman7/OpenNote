import React, { useState, createRef, useEffect, useContext } from "react";
import {
  isDifferentContext,
  isDifferentComparator,
} from "../Context/NoteIsDifferentProvider";
import ReactQuill from "react-quill";
import { EditNoteContext } from "../Context/EditNoteContextProvider";
import "react-quill/dist/quill.snow.css";

let mainRef = createRef();

export default function MyEditor({
  CurrentEditNote,
  setCurrentEditNote,
  setParagraph,
  paragraphHandler,
  UpdateGlobalContent,
}) {
  const [isDifferent, setisDifferent] = useContext(isDifferentContext);
  const [EditorValue, setEditorValue] = useState("");

  useEffect(() => {
    // if currentEditnote change editor change
    setEditorValue(CurrentEditNote?.paragraph);
  }, [CurrentEditNote]);

  useEffect(() => {
    // trancking save btn
    const currentContent = CurrentEditNote;
    const editorContent = mainRef.current.unprivilegedEditor.getContents();
    setisDifferent(isDifferentComparator(editorContent, currentContent));

    //paragraphHandler function is update content to global content
    setParagraph(mainRef.current.unprivilegedEditor.getContents());
  }, [EditorValue]);

  return (
    <div className="Edit-Note-Section">
      <ReactQuill
        theme="snow"
        value={EditorValue}
        onChange={setEditorValue}
        ref={mainRef}
      />
    </div>
  );
}
