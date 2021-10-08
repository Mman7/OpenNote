import React, { useState, createContext } from "react";

export const PreviewTabContext = createContext();

export function PreviewTabContextProvider({ children }) {
  const [PreviewTabValue, setPreviewTabValue] = useState("");

  return (
    <PreviewTabContext.Provider value={[PreviewTabValue, setPreviewTabValue]}>
      {children}
    </PreviewTabContext.Provider>
  );
}
