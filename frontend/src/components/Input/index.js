import React from 'react';

import './styles.css';

export default function Input({
  value = '',
  variant = 'primary',
  maxLength = null,
  readOnly = false,
  disabled = false,
  type = 'text',
  inputMode = 'text',
  placeholder = '',
  prefix = null,
  suffix = null,
  style = {},
  extraClass = '',
  maxWidth = '100%',
  onKeyDown = () => {},
  onChange = () => {},
}) {
  function handleClassName() {
    const prefixClass = prefix ? 'prefix' : '';
    const suffixClass = suffix ? 'suffix' : '';

    const styleVariant =
      variant !== 'primary' && variant !== 'secondary' && variant !== 'tertiary'
        ? 'primary'
        : variant;

    return `input-component ${styleVariant} ${prefixClass} ${suffixClass} ${extraClass}`;
  }

  return (
    <div id="input-component" style={{ maxWidth }}>
      {!!prefix && <div className="prefix-container">{prefix}</div>}

      <input
        value={value}
        type={type}
        inputMode={inputMode}
        maxLength={maxLength}
        readOnly={readOnly}
        disabled={disabled}
        className={handleClassName()}
        style={style}
        onKeyDown={onKeyDown}
        onChange={onChange}
        placeholder={placeholder}
      />

      {!!suffix && <div className="suffix-container">{suffix}</div>}
    </div>
  );
}
