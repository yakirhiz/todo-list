import { useState } from "react";
import TickIcon from './TickIcon';
import Modal from "./Modal";
import ProgressBar from './ProgressBar';
import { deleteTodo } from '../todosApi';

export default function ListItem({todo, getData}) {
  const [showModal, setShowModal] = useState(false);

  const deleteData = async () => {
    const token = localStorage.getItem("token");
    
    try {
      await deleteTodo(todo.id, token);
      getData();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <li className="list-item">
      <div className="info-container">
        <TickIcon />
        <p className="task-title">{todo.title}</p>
        <ProgressBar progress={todo.progress} />
      </div>
      <div className="button-container">
        <button className="edit" onClick={() => setShowModal(true)}>EDIT</button>
        <button className="delete" onClick={() => deleteData()}>DELETE</button>
      </div>
      {showModal && <Modal mode={'edit'} setShowModal={setShowModal} getData={getData} todo={todo} />}
    </li>
  );
}