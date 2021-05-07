import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaPhoneAlt } from 'react-icons/fa';

import { Button, FooterButton } from '~/components/Buttons';

import Header from './components/Header';

import { removeFromCart, clearCart } from '~/store/modules/cart/actions';

import { ReactComponent as Remove } from '~/assets/icons/close-icon.svg';

import { formatPrice } from '~/util/formatPrice';

import './styles.css';

export default function Cart() {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart.cart);

  const [totalPrice, setTotalPrice] = useState();
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (cart.length > 0) {
      const prices = cart.map((productOrder) => productOrder.totalPrice);
      const total = prices.reduce((acumulator, price) => acumulator + price);
      setTotalPrice(total);
    }
  }, [cart]);

  function handleWaiter() {
    alert('Você chamou o garçom! Aguarde um instante.');
  }

  function handleRemove(id) {
    dispatch(removeFromCart(id));
  }

  function handleOrder() {
    dispatch(clearCart());
    setTotalPrice(0);
    setModalVisible(false);
    alert('Você realizou um pedido! Seu pedido já vem.');
  }

  return (
    <div id="cart-page">
      {/* {modalVisible && (
        <CartModal
          onClose={() => setModalVisible(false)}
          onOrder={handleOrder}
        />
      )} */}

      <Header />

      <p className="cart-title">Seu carrinho</p>

      <span className="cart-hint">
        Realize seu pedido quando estiver tudo pronto!
      </span>

      {cart.length > 0 ? (
        <div className="product-orders">
          {cart.map((productOrder) => (
            <div className="product" key={productOrder.id}>
              <div>
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

              <div className="product-group">
                <p className="product-text">
                  {formatPrice(productOrder.totalPrice)}
                </p>

                <button
                  type="button"
                  className="remove-button"
                  onClick={() => handleRemove(productOrder.id)}
                >
                  <Remove size={21} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="empty-text">
          Você ainda não adicionou um pedido ao carrinho
        </p>
      )}

      <div className="price-container">
        <Button variant="secondary" theme="secondary" size="small">
          <FaPhoneAlt size={12} />
          <span style={{ marginLeft: 12 }}>Ligar</span>
        </Button>

        <p className="total-price">
          Total:{' '}
          <span className="price">
            {totalPrice > 0 ? formatPrice(totalPrice) : '---'}
          </span>
        </p>
      </div>

      <FooterButton
        theme="secondary"
        disabled={cart.length === 0}
        onClick={() => setModalVisible(!modalVisible)}
      >
        Pedir
      </FooterButton>
    </div>
  );
}
