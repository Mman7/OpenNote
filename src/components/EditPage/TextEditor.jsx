import React, { useState, useRef, createRef, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

let mainRef = createRef();

export default function MyEditor({ CurrentEditNote }) {
  // I dont know how to use useRef
  //TODO: use mainRef.current.unprivilegedEditor.getContents() to get current editor delta content

  //* Next 1. Edit Data 2.Save Data 3.Get Data
  const [value, setValue] = useState("");
  useEffect(() => {
    console.log(mainRef.current.unprivilegedEditor.getContents());
  }, [value]);
  return (
    <div className="Edit-Note-Section">
      <ReactQuill
        theme="snow"
        value={value}
        onChange={setValue}
        ref={mainRef}
      />
    </div>
  );
}
