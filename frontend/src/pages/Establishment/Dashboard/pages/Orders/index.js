import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Loader from '~/components/Loader';

import Order from './components/Order';
import OrderModal from './components/OrderModal';

import {
  addOpenCalls,
  archiveOrderRequest,
} from '~/store/modules/dashboard/actions';

import formatNumber from '~/utils/formatNumber';

import api from '~/services/api';

import './styles.css';

export default function Orders() {
  const dispatch = useDispatch();

  const orders = useSelector((state) => state.dashboard.dashboard);

  const [loading, setLoading] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState();
  const [sortedTables, setSortedTables] = useState({});

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
          'Não foi possível carregar os pedidos ativos. Verifique sua conexão e tente novamente.'
        );
      }
    }
    setLoading(false);
  }

  useEffect(() => {
    loadActiveOrders();
  }, []); //eslint-disable-line

  useEffect(() => {
    const tableSort = {};

    const tableNumbers = Object.keys(orders).sort();

    tableNumbers.forEach((tableNumber) => {
      const tableOrdersTimestamps = Object.keys(orders[tableNumber]).sort();

      tableSort[tableNumber] = tableOrdersTimestamps.map(
        (timestamp) => orders[tableNumber][timestamp]
      );
    });

    setSortedTables(tableSort);
  }, [orders]);

  function openModal(order) {
    setModalVisible(true);
    setSelectedOrder(order);
  }

  function archiveOrder(order) {
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
          onArchive={() => archiveOrder(selectedOrder)}
        />
      )}

      {loading && (
        <div className="loader-container">
          <Loader size={48} />
        </div>
      )}

      {Object.entries(sortedTables).map(([tableNumber, tableOrders]) => (
        <div key={tableNumber} className="table-container">
          <p className="table-label">Mesa {formatNumber(tableNumber)}</p>

          {tableOrders &&
            tableOrders.map((order) => (
              <Order
                key={order.Timestamp}
                order={order}
                onClick={() => !order.loading && openModal(order)}
              />
            ))}
        </div>
      ))}

      {!loading && Object.keys(sortedTables).length === 0 && (
        <p className="hint">Não há nenhuma notificação pendente...</p>
      )}
    </div>
  );
}
