import React from 'react';

import './styles.css';

export default function OrderModal({ order, onClose }) {
  return (
    <div id="dashboard-order-modal">
      <div className="modal-container">
        <p className="modal-title">Atendimento</p>

        <p className="modal-text">
          A <b>mesa {order >= '0' && order <= '9' ? `0${order}` : order}</b>{' '}
          chamou um garçom!
        </p>

        <div className="button-group">
          <button
            type="button"
            onClick={onClose}
            className="modal-close-button"
          >
            Fechar
          </button>

          <button
            type="button"
            onClick={onClose}
            className="modal-archive-button"
          >
            Arquivar
          </button>
        </div>
      </div>
    </div>
  );
}
