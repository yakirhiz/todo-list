import ListItem from "./ListItem";

export default function List({ todos, getData }) {

  return (
    <>
      {todos.map((todo) => <ListItem key={todo.id} todo={todo} getData={getData} />)}
    </>
  );
}