const URL = "http://localhost:8000";

/* POST - login */
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

/* POST - signup */
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
