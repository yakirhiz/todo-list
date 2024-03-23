import { useState } from 'react';

export default function Auth({ getData }) {
  const [isLogIn, setIsLogIn] = useState(true);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [error, setError] = useState(null);

  const viewLogin = (status) => {
    setError(null);
    setIsLogIn(status);
    console.log(`isLogIn is set to ${status}`);
  };

  const handleSubmit = async (e, endpoint) => {
    console.log("Sending auth request...");
    e.preventDefault();
    
    if (endpoint === 'signup' && password !== confirmPassword) {
      setError('Make sure passwords match!');
      return;
    }

    try {
      const res = await fetch(`http://localhost:8000/users/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({username, password})
      });

      const json = await res.json();
      console.log(json)

      if (json.error) {
        setError(json.error);
      } else {
        localStorage.setItem("username", username);
        localStorage.setItem("authToken", true);
        localStorage.setItem("token", json.token);
        setError(null);
        getData(); // window.location.reload();
      }
    } catch (err) {
      setError('Cannot reach the server!');
      console.log(err);
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-container-box">
        <form>
          <h2>{isLogIn ? 'Please log in' : 'Please sign up'}</h2>
          <input type="username" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
          <input type="password" placeholder="Password"  onChange={(e) => setPassword(e.target.value)} />
          {!isLogIn &&  <input type="password" placeholder="Confirm password"  onChange={(e) => setConfirmPassword(e.target.value)} />}
          <input type="submit" className="create" onClick={(e) => handleSubmit(e, isLogIn ? 'login' : 'signup')} />
          {error && <p style={{color:"red"}}>{error}</p>}
        </form>
        <div className='auth-options'>
          <button 
            onClick={() => viewLogin(false)}
            style={{backgroundColor: isLogIn ? 'white' : '#BCBCBC'}}
          >Sign Up</button>
          <button 
            onClick={() => viewLogin(true)}
            style={{backgroundColor: isLogIn ? '#BCBCBC' : 'white'}}
          >Login</button>
        </div>
      </div>
    </div>
  );
}