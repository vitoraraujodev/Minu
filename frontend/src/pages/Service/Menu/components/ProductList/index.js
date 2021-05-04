import React, { useState, useEffect, useRef } from 'react';

import Loader from '~/components/Loader';

import Product from '../Product';
import MenuFooter from '../MenuFooter';

import './styles.css';

export default function ProductList({ establishment, loading, pageRef }) {
  const [starters, setStarters] = useState([]);
  const [mains, setMains] = useState([]);
  const [desserts, setDesserts] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [alcoholics, setAlcoholics] = useState([]);
  const [activeCategory, setActiveCategory] = useState('');

  const startersRef = useRef();
  const mainsRef = useRef();
  const dessertsRef = useRef();
  const drinksRef = useRef();
  const alcoholicsRef = useRef();

  // Separes products by category
  function handleEstablishment() {
    // Testar pra ver oq acontece se tirar o setActiveCategory
    if (establishment.items && establishment.items.length > 0) {
      const alcoholicItems = establishment.items.filter(
        (item) => item.category === 'Bebidas alcoólicas'
      );
      if (alcoholicItems.length > 0) {
        setAlcoholics(alcoholicItems);
        setActiveCategory('alcoholics');
      }

      const drinkItems = establishment.items.filter(
        (item) => item.category === 'Bebidas'
      );
      if (drinkItems.length > 0) {
        setDrinks(drinkItems);
        setActiveCategory('drinks');
      }

      const dessertItems = establishment.items.filter(
        (item) => item.category === 'Sobremesas'
      );
      if (dessertItems.length > 0) {
        setDesserts(dessertItems);
        setActiveCategory('desserts');
      }

      const mainItems = establishment.items.filter(
        (item) => item.category === 'Pratos principais'
      );
      if (mainItems.length > 0) {
        setMains(mainItems);
        setActiveCategory('mains');
      }

      const starterItems = establishment.items.filter(
        (item) => item.category === 'Entradas'
      );
      if (starterItems.length > 0) {
        setStarters(starterItems);
        setActiveCategory('starters');
      }
    }
  }

  function isOnScreenHeight(ref) {
    if (ref && ref.current && pageRef && pageRef.current) {
      const extraHeight = window.innerHeight * 0.25;

      return (
        pageRef.current.scrollTop + extraHeight >= ref.current.offsetTop &&
        pageRef.current.scrollTop + extraHeight <=
          ref.current.offsetTop + ref.current.offsetHeight
      );
    }
    return false;
  }

  function handleScroll() {
    if (pageRef && pageRef.current) {
      if (activeCategory !== 'alcoholics' && isOnScreenHeight(alcoholicsRef))
        setActiveCategory('alcoholics');
      else if (activeCategory !== 'drinks' && isOnScreenHeight(drinksRef))
        setActiveCategory('drinks');
      else if (activeCategory !== 'desserts' && isOnScreenHeight(dessertsRef))
        setActiveCategory('desserts');
      else if (activeCategory !== 'mains' && isOnScreenHeight(mainsRef))
        setActiveCategory('mains');
      else if (activeCategory !== 'starters' && isOnScreenHeight(startersRef))
        setActiveCategory('starters');
    }
  }

  useEffect(() => {
    if (pageRef && pageRef.current)
      pageRef.current.addEventListener('scroll', handleScroll);

    return () => {
      if (pageRef && pageRef.current)
        pageRef.current.removeEventListener('scroll', handleScroll);
    };
  }, []);

  function scrollTo(category) {
    switch (category) {
      case 'starters':
        if (startersRef && startersRef.current)
          startersRef.current.scrollIntoView();
        setActiveCategory('starters');
        break;
      case 'mains':
        if (mainsRef && mainsRef.current) mainsRef.current.scrollIntoView();
        setActiveCategory('mains');
        break;
      case 'desserts':
        if (dessertsRef && dessertsRef.current)
          dessertsRef.current.scrollIntoView();
        setActiveCategory('desserts');
        break;
      case 'drinks':
        if (drinksRef && drinksRef.current) drinksRef.current.scrollIntoView();
        setActiveCategory('drinks');
        break;
      case 'alcoholics':
        if (alcoholicsRef && alcoholicsRef.current)
          alcoholicsRef.current.scrollIntoView();
        setActiveCategory('alcoholics');
        break;
      default:
    }
  }

  useEffect(() => {
    if (establishment) {
      handleEstablishment();
    }
  }, [establishment]);

  function checkEmptyList() {
    return (
      starters.length === 0 &&
      mains.length === 0 &&
      desserts.length === 0 &&
      drinks.length === 0 &&
      alcoholics.length === 0
    );
  }

  return (
    <div id="service-product-list">
      {loading && (
        <div className="loader-container">
          <Loader size={40} />
        </div>
      )}

      {checkEmptyList() && !loading && (
        <h3 className="empty-text">Nenhum cardápio está diponivel agora...</h3>
      )}

      {!checkEmptyList() && !loading && (
        <div className="products">
          {starters.length > 0 && (
            <div ref={startersRef}>
              <p className="category-label">Entradas</p>
              {starters.map((product) => (
                <Product product={product} key={product.id} />
              ))}
            </div>
          )}

          {mains.length > 0 && (
            <div ref={mainsRef}>
              <p className="category-label">Pratos Principais</p>
              {mains.map((product) => (
                <Product product={product} key={product.id} />
              ))}
            </div>
          )}

          {desserts.length > 0 && (
            <div ref={dessertsRef}>
              <p className="category-label">Sobremesas</p>
              {desserts.map((product) => (
                <Product product={product} key={product.id} />
              ))}
            </div>
          )}

          {drinks.length > 0 && (
            <div ref={drinksRef}>
              <p className="category-label">Bebidas</p>
              {drinks.map((product) => (
                <Product product={product} key={product.id} />
              ))}
            </div>
          )}

          {alcoholics.length > 0 && (
            <div ref={alcoholicsRef}>
              <p className="category-label">Bebidas Alcoólicas</p>
              {alcoholics.map((product) => (
                <Product product={product} key={product.id} />
              ))}
            </div>
          )}
        </div>
      )}

      {!checkEmptyList() && (
        <MenuFooter
          activeCategory={activeCategory}
          starters={starters}
          mains={mains}
          desserts={desserts}
          drinks={drinks}
          alcoholics={alcoholics}
          onActiveCategoryChange={(category) => {
            scrollTo(category);
          }}
        />
      )}
    </div>
  );
}
