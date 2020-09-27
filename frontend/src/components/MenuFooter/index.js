import React from 'react';

import './styles.css';

export default function MenuFooter({ activeCategory, onActiveCategoryChange }) {
  return (
    <div id="menu-footer">
      <div
        className={activeCategory === 'starters' ? 'tab-active' : 'tab'}
        onClick={() => {
          onActiveCategoryChange('starters');
        }}
      >
        <p>Entradas</p>
      </div>
      <div
        className={activeCategory === 'mains' ? 'tab-active' : 'tab'}
        onClick={() => {
          onActiveCategoryChange('mains');
        }}
      >
        <p>Pratos Principais</p>
      </div>
      <div
        className={activeCategory === 'desserts' ? 'tab-active' : 'tab'}
        onClick={() => {
          onActiveCategoryChange('desserts');
        }}
      >
        <p>Sobremesas</p>
      </div>
      <div
        className={activeCategory === 'drinks' ? 'tab-active' : 'tab'}
        onClick={() => {
          console.tron.log(activeCategory);
          onActiveCategoryChange('drinks');
        }}
      >
        <p>Bebidas</p>
      </div>
      <div
        className={activeCategory === 'alcoholics' ? 'tab-active' : 'tab'}
        onClick={() => {
          onActiveCategoryChange('alcoholics');
        }}
      >
        <p>Bebidas Alcoólicas</p>
      </div>
    </div>
  );
}
