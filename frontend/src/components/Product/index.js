import React from 'react';

import defaultPicture from '~/assets/images/default-picture.png';

import './styles.css';

export default function Product({ product }) {
  return (
    <div id="product-component">
      <div className="product-img-container">
        <img
          src={product.photo ? product.photo.url : defaultPicture}
          onError={(e) => {
            e.target.src = defaultPicture;
          }}
          className={product.available ? 'product-img' : 'product-img-disabled'}
          alt="product-img"
        />
      </div>

      <div
        className="product-info"
        style={product.available ? { opacity: 1 } : { opacity: 0.6 }}
      >
        <p className="product-title">{product.title}</p>
        {product.code && <p className="product-code">{product.code}</p>}
      </div>
    </div>
  );
}
