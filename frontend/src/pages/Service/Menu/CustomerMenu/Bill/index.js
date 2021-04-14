import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import BillModal from './BillModal';
import BillPending from './BillPending';

import { ReactComponent as Backward } from '~/assets/icons/backward-icon.svg';

import { checkOutRequest } from '~/store/modules/serviceSession/actions';

import history from '~/services/history';

import { formatPrice } from '~/util/formatPrice';

import handleEstablishmentAddress from '~/util/handleEstablishmentAddress';

import './styles.css';

export default function Bill({ location }) {
  const establishment =
    location.state && location.state.establishment
      ? location.state.establishment
      : history.push('/cliente');

  const dispatch = useDispatch();

  const [totalPrice, setTotalPrice] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [pendingBillVisible, setPendingBillVisible] = useState(false);

  const productOrders = [
    {
      id: 1,
      amount: 1,
      title: 'Sopa de repolho',
      additionals: [{ id: 1, price: 1.5 }],
      totalPrice: 11,
    },
    {
      id: 2,
      amount: 1,
      title: 'Chá Matte Leão 350ml',
      additionals: [],
      totalPrice: 5,
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

  function handleWaiter() {
    alert('Você chamou o garçom! Aguarde um instante.');
  }

  function handleClose() {
    setModalVisible(false);
    history.push('/acesso/sessao');
  }

  function handleBillRequested() {
    setModalVisible(false);
    dispatch(checkOutRequest());
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
        <BillPending onClose={handleClose} />
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
                {handleEstablishmentAddress(establishment.address)}
              </span>
            </div>

            <p className="hint">Pedidos meramente ilustrativos</p>

            {productOrders.length > 0 ? (
              <div className="product-orders">
                {productOrders.map((productOrder) => (
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
              <p className="empty-text">Você ainda não realizou um pedido</p>
            )}

            <div className="group">
              <button
                className="waiter-button"
                onClick={handleWaiter}
                type="button"
              >
                Chamar garçom
              </button>

              <p className="total-price">
                Total:{' '}
                <span className="price">
                  {totalPrice > 0 ? formatPrice(totalPrice) : '---'}
                </span>
              </p>
            </div>
            <p className="hint">
              Lembre-se de pedir a conta para finalizar sua experiência!
            </p>
          </div>

          <button
            className={
              productOrders.length > 0
                ? 'submit-button-enabled'
                : 'submit-button-disabled'
            }
            disabled={productOrders.length === 0}
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
