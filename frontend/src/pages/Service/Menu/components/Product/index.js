import React from 'react';
import { Link } from 'react-router-dom';

import { ReactComponent as RatingStar } from '~/assets/icons/rating-star.svg';
import { ReactComponent as Clock } from '~/assets/icons/clock-icon.svg';
import defaultPicture from '~/assets/images/default-picture.png';

import { formatPrice } from '~/util/formatPrice';

import './styles.css';

export default function Product({ product }) {
  return (
    <div id="service-menu-product">
      <Link
        to={{
          pathname: `/cardapio/produto`,
          state: { product },
        }}
      >
        <div
          style={
            product.photo ? { padding: '24px 0px' } : { padding: '48px 0px' }
          }
        >
          <div>
            {product.photo && (
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
              </>
            )}

            <div className="product-info-container">
              <div>
                <p className="product-title">{product.title}</p>

                <div className="product-info-group">
                  <p className="product-time">
                    <Clock
                      fill="#606060"
                      style={{ marginRight: 4 }}
                      height="12"
                    />
                    {product.preparation_time === 1
                      ? '1-5min'
                      : `${(product.preparation_time - 1) * 5}-${
                          product.preparation_time * 5
                        }min`}
                  </p>

                  {product.raters > 0 && (
                    <div className="product-rating-area">
                      <span className="product-rating-text">
                        {product.rating % 1 > 0
                          ? product.rating
                          : `${product.rating}.0`}
                      </span>
                      <RatingStar style={{ height: 12, margin: '0 4px' }} />
                      <span className="product-rating-text">
                        ({product.raters})
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div
                className="product-price-tag"
                style={product.photo ? { top: 24 } : { top: 48 }}
              >
                <p>{formatPrice(product.price)}</p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
