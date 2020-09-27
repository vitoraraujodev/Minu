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
  const [scrolling, setScrolling] = useState(false);

  const containerRef = document.getElementById('container');
  const startersRef = document.getElementById('startersRef');
  const mainsRef = document.getElementById('mainsRef');
  const dessertsRef = document.getElementById('dessertsRef');
  const drinksRef = document.getElementById('drinksRef');

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
    if (containerRef && startersRef && mainsRef && dessertsRef && drinksRef) {
      if (
        containerRef.scrollTop >= drinksRef.offsetTop &&
        containerRef.scrollTop <=
          drinksRef.offsetTop + drinksRef.offsetHeight &&
        !scrolling &&
        activeCategory !== 'drinks'
      )
        setActiveCategory('drinks');
      else if (
        containerRef.scrollTop >= dessertsRef.offsetTop &&
        containerRef.scrollTop <=
          dessertsRef.offsetTop + dessertsRef.offsetHeight &&
        !scrolling &&
        activeCategory !== 'desserts'
      )
        setActiveCategory('desserts');
      else if (
        containerRef.scrollTop >= mainsRef.offsetTop &&
        containerRef.scrollTop <= mainsRef.offsetTop + mainsRef.offsetHeight &&
        !scrolling &&
        activeCategory !== 'mains'
      )
        setActiveCategory('mains');
      else if (
        containerRef.scrollTop >= startersRef.offsetTop &&
        containerRef.scrollTop <=
          startersRef.offsetTop + startersRef.offsetHeight &&
        !scrolling &&
        activeCategory !== 'starters'
      )
        setActiveCategory('starters');
    }
  }

  function scrollTo(category) {
    setScrolling(true);
    switch (category) {
      case 'starters':
        setActiveCategory('starters');
        startersRef.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => setScrolling(false), 1000);
        break;
      case 'mains':
        setActiveCategory('mains');
        setTimeout(() => setScrolling(false), 1000);
        mainsRef.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'desserts':
        setActiveCategory('desserts');
        setTimeout(() => setScrolling(false), 1000);
        dessertsRef.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'drinks':
        setActiveCategory('drinks');
        setTimeout(() => setScrolling(false), 1000);
        drinksRef.scrollIntoView({ behavior: 'smooth' });
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
          <div className="info">
            <div className="title-area">
              <span className="title">{establishment.establishment_name}</span>
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
