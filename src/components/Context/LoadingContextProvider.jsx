import React, { useState, createContext } from "react";

export const isLoadingContext = createContext();

export function IsLoadingContextProvider({ children }) {
  const [isLoading, setisLoading] = useState(false);

  const ChangeIsLoading = () => {
    setisLoading((prev) => !prev);
  };
  const isLoadingHandler = () => (isLoading ? "show" : "");

  return (
    <isLoadingContext.Provider value={[isLoading, ChangeIsLoading]}>
      {children}
      <div className={`Loading ${isLoadingHandler()}`}>
        <i className="fas fa-spinner icon"></i>
      </div>
    </isLoadingContext.Provider>
  );
}
