import React, { useState, useEffect } from 'react';
import './Snackbar.css';

const Snackbar = ({ message, type, duration = 5000, onClose }) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress <= 0) {
          clearInterval(timer);
          onClose();
          return 0;
        }
        return prevProgress - (100 / duration) * 100;
      });
    }, 100);

    return () => clearInterval(timer);
  }, [duration, onClose]);

  return (
    <div className={`snackbar ${type}`}>
      <span className="snackbar-message">{message}</span>
      <button className="snackbar-close" onClick={onClose}>&times;</button>
      <div className="snackbar-progress" style={{ width: `${progress}%` }}></div>
    </div>
  );
};

export default Snackbar;