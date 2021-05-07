import React from 'react';

import { FooterButton } from '~/components/Buttons';

import { formatPrice } from '~/utils/formatPrice';

import './styles.css';

export default function AddCartButton({ totalPrice, onAddToCart }) {
  return (
    <FooterButton theme="secondary" onClick={onAddToCart}>
      <div id="add-cart-button-component">
        <span style={{ paddingRight: 16 }}>Adicionar ao carrinho</span>

        <span className="price-text">{formatPrice(totalPrice)}</span>
      </div>
    </FooterButton>
  );
}
