import Auth from './components/Auth';
import ListHeader from './components/ListHeader';
import ListItem from './components/ListItem';
import { useEffect, useState } from "react";

export default function App() {
  console.log("Rendering <App> component...");

  // TODO: maybe use state for both + localStorage
  const username = localStorage.getItem("username");
  const authToken = localStorage.getItem("authToken");
  const token = localStorage.getItem("token");

  const [userRender, setUserRender] = useState(false); // can be in the dependency array

  // useState initialize the variable only once
  const [todos, setTodos] = useState([]);

  const getData = async () => {
    const username = localStorage.getItem("username");
    const authToken = localStorage.getItem("authToken");
    const token = localStorage.getItem("token");
    console.log(`Fetching data for @${username}`);

    try {
      const res = await fetch(`http://localhost:8000/todos/${username}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      
      const json = await res.json();
      console.log(json) // DEBUG - Print return todos to console
      setTodos(json);
    } catch (err) {
      console.log(err);
    }
  }

  // Called once when the page is reloading (or first component rendering)
  useEffect(() => {
    console.log("<Effecting... >");

    if (authToken) {
      getData();
    }

    console.log("<Effect />");
  }, []);

  return (
    <div className="app">
      {/* <AuthFirebase getDataFirebase={getDataFirebase} /> */}
      {!authToken && <Auth getData={getData} />}
      {authToken &&
        <>
          <ListHeader listName={'🔥Todolist'} getData={getData} setTodos={setTodos} />
          <p className='greeting'>Hello, <b>{username}</b></p>
          {todos.map((todo) => <ListItem key={todo.id} todo={todo} getData={getData} />)}
        </>}
      <p className='copyright'>Yakir Hizkiyahu</p>
    </div>
  );
}