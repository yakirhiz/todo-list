import React, { useState } from 'react';
import './FloatingButton.css';

const FloatingButton = ({ onClick, children, tooltip }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div 
      className="floating-button-wrapper"
      /* Can use the :hover CSS pseudo-class instead of events  */
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <button className="floating-button" onClick={onClick}>
        {children}
      </button>
      {showTooltip && tooltip && (
        <div className="tooltip">{tooltip}</div>
      )}
    </div>
  );
};

export default FloatingButton;