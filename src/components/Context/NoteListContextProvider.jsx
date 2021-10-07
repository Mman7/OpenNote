import React, { useState, createContext, useEffect, useContext } from "react";
import { getData_From_DataBase } from "../FireBaseApi";
import {
  IsLoadingContextProvider,
  isLoadingContext,
} from "./LoadingContextProvider";

export const NoteContext = createContext([]);

export function NoteListContextProvider({ children }) {
  const [Notes, setNotes] = useState([]);
  const [isLoading, ChangeIsLoading] = useContext(isLoadingContext);

  const UpdateList = async () => {
    ChangeIsLoading();
    const data = await getData_From_DataBase();
    setNotes(() => data);
    ChangeIsLoading();
  };

  useEffect(() => {
    //intial notelist
    UpdateList();
  }, []);

  return (
    <IsLoadingContextProvider>
      <NoteContext.Provider value={[Notes, setNotes, UpdateList]}>
        {children}
      </NoteContext.Provider>
    </IsLoadingContextProvider>
  );
}
