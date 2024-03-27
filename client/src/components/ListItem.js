import { useState } from "react";
import TickIcon from './TickIcon';
import Modal from "./Modal";
import ProgressBar from './ProgressBar';

export default function ListItem({todo, getData}) {
  const [showModal, setShowModal] = useState(false);

  const deleteData = async () => {
    const token = localStorage.getItem("token");
    
    try {
      const res = await fetch(`http://localhost:8000/todos/${todo.id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!res.ok) {
        throw new Error("Failed to delete data");
      }
      
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