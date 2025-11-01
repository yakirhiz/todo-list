import Auth from './components/Auth';
import { useEffect, useState } from "react";
import TodoList from './components/TodoList';

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
        </div>
      </header>
      <main>
        {!authenticated ? <Auth setAuthenticated={setAuthenticated} /> : <TodoList setAuthenticated={setAuthenticated} />}
      </main>
      <footer className="footer">
        <p className='copyright'>Yakir Hizkiyahu</p>
      </footer>
    </div>
  );
}