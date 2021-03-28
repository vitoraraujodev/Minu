import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import ConfirmationModal from '~/components/ConfirmationModal';

import TableSession from './components/TableSession';
import TableSessionModal from './components/TableSessionModal';

import {
  addTableSessions,
  removeTableSessionRequest,
} from '~/store/modules/tableSession/actions';

import api from '~/services/api';

import './styles.css';

export default function TableSessions() {
  const dispatch = useDispatch();

  const tableSession = useSelector((state) => state.tableSession.tableSession);

  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmationModalVisible, setConfirmationModalVisible] = useState(
    false
  );

  const [selectedTable, setSelectedTable] = useState();
  const [sortedTables, setSortedTables] = useState({});

  async function loadActiveTableSessions() {
    if (loading) return;

    setLoading(true);

    try {
      const response = await api.get('open-table-sessions');

      dispatch(addTableSessions(response.data));
    } catch (err) {
      if (err.response) {
        alert(err.response.data.error);
      } else {
        alert(
          'Não foi possível carregar as mesas ativas. Verifique sua conexão e tente novamente.'
        );
      }
    }
    setLoading(false);
  }

  useEffect(() => {
    loadActiveTableSessions();
  }, []); //eslint-disable-line

  useEffect(() => {
    const tableSort = {};

    const tableNumbers = Object.keys(tableSession).sort();

    tableNumbers.forEach((tableNumber) => {
      tableSort[tableNumber] = tableSession[tableNumber];
    });

    setSortedTables(tableSort);
  }, [tableSession]);

  function openModal(table) {
    setModalVisible(true);
    setSelectedTable(table);
  }

  async function handleFinishTableSession() {
    setModalVisible(false);
    setConfirmationModalVisible(false);

    dispatch(removeTableSessionRequest(selectedTable));
  }

  return (
    <div className="tables">
      {modalVisible && (
        <TableSessionModal
          table={selectedTable}
          loading={loading}
          onClose={() => setModalVisible(false)}
          onFinishTableSession={() => setConfirmationModalVisible(true)}
        />
      )}

      {confirmationModalVisible && (
        <ConfirmationModal
          title="Finalizar sessão?"
          description={`Libere a mesa ${selectedTable.TableNumber} para que um novo cliente possa sentar.`}
          onClose={() => setConfirmationModalVisible(false)}
          onConfirm={handleFinishTableSession}
        />
      )}

      {loading && (
        <div className="loader-container">
          <div className="loader" />
        </div>
      )}

      {Object.values(sortedTables).map((table) => (
        <TableSession
          key={table.Timestamp}
          table={table}
          onClick={() => !table.loading && openModal(table)}
        />
      ))}

      {!loading && Object.keys(sortedTables).length === 0 && (
        <p className="hint">Não há nenhuma mesa ativa por enquanto...</p>
      )}
    </div>
  );
}
