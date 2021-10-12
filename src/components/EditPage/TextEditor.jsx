import React, { useState, createRef, useEffect, useContext } from "react";
import { GlobalNoteContext } from "../Context/GlobalValueContext";
import ReactQuill from "react-quill";
import { EditNoteContext } from "../Context/EditNoteContextProvider";
import "react-quill/dist/quill.snow.css";

let mainRef = createRef();

export default function MyEditor({ setParagraph }) {
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
    const editorContent = mainRef.current.unprivilegedEditor.getContents();

    //paragraphHandler function is update content to global content
    setParagraph(JSON.parse(JSON.stringify(editorContent)));
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
