import React from 'react';

import { ReactComponent as Close } from '~/assets/icons/close-icon.svg';

import './styles.css';

export default function OrderModal({ onCart, onOrder, onClose }) {
  return (
    <div id="product-order-modal">
      <div className="modal-container">
        <div className="group">
          <p className="modal-text">Pedir agora?</p>

          <button
            type="button"
            onClick={onClose}
            className="modal-close-button"
          >
            <Close />
          </button>
        </div>

        <p className="modal-subtext">
          Você também pode adicionar este produto ao carrinho
        </p>

        <div className="button-group">
          <button type="button" onClick={onCart} className="modal-cart-button">
            Adicionar ao carrinho
          </button>
          <button
            type="button"
            onClick={onOrder}
            className="modal-order-button"
          >
            Pedir
          </button>
        </div>
      </div>
    </div>
  );
}
