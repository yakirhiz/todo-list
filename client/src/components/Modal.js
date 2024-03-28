import { useState } from 'react';
import { postTodo, updateTodo } from '../services/todosApi';

export default function Modal({ mode, setShowModal, getData, todo }) {
  const username = localStorage.getItem("username");
  const editMode = mode === "edit"; // variable is optional

  const [data, setData] = useState({
    username: editMode ? todo.username : username, // check is redundant
    title: editMode ? todo.title : "",
    progress: editMode ? todo.progress : 0
  })

  const postData = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    try {
      await postTodo(data, token);
      setShowModal(false);
      getData();
    } catch (err) {
      console.log(err);
    }
  }

  const editData = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    try {
      await updateTodo(todo.id, data, token);
      setShowModal(false);
      getData();
    } catch (err) {
      console.log(err);
    }
  }

  const handleChange = (e) => {
    const {name, value} = e.target;
    setData(data => ({...data, [name]: value}));
  }


  return (
    <div className="overlay">
      <div className="modal">
        <div className="form-title-container">
          <h3>Let's {mode} your task</h3>
          <button onClick={() => setShowModal(false)}>X</button>
        </div>
        <form>
          <input
            required
            maxLength={30}
            placeholder="Your task goes here"
            name="title"
            value={data.title}
            onChange={handleChange}
          />
          <br />
          <label htmlFor="range">Drag to select you current progress</label>
          <input
            required
            type="range"
            id="range"
            min="0"
            max="100"
            name="progress"
            value={data.progress}
            onChange={handleChange}
          />
          <input
            className={mode}
            type="submit"
            onClick={editMode ? editData : postData}
          />
        </form>
      </div>
    </div>
  );
}