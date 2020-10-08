import React, { useState, useEffect } from 'react';

import { ReactComponent as Backward } from '~/assets/icons/backward-icon.svg';

import history from '~/services/history';

import { formatPrice } from '~/util/format';

import './styles.css';

export default function CostumerBill({ location }) {
  const establishment = location.state
    ? location.state.establishment
    : history.goBack();

  const [totalPrice, setTotalPrice] = useState();

  const [productOrders, setProductOrders] = useState([
    {
      id: 1,
      amount: 1,
      title: 'Sopa de repolho',
      additionals: [{ id: 1, title: 'foda-se', price: 1.5 }],
      totalPrice: 13,
      status: 1,
    },
    {
      id: 2,
      amount: 2,
      title: 'Sopa de macaco',
      additionals: [{ id: 1, title: 'foda-se', price: 1.5 }],
      totalPrice: 24,
      status: 1,
    },
  ]);

  useEffect(() => {
    if (productOrders.length > 0) {
      const prices = productOrders.map(
        (productOrder) => productOrder.totalPrice
      );
      const total = prices.reduce((acumulator, price) => acumulator + price);
      setTotalPrice(total);
    }
  }, [productOrders]);

  return (
    <div id="customer-bill">
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
      <div className="container">
        <div className="establishment-info">
          <p className="establishment-title">
            {establishment.establishment_name}
          </p>
          <span className="establishment-address">
            {establishment.street}
            {'  '}
            {establishment.address_number &&
              `n. ${establishment.address_number}.`}
          </span>
        </div>

        {productOrders.length > 0 ? (
          <div className="product-orders">
            {productOrders.map((productOrder) => (
              <div className="product" key={productOrder.id}>
                <div className="product-info">
                  <p className="product-text">
                    {productOrder.amount}x {productOrder.title}
                  </p>
                  <p className="product-subtext">
                    {productOrder.additionals &&
                      productOrder.additionals.length}{' '}
                    Adicional
                  </p>
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
          <p className="empty-text">Você ainda não realizou um pedido</p>
        )}

        <div className="group">
          <button className="waiter-button" onClick={() => {}} type="button">
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
          productOrders.length > 0
            ? 'submit-button-enabled'
            : 'submit-button-disabled'
        }
        onClick={() => {}}
        type="button"
      >
        <p className="order-text">Pedir a conta</p>
      </button>
    </div>
  );
}
