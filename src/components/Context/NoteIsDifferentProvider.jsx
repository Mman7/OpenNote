import React, { useState, createContext } from "react";
import { isEqual } from "lodash";

export const isDifferentContext = createContext();

export function NoteIsDifferentProvider({ children }) {
  // if any different change to true
  const isAnyDifferent = (object_1, object_2) =>
    setisDifferent(isEqual(object_1, object_2) ? false : true);

  const [isDifferent, setisDifferent] = useState(false);

  return (
    <isDifferentContext.Provider
      value={[isDifferent, setisDifferent, isAnyDifferent]}
    >
      {children}
    </isDifferentContext.Provider>
  );
}
