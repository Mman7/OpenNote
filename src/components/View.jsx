import React, { useContext } from "react";
import NoteView from "./EditPage/NoteView";
import ViewNavBar from "./EditPage/ViewNavBar";
import { ShowEditContext } from "./OpenNote";

export default function View() {
  const [Edit] = useContext(ShowEditContext);

  const change = (event) => {
    const targetClassName = event.target.className;
    if (targetClassName === "slideshow") return;
  };

  return (
    <div
      onTransitionEnd={() => change(event)}
      className={`View ${Edit ? "slideshow" : "slideOff"}`}
    >
      <ViewNavBar />
      <section className="Edit-Section">
        <NoteView />
      </section>
    </div>
  );
}
