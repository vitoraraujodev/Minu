import React, { useState } from 'react';

import defaultPicture from '~/assets/images/default-picture.png';
import { ReactComponent as RatingStar } from '~/assets/icons/rating-star.svg';
import { ReactComponent as Backward } from '~/assets/icons/backward-icon.svg';
import { ReactComponent as Clock } from '~/assets/icons/clock-icon.svg';

import history from '~/services/history';

import { formatPrice } from '~/util/format';

import './styles.css';

export default function ProductOrder({ location }) {
  const product =
    location.state && location.state.product
      ? location.state.product
      : history.push('/cliente');

  const [additionals, setAdditionals] = useState([]);

  function handleAdditional(additional) {
    if (additionals.includes(additional)) {
      setAdditionals(additionals.filter((add) => add.id !== additional.id));
    } else {
      setAdditionals([...additionals, additional]);
    }
  }

  return (
    <div id="basic-product-order">
      <div className="header">
        <button
          style={{ color: '#252525' }}
          className="back-button"
          type="button"
          onClick={() => history.goBack()}
        >
          <Backward style={{ height: 16, marginRight: 4 }} fill="#252525" />
          Voltar
        </button>
      </div>

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
        {product.description && (
          <p className="product-description">{product.description}</p>
        )}

        <div className="product-info-group">
          <p className="product-time">
            <Clock fill="#707070" style={{ marginRight: 4 }} height="12" />
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
              <span className="product-rating-text">({product.raters})</span>
            </div>
          )}
        </div>

        {product.additionals.length > 0 && (
          <>
            <p className="additional-label">Adicionais</p>
            {product.additionals.map((additional) => (
              <div
                className="additional"
                key={additional.id}
                onClick={() => handleAdditional(additional)}
              >
                <p className="additional-title">{additional.title}</p>
                <div className="additional-dots" />
                <p className="additional-price">
                  {formatPrice(additional.price)}
                </p>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
