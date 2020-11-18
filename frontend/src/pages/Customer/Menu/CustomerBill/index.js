import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import BillModal from './BillModal';
import BillPending from './BillPending';

import { ReactComponent as Backward } from '~/assets/icons/backward-icon.svg';

import history from '~/services/history';

import { formatPrice } from '~/util/format';

import { signOutRequest } from '~/store/modules/auth/actions';

import './styles.css';

export default function CustomerBill({ location }) {
  const dispatch = useDispatch();
  const establishment = location.state
    ? location.state.establishment
    : history.push('cliente/acesso');

  const [totalPrice, setTotalPrice] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [pendingBillVisible, setPendingBillVisible] = useState(false);

  const productOrders = [
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
    {
      id: 3,
      amount: 2,
      title: 'Sopa de macaco',
      additionals: [{ id: 1, title: 'foda-se', price: 1.5 }],
      totalPrice: 24,
      status: 1,
    },
    {
      id: 4,
      amount: 2,
      title: 'Sopa de macaco',
      additionals: [{ id: 1, title: 'foda-se', price: 1.5 }],
      totalPrice: 24,
      status: 1,
    },
  ];

  useEffect(() => {
    if (productOrders.length > 0) {
      const prices = productOrders.map(
        (productOrder) => productOrder.totalPrice
      );
      const total = prices.reduce((acumulator, price) => acumulator + price);
      setTotalPrice(total);
    }
  }, [productOrders]);

  function handleSignOut() {
    dispatch(signOutRequest());
  }

  function handleBillRequested() {
    setModalVisible(false);
    setPendingBillVisible(true);
  }

  return (
    <div id="customer-bill">
      {modalVisible && (
        <BillModal
          onClose={() => setModalVisible(false)}
          billRequested={handleBillRequested}
        />
      )}

      {pendingBillVisible ? (
        <BillPending onClose={() => setPendingBillVisible(false)} />
      ) : (
        <>
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
              <button
                className="waiter-button"
                onClick={handleSignOut}
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
              productOrders.length > 0
                ? 'submit-button-enabled'
                : 'submit-button-disabled'
            }
            onClick={() => setModalVisible(!modalVisible)}
            type="button"
          >
            <p className="order-text">Pedir a conta</p>
          </button>
        </>
      )}
    </div>
  );
}
