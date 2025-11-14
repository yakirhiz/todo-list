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
      setAuthenticated(true);
      navigate("/");
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="auth-container-modern">
      <div className="auth-tabs">
        <button 
          onClick={() => viewLogin(true)}
          className={`auth-tab ${isLogIn ? 'active' : ''}`}
          disabled={isLoading}
        >
          Sign In
        </button>
        <button 
          onClick={() => viewLogin(false)}
          className={`auth-tab ${!isLogIn ? 'active' : ''}`}
          disabled={isLoading}
        >
          Sign Up
        </button>
      </div>

      <form onSubmit={(e) => handleSubmit(e, isLogIn ? 'login' : 'signup')} className="auth-form-modern">
        <div className="auth-form-header">
          <h2>{isLogIn ? 'Welcome back!' : 'Create your account'}</h2>
          <p>{isLogIn ? 'Enter your credentials to continue' : 'Get started with your free account'}</p>
        </div>

        <div className="input-group">
          <label htmlFor="username">Username</label>
          <div className="input-with-icon">
            <User size={18} className="input-icon" />
            <input
              id="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={isLoading}
              maxLength={25}
              className="modern-input"
            />
          </div>
        </div>

        <div className="input-group">
          <label htmlFor="password">Password</label>
          <div className="input-with-icon password-input-wrapper">
            <Lock size={18} className="input-icon" />
            <input
              id="password"
              ref={inputRef}
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              maxLength={25}
              className="modern-input"
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
        </div>

        {!isLogIn && (
          <div className="input-group">
            <label htmlFor="confirm-password">Confirm Password</label>
            <div className="input-with-icon password-input-wrapper">
              <Lock size={18} className="input-icon" />
              <input
                id="confirm-password"
                type={showPassword ? "text" : "password"}
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={isLoading}
                maxLength={25}
                className="modern-input"
              />
            </div>
          </div>
        )}

        {error && (
          <div className="error-message">
            <TriangleAlert size={18} />
            {error}
          </div>
        )}

        <button
          type="submit"
          className="auth-submit-btn"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span className="loading-spinner"></span>
              Processing...
            </>
          ) : (
            isLogIn ? 'Sign In' : 'Create Account'
          )}
        </button>

        {isLogIn && (
          <div className="auth-footer-link">
            <a href="#forgot-password">Forgot your password?</a>
          </div>
        )}
      </form>
    </div>
  );
}