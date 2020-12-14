import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import OrderModal from './OrderModal';

import defaultPicture from '~/assets/images/default-picture.png';
import { ReactComponent as RatingStar } from '~/assets/icons/rating-star.svg';
import { ReactComponent as Backward } from '~/assets/icons/backward-icon.svg';
import { ReactComponent as Check } from '~/assets/icons/save-icon.svg';
import { ReactComponent as ExpandArrow } from '~/assets/icons/expand-arrow.svg';
import { ReactComponent as Clock } from '~/assets/icons/clock-icon.svg';

import { addToCartRequest } from '~/store/modules/cart/actions';

import history from '~/services/history';

import { formatPrice } from '~/util/format';

import './styles.css';

export default function ProductOrder({ location }) {
  const dispatch = useDispatch();

  const product =
    location.state && location.state.product
      ? location.state.product
      : history.push('/cliente');

  const [modalVisible, setModalVisible] = useState(false);

  const [totalPrice, setTotalPrice] = useState(1);

  const [observation, setObservation] = useState('');
  const [amount, setAmount] = useState(1);
  const [takeaway, setTakeaway] = useState(false);
  const [additionals, setAdditionals] = useState([]);

  function handleAmount(value) {
    if (amount + value !== 0) setAmount(amount + value);
  }

  function handleAdditional(additional) {
    if (additionals.includes(additional)) {
      setAdditionals(additionals.filter((add) => add.id !== additional.id));
    } else {
      setAdditionals([...additionals, additional]);
    }
  }

  function handleCart() {
    const productOrder = {
      id: product.id,
      code: product.code,
      title: product.title,
      price: product.price,
      totalPrice,
      observation,
      amount,
      takeaway,
      additionals,
    };

    dispatch(addToCartRequest(productOrder));
  }

  useEffect(() => {
    const total = product.price * amount;

    if (additionals.length > 0) {
      const addPrices = additionals.map((additional) => additional.price);
      const totalAdd = addPrices.reduce(
        (acumulator, price) => acumulator + price
      );
      setTotalPrice(total + totalAdd * amount);
    } else {
      setTotalPrice(total);
    }
  }, [additionals, amount]); //eslint-disable-line

  return (
    <div id="product-order">
      {modalVisible && (
        <OrderModal
          onCart={handleCart}
          onOrder={() => alert('Você realizou um pedido! Seu pedido já vem.')}
          onClose={() => setModalVisible(false)}
        />
      )}

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

      {product.photo && (
        <div className="img-container">
          <img
            src={product.photo}
            onError={(e) => {
              e.target.src = defaultPicture;
            }}
            className="product-img"
            alt="product"
          />
        </div>
      )}
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
                <div className="check-box">
                  {additionals.includes(additional) && (
                    <div className="check-box-selected" />
                  )}
                </div>

                <p className="additional-title">{additional.title}</p>
                <div className="additional-dots" />
                <p className="additional-price">
                  {formatPrice(additional.price)}
                </p>
              </div>
            ))}
          </>
        )}

        <p className="observation-label">Observações</p>
        <textarea
          className="observation-input"
          value={observation}
          onChange={(e) => setObservation(e.target.value)}
          maxLength="100"
          placeholder="Observações do seu pedido"
        />

        <div className="input-group">
          <div className="amount">
            <button
              type="button"
              className={
                amount === 1 ? 'circle-button-disabled' : 'circle-button'
              }
              onClick={() => handleAmount(-1)}
            >
              <ExpandArrow
                style={{ height: 12, opacity: 0.7 }}
                fill={amount > 1 ? '#535bfe' : '#acacac'}
              />
            </button>

            <div className="amount-input">
              <span className="time-text">{amount}</span>
            </div>

            <button
              type="button"
              className="circle-button-up"
              onClick={() => handleAmount(1)}
            >
              <ExpandArrow
                style={{ height: 12, opacity: 0.7 }}
                fill="#535BFE"
              />
            </button>
          </div>

          <button
            type="button"
            className={takeaway ? 'takeaway-selected' : 'takeaway'}
            onClick={() => setTakeaway(!takeaway)}
          >
            <span style={{ paddingRight: 8 }}>Para viagem</span>
            {takeaway ? (
              <Check height={20} />
            ) : (
              <div
                className="check-box"
                style={{ border: '1px solid #535BFE' }}
              />
            )}
          </button>
        </div>
      </div>
      <button
        className="submit-button"
        onClick={() => setModalVisible(!modalVisible)}
        type="button"
      >
        <p className="order-text">Pedir</p>
        <p className="total-price">{formatPrice(totalPrice)}</p>
      </button>
    </div>
  );
}
