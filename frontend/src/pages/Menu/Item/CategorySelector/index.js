import React from 'react';

import { ReactComponent as Backward } from '~/assets/icons/backward-icon.svg';

import './styles.css';

export default function CategorySelector({ onClose, windowWidth }) {
  return (
    <div
      id="category-selector"
      style={windowWidth < 768 ? { width: windowWidth } : null}
    >
      <div className="header">
        <button className="back-button" type="button" onClick={onClose}>
          <Backward style={{ height: 16, marginRight: 4 }} fill="#fff" />
          Voltar
        </button>

        <p className="product-label">Produto 01</p>
      </div>
      <strong>Category-Selector</strong>
    </div>
  );
}
