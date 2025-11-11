import { useState, useRef } from 'react';
import { login, signup } from '../services/usersApi';
import { useNavigate } from 'react-router-dom';

import { Eye, EyeOff, User, Lock, Mail, TriangleAlert } from 'lucide-react';

export default function Auth({ setAuthenticated }) {
  const [isLogIn, setIsLogIn] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const inputRef = useRef(null);

  const togglePasswordVisibility = (e) => {
    e.preventDefault();
    
    // Store current cursor position before changing type
    const cursorPosition = inputRef.current.selectionStart;
    
    setShowPassword(prev => !prev);
    
    // Use setTimeout to restore cursor position after state update
    setTimeout(() => { /* Maybe use useLayoutEffect */
      if (inputRef.current) {
        inputRef.current.selectionStart = cursorPosition;
        inputRef.current.selectionEnd = cursorPosition;
      }
    }, 0);
  };

  const viewLogin = (status) => {
    setError(null);
    setIsLogIn(status);
    setUsername("");
    setPassword("");
    setConfirmPassword("");
    setShowPassword(false);
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

      localStorage.setItem("username", json.username);
      localStorage.setItem("authToken", true);
      localStorage.setItem("token", json.token);
      setError(null);
      setAuthenticated(true); // window.location.reload();
      navigate("/");
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="auth-container">
      <form onSubmit={(e) => handleSubmit(e, isLogIn ? 'login' : 'signup')} >
        <h2>{isLogIn ? 'Please log in' : 'Please sign up'}</h2>
        <input
          id="username"
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={isLoading}
          maxLength={25}
        />
        <div className="password-container">
          <input
            id="password"
            ref={inputRef}
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
            maxLength={25}
            className="password-input"
          />
          <button
            type="button"
            className="password-toggle-btn"
            onClick={togglePasswordVisibility}
            onMouseDown={(e) => e.preventDefault()}  // This is the key fix
            tabIndex={-1}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {!isLogIn && (
          <input
            id="confirm-password"
            type={showPassword ? "text" : "password"}
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={isLoading}
            maxLength={25}
          />
        )}
        {error && (
          <div className="error-message">
            <TriangleAlert size={18} />
            {error}
          </div>
        )}
        <input
          type="submit"
          className="create"
          disabled={isLoading}
          value={isLoading ? 'Processing...' : (isLogIn ? 'Login' : 'Sign Up')}
        />
      </form>
      <div className='auth-options'>
        <button 
          onClick={() => viewLogin(false)}
          className={isLogIn ? '' : 'active'}
          disabled={isLoading}
        >Sign Up</button>
        <button 
          onClick={() => viewLogin(true)}
          className={isLogIn ? 'active' : ''}
          disabled={isLoading}
        >Login</button>
      </div>
    </div>
  );
}