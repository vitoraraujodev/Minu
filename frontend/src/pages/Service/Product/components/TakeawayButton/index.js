import React from 'react';
import { FaCheck } from 'react-icons/fa';

import './styles.css';

function TakeawayButton({ takeaway, onChangeTakeaway }) {
  return (
    <button
      type="button"
      id="product-takeaway-component"
      className={takeaway && 'selected'}
      onClick={() => onChangeTakeaway(!takeaway)}
    >
      <span style={{ paddingRight: 8 }}>Para viagem</span>

      <div className="check-box">
        {takeaway && <FaCheck size={14} color="#fff" />}
      </div>
    </button>
  );
}

export default TakeawayButton;
