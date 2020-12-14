import React from 'react';

import { ReactComponent as Close } from '~/assets/icons/close-icon.svg';

import './styles.css';

export default function CartModal({ onClose, onOrder }) {
  return (
    <div id="cart-modal">
      <div className="modal-container">
        <div className="modal-group">
          <p className="modal-text">Realizar pedido?</p>

          <button
            type="button"
            onClick={onClose}
            className="modal-close-button"
          >
            <Close size="24" />
          </button>
        </div>

        <p className="modal-subtext">
          O garçom irá receber o seu pedido e em seguida enviará para cozinha
        </p>
        <button
          type="button"
          onClick={onOrder}
          className="modal-confirm-button"
        >
          Confirmar
        </button>
      </div>
    </div>
  );
}
