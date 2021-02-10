import React from 'react';

import { ReactComponent as Close } from '~/assets/icons/close-icon.svg';

// import api from '~/services/api';

// import billCallSchema from '~/json/bill_call_input.json';

import './styles.css';

export default function BillCallModal({
  // establishmentId,
  // tableNumber,
  onBillCall,
  onClose,
}) {
  async function handleBillCall() {
    // const data = {
    //   value_schema: JSON.stringify(billCallSchema),
    //   records: [
    //     {
    //       value: {
    //         EstablishmentId: establishmentId,
    //         TableNumber: tableNumber,
    //       },
    //     },
    //   ],
    // };

    try {
      // await api.post('bill-call', data);
      onBillCall();
      onClose();
    } catch (err) {
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
          Pedir conta
        </button>
      </div>
    </div>
  );
}
