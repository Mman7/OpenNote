import React, { useState, useContext, useEffect } from "react";
import useMediaQuery from "./MediaQuery";
import ReactQuill from "react-quill";
import { NoteContext } from "../Context/NoteListContextProvider";
import { EditNoteContext } from "../Context/EditNoteContextProvider";
import Button from "react-bootstrap/Button";
import { ShowEditContext } from "../OpenNote";

export default function Previewcontainer() {
  const isLargeScreen = useMediaQuery("(min-width: 800px)");
  const [ShowEditPage, setShowEditPage] = useContext(ShowEditContext);
  const [CurrentEditNote, setCurrentEditNote] = useContext(EditNoteContext);
  const [Notes, setNotes] = useContext(NoteContext);
  const [PreviewValue, setPreviewValue] = useState(null);

  const modules = {
    toolbar: false,
  };

  useEffect(() => {
    setPreviewValue(CurrentEditNote);
  }, [CurrentEditNote]);

  const EditThisNote = () => {
    setShowEditPage((prev) => !prev);
  };

  const PreviewBtnShowHandler = () =>
    CurrentEditNote !== null && undefined ? "show" : "";

  console.log(CurrentEditNote);

  return (
    <div className="Preview-container">
      <ReactQuill
        className="Preview-previewer"
        theme="snow"
        value={JSON.parse(PreviewValue?.paragraph ?? "{}")}
        readOnly={true}
        modules={modules}
      />
      <Button
        onClick={EditThisNote}
        className={`preview-edit-btn ${PreviewBtnShowHandler()}`}
        variant="primary"
      >
        <i className="fas fa-pen"></i>
      </Button>
    </div>
  );
}
