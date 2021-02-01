import React from 'react';

import './styles.css';

export default function OrderModal({ order, onClose, onArchive }) {
  var tableNumber = order.TableNumber
  return (
    <div id="dashboard-order-modal">
      <div className="modal-container">
        <p className="modal-title">Atendimento</p>

        <p className="modal-text">
          A <b>mesa {tableNumber >= '0' && tableNumber <= '9' ? `0${tableNumber}` : tableNumber}</b>{' '}
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
            onClick={onArchive}
            className="modal-archive-button"
          >
            Arquivar
          </button>
        </div>
      </div>
    </div>
  );
}
