import React from 'react';

import './styles.css';

export default function FooterButton({
  children,
  theme = 'primary',
  disabled = false,
  onClick = () => {},
}) {
  return (
    <div id="footer-button-component">
      <button
        type="button"
        className="footer-button"
        style={{ '--buttonColor': `var(--${theme})` }}
        disabled={disabled}
        onClick={onClick}
      >
        {children || 'Click me!'}
      </button>
    </div>
  );
}
