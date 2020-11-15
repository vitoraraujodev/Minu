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

        <p className="header-label">Categorias</p>
      </div>

      <div className="category-area" onClick={() => handleCategory('Entradas')}>
        <div className="category">Entradas</div>
      </div>

      <div
        className="category-area"
        onClick={() => handleCategory('Pratos principais')}
      >
        <div className="category">Pratos principais</div>
      </div>

      <div
        className="category-area"
        onClick={() => handleCategory('Sobremesas')}
      >
        <div className="category">Sobremesas</div>
      </div>

      <div className="category-area" onClick={() => handleCategory('Bebidas')}>
        <div className="category">Bebidas</div>
      </div>

      <div
        className="category-area"
        onClick={() => handleCategory('Bebidas alcoólicas')}
      >
        <div className="category">Bebidas alcoólicas</div>
      </div>
    </div>
  );
}
