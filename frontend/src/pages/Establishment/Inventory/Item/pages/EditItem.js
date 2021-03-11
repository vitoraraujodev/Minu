import React, { useState } from 'react';

import ItemForm from '../components/ItemForm';

import api from '~/services/api';
import history from '~/services/history';

export default function EditItem({ location }) {
  const item = location.state && location.state.item ? location.state.item : '';

  const [loading, setLoading] = useState(false);

  async function handleSubmit(data, file) {
    if (loading) return;

    const formData = new FormData();

    try {
      if (file) {
        formData.append('file', file);
        const response = await api.post(`product-photo`, formData);

        const body = {
          ...data,
          photo_id: response.data.id,
        };

        await api.put(`items/${item.id}`, body);
        setLoading(false);
      } else {
        await api.put(`items/${item.id}`, data);
        setLoading(false);
      }
      history.push('/inventario');
    } catch (err) {
      setLoading(false);
      if (err.response && err.response.data && err.response.data.error) {
        alert(err.response.data.error);
      } else {
        alert(
          'Houve um erro ao salvar esse produto. Tente novamente mais tarde.'
        );
      }
    }
  }

  return <ItemForm item={item} onSubmit={handleSubmit} loading={loading} />;
}
