import React, { useState } from 'react';

import Modal from '~/components/Modal';
import { Button } from '~/components/Buttons';

import { ReactComponent as Close } from '~/assets/icons/close-icon.svg';

import api from '~/services/api';

import callSchema from '~/json/waiter_call.json';

import './styles.css';

export default function WaiterModal({
  call = 'waiter',
  establishmentId,
  tableNumber,
  onCall = () => {},
  onClose = () => {},
}) {
  const [loading, setLoading] = useState(false);

  async function handleWaiterCall() {
    if (loading) return;

    setLoading(true);

    const data = {
      value_schema: JSON.stringify(callSchema),
      records: [
        {
          value: {
            EstablishmentId: parseInt(establishmentId, 10),
            TableNumber: parseInt(tableNumber, 10),
            NotificationType: 'waiterCall',
            ArchivingTimestamp: { null: null },
          },
        },
      ],
    };

    try {
      await api.post('waiter-call', data);

      setLoading(false);

      onCall();
      onClose();
    } catch (err) {
      alert(
        'Não foi possível realizar a chamada do garçom. Verifique sua conexão e tente novamente mais tarde.'
      );
      setLoading(false);
    }
  }

  async function handleBillCall() {
    if (loading) return;

    setLoading(true);

    const data = {
      value_schema: JSON.stringify(callSchema),
      records: [
        {
          value: {
            EstablishmentId: parseInt(establishmentId, 10),
            TableNumber: parseInt(tableNumber, 10),
            NotificationType: 'billCall',
            ArchivingTimestamp: { null: null },
          },
        },
      ],
    };

    try {
      await api.post('bill-call', data);

      setLoading(false);

      onCall();
      onClose();
    } catch (err) {
      setLoading(false);
      alert(
        'Não foi possível realizar a chamada do garçom. Verifique sua conexão e tente novamente mais tarde.'
      );
    }
  }

  function handleCall() {
    if (call === 'waiter') handleWaiterCall();
    else if (call === 'bill') handleBillCall();
  }

  function handleModalTitle() {
    if (call === 'waiter') return 'Chamar o garçom?';
    if (call === 'bill') return 'Pedir a conta?';
  }

  function handleModalDescription() {
    if (call === 'waiter')
      return 'O garçom receberá uma notificação e logo virá te atender.';
    if (call === 'bill') return 'O garçom virá te atender com sua conta.';
  }

  function handleModalButton() {
    if (call === 'waiter') return 'Chamar garçom';
    if (call === 'bill') return 'Pedir conta';
  }

  function handleModalButtonColor() {
    if (call === 'waiter') return 'primary';
    if (call === 'bill') return 'secondary';
  }

  return (
    <Modal onClose={onClose}>
      <div id="menu-waiter-modal">
        <div className="modal-group">
          <p className="modal-title">{handleModalTitle()}</p>

          <button
            type="button"
            onClick={onClose}
            className="modal-close-button"
          >
            <Close size="24" />
          </button>
        </div>

        <p className="modal-text">{handleModalDescription()}</p>

        <Button
          variant="primary"
          theme={handleModalButtonColor()}
          onClick={handleCall}
        >
          <span className="button-text">
            {loading ? 'Carregando...' : handleModalButton()}
          </span>
        </Button>
      </div>
    </Modal>
  );
}
