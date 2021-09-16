import React, { useState, createContext } from "react";

export const EditNoteContext = createContext();

export function EditNoteContextProvider({ children }) {
  const [CurrentEditNote, setCurrentEditNote] = useState();

  return (
    <EditNoteContext.Provider value={[CurrentEditNote, setCurrentEditNote]}>
      {children}
    </EditNoteContext.Provider>
  );
}
