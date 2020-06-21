import React from 'react';

import './styles.css';

export default function ProgressionBar({ step }) {
  return (
    <div id="progression-bar">
      {step === 1 ? <div className="firstStep" /> : null}
      {step === 2 ? <div className="secondStep" /> : null}
      {step === 3 ? <div className="thirdStep" /> : null}
      {step === 4 ? <div className="fourthStep" /> : null}
    </div>
  );
}
