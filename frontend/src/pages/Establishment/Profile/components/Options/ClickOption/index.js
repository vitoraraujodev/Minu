import React from 'react';

import '../styles.css';

export default function ClickOption({ onClick, text, color }) {
  return (
    <div id="profile-option">
      <div className="option-area" onClick={onClick}>
        <div className="option">
          <span className="option-text" style={{ color: `${color || null}` }}>
            {text}
          </span>
        </div>
      </div>
    </div>
  );
}
