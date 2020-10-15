import React from 'react';

import { ReactComponent as Close } from '~/assets/icons/close-icon.svg';

import './styles.css';

export default function BillModal({ onClose }) {
  return (
    <div id="bill-modal">
      <div className="modal-container">
        <div className="modal-group">
          <p className="modal-text">Pedir a conta?</p>

          <button
            type="button"
            onClick={onClose}
            className="modal-close-button"
          >
            <Close size="24" />
          </button>
        </div>

        <p className="modal-subtext">
          Um garçom virá para encerrar o atendimento
        </p>
        <button
          type="button"
          onClick={() => {}}
          className="modal-confirm-button"
        >
          Confirmar
        </button>
      </div>
    </div>
  );
}
