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

  return (
    <div id="costumer-menu">
      <div className="container">
        <div className="info-container">
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

        {products && products.map((product) => <Product product={product} />)}
      </div>

      <MenuFooter />
    </div>
  );
}
