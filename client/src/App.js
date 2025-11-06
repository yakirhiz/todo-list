import { useEffect, useState } from "react";

import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";

export default function App() {
  console.log("Rendering <App> component...");

  // TODO: maybe use state for both + localStorage
  const username = localStorage.getItem("username");
  const authToken = localStorage.getItem("authToken");
  // const token = localStorage.getItem("token");

  // useState initialize the variable only once
  const [authenticated, setAuthenticated] = useState(authToken === "true");
  console.log(`You are ${authenticated ? 'authenticated' : 'unauthenticated'}`);

  const signOut = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("authToken");
    localStorage.removeItem("token");
    setAuthenticated(false);
  }

  // Called once when the page is reloading (or first component rendering)
  useEffect(() => {
    console.log("<useEffect>");

    console.log("<useEffect />");
  }, []);

  return (
    <div className="app">
      <Header authenticated={authenticated} username={username} signOut={signOut} />
      <Main authenticated={authenticated} setAuthenticated={setAuthenticated} />
      <Footer />
    </div>
  );
}