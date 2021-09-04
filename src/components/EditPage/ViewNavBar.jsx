import React, { useContext } from "react";
import { ShowEditContext } from "../OpenNote";

export default function ViewNavBar() {
  const [, setShowEdit] = useContext(ShowEditContext);

  const Back = () => {
    setShowEdit((prev) => !prev);
  };

  return (
    <div className="ViewNavBar">
      <button onClick={Back}>
        <i className="fas fa-chevron-left"></i>
      </button>
    </div>
  );
}
