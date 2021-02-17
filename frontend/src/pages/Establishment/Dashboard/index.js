import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Order from './Order';
import OrderModal from './OrderModal';

import Header from '~/components/NavTabs/Establishment';

import { ReactComponent as TrayIcon } from '~/assets/icons/tray-icon.svg';

import api from '~/services/api';

import {
  addOpenCalls,
  archiveOrderRequest,
} from '~/store/modules/dashboard/actions';

import './styles.css';

export default function Dashboard() {
  const dispatch = useDispatch();

  const orders = useSelector((state) => state.dashboard.dashboard);

  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState();
  const [sortedOrders, setSortedOrders] = useState(Object.keys(orders));

  async function loadActiveOrders() {
    if (loading) return;

    setLoading(true);

    try {
      const response = await api.get('open-calls');

      dispatch(addOpenCalls(response.data));
    } catch (err) {
      if (err.response) {
        alert(err.response.data.error);
      } else {
        alert(
          'Não foi possível carregar os pedidos ativos. Verifique sua conexão e tente novamnete'
        );
      }
    }
    setLoading(false);
  }

  useEffect(() => {
    loadActiveOrders();
  }, []); //eslint-disable-line

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

  function ArchiveOrder(order) {
    setModalVisible(false);
    dispatch(archiveOrderRequest(order));
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
          {loading && (
            <div className="loader-container">
              <div className="loader" />
            </div>
          )}

          {sortedOrders.length > 0 &&
            sortedOrders.map((order) => (
              <Order
                key={`${toString(order.TableNumber)}-${order.Timestamp}`}
                order={order}
                onClick={() => !order.loading && openModal(order)}
              />
            ))}

          {!loading && sortedOrders.length === 0 && (
            <p className="hint">Não há chamados para atendimento ainda...</p>
          )}
        </div>
      </div>
    </div>
  );
}
