import { Link } from "react-router-dom";

export default function Header({ authenticated, username, signOut }) {
  return (
    <header className="header">
      <div className="app-header">
        <h1>🔥 Todolist</h1>
        <div className="nav-links">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/about" className="nav-link">About</Link>
            <Link to="/profile" className="nav-link">Profile</Link>
        </div>
        <div className="user-controls-container">
          <div className="user-controls">
            <div className="drawer-toggle-btn-container">
              <button
                className="drawer-toggle-btn"
              >
                ☰ Menu
              </button>
            </div>
            <div className="user-controls-btn-container">
              {authenticated ? (
                <button
                  className="btn btn-secondary"
                  onClick={signOut}
                >
                  Log Out
                </button>
              ) : (
                <Link to="/" className="btn btn-primary">Log In / Sign Up</Link>
              )}
            </div>
          </div>
          <div className="user-greeting">
            {authenticated ? (
              <span>Welcome, <b>{username}</b>!</span>
            ) : (
              <span>Welcome, Guest!</span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}