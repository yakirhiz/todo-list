const URL = "http://localhost:8000";

export const login = async (username, password) => {
  try {
    const res = await fetch(`${URL}/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({username, password})
    });
    
    if (!res.ok) {
      const json = await res.json();
      if (json.error) {
        throw new Error(json.error);
      }

      throw new Error("An unexpected error has occurred!");
    }
    
    return await res.json();
  } catch (err) {
    throw err;
  }
}

export const signup = async (username, password) => {
  try {
    const res = await fetch(`${URL}/users/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({username, password})
    });

    if (!res.ok) {
      const json = await res.json();
      if (json.error) {
        throw new Error(json.error);
      }

      throw new Error("An unexpected error has occurred!");
    }

    return await res.json();
  } catch (err) {
    throw err;
  }
}

export const editUser = async (username, data, token) => {
  try {
    const res = await fetch(`${URL}/users/${username}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(data)
    });

    if (!res.ok) {
      const json = await res.json();
      if (json.error) {
        throw new Error(json.error);
      }

      throw new Error("An unexpected error has occurred!");
    }

    return await res.json();
  } catch (err) {
    throw err;
  }
}

export const deleteUser = async (username, token) => {
  try {
    const res = await fetch(`${URL}/users/${username}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });

    if (!res.ok) {
      const json = await res.json();
      if (json.error) {
        throw new Error(json.error);
      }

      throw new Error("An unexpected error has occurred!");
    }

    return await res.json();
  } catch (err) {
    throw err;
  }
}
