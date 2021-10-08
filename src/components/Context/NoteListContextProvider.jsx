import React, { useState, createContext, useEffect, useContext } from "react";
import { getData_From_DataBase } from "../FireBaseApi";
import { isLoadingContext } from "./LoadingContextProvider";

export const NoteContext = createContext([]);

export function NoteListContextProvider({ children }) {
  const [Notes, setNotes] = useState([]);
  const [hadSearchBarValue, sethadSearchBarValue] = useState("");
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
    <NoteContext.Provider
      value={[
        Notes,
        setNotes,
        UpdateList,
        hadSearchBarValue,
        sethadSearchBarValue,
      ]}
    >
      {children}
    </NoteContext.Provider>
  );
}
