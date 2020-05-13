import React from 'react';

import './styles.css';

export default function ProgressionBar({ step }) {
  return (
    <div className="progression-bar-container">
      {step === 1 ? <div className="firstStep" /> : null}
      {step === 2 ? <div className="secondStep" /> : null}
      {step === 3 ? <div className="thirdStep" /> : null}
    </div>
  );
}
