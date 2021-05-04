import React from 'react';

import './styles.css';

export default function FooterButton({
  children,
  color = '#535BFE',
  disabled = false,
  onClick = () => {},
}) {
  return (
    <div id="footer-button-component">
      <button
        type="button"
        className="footer-button"
        style={{ '--buttonColor': color }}
        disabled={disabled}
        onClick={onClick}
      >
        {children || 'Click me!'}
      </button>
    </div>
  );
}
