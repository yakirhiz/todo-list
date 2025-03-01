import { useState } from 'react';
import { login, signup } from '../services/usersApi';

export default function Auth({ setAuthenticated }) {
  const [isLogIn, setIsLogIn] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const viewLogin = (status) => {
    setError(null);
    setIsLogIn(status);
    setUsername("");
    setPassword("");
    setConfirmPassword("");
    console.log(`isLogIn is set to ${status}`);
  };

  const handleSubmit = async (e, endpoint) => {
    console.log("Sending auth request...");
    e.preventDefault();
    
    if (!username || !password) {
      setError('Username and password cannot be empty!');
      return;
    }
    
    if (endpoint === 'signup' && password !== confirmPassword) {
      setError('Make sure passwords match!');
      return;
    }

    setIsLoading(true);

    try {
      const json = (endpoint === 'signup') ?
        await signup(username, password) :
        await login(username, password);

      localStorage.setItem("username", username);
      localStorage.setItem("authToken", true);
      localStorage.setItem("token", json.token);
      setError(null);
      setAuthenticated(true); // window.location.reload();
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-container-box">
        <form onSubmit={(e) => handleSubmit(e, isLogIn ? 'login' : 'signup')} >
          <h2>{isLogIn ? 'Please log in' : 'Please sign up'}</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={isLoading}
            maxlength="25"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
          />
          {!isLogIn && (
            <input
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={isLoading}
            />
          )}
          <input type="submit" className="create" disabled={isLoading} />
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