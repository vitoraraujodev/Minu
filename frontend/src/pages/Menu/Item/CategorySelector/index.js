import React from 'react';

import { ReactComponent as Backward } from '~/assets/icons/backward-icon.svg';

import './styles.css';

export default function CategorySelector({
  onClose,
  windowWidth,
  onChangeCategory,
}) {
  function handleCategory(category) {
    onChangeCategory(category);
    onClose();
  }

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

        <p className="product-label">Categorias</p>
      </div>

      <div className="category-area" onClick={() => handleCategory('Comidas')}>
        <div className="category">Comidas</div>
      </div>
      <div className="category-area" onClick={() => handleCategory('Bebidas')}>
        <div className="category">Bebidas</div>
      </div>
      <div
        className="category-area"
        onClick={() => handleCategory('Sobremesas')}
      >
        <div className="category">Sobremesas</div>
      </div>
    </div>
  );
}
