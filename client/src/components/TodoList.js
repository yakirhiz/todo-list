import { useEffect, useState } from "react";
import { getTodos } from '../services/todosApi';
import ListHeader from './ListHeader';
import List from './List';

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

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

  // Filter todos based on search query
  const filteredTodos = todos.filter(todo => 
    todo.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <ListHeader listName={'🔥 Todolist'} getData={getData} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <List todos={filteredTodos} getData={getData} />
    </>
  );
}