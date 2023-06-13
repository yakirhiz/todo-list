import { useState } from 'react';

export default function Modal({ mode, setShowModal, getData, todo }) {
  const username = localStorage.getItem("username");
  const editMode = mode === "edit";

  const [data, setData] = useState({
    username: editMode ? todo.username : username,
    title: editMode ? todo.title : "default",
    progress: editMode ? todo.progress : "default"
  })

  const postData = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:8000/todos', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      });

      if (res.status === 200) {
        setShowModal(false);
        getData();
      }
    } catch (err) {
      console.log(err);
    }
  }

  const editData = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:8000/todos/${todo.id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      });

      if (res.status === 200) {
        setShowModal(false);
        getData();
      }
    } catch (err) {
      console.log(err);
    }
  }

  const handleChange = (e) => {
    const {name, value} = e.target;

    setData(data => ({
      ...data,
      [name]: value
    }))
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
          <input className={mode} type="submit" onClick={editMode ? editData : postData} />
        </form>
      </div>
    </div>
  );
}