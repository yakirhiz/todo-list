import { useEffect, useState } from "react";
import { getTodos } from '../services/todosApi';
import ListHeader from './ListHeader';
import List from './List';

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const getData = async () => {
    const token = localStorage.getItem("token");

    try {
      const todos = await getTodos(token);
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