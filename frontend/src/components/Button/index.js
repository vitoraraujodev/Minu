import React from 'react';

import './styles.css';

export default function Button({
  children,
  variant = 'primary',
  color = '#535BFE',
  fontSize = 18,
  disabled = false,
  onClick = () => {},
}) {
  const styleVariant =
    variant !== 'primary' &&
    variant !== 'secondary' &&
    variant !== 'tertiary' &&
    variant !== 'warning'
      ? 'primary'
      : variant;

  return (
    <button
      type="button"
      id="button-component"
      className={styleVariant}
      style={{ '--buttonColor': color, fontSize }}
      disabled={disabled}
      onClick={onClick}
    >
      {children || 'Click me!'}
    </button>
  );
}
