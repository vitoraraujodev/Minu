import React, { useState } from 'react';
import { FaSearch, FaTimesCircle } from 'react-icons/fa';

import Input from '~/components/Input';

import ProductList from '../ProductList';

import './styles.css';

export default function ProductPicker({ onCancel }) {
  const [search, setSearch] = useState('');

  return (
    <div id="product-picker">
      <div className="search-container">
        <Input
          value={search}
          placeholder="Pesquisar..."
          style={{ padding: 8 }}
          prefix={<FaSearch size={16} color="#9c9c9c" />}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="cancel-icon-container" onClick={onCancel}>
          <FaTimesCircle color="#9c9c9c" size={20} />
        </div>
      </div>

      <ProductList search={search.toLowerCase()} />
    </div>
  );
}
