import React, { useState, createRef, useEffect, useContext } from "react";
import { isDifferentContext } from "../Context/NoteIsDifferentProvider";
import { GlobalNoteContext } from "../Context/GlobalValueContext";
import ReactQuill from "react-quill";
import { EditNoteContext } from "../Context/EditNoteContextProvider";
import "react-quill/dist/quill.snow.css";

let mainRef = createRef();

export default function MyEditor({ setParagraph }) {
  const [, , isAnyDifferent] = useContext(isDifferentContext);
  const [EditorValue, setEditorValue] = useState("");
  const [GlobalValueContext, setGlobalValueContext] =
    useContext(GlobalNoteContext);
  const [CurrentEditNote, setCurrentEditNote] = useContext(EditNoteContext);
  useEffect(() => {
    // if currentEditnote change editor change
    // if Intial data is a undefined then automatic change it to a fake object string
    const data = JSON.parse(CurrentEditNote?.paragraph ?? "{}");
    setEditorValue(data);
  }, [CurrentEditNote]);

  useEffect(() => {
    // trancking save btn
    // why json stringfy and parse it because it'll get rid of delta things
    const editorContent = mainRef.current.unprivilegedEditor.getContents();
    const normalizeContent = JSON.parse(JSON.stringify(editorContent));
    const currentEditingNote = JSON.parse(CurrentEditNote?.paragraph ?? "{}");

    isAnyDifferent(normalizeContent, currentEditingNote);

    //paragraphHandler function is update content to global content
    setParagraph(editorContent);
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
