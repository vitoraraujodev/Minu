import React, { useState, useRef, useEffect } from 'react';

import { ReactComponent as ExpandArrow } from '~/assets/icons/expand-arrow.svg';

import './styles.css';

export default function Accordion({
  title,
  loading,
  children,
  disabled,
  length,
}) {
  const [active, setActive] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    contentRef.current.style.maxHeight = active
      ? `${contentRef.current.scrollHeight}px`
      : '0px';
  }, [contentRef, active, length]);

  function toogleActive() {
    if (!disabled && !loading) {
      setActive(!active);
    }
  }

  return (
    <div id="accordion">
      <button
        type="button"
        className={disabled ? 'accordion-tab-disabled' : 'accordion-tab'}
        onClick={toogleActive}
      >
        <p>{title}</p>

        {loading ? (
          <div className="loader-container">
            <div className="loader" />
          </div>
        ) : (
          <span className={active ? 'accordion-icon rotate' : 'accordion-icon'}>
            <ExpandArrow
              style={{ height: 8 }}
              fill={disabled ? '#acacac' : '#535BFE'}
            />
          </span>
        )}
      </button>

      <div ref={contentRef} className="accordion-content">
        {children}
      </div>
    </div>
  );
}
