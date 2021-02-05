import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { deleteDashboardOrderAction } from '~/store/modules/dashboard/actions';

import Order from './Order';
import OrderModal from './OrderModal';

import Header from '~/components/NavTabs/Establishment';

import { ReactComponent as TrayIcon } from '~/assets/icons/tray-icon.svg';

import orderArchiveSchema from '~/json/order_archive_schema.json';

import api from '~/services/api';

import './styles.css';

export default function Dashboard() {
  const dispatch = useDispatch();

  const orders = useSelector((state) => state.dashboard.dashboard);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState();
  const [sortedOrders, setSortedOrders] = useState(Object.keys(orders));

  useEffect(() => {
    const allOrders = Object.entries(orders).map(([_, tableOrders]) =>
      Object.entries(tableOrders).map(([__, orderInfo]) => orderInfo)
    );

    setSortedOrders(allOrders.flat().sort((a, b) => a.Timestamp - b.Timestamp));
  }, [orders]);

  function openModal(order) {
    setModalVisible(true);
    setSelectedOrder(order);
  }

  async function handleOrderArchive(order) {
    const data = {
      data: {
        value_schema: JSON.stringify(orderArchiveSchema),
        records: [
          {
            value: {
              EstablishmentId: order.EstablishmentId,
              TableNumber: order.TableNumber,
              WaiterCallTimestamp: order.Timestamp.toString(),
            },
          },
        ],
      },
    };

    try {
      await api.delete('waiter-call', data);

      dispatch(deleteDashboardOrderAction(order));
    } catch (err) {
      alert(
        'Não foi possível arquivar essa chamada. Verifique sua conexão e tente novamente mais tarde.'
      );
    }
  }

  function ArchiveOrder(order) {
    setModalVisible(false);
    handleOrderArchive(order);
  }

  return (
    <div id="dashboard-page">
      <Header />

      {modalVisible && (
        <OrderModal
          order={selectedOrder}
          onClose={() => setModalVisible(false)}
          onArchive={() => ArchiveOrder(selectedOrder)}
        />
      )}

      <div className="container">
        <div className="header">
          <TrayIcon fill="#535BFE" height="20" />
          <p className="header-label">Atendimento</p>
        </div>

        <div className="orders">
          {sortedOrders.length > 0 &&
            sortedOrders.map((order) => (
              <Order
                key={`${toString(order.TableNumber)}-${order.Timestamp}`}
                tableNumber={order.TableNumber}
                timestamp={order.Timestamp}
                onClick={() => openModal(order)}
              />
            ))}

          {sortedOrders.length === 0 && (
            <p className="hint">Não há chamados para atendimento ainda...</p>
          )}
        </div>
      </div>
    </div>
  );
}
