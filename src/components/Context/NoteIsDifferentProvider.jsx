import React, { useState, createContext, useRef, createRef } from "react";

export const isDifferentContext = createContext();

export function NoteIsDifferentProvider({ children }) {
  const [isDifferent, setisDifferent] = useState(false);

  return (
    <isDifferentContext.Provider value={[isDifferent, setisDifferent]}>
      {children}
    </isDifferentContext.Provider>
  );
}
