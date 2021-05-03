import React from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';

import './styles.css';

export default function AmountInput({ amount, onChangeAmount }) {
  function handleAmount(value) {
    if (amount + value !== 0) onChangeAmount(amount + value);
  }

  return (
    <div id="amount-input-component">
      <button
        type="button"
        className={amount === 1 ? 'circle-button disabled' : 'circle-button'}
        disabled={amount === 1}
        onClick={() => handleAmount(-1)}
      >
        <FaMinus color={amount > 1 ? '#535bfe' : '#acacac'} size={14} />
      </button>

      <div className="amount-input">
        <span className="time-text">{amount}</span>
      </div>

      <button
        type="button"
        className="circle-button"
        onClick={() => handleAmount(1)}
      >
        <FaPlus color="#535bfe" size={14} />
      </button>
    </div>
  );
}
