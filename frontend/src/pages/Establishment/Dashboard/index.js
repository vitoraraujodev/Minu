import React, { useState } from 'react';

import Header from '~/components/NavTabs/Establishment';

import Order from './Order';
import OrderModal from './OrderModal';

import { ReactComponent as TrayIcon } from '~/assets/icons/tray-icon.svg';

import './styles.css';

export default function Dashboard() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState();

  const orders = [1, 2, 5, 4, 8];

  function openModal(order) {
    setModalVisible(true);
    setSelectedOrder(order);
  }

  return (
    <div id="dashboard-page">
      <Header />

      {modalVisible && (
        <OrderModal
          order={selectedOrder}
          onClose={() => setModalVisible(false)}
        />
      )}

      <div className="container">
        <div className="header">
          <TrayIcon fill="#535BFE" height="20" />
          <p className="header-label">Atendimento</p>
        </div>

        <div className="orders">
          {orders.length > 0 &&
            orders.map((order) => (
              <Order
                key={order}
                order={order}
                onClick={() => openModal(order)}
              />
            ))}

          {orders.length === 0 && (
            <p className="hint">Não há chamados para atendimento ainda...</p>
          )}
        </div>
      </div>
    </div>
  );
}
