import React, { useState, useEffect } from 'react';
import './Toast.css';

const Toast = ({ message, type, duration = 5000, onClose }) => {
  console.log("Rendering <Toast> component...");

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className={`toast ${type}`}>
      <span className="toast-message">{message}</span>
      <button className="toast-close" onClick={onClose}>&times;</button>
    </div>
  );
};

export default Toast; // Maybe use `React.memo()`

// onClose handler has to be cache to prevent unnecessay render and useEffect's */
// const handleCloseToast = useCallback(() => {
//   setError(null);
// }, []);