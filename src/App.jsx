import React, { useState } from "react";

import LandingPage from "./components/LandingPage";
import OpenNote from "./components/OpenNote";
import { GoogleSignIn } from "./components/FireBaseApi";
import { IsLoadingContextProvider } from "./components/Context/LoadingContextProvider";

import "./App.scss";
import "./components/FireBaseApi";

function App() {
  const [isLogin, setisLogin] = useState(false);

  const isSignIn = () => {
    GoogleSignIn();
    setisLogin(true);
  };
  return (
    <IsLoadingContextProvider>
      {isLogin ? (
        <OpenNote setisLogin={setisLogin} isLogin={isLogin} />
      ) : (
        <LandingPage setisLogin={setisLogin} isLogin={isLogin} />
      )}
    </IsLoadingContextProvider>
  );
}

export default App;
