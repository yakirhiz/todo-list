import { useEffect, useState } from "react";
import { Route, Routes, Link } from 'react-router-dom';

import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  console.log("Rendering <App> component...");

  // TODO: maybe use state for both + localStorage
  const username = localStorage.getItem("username");
  const authToken = localStorage.getItem("authToken");
  // const token = localStorage.getItem("token");

  // useState initialize the variable only once
  const [authenticated, setAuthenticated] = useState(authToken === "true");
  console.log(`You are ${authenticated ? 'authenticated' : 'unauthenticated'}`);

  // Called once when the page is reloading (or first component rendering)
  useEffect(() => {
    console.log("<useEffect>");

    console.log("<useEffect />");
  }, []);

  return (
    <div className="app">
      <header className="header">
        <div className="app-header">
          <h1>🔥 Todolist</h1>
          <div className="nav-links">
              <Link to="/" className="nav-link">Home</Link>
              <Link to="/about" className="nav-link">About</Link>
          </div>
        </div>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<HomePage authenticated={authenticated} setAuthenticated={setAuthenticated} />}></Route>
          <Route path="/about" element={<AboutPage />}></Route>
          <Route path="*" element={<NotFoundPage />}></Route>
        </Routes>
      </main>
      <footer className="footer">
        <p className='copyright'>Yakir Hizkiyahu</p>
      </footer>
    </div>
  );
}