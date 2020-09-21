import React from 'react';

import { ReactComponent as RatingStar } from '~/assets/icons/rating-star.svg';
import defaultPicture from '~/assets/images/default-picture.png';

import { formatPrice } from '~/util/format';

import './styles.css';

export default function Product({ product }) {
  return (
    <div key={product.id} className="product-container">
      <>
        <div className="product-img-container">
          <img
            src={product.photo ? product.photo.url : defaultPicture}
            onError={(e) => {
              e.target.src = defaultPicture;
            }}
            className="product-img"
            alt="product"
          />
        </div>
        <div className="product-price-tag">
          <p>{formatPrice(product.price)}</p>
        </div>
      </>

      <div className="product-info">
        <p className="product-title">{product.title}</p>
        <div className="product-info-group">
          <span className="product-time">
            {product.preparation_time === 1
              ? '1-5min'
              : `${(product.preparation_time - 1) * 5}-${
                  product.preparation_time * 5
                }min`}
          </span>

          {product.raters > 0 && (
            <div className="product-rating-area">
              <span className="product-rating-text">
                {product.rating % 1 > 0
                  ? product.rating
                  : `${product.rating}.0`}
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
