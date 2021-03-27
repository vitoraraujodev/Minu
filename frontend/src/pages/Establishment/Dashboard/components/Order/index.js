import React from 'react';

import './styles.css';

export default function Order({ order, onClick }) {
  /*
    Currently, this component only receives the table number and the timestamp of the order.
    In the near future, it should receive a list of orders for a given table, and expand (or open modal) to reveal all the information
  */
  const date = new Date(order.Timestamp);
  const hours = date.getHours();
  const minutes = `0${date.getMinutes()}`;
  const formattedTime = `${hours}:${minutes.substr(-2)}`;

  const orderType = order.NotificationType;

  function handleBackgroundColor() {
    switch (orderType) {
      case 'waiterCall':
        return { background: '#535BFE' };
      case 'billCall':
        return { background: '#24d18a' };

      default:
        return { background: '#535BFE' };
    }
  }

  function handleOrderText() {
    switch (orderType) {
      case 'waiterCall':
        return 'Chamou o garçom';
      case 'billCall':
        return 'Pediu a conta';

      default:
        return 'Chamou o garçom';
    }
  }

  function handleLoaderColor() {
    switch (orderType) {
      case 'waiterCall':
        return { border: '4px solid #B4B7FF', borderTop: '4px solid #fff' };
      case 'billCall':
        return { border: '4px solid #bef4dd', borderTop: '4px solid #fff' };

      default:
        return { border: '4px solid #B4B7FF', borderTop: '4px solid #fff' };
    }
  }

  return (
    <button
      type="button"
      id="order-component"
      style={handleBackgroundColor()}
      onClick={onClick}
    >
      <span>{handleOrderText()}</span>

      <span>
        {order.loading ? (
          <div className="order-loader-container">
            <div className="order-loader" style={handleLoaderColor()} />
          </div>
        ) : (
          formattedTime
        )}
      </span>
    </button>
  );
}
