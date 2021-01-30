import React from 'react';

import './styles.css';

export default function Order({ order, onClick }) {
  return (
    <button type="button" id="order-component" onClick={onClick}>
      <span>Mesa {order >= '0' && order <= '9' ? `0${order}` : order}</span>
      <span>11:03</span>
    </button>
  );
}
