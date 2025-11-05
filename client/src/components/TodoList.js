import { useEffect, useState } from "react";
import { getTodos } from '../services/todosApi';
import ListHeader from './ListHeader';
import List from './List';

export default function TodoList() {
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

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <ListHeader listName={'🔥 Todolist'} getData={getData} />
      <List todos={todos} getData={getData} />
    </>
  );
}