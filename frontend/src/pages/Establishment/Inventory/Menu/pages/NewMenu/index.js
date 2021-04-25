import React, { useState } from 'react';

import MenuForm from '../../components/MenuForm';

import history from '~/services/history';
import api from '~/services/api';

export default function NewMenu() {
  const [loading, setLoading] = useState(false);

  const menu = {
    title: '',
    start_at: '',
    end_at: '',
    availability: '0000000',
    items: [],
  };

  async function handleSubmit(data) {
    setLoading(true);

    try {
      await api.post('/menus', data);
      setLoading(false);
      history.push('/inventario');
    } catch (err) {
      setLoading(false);
      if (err.response.data) {
        alert(err.response.data.error);
      } else {
        alert(
          'Houve um erro ao salvar esse cardápio. Tente novamente mais tarde.'
        );
      }
    }
  }

  return <MenuForm menu={menu} onSubmit={handleSubmit} loading={loading} />;
}
