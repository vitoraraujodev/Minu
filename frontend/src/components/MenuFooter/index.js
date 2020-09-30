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
  }, [activeCategory]); //eslint-disable-line

  function handleClick(tab) {
    onActiveCategoryChange(tab);
  }

  return (
    <div id="menu-footer">
      {starters && (
        <div
          id="starters-tab"
          className={activeCategory === 'starters' ? 'tab-active' : 'tab'}
          onClick={() => {
            handleClick('starters');
          }}
        >
          <p>Entradas</p>
        </div>
      )}

      {mains && (
        <div
          id="mains-tab"
          className={activeCategory === 'mains' ? 'tab-active' : 'tab'}
          onClick={() => {
            handleClick('mains');
          }}
        >
          <p>Pratos Principais</p>
        </div>
      )}
      {desserts && (
        <div
          id="desserts-tab"
          className={activeCategory === 'desserts' ? 'tab-active' : 'tab'}
          onClick={() => {
            handleClick('desserts');
          }}
        >
          <p>Sobremesas</p>
        </div>
      )}

      {drinks && (
        <div
          id="drinks-tab"
          className={activeCategory === 'drinks' ? 'tab-active' : 'tab'}
          onClick={() => {
            handleClick('drinks');
          }}
        >
          <p>Bebidas</p>
        </div>
      )}

      {alcoholics && (
        <div
          id="alcoholics-tab"
          className={activeCategory === 'alcoholics' ? 'tab-active' : 'tab'}
          onClick={() => {
            handleClick('alcoholics');
          }}
        >
          <p>Bebidas Alcoólicas</p>
        </div>
      )}
    </div>
  );
}
