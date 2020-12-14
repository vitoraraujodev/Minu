import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import CartModal from './CartModal';

import { ReactComponent as Backward } from '~/assets/icons/backward-icon.svg';

import history from '~/services/history';

import { formatPrice } from '~/util/format';

import './styles.css';

export default function Cart() {
  const cart = useSelector((state) => state.cart.cart);

  const [totalPrice, setTotalPrice] = useState();
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (cart.length > 0) {
      const prices = cart.map(
        (productOrder) => productOrder.totalPrice * productOrder.amount
      );
      const total = prices.reduce((acumulator, price) => acumulator + price);
      setTotalPrice(total);
    }
  }, [cart]);

  function handleWaiter() {
    alert('Você chamou o garçom! Aguarde um instante.');
  }

  return (
    <div id="customer-bill">
      {modalVisible && (
        <CartModal
          onClose={() => setModalVisible(false)}
          handleOrder={() =>
            alert('Você realizou um pedido! Seu pedido já vem.')
          }
        />
      )}

      <div className="header">
        <button
          style={{ color: '#252525' }}
          className="back-button"
          type="button"
          onClick={() => history.push('/cardapio')}
        >
          <Backward style={{ height: 16, marginRight: 4 }} fill="#252525" />
          Voltar
        </button>
      </div>
      <div className="container">
        <div className="establishment-info">
          <p className="establishment-title">Seu carrinho</p>
          <span className="establishment-address">
            Realize seu pedido quando estiver tudo pronto!
          </span>
        </div>

        {cart.length > 0 ? (
          <div className="product-orders">
            {cart.map((productOrder) => (
              <div className="product" key={productOrder.id}>
                <div className="product-info">
                  <p className="product-text">
                    {productOrder.amount}x {productOrder.title}
                  </p>

                  {productOrder.additionals.length === 1 ? (
                    <p className="product-subtext">
                      {productOrder.additionals.length} Adicional
                    </p>
                  ) : (
                    <p className="product-subtext">
                      {productOrder.additionals.length} Adicionais
                    </p>
                  )}
                </div>

                <div className="product-info2">
                  <p className="product-text">
                    {formatPrice(productOrder.totalPrice)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="empty-text">
            Você ainda não adicionou um pedido ao carrinho
          </p>
        )}

        <div className="group">
          <button
            className="waiter-button"
            onClick={handleWaiter}
            type="button"
          >
            Chamar garçon
          </button>

          <p className="total-price">
            Total:{' '}
            <span className="price">
              {totalPrice > 0 ? formatPrice(totalPrice) : '---'}
            </span>
          </p>
        </div>
      </div>

      <button
        className={
          cart.length > 0 ? 'submit-button-enabled' : 'submit-button-disabled'
        }
        disabled={cart.length === 0}
        onClick={() => setModalVisible(!modalVisible)}
        type="button"
      >
        <p className="order-text">Pedir</p>
      </button>
    </div>
  );
}
