import React from 'react';
import { Link } from 'react-router-dom';

import '../styles.css';

export default function LinkOption({ route, text }) {
  return (
    <div id="profile-option">
      <Link to={route}>
        <div className="option-area">
          <div className="option">
            <span className="option-text">{text}</span>
          </div>
        </div>
      </Link>
    </div>
  );
}
