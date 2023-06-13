import Auth from './components/Auth';
import ListHeader from './components/ListHeader';
import ListItem from './components/ListItem';
import { useEffect, useState } from "react";

export default function App() {
  const username = localStorage.getItem("username");
  const authToken = localStorage.getItem("authToken");
  const [todos, setTodos] = useState([]);

  const getData = async () => {
    try {
      const res = await fetch(`http://localhost:8000/todos/${username}`);
      const json = await res.json();
      setTodos(json);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (authToken) {
      getData();
    }
    console.log('called');
  }, []);

  return (
    <div className="app">
      {!authToken && <Auth />}
      {authToken &&
        <>
          <ListHeader listName={'🔥todolist'} getData={getData} />
          <p className='greeting'>Hello, <b>{username}</b></p>
          {todos.map((todo) => <ListItem todo={todo} getData={getData} />)}
        </>}
      <p className='copyright'>Yakir Hizkiyahu</p>
    </div>
  );
}