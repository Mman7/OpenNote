import React, { useState, createContext, useEffect } from "react";
import { getData_From_DataBase } from "../FireBaseApi";

export const NoteContext = createContext([]);

export function NoteListContextProvider({ children }) {
  const [Notes, setNotes] = useState([]);

  useEffect(async () => {
    const data = await getData_From_DataBase();
    setNotes(() => data);
  }, []);

  return (
    <NoteContext.Provider value={[Notes, setNotes]}>
      {children}
    </NoteContext.Provider>
  );
}
