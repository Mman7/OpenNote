import React, { useState } from "react";
import Editor from "./Editor";

export default function MyEditor({ CurrentEditNote }) {
  return (
    <div id="editor">
      <Editor CurrentEditNote={CurrentEditNote} />
    </div>
  );
}
