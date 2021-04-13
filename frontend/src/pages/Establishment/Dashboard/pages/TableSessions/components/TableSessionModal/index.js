import React, { useState } from 'react';

import ProductPicker from '../ProductPicker';

import Modal from '~/components/Modal';

import { ReactComponent as Close } from '~/assets/icons/close-icon.svg';
import { ReactComponent as AddIcon } from '~/assets/icons/add-icon.svg';

import formatNumber from '~/util/formatNumber';
import { formatPrice } from '~/util/formatPrice';

import './styles.css';

export default function TableSessionModal({
  table,
  onClose,
  onFinishTableSession,
}) {
  const [openList, setOpenList] = useState(false);

  return (
    <Modal onClose={onClose}>
      <div id="dashboard-table-modal">
        <div className="modal-header">
          <p className="modal-title">Mesa {formatNumber(table.TableNumber)}</p>

          <button type="button" onClick={onClose} className="close-button">
            <Close size="24" />
          </button>
        </div>

        <div className="modal-content">
          {openList && <ProductPicker onCancel={() => setOpenList(false)} />}

          <div className="modal-orders-list">
            <div
              className="add-order-container"
              onClick={() => setOpenList(true)}
            >
              <AddIcon
                style={{ height: 16, marginRight: 8, minWidth: 16 }}
                fill="#535BFE"
              />
              Anotar pedido
            </div>

            <div className="modal-hint-container">
              <p className="modal-hint">Ainda não há pedidos nessa mesa...</p>
            </div>
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
      </div>
    </Modal>
  );
}
