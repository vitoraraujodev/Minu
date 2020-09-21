import React, { useState } from 'react';

import './styles.css';

export default function MenuFooter() {
  const [active, setActive] = useState(1);

  return (
    <div id="menu-footer">
      <div
        className={active === 1 ? 'tab-active' : 'tab'}
        onClick={() => setActive(1)}
      >
        <p>Entradas</p>
      </div>
      <div
        className={active === 2 ? 'tab-active' : 'tab'}
        onClick={() => setActive(2)}
      >
        <p>Pratos Principais</p>
      </div>
      <div
        className={active === 3 ? 'tab-active' : 'tab'}
        onClick={() => setActive(3)}
      >
        <p>Sobremesas</p>
      </div>
      <div
        className={active === 4 ? 'tab-active' : 'tab'}
        onClick={() => setActive(4)}
      >
        <p>Bebidas</p>
      </div>
      <div
        className={active === 5 ? 'tab-active' : 'tab'}
        onClick={() => setActive(5)}
      >
        <p>Bebidas Alcoólicas</p>
      </div>
    </div>
  );
}
