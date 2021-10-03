import React, { useState, createRef, useEffect, useContext } from "react";
import { isDifferentContext } from "../Context/NoteIsDifferentProvider";
import ReactQuill from "react-quill";
import { EditNoteContext } from "../Context/EditNoteContextProvider";
import "react-quill/dist/quill.snow.css";

let mainRef = createRef();

export default function MyEditor() {
  const [CurrentEditNote, setCurrentEditNote] = useContext(EditNoteContext);
  // TODO: use mainRef.current.unprivilegedEditor.getContents() to get current editor delta content
  // * : quill js accept plain text as value or delta object
  // *DOC https://stackoverflow.com/questions/53809521/quill-js-how-to-use-settext-with-basic-formatting
  // TODO: if note is different change isDifferentContext to true , default is false
  const [EditorValue, setEditorValue] = useState("");
  useEffect(() => {
    // console.log(mainRef.current.unprivilegedEditor.getContents());
    setEditorValue(CurrentEditNote?.paragraph);
  }, [CurrentEditNote]);
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
