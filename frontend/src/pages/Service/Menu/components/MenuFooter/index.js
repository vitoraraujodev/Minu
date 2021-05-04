import React, { useEffect } from 'react';

import './styles.css';

export default function MenuFooter({
  activeCategory,
  onActiveCategoryChange,
  starters,
  mains,
  desserts,
  drinks,
  alcoholics,
}) {
  const startersTab = document.getElementById('starters-tab');
  const mainsTab = document.getElementById('mains-tab');
  const dessertsTab = document.getElementById('desserts-tab');
  const drinksTab = document.getElementById('drinks-tab');
  const alcoholicsTab = document.getElementById('alcoholics-tab');

  useEffect(() => {
    switch (activeCategory) {
      case 'starters':
        if (startersTab)
          startersTab.scrollIntoView({
            inline: 'center',
          });
        break;
      case 'mains':
        if (mainsTab)
          mainsTab.scrollIntoView({
            inline: 'center',
          });
        break;
      case 'desserts':
        if (dessertsTab)
          dessertsTab.scrollIntoView({
            inline: 'center',
          });
        break;
      case 'drinks':
        if (drinksTab)
          drinksTab.scrollIntoView({
            inline: 'center',
          });
        break;
      case 'alcoholics':
        if (alcoholicsTab)
          alcoholicsTab.scrollIntoView({
            inline: 'center',
          });
        break;
      default:
    }
  }, [activeCategory]);

  function handleClick(tab) {
    onActiveCategoryChange(tab);
  }

  return (
    <div id="menu-footer">
      {starters.length > 0 && (
        <button
          type="button"
          id="starters-tab"
          className={activeCategory === 'starters' ? 'tab-active' : 'tab'}
          onClick={() => {
            handleClick('starters');
          }}
        >
          <p>Entradas</p>
        </button>
      )}

      {mains.length > 0 && (
        <button
          type="button"
          id="mains-tab"
          className={activeCategory === 'mains' ? 'tab-active' : 'tab'}
          onClick={() => {
            handleClick('mains');
          }}
        >
          <p>Pratos Principais</p>
        </button>
      )}
      {desserts.length > 0 && (
        <button
          type="button"
          id="desserts-tab"
          className={activeCategory === 'desserts' ? 'tab-active' : 'tab'}
          onClick={() => {
            handleClick('desserts');
          }}
        >
          <p>Sobremesas</p>
        </button>
      )}

      {drinks.length > 0 && (
        <button
          type="button"
          id="drinks-tab"
          className={activeCategory === 'drinks' ? 'tab-active' : 'tab'}
          onClick={() => {
            handleClick('drinks');
          }}
        >
          <p>Bebidas</p>
        </button>
      )}

      {alcoholics.length > 0 && (
        <button
          type="button"
          id="alcoholics-tab"
          className={activeCategory === 'alcoholics' ? 'tab-active' : 'tab'}
          onClick={() => {
            handleClick('alcoholics');
          }}
        >
          <p>Bebidas Alcoólicas</p>
        </button>
      )}
    </div>
  );
}
