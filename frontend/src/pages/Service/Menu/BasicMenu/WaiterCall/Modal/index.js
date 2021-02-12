import React, { useState } from 'react';

import { ReactComponent as Close } from '~/assets/icons/close-icon.svg';

import api from '~/services/api';

import waiterCallSchema from '~/json/waiter_call_input.json';

import './styles.css';

export default function WaiterCallModal({
  establishmentId,
  tableNumber,
  onWaiterCall,
  onClose,
}) {
  const [loading, setLoading] = useState(false);

  async function handleWaiterCall() {
    if (loading) return;

    const data = {
      value_schema: JSON.stringify(waiterCallSchema),
      records: [
        {
          value: {
            EstablishmentId: parseInt(establishmentId, 10),
            TableNumber: parseInt(tableNumber, 10),
          },
        },
      ],
    };

    setLoading(true);

    try {
      await api.post('waiter-call', data);
      setLoading(false);

      onWaiterCall();
      onClose();
    } catch (err) {
      alert(
        'Não foi possível realizar a chamada de garçom. Verifique sua conexão e tente novamente mais tarde.'
      );
      setLoading(false);
    }
  }

  return (
    <div id="waiter-call-modal">
      <div className="modal-container">
        <div className="modal-group">
          <p className="modal-title">Chamar o garçom?</p>

          <button
            type="button"
            onClick={onClose}
            className="modal-close-button"
          >
            <Close size="24" />
          </button>
        </div>

        <p className="modal-text">
          O garçom receberá uma notificação e logo virá te atender.
        </p>

        <button
          type="button"
          onClick={handleWaiterCall}
          className="confirm-button"
        >
          {loading ? 'Carregando...' : 'Chamar garçom'}
        </button>
      </div>
    </div>
  );
}
