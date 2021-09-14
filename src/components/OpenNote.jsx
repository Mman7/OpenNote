import React, { useState, createContext, useContext } from "react";
import { NoteListContextProvider } from "./NoteListContextProvider";
import NavBar from "./NavBar";
import SideBar from "./SideBar";
import Container from "./Container";
import View from "./View";

export const ShowEditContext = createContext();

export default function OpenNote({ setisLogin }) {
  const [Sidebar, setSidebar] = useState(false);
  const [Edit, setShowEdit] = useState(false);

  return (
    <div className="App">
      <NoteListContextProvider>
        <ShowEditContext.Provider value={[Edit, setShowEdit, setSidebar]}>
          <NavBar setSidebar={setSidebar} />
          <SideBar Sidebar={Sidebar} setisLogin={setisLogin} />
          <Container Sidebar={Sidebar} />
          <View />
        </ShowEditContext.Provider>
      </NoteListContextProvider>
    </div>
  );
}
