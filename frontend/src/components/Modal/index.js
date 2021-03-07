import React from 'react';

import './styles.css';

export default function Modal({ onClose, children }) {
  return (
    <div id="modal-component">
      <div className="background" onClick={onClose} />

      <div className="modal-container">{children}</div>
    </div>
  );
}
