import React, { useState, useEffect } from 'react';

import './styles.css';

export default function ProgressionBar({ step, maxSteps }) {
  const [width, setWidth] = useState(320);

  async function handleResize() {
    const progressionBar = document.getElementById('progression-bar');
    if (progressionBar && progressionBar.offsetWidth !== width) {
      setWidth(progressionBar.offsetWidth - 32);
    }
  }

  useEffect(() => {
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  window.addEventListener('resize', handleResize);

  return (
    <div id="progression-bar">
      <div
        style={{ width: width * (step / maxSteps) }}
        className="progression"
      />
    </div>
  );
}
