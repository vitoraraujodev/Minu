import React from 'react';

import defaultPicture from '~/assets/images/default-picture.png';

import { ReactComponent as Clock } from '~/assets/icons/clock-icon.svg';
import { ReactComponent as RatingStar } from '~/assets/icons/rating-star.svg';

import './styles.css';

export default function ProductInfo({ product }) {
  function handlePreparationTime() {
    return product.preparation_time === 1
      ? '1-5min'
      : `${(product.preparation_time - 1) * 5}-${
          product.preparation_time * 5
        }min`;
  }

  return (
    <div id="product-info-component">
      <div className="img-container">
        <img
          src={product.photo ? product.photo.url : defaultPicture}
          onError={(e) => {
            e.target.src = defaultPicture;
          }}
          className="product-img"
          alt=""
        />
      </div>

      <div className="product-info">
        <p className="product-title">{product.title}</p>

        <p className="product-description">{product.description}</p>

        <div className="product-info-group">
          <p className="product-time">
            <Clock fill="#6C6C6C" style={{ marginRight: 8 }} height="16" />

            {handlePreparationTime()}
          </p>

          {product.raters > 0 && (
            <div className="product-rating-area">
              <span className="product-rating-text">
                {product.rating.toFixed(1)}
              </span>

              <RatingStar style={{ height: 12, margin: '0 4px' }} />

              <span className="product-rating-text">({product.raters})</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
