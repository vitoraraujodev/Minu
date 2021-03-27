import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Order from '../../components/Order';
import OrderModal from '../../components/OrderModal';

import {
  addOpenCalls,
  archiveOrderRequest,
} from '~/store/modules/dashboard/actions';

import api from '~/services/api';

import './styles.css';

export default function Orders() {
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
    <div className="orders">
      {modalVisible && (
        <OrderModal
          order={selectedOrder}
          loading={loading}
          onClose={() => setModalVisible(false)}
          onArchive={() => ArchiveOrder(selectedOrder)}
        />
      )}

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
  );
}
