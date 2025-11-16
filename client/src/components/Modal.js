import { useState } from 'react';
import { postTodo, updateTodo } from '../services/todosApi';

export default function Modal({ mode, setShowModal, getData, todo }) {
  const editMode = mode === "edit"; // variable is optional

  const [data, setData] = useState({
    title: editMode ? todo.title : "",
    progress: editMode ? todo.progress : 0
  })

  function isWhitespace(input) {
    return input.trim() === '';
  }

  const postData = async (e) => {
    e.preventDefault();

    if (isWhitespace(data.title)) {
      alert("title cannot be empty");
      return;
    }

    const token = localStorage.getItem("token");

    try {
      await postTodo(data, token);
      await getData();
    } catch (err) {
      console.log(err);
    }
    setShowModal(false);
  }

  const editData = async (e) => {
    e.preventDefault();

    if (isWhitespace(data.title)) {
      alert("title cannot be empty");
      return;
    }

    const token = localStorage.getItem("token");

    try {
      await updateTodo(todo.id, data, token);
      await getData();
    } catch (err) {
      console.log(err);
    }
    setShowModal(false);
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
          <button onClick={() => setShowModal(false)}>&times;</button>
        </div>
        <form>
          <input
            required
            maxLength={255}
            placeholder="Your task goes here"
            name="title"
            value={data.title}
            onChange={handleChange}
            autoFocus
          />
          <br />
          <label htmlFor="range">Drag to select you current progress: {data.progress}%</label>
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
            value={editMode ? "Save Changes" : "Add Task"}
          />
        </form>
      </div>
    </div>
  );
}