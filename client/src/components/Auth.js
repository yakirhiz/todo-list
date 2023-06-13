import { useState } from 'react';

export default function Auth() {
  const [isLogIn, setIsLogIn] = useState(true);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [error, setError] = useState(null);

  //console.log(username, password, confirmPassword);

  const viewLogin = (status) => {
    console.log(isLogIn);
    setError(null);
    setIsLogIn(status);
  };

  const handleSubmit = async (e, endpoint) => {
    e.preventDefault();
    if (!isLogIn && password !== confirmPassword) {
      setError('Make sure passwords match!');
      return;
    }
    try {
      const res = await fetch(`http://localhost:8000/${endpoint}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username, password})
      });

      const json = await res.json();
      console.log(json);

      if (json.error) {
        setError(json.error);
      } else {
        localStorage.setItem("username", username);
        localStorage.setItem("authToken", true);
        // setError(null);
        window.location.reload();
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
            style={{backgroundColor: !isLogIn ? 'rgb(255,255,255)' : 'rgb(188, 188, 188)'}}
          >Sign Up</button>
          <button 
            onClick={() => viewLogin(true)}
            style={{backgroundColor: isLogIn ? 'rgb(255,255,255)' : 'rgb(188, 188, 188)'}}
          >Login</button>
        </div>
      </div>
    </div>
  );
}