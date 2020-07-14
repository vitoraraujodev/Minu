import React, { useState, useRef, useEffect } from 'react';

import { ReactComponent as ExpandArrow } from '~/assets/images/expand-arrow.svg';

import './styles.css';

export default function Accordion({ title, children }) {
  const [active, setActive] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    contentRef.current.style.maxHeight = active
      ? `${contentRef.current.scrollHeight}px`
      : '0px';
  }, [contentRef, active]);

  const toogleActive = () => {
    setActive(!active);
  };

  return (
    <div id="accordion">
      <button type="button" className="accordion-tab" onClick={toogleActive}>
        <p className="accordion-title">{title}</p>
        <span className={active ? 'accordion-icon rotate' : 'accordion-icon'}>
          <ExpandArrow style={{ height: 8 }} fill="#535BFE" />
        </span>
      </button>

      <div ref={contentRef} className="accordion-content">
        {children}
      </div>
    </div>
  );
}
