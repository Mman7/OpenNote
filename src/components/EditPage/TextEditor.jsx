import React, { useEffect } from "react";
import { Editor, EditorState, ContentState } from "draft-js";
import "draft-js/dist/Draft.css";

export default function MyEditor({ CurrentEditNote }) {
  //TODO: Fix the Note only Change once
  //*: Cant use useEffect idk why
  //* to future me "help"
  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createWithContent(
      ContentState.createFromText(CurrentEditNote.paragraph)
    )
  );

  return (
    <Editor
      placeholder="Enter some text"
      editorState={editorState}
      onChange={setEditorState}
    />
  );
}
