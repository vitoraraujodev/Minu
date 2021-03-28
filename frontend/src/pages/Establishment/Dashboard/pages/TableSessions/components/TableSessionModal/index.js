import React from 'react';

import Modal from '~/components/Modal';

import { ReactComponent as Close } from '~/assets/icons/close-icon.svg';

import handleNumber from '~/util/handleNumber';
import { formatPrice } from '~/util/formatPrice';

import './styles.css';

export default function TableSessionModal({
  table,
  onClose,
  onFinishTableSession,
}) {
  return (
    <Modal onClose={onClose}>
      <div id="dashboard-table-modal">
        <div className="modal-header">
          <p className="modal-title">Mesa {handleNumber(table.TableNumber)}</p>

          <button type="button" onClick={onClose} className="close-button">
            <Close size="24" />
          </button>
        </div>

        <div className="modal-orders-list">
          <p className="hint">Ainda não há pedidos nessa mesa...</p>
        </div>

        <div className="modal-total-block">
          <p className="modal-total-price">
            <b>Total: </b> {formatPrice(0)}
          </p>
        </div>

        <button
          type="button"
          onClick={onFinishTableSession}
          className="modal-finish-button"
        >
          Finalizar sessão
        </button>
      </div>
    </Modal>
  );
}
