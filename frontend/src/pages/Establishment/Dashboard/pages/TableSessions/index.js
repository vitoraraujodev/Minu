import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import api from '~/services/api';

import './styles.css';

export default function TableSessions() {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  async function loadActiveSessions() {
    if (loading) return;

    setLoading(true);

    try {
      const response = await api.get('open-table-sessions');

      // dispatch(response.data);
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
    loadActiveSessions();
  }, []); //eslint-disable-line

  return (
    <div className="tables">
      {loading && (
        <div className="loader-container">
          <div className="loader" />
        </div>
      )}
    </div>
  );
}
