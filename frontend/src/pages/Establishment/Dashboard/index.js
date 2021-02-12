import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { deleteDashboardOrderAction } from '~/store/modules/dashboard/actions';

import Order from './Order';
import OrderModal from './OrderModal';

import Header from '~/components/NavTabs/Establishment';

import { ReactComponent as TrayIcon } from '~/assets/icons/tray-icon.svg';

import waiterCallArchiveSchema from '~/json/waiter_call_archive_schema.json';
import billCallArchiveSchema from '~/json/bill_call_archive_schema.json';

import api from '~/services/api';

import './styles.css';

export default function Dashboard() {
  const dispatch = useDispatch();

  const orders = useSelector((state) => state.dashboard.dashboard);

  const [loading, setLoading] = useState(false);
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
    if (loading) return;

    setLoading(true);

    const value = {
      EstablishmentId: parseInt(order.EstablishmentId, 10),
      TableNumber: order.TableNumber,
    };

    let schema;
    let requestRoute;

    if (order.NotificationType === 'waiterCall') {
      schema = waiterCallArchiveSchema;
      value.WaiterCallTimestamp = order.Timestamp.toString();
      requestRoute = 'waiter-call';
    } else if (order.NotificationType === 'billCall') {
      schema = billCallArchiveSchema;
      value.BillCallTimestamp = order.Timestamp.toString();
      requestRoute = 'bill-call';
    }

    const data = {
      data: {
        value_schema: JSON.stringify(schema),
        records: [
          {
            value,
          },
        ],
      },
    };

    try {
      await api.delete(requestRoute, data);

      dispatch(deleteDashboardOrderAction(order));
    } catch (err) {
      alert(
        'Não foi possível arquivar esse pedido. Verifique sua conexão e tente novamente mais tarde.'
      );
    }
    setLoading(false);
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
          loading={loading}
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
                order={order}
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
