import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Order from '../../components/Order';
import OrderModal from '../../components/OrderModal';

import {
  addOpenCalls,
  archiveOrderRequest,
} from '~/store/modules/dashboard/actions';

import handleNumber from '~/util/handleNumber';

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

      {Object.entries(sortedTables).map(([tableNumber, tableOrders]) => (
        <>
          <p className="table-label">Mesa {handleNumber(tableNumber)}</p>

          {tableOrders &&
            tableOrders.map((order) => (
              <Order
                key={`${toString(order.TableNumber)}-${order.Timestamp}`}
                order={order}
                onClick={() => !order.loading && openModal(order)}
              />
            ))}
        </>
      ))}

      {!loading && Object.keys(sortedTables).length === 0 && (
        <p className="hint">Não há nada aqui por enquanto...</p>
      )}
    </div>
  );
}
