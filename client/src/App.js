import Auth from './components/Auth';
import ListHeader from './components/ListHeader';
import ListItem from './components/ListItem';
import { useEffect, useState } from "react";
import { getTodos } from './services/todosApi';
import Router from './Router';
import AuthFirebaseGoogle from './components/firebase/AuthFirebaseGoogle';

export default function App() {
  console.log("Rendering <App> component...");

  // TODO: maybe use state for both + localStorage
  const username = localStorage.getItem("username");
  const authToken = localStorage.getItem("authToken");
  // const token = localStorage.getItem("token");

  // const [userRender, setUserRender] = useState(false); // can be in the dependency array

  // useState initialize the variable only once
  const [todos, setTodos] = useState([]);

  const getData = async () => {
    const username = localStorage.getItem("username");
    const token = localStorage.getItem("token");
    console.log(`Fetching data for @${username}`);

    try {
      const todos = await getTodos(username, token);
      setTodos(todos);
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
      {/* <AuthFirebaseGoogle getData={getData} /> */}
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