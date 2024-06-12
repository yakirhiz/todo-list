const URL = "http://localhost:8000";

/* GET */
export const getTodos = async (username, token) => {
  try {
    const res = await fetch(`${URL}/todos/${username}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    if (!res.ok) {
      const response = await res.json();
      if (response.error) {
        throw new Error(response.error);
      }
      throw new Error("An unexpected error occurred!");
    }
    
    return await res.json();
  } catch (err) {
    throw err;
  }
}

/* POST */
export const postTodo = async (data, token) => {
  try {
    const res = await fetch(`${URL}/todos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(data)
    });

    if (!res.ok) {
      const response = await res.json();
      if (response.error) {
        throw new Error(response.error);
      }
      throw new Error("An unexpected error occurred!");
    }

    return await res.json();
  } catch (err) {
    throw err;
  }
}

/* UPDATE */
export const updateTodo = async (todoId, data, token) => {
  try {
    const res = await fetch(`${URL}/todos/${todoId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(data)
    });

    if (!res.ok) {
      const response = await res.json();
      if (response.error) {
        throw new Error(response.error);
      }
      throw new Error("An unexpected error occurred!");
    }
    
    return await res.json();
  } catch (err) {
    throw err;
  }
}

/* DELETE */
export const deleteTodo = async (todoId, token) => {
  try {
    const res = await fetch(`${URL}/todos/${todoId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });

    if (!res.ok) {
      const response = await res.json();
      if (response.error) {
        throw new Error(response.error);
      }
      throw new Error("An unexpected error occurred!");
    }
    
    return await res.json();
  } catch (err) {
    throw err;
  }
}