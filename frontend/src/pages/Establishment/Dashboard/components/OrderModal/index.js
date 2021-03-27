import React from 'react';

import './styles.css';

export default function OrderModal({ order, loading, onClose, onArchive }) {
  const tableNumber = order.TableNumber;
  const orderType = order.NotificationType;

  function handleOrderTitle() {
    switch (orderType) {
      case 'waiterCall':
        return 'Atendimento';
      case 'billCall':
        return 'Pedido de conta';

      default:
        return 'Atendimento';
    }
  }

  function handleTableNumber() {
    return tableNumber >= 0 && tableNumber <= 9
      ? `0${tableNumber}`
      : tableNumber;
  }

  function handleOrderText() {
    switch (orderType) {
      case 'waiterCall':
        return (
          <>
            A <b> mesa {handleTableNumber()}</b> chamou um garçom!
          </>
        );
      case 'billCall':
        return (
          <>
            A <b> mesa {handleTableNumber()}</b> deseja encerrar a conta!
          </>
        );
      default:
        return (
          <>
            A <b> mesa {handleTableNumber()}</b> chamou um garçom!
          </>
        );
    }
  }

  function handleButtonColor() {
    switch (orderType) {
      case 'waiterCall':
        return 'waiter';
      case 'billCall':
        return 'bill';

      default:
        return 'waiter';
    }
  }

  return (
    <div id="dashboard-order-modal">
      <div className="modal-container">
        <p className="modal-title">{handleOrderTitle()}</p>

        <p className="modal-text">{handleOrderText()}</p>

        <div className="button-group">
          <button
            type="button"
            onClick={onClose}
            className="modal-close-button"
          >
            Fechar
          </button>

          <button
            type="button"
            onClick={onArchive}
            className={`modal-archive-button ${handleButtonColor()}`}
          >
            {loading ? 'Carregando...' : 'Arquivar'}
          </button>
        </div>
      </div>
    </div>
  );
}
