import { useEffect, useState } from "react";

import Main from "./components/Main";
import { useNavigate } from "react-router";

export default function App() {
  console.log("Rendering <App> component...");
  
  const navigate = useNavigate();

  const username = localStorage.getItem("username");
  const authToken = localStorage.getItem("authToken");

  // useState initialize the variable only once
  const [authenticated, setAuthenticated] = useState(authToken === "true");
  console.log(`You are ${authenticated ? 'authenticated' : 'unauthenticated'}`);

  const signOut = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("authToken");
    localStorage.removeItem("token");
    setAuthenticated(false);
    navigate("/");
  }

  // Called once when the page is reloading (or first component rendering)
  useEffect(() => {
    console.log("<useEffect>");

    console.log("<useEffect />");
  }, []);

  return (
    <div className="app">
      <Main authenticated={authenticated} setAuthenticated={setAuthenticated} username={username} signOut={signOut} />
    </div>
  );
}