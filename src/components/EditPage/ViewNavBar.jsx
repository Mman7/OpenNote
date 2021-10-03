import React, { useContext } from "react";
import { ShowEditContext } from "../OpenNote";
import { isDifferentContext } from "../Context/NoteIsDifferentProvider";

export default function ViewNavBar() {
  const [, setShowEdit] = useContext(ShowEditContext);
  const [isDifferent, setisDifferent] = useContext(isDifferentContext);

  const Back = () => {
    setShowEdit((prev) => !prev);
  };

  const isDifferentHandle = () => (isDifferent ? "Save-Note-btn-show" : "");

  return (
    <div className="ViewNavBar">
      <button onClick={Back}>
        <i className="fas fa-chevron-left"></i>
      </button>
      <button className={`Save-Note-btn ${isDifferentHandle()}`}>✅</button>
    </div>
  );
}
