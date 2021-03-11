import React, { useState } from 'react';

import ItemForm from '../components/ItemForm';

import api from '~/services/api';
import history from '~/services/history';

export default function NewItem() {
  const [loading, setLoading] = useState(false);

  const item = {
    title: '',
    description: '',
    price: 0,
    category: '',
    preparation_time: 1,
    additionals: [],
  };

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

        await api.post('items', body);
        setLoading(false);
      } else {
        await api.post('items', data);
        setLoading(false);
      }
      history.push('/inventario');
    } catch (err) {
      setLoading(false);
      if (err.response.data) {
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
