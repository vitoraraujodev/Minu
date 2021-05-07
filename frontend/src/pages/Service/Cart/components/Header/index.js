import React from 'react';
import { FaChevronLeft } from 'react-icons/fa';

import history from '~/services/history';

import './styles.css';

export default function Header() {
  return (
    <div id="cart-header-component">
      <button type="button" className="back-button" onClick={history.goBack}>
        <FaChevronLeft size={18} color="#6c6c6c" />

        <span style={{ marginLeft: 8 }}>Voltar</span>
      </button>
    </div>
  );
}
