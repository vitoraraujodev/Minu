import React, { useState, useEffect } from 'react';

import PinCodeInput from '~/components/PinCodeInput';

import api from '~/services/api';

import './styles.css';

export default function PinModal({ onClose, onAccess }) {
  const [pin, setPin] = useState('');
  const [filled, setFilled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [invalid, setInvalid] = useState(false);

  useEffect(() => {
    setInvalid(false);

    if (pin.length === 4) {
      setFilled(true);
    } else {
      setFilled(false);
    }
  }, [pin]);

  async function handleConfirm() {
    setLoading(true);
    try {
      const response = await api.post('pin', {
        admin_pin: pin,
      });

      if (response.data.okay) {
        onAccess();
      }
    } catch (err) {
      setInvalid(true);
      setLoading(false);
    }
  }

  return (
    <div id="pin-modal">
      <div className="pin-modal-container">
        <p className="modal-label">Insira o PIN para editar</p>
        <p
          className="modal-warn"
          style={invalid ? { color: '#FF3636' } : { color: '#fff' }}
        >
          PIN inválido
        </p>

        <PinCodeInput adminPin={pin} onChangeAdminPin={setPin} />

        <div className="modal-button-area">
          <button type="button" onClick={onClose} className="modal-back-button">
            Fechar
          </button>
          <button
            type="button"
            className={
              filled ? 'modal-confirm-button-enabled' : 'modal-confirm-button'
            }
            onClick={filled ? handleConfirm : () => {}}
          >
            {loading ? 'Carregando' : 'Confirmar'}
          </button>
        </div>
      </div>
    </div>
  );
}
