import ListItem from "./ListItem";

export default function List({ todos, getData }) {

  return (
    <ul className="list">
      {todos.map((todo) => <ListItem key={todo.id} todo={todo} getData={getData} />)}
    </ul>
  );
}