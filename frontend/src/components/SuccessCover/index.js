import React from 'react';
import { FiXCircle } from 'react-icons/fi';

import { Button } from '~/components/Buttons';

import { ReactComponent as Symbols } from '~/assets/icons/symbols.svg';

import './styles.css';

export default function SuccessCover({
  successText = 'Sucesso!',
  successSubtext = '',
  successButtonText = '',
  background = '#535bfe',
  onClick = () => {},
  onClose,
}) {
  return (
    <>
      <div id="success-conver-background" style={{ background }} />

      <div id="success-cover">
        <div className="success-content">
          <div>
            <button
              type="button"
              onClick={onClose}
              className="success-close-button"
            >
              <FiXCircle size={20} color="#fff" />
              <b style={{ marginLeft: 8 }}>Fechar</b>
            </button>
          </div>

          <div className="symbols-container1">
            <Symbols height={80} />
          </div>

          <p className="success-text">{successText}</p>

          <div className="symbols-container2">
            <Symbols height={80} />
          </div>

          {successSubtext && (
            <p className="success-subtext">{successSubtext}</p>
          )}

          {successButtonText && (
            <Button variant="tertiary" onClick={onClick}>
              <p className="success-button-text">{successButtonText}</p>
            </Button>
          )}
        </div>
      </div>
    </>
  );
}
