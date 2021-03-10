import React, { useState } from 'react';

import MenuForm from '../components/MenuForm';

import history from '~/services/history';
import api from '~/services/api';

export default function EditMenu({ location }) {
  const menu =
    location.state && location.state.menu
      ? location.state.menu
      : history.push('/inventario');

  const [loading, setLoading] = useState(false);

  async function handleSubmit(data) {
    setLoading(true);

    try {
      await api.put(`/menus/${menu.id}`, data);
      setLoading(false);
      history.push('/inventario');
    } catch (err) {
      setLoading(false);
      if (err.response.data.error) {
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
