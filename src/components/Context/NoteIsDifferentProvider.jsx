import React, { useState, createContext, useRef, createRef } from "react";
import { isEqual } from "lodash";

// if its different return true else return false
export const isDifferentComparator = (object_1, object_2) =>
  isEqual(object_1, object_2) ? false : true;

export const isDifferentContext = createContext();

export function NoteIsDifferentProvider({ children }) {
  const [isDifferent, setisDifferent] = useState(false);

  return (
    <isDifferentContext.Provider value={[isDifferent, setisDifferent]}>
      {children}
    </isDifferentContext.Provider>
  );
}
