import React, { useState, createContext } from "react";
import { isEqual } from "lodash";

export const isDifferentContext = createContext();

export function NoteIsDifferentProvider({ children }) {
  const [isDifferent, setisDifferent] = useState(false);

  // if any different change to true
  const isAnyDifferent = (arrayOfparagraph, arrayOfTitle) => {
    const paragraphIsEqual = isEqual(arrayOfparagraph[0], arrayOfparagraph[1]);
    const titleIsEqual = isEqual(arrayOfTitle[0], arrayOfTitle[1]);
    const AnyDifferent = paragraphIsEqual && titleIsEqual ? false : true;
    setisDifferent(AnyDifferent);
  };

  return (
    <isDifferentContext.Provider
      value={[isDifferent, setisDifferent, isAnyDifferent]}
    >
      {children}
    </isDifferentContext.Provider>
  );
}
