import React from 'react';

import './styles.css';

export default function Button({
  children,
  variant = 'primary',
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
      disabled={disabled}
      onClick={onClick}
    >
      {children || 'Click me!'}
    </button>
  );
}
