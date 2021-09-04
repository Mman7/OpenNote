import React from "react";

export default function NoteView() {
  return (
    <div className="Edit-NoteView">
      <input className="Edit-title" defaultValue="Title"></input>
      <input className="Edit-Date" defaultValue="Date"></input>
      <textarea
        defaultValue="Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid, aut"
        className="Edit-Note-Section"
      ></textarea>
    </div>
  );
}
