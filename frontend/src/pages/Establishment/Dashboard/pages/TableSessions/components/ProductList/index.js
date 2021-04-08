import React, { useState, useEffect } from 'react';

import Product from '~/components/Product';

import api from '~/services/api';

import './styles.css';

export default function ProductList({ search = '' }) {
  const [loading, setLoading] = useState(false);

  const [products, setProducts] = useState([]);

  const [starters, setStarters] = useState([]);
  const [mains, setMains] = useState([]);
  const [desserts, setDesserts] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [alcoholics, setAlcoholics] = useState([]);

  function handleProducts() {
    if (products.length > 0) {
      const alcoholicItems = products.filter(
        (item) =>
          item.category === 'Bebidas alcoólicas' &&
          item.title.toLowerCase().includes(search)
      );

      setAlcoholics(alcoholicItems);

      const drinkItems = products.filter(
        (item) =>
          item.category === 'Bebidas' &&
          item.title.toLowerCase().includes(search)
      );

      setDrinks(drinkItems);

      const dessertItems = products.filter(
        (item) =>
          item.category === 'Sobremesas' &&
          item.title.toLowerCase().includes(search)
      );

      setDesserts(dessertItems);

      const mainItems = products.filter(
        (item) =>
          item.category === 'Pratos principais' &&
          item.title.toLowerCase().includes(search)
      );

      setMains(mainItems);

      const starterItems = products.filter(
        (item) =>
          item.category === 'Entradas' &&
          item.title.toLowerCase().includes(search)
      );

      setStarters(starterItems);
    }
  }

  useEffect(() => {
    handleProducts();
  }, [products, search]);

  async function loadProducts() {
    setLoading(true);

    try {
      const response = await api.get('items');
      setProducts(response.data);
    } catch (err) {
      alert(
        'Não foi possível carregar seus produtos. Verifique sua conexão e tente mais tarde.'
      );
    }

    setLoading(false);
  }

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div id="product-list">
      {loading && (
        <div className="list-loader-container">
          <div className="list-loader" />
        </div>
      )}

      {starters.length > 0 && (
        <>
          <p className="category-text">Entradas</p>
          {starters.map((item) => (
            <div key={item.id} className="product-container">
              <Product product={item} />
            </div>
          ))}
        </>
      )}

      {mains.length > 0 && (
        <>
          <p className="category-text">Pratos principais</p>
          {mains.map((item) => (
            <div key={item.id} className="product-container">
              <Product product={item} />
            </div>
          ))}
        </>
      )}

      {desserts.length > 0 && (
        <>
          <p className="category-text">Sobremesas</p>
          {desserts.map((item) => (
            <div key={item.id} className="product-container">
              <Product product={item} />
            </div>
          ))}
        </>
      )}

      {drinks.length > 0 && (
        <>
          <p className="category-text">Bebidas</p>
          {drinks.map((item) => (
            <div key={item.id} className="product-container">
              <Product product={item} />
            </div>
          ))}
        </>
      )}

      {alcoholics.length > 0 && (
        <>
          <p className="category-text">Bebidas alcoólicas</p>
          {alcoholics.map((item) => (
            <div key={item.id} className="product-container">
              <Product product={item} />
            </div>
          ))}
        </>
      )}

      {starters.length === 0 &&
        mains.length === 0 &&
        desserts.length === 0 &&
        drinks.length === 0 &&
        alcoholics.length === 0 && (
          <p className="hint">Nenhum produto encontrado...</p>
        )}
    </div>
  );
}
