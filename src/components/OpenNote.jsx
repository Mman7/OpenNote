import React, { useState, createContext } from "react";
import { lazy, Suspense } from "react";
//context
import { NoteListContextProvider } from "./Context/NoteListContextProvider";
import { EditNoteContextProvider } from "./Context/EditNoteContextProvider";
import { NoteIsDifferentProvider } from "./Context/NoteIsDifferentProvider";
import { GlobalNoteContextProvider } from "./Context/GlobalValueContext";

// import NavBar from "./NavBar";
// import SideBar from "./SideBar";
// import Container from "./Container";
// import View from "./View";
const NavBar = lazy(() => import("./NavBar"));
const SideBar = lazy(() => import("./SideBar"));
const Container = lazy(() => import("./Container"));
const View = lazy(() => import("./View"));

import "bootstrap/dist/css/bootstrap.min.css";
import "../App.scss";

export const ShowEditContext = createContext();

export default function OpenNote({ setisLogin }) {
  const [Sidebar, setSidebar] = useState(false);
  const [Edit, setShowEdit] = useState(false);
  const closeSidebar = () => {
    setSidebar((prev) => !prev);
  };

  return (
    <div className="App">
      <GlobalNoteContextProvider>
        <NoteIsDifferentProvider>
          <EditNoteContextProvider>
            <NoteListContextProvider>
              <ShowEditContext.Provider value={[Edit, setShowEdit, setSidebar]}>
                <Suspense>
                  <NavBar setSidebar={setSidebar} />
                  <SideBar
                    Sidebar={Sidebar}
                    setisLogin={setisLogin}
                    closeSidebar={closeSidebar}
                  />
                  <Container Sidebar={Sidebar} />
                  <View />
                </Suspense>
              </ShowEditContext.Provider>
            </NoteListContextProvider>
          </EditNoteContextProvider>
        </NoteIsDifferentProvider>
      </GlobalNoteContextProvider>
    </div>
  );
}
