import SearchBar from "./SearchBar";
import NoteList from "./NoteList";
import Previewcontainer from "./Previewcontainer";

import React, { useContext } from "react";

import { ShowEditContext } from "./OpenNote";

export default function Container() {
  const [Edit] = useContext(ShowEditContext);
  return (
    <div className={`Container ${Edit ? "slideOut" : ""}`}>
      <SearchBar />
      <NoteList />
      <Previewcontainer />
    </div>
  );
}
