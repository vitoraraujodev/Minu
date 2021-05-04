import React from 'react';

import { Button } from '~/components/Buttons';

import { ReactComponent as Close } from '~/assets/icons/close-icon.svg';

import './styles.css';

export default function ConfirmationModal({
  title,
  description,
  onClose,
  onConfirm,
}) {
  return (
    <div id="confirmation-modal">
      <div className="background" onClick={onClose} />

      <div className="confirmation-container">
        <div className="confirmation-header">
          <p className="confirmation-title">{title}</p>

          <button type="button" onClick={onClose} className="close-button">
            <Close size="24" />
          </button>
        </div>

        {description && (
          <p className="confirmation-description">{description}</p>
        )}

        <Button variant="warning" onClick={onConfirm}>
          Confirmar
        </Button>
      </div>
    </div>
  );
}
