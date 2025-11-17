import { useEffect, useState } from "react";

import Main from "./components/Main";
import { useAuthContext } from "./contexts/AuthContext";

export default function App() {
  console.log("Rendering <App> component...");

  const { authenticated } = useAuthContext();
  console.log(`You are ${authenticated ? 'authenticated' : 'unauthenticated'}`);

  // Called once when the page is reloading (or first component rendering)
  useEffect(() => {
    console.log("<useEffect>");

    console.log("<useEffect />");
  }, []);

  return (
    <div className="app">
      <Main />
    </div>
  );
}