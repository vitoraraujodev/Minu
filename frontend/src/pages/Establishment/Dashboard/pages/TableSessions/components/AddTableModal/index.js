import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import Modal from '~/components/Modal';
import Input from '~/components/Input';

import { ReactComponent as Close } from '~/assets/icons/close-icon.svg';

import { addTableSession } from '~/store/modules/tableSession/actions';

import api from '~/services/api';

import './styles.css';

export default function AddTableModal({ onClose }) {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const [tableNumber, setTableNumber] = useState('');

  async function handleAddTable() {
    if (loading || !tableNumber) return;

    setLoading(true);

    try {
      const response = await api.post('open-table-session', { tableNumber });

      dispatch(addTableSession(response.data));

      onClose();
    } catch (err) {
      if (err.response && err.response.data) {
        alert(err.response.data.error);
      } else {
        alert(
          'Houve um erro ao criar a sessão. Verifique sua conexão e tente novamente.'
        );
      }

      setLoading(false);
    }
  }

  return (
    <Modal onClose={onClose}>
      <div id="dashboard-add-modal">
        <div className="modal-header">
          <p className="modal-title">Iniciar uma sessão?</p>

          <button type="button" onClick={onClose} className="close-button">
            <Close size="24" />
          </button>
        </div>

        <Input
          value={tableNumber}
          maxLength={4}
          disabled={loading}
          type="number"
          maxWidth="224px"
          inputMode="numeric"
          placeholder="Digite o número da mesa"
          onKeyDown={(e) => {
            if (e.key === '-') e.preventDefault();
            else if (e.key === 'Enter') handleAddTable();
          }}
          onChange={(e) =>
            e.target.value.length <= 3 && setTableNumber(e.target.value)
          }
        />

        <button
          type="button"
          onClick={handleAddTable}
          className="modal-add-button"
        >
          {loading ? 'Carregando...' : 'Iniciar sessão'}
        </button>
      </div>
    </Modal>
  );
}
