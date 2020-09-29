import React, { useState, useEffect } from 'react';

import Product from './Product';
import MenuFooter from '~/components/MenuFooter';

import logo from '~/assets/icons/simple-logo.svg';
import defaultPicture from '~/assets/images/default-picture.png';
import { ReactComponent as RatingStar } from '~/assets/icons/rating-star.svg';

import api from '~/services/api';

import './styles.css';

export default function CostumerMenu() {
  const [establishment, setEstablishment] = useState({});
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState('starters');

  const containerRef = document.getElementById('container');
  const startersRef = document.getElementById('startersRef');
  const mainsRef = document.getElementById('mainsRef');
  const dessertsRef = document.getElementById('dessertsRef');
  const drinksRef = document.getElementById('drinksRef');
  const alcoholicsRef = document.getElementById('alcoholicsRef');

  async function loadEstablishment() {
    try {
      const response = await api.get('establishments/1');
      setEstablishment(response.data);
      setProducts(response.data.menus[0].items);
    } catch (err) {
      if (err.response) alert(err.response.data.error);
    }
  }

  useEffect(() => {
    loadEstablishment();
  }, []);

  function handleScroll() {
    if (
      containerRef &&
      startersRef &&
      mainsRef &&
      dessertsRef &&
      drinksRef &&
      alcoholicsRef
    ) {
      if (
        containerRef.scrollTop + 80 >= alcoholicsRef.offsetTop &&
        containerRef.scrollTop + 80 <=
          alcoholicsRef.offsetTop + alcoholicsRef.offsetHeight &&
        activeCategory !== 'alcoholics'
      )
        setActiveCategory('alcoholics');
      else if (
        containerRef.scrollTop + 80 >= drinksRef.offsetTop &&
        containerRef.scrollTop + 80 <
          drinksRef.offsetTop + drinksRef.offsetHeight &&
        activeCategory !== 'drinks'
      )
        setActiveCategory('drinks');
      else if (
        containerRef.scrollTop + 80 >= dessertsRef.offsetTop &&
        containerRef.scrollTop + 80 <
          dessertsRef.offsetTop + dessertsRef.offsetHeight &&
        activeCategory !== 'desserts'
      )
        setActiveCategory('desserts');
      else if (
        containerRef.scrollTop + 80 >= mainsRef.offsetTop &&
        containerRef.scrollTop + 80 <
          mainsRef.offsetTop + mainsRef.offsetHeight &&
        activeCategory !== 'mains'
      )
        setActiveCategory('mains');
      else if (
        containerRef.scrollTop + 80 <
          startersRef.offsetTop + startersRef.offsetHeight &&
        activeCategory !== 'starters'
      )
        setActiveCategory('starters');
    }
  }

  function scrollTo(category) {
    switch (category) {
      case 'starters':
        startersRef.scrollIntoView();
        break;
      case 'mains':
        mainsRef.scrollIntoView();
        break;
      case 'desserts':
        dessertsRef.scrollIntoView();
        break;
      case 'drinks':
        drinksRef.scrollIntoView();
        break;
      case 'alcoholics':
        alcoholicsRef.scrollIntoView();
        break;
      default:
    }
  }

  return (
    <div id="costumer-menu">
      <div onScroll={handleScroll} id="container" className="container">
        <div className="info-container" id="info-container">
          <div className="logo-container">
            <img className="logo" src={logo} alt="minu" />
          </div>

          <div className="img-container">
            <img
              src={
                establishment.photo ? establishment.photo.url : defaultPicture
              }
              onError={(e) => {
                e.target.src = defaultPicture;
              }}
              className="establishment-img"
              alt="establishment"
            />
          </div>
          <div className="info-area">
            <div className="info">
              <div className="title-area">
                <span className="title">
                  {establishment.establishment_name}
                </span>
              </div>
              <div className="rating-area">
                <span className="rating-text">
                  {establishment.rating % 1 > 0
                    ? establishment.rating
                    : `${establishment.rating}.0`}
                </span>
                <RatingStar style={{ height: 15, margin: '0 4px' }} />
                <span className="rating-text">({establishment.raters})</span>
              </div>
            </div>
          </div>
        </div>

        <div id="products-container" className="products-container">
          <div className="products">
            <div id="startersRef">
              <p className="category-label">Entradas</p>
              {products &&
                products.map((product) => (
                  <Product product={product} key={product.id} />
                ))}
            </div>

            <div id="mainsRef">
              <p className="category-label">Pratos Principais</p>
              {products &&
                products.map((product) => (
                  <Product product={product} key={product.id} />
                ))}
            </div>

            <div id="dessertsRef">
              <p className="category-label">Sobremesas</p>
              {products &&
                products.map((product) => (
                  <Product product={product} key={product.id} />
                ))}
            </div>

            <div id="drinksRef">
              <p className="category-label">Bebidas</p>
              {products &&
                products.map((product) => (
                  <Product product={product} key={product.id} />
                ))}
            </div>

            <div id="alcoholicsRef">
              <p className="category-label">Bebidas Alcoólicas</p>
              {products &&
                products.map((product) => (
                  <Product product={product} key={product.id} />
                ))}
            </div>
          </div>
        </div>
      </div>

      <MenuFooter
        activeCategory={activeCategory}
        onActiveCategoryChange={(category) => {
          scrollTo(category);
        }}
      />
    </div>
  );
}
