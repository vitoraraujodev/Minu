import React from 'react';

import { ReactComponent as Close } from '~/assets/icons/close-icon2.svg';
import { ReactComponent as Symbols } from '~/assets/icons/symbols.svg';

import './styles.css';

export default function WaiterPending({ onClose }) {
  return (
    <>
      <div className="finish-background" />

      <div className="finish-page">
        <div>
          <button type="button" onClick={onClose} className="close-button">
            <Close size={16} />
            <b style={{ marginLeft: 4 }}>Fechar</b>
          </button>
        </div>

        <div className="finish-content">
          <div className="symbols-container1">
            <Symbols height={80} />
          </div>

          <h1 className="finish-text">Você chamou o garçom!</h1>

          <div className="symbols-container2">
            <Symbols height={80} />
          </div>
        </div>

        <p className="pending-text">Aguarde, voce já será atendido!</p>
      </div>
    </>
  );
}
