import React from "react";

export default function Editor({ CurrentEditNote }) {
  if (CurrentEditNote) {
    const container = document.querySelector("#editor");

    var editor = new Quill(container, options);

    var options = {
      debug: "info",
      modules: {
        toolbar: "#toolbar",
      },
      placeholder: "Compose an epic...",
      readOnly: false,
      theme: "snow",
    };
  }

  return <></>;
}
