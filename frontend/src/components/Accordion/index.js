import React, { useState, useRef, useEffect } from 'react';

import { ReactComponent as ExpandArrow } from '~/assets/images/expand-arrow.svg';

import './styles.css';

export default function Accordion({ title, children, disabled }) {
  const [active, setActive] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    contentRef.current.style.maxHeight = active
      ? `${contentRef.current.scrollHeight}px`
      : '0px';
  }, [contentRef, active]);

  function toogleActive() {
    if (!disabled) {
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
        <span className={active ? 'accordion-icon rotate' : 'accordion-icon'}>
          <ExpandArrow
            style={{ height: 8 }}
            fill={disabled ? '#acacac' : '#535BFE'}
          />
        </span>
      </button>

      <div ref={contentRef} className="accordion-content">
        {children}
      </div>
    </div>
  );
}
