import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import axios from 'axios';

import { deleteDashboardOrderAction } from '~/store/modules/dashboard/actions';

import Header from '~/components/NavTabs/Establishment';
import Order from './Order';
import OrderModal from './OrderModal';
import { ReactComponent as TrayIcon } from '~/assets/icons/tray-icon.svg';

import './styles.css';

import orderArchiveSchema from '~/json/order_archive_schema.json'

const orderArchiveEndpoint = "http://peripherals.seuminu.com:9000/topics/WaiterCallArchiveNotification"

export default function Dashboard() {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState();

  const orders = useSelector((state) => state.dashboard.dashboard);
  const [sortedOrders, setSortedOrders] = useState(Object.keys(orders));

  useEffect(() => {
    var allOrders = Object.entries(orders).map(([tableNumber, tableOrders]) => (
      Object.entries(tableOrders).map(([timestamp, orderInfo]) => (
        orderInfo
      ))
    ));
    setSortedOrders(allOrders.flat().sort((a,b) => a.Timestamp - b.Timestamp));
  }, [orders]);


  function openModal(order) {
    setModalVisible(true);
    setSelectedOrder(order);
  }

  function ArchiveOrder(order) {
    dispatch(deleteDashboardOrderAction(order));
    setModalVisible(false);
    signilizeOrderArchive(order)
  }

  function signilizeOrderArchive(order) {
    const headers = {
      'content-type': 'application/json',
      'Accept': '*/*',
    }
    var body = { 
      value_schema: JSON.stringify(orderArchiveSchema),
      records: [{
        "value": {
          "EstablishmentId": order.EstablishmentId, 
          "TableNumber": order.TableNumber,
          "WaiterCallTimestamp": order.Timestamp.toString()
        }
      }]
    }

    axios.post(orderArchiveEndpoint, JSON.stringify(body), {headers: headers})
    .then((response) => {
        console.log(response);
      }).catch((e) => {
        console.log(e);
      });
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
                tableNumber = {order.TableNumber}
                timestamp={order.Timestamp}
                onClick={() => openModal(order)}
              />
            ))
          }

          {sortedOrders.length === 0 && (
            <p className="hint">Não há chamados para atendimento ainda...</p>
          )}
        </div>
      </div>
    </div>
  );
}
