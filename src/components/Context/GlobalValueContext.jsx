import React, { useState, createContext } from "react";

export const GlobalNoteContext = createContext();

export function GlobalNoteContextProvider({ children }) {
  //global value context is save for global note
  const [GlobalValueContext, setGlobalValueContext] = useState("");

  return (
    <GlobalNoteContext.Provider
      value={[GlobalValueContext, setGlobalValueContext]}
    >
      {children}
    </GlobalNoteContext.Provider>
  );
}
