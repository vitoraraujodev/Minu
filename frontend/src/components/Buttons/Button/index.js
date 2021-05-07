import React from 'react';

import './styles.css';

export default function Button({
  children,
  variant = 'primary',
  theme = 'primary',
  disabled = false,
  size = 'big',
  onClick = () => {},
}) {
  const styleVariant =
    variant !== 'primary' &&
    variant !== 'secondary' &&
    variant !== 'tertiary' &&
    variant !== 'warning'
      ? 'primary'
      : variant;

  const styleSize = size !== 'small' && size !== 'big' ? 'big' : size;

  return (
    <button
      type="button"
      id="button-component"
      className={`${styleVariant} ${styleSize}`}
      style={{ '--buttonColor': `var(--${theme})` }}
      disabled={disabled}
      onClick={onClick}
    >
      {children || 'Click me!'}
    </button>
  );
}
