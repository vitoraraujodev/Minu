import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FiPlus } from 'react-icons/fi';

import ConfirmationModal from '~/components/ConfirmationModal';

import TableSession from './components/TableSession';
import TableSessionModal from './components/TableSessionModal';
import AddTableModal from './components/AddTableModal';

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
  const [tableModalVisible, setTableModalVisible] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);
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
    setTableModalVisible(true);
    setSelectedTable(table);
  }

  async function handleFinishTableSession() {
    setTableModalVisible(false);
    setConfirmationModalVisible(false);

    dispatch(removeTableSessionRequest(selectedTable));
  }

  return (
    <div className="tables">
      {tableModalVisible && (
        <TableSessionModal
          table={selectedTable}
          loading={loading}
          onClose={() => setTableModalVisible(false)}
          onFinishTableSession={() => setConfirmationModalVisible(true)}
        />
      )}

      {confirmationModalVisible && (
        <ConfirmationModal
          title="Finalizar sessão?"
          description={`Libere a mesa ${selectedTable.TableNumber} para que um novo cliente possa sentar`}
          onClose={() => setConfirmationModalVisible(false)}
          onConfirm={handleFinishTableSession}
        />
      )}

      {addModalVisible && (
        <AddTableModal onClose={() => setAddModalVisible(false)} />
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

      <div className="add-button-container">
        <button
          type="button"
          className="add-table-button"
          onClick={() => setAddModalVisible(true)}
        >
          <FiPlus size={32} color="#535bfe" />
        </button>
      </div>
    </div>
  );
}
