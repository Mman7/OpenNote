import React, { Suspense, useState, lazy } from "react";
const LandingPage = lazy(() => import("./components/LandingPage"));
// import LandingPage from "./components/LandingPage";
const OpenNote = lazy(() => import("./components/OpenNote"));
// import OpenNote from "./components/OpenNote";

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
        <Suspense fallback={<div>Loading...</div>}>
          <OpenNote setisLogin={setisLogin} isLogin={isLogin} />
        </Suspense>
      ) : (
        <Suspense fallback={<div>Loading...</div>}>
          <LandingPage setisLogin={setisLogin} isLogin={isLogin} />
        </Suspense>
      )}
    </IsLoadingContextProvider>
  );
}

export default App;
