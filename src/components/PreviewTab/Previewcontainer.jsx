import React from "react";
import useMediaQuery from "./MediaQuery";

export default function Previewcontainer() {
  console.log(useMediaQuery());
  return (
    <div className="Preview-container">
      <h1>PreviewTap</h1>
    </div>
  );
}
