import React, { useState } from 'react';

import { ReactComponent as Close } from '~/assets/icons/close-icon.svg';

import api from '~/services/api';

import billCallSchema from '~/json/bill_call_input.json';

import './styles.css';

export default function BillCallModal({
  establishmentId,
  tableNumber,
  onBillCall,
  onClose,
}) {
  const [loading, setLoading] = useState(false);

  async function handleBillCall() {
    if (loading) return;

    const data = {
      value_schema: JSON.stringify(billCallSchema),
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
      await api.post('bill-call', data);

      setLoading(false);
      onBillCall();
      onClose();
    } catch (err) {
      setLoading(false);
      alert(
        'Não foi possível realizar a chamada de garçom. Verifique sua conexão e tente novamente mais tarde.'
      );
    }
  }

  return (
    <div id="bill-call-modal">
      <div className="modal-container">
        <div className="modal-group">
          <p className="modal-title">Pedir a conta?</p>

          <button
            type="button"
            onClick={onClose}
            className="modal-close-button"
          >
            <Close size="24" />
          </button>
        </div>

        <p className="modal-text">O garçom virá te atender com sua conta.</p>

        <button
          type="button"
          onClick={handleBillCall}
          className="confirm-button"
        >
          {loading ? 'Carregando...' : 'Pedir conta'}
        </button>
      </div>
    </div>
  );
}
