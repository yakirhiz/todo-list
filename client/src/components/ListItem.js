import { useState } from "react";
// import TickIcon from './TickIcon';
import Modal from "./Modal";
import ProgressBar from './ProgressBar';
import { deleteTodo } from '../services/todosApi';

import { Trash2, Pencil } from 'lucide-react';

export default function ListItem({todo, getData}) {
  const [showModal, setShowModal] = useState(false);

  const deleteData = async () => {
    const token = localStorage.getItem("token");
    
    try {
      await deleteTodo(todo.id, token);
      await getData();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <li className="list-item">
      <div className="info-container">
        {/* <TickIcon /> */}
        <p className="task-title">{todo.title}</p>
        <ProgressBar progress={todo.progress} />
      </div>
      <div className="button-container">
        <button className="edit" onClick={() => setShowModal(true)} title="Edit">
          <Pencil size={16} />
        </button>
        <button className="delete" onClick={() => deleteData()} title="Delete">
          <Trash2 size={16} />
        </button>
      </div>
      {showModal && <Modal mode={'edit'} setShowModal={setShowModal} getData={getData} todo={todo} showModal={showModal} />}
    </li>
  );
}