import React, { useState } from 'react';
import { FiCheck, FiCopy } from 'react-icons/fi';
import Modal from '~/components/Modal';

import { ReactComponent as Close } from '~/assets/icons/close-icon.svg';

import './styles.css';

export default function ShareModal({ onClose, establishmentId }) {
  const [copied, setCopied] = useState(false);

  const menuUrl = `https://seuminu.com/cardapio/${establishmentId}`;

  function handleCopyClick() {
    navigator.clipboard.writeText(menuUrl);
    setCopied(true);
  }

  return (
    <Modal onClose={onClose}>
      <div id="share-modal">
        <div className="modal-header">
          <p className="modal-title">Compartilhe com o link!</p>

          <button type="button" onClick={onClose} className="close-button">
            <Close size="24" />
          </button>
        </div>

        <p className="modal-text">
          Copie o link para compartilhar o seu cardápio
        </p>

        <div className="modal-url-container">
          <input className="modal-url" value={menuUrl} readOnly />

          <button
            type="button"
            className="modal-copy-button"
            style={
              copied ? { background: '#24D18A' } : { background: '#535bfe' }
            }
            onClick={handleCopyClick}
          >
            {copied ? (
              <FiCheck size={21} color="#fff" />
            ) : (
              <FiCopy size={21} color="#fff" />
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
}
