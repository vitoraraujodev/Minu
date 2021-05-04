import React from 'react';

import { ReactComponent as TrayIcon } from '~/assets/icons/tray-icon.svg';
import { ReactComponent as BillIcon } from '~/assets/icons/orders-icon.svg';
import { ReactComponent as CartIcon } from '~/assets/icons/cart-icon.svg';

import './styles.css';

export default function MenuButtons({ waiter, billCall, cart, bill }) {
  function WaiterButton() {
    return (
      <button
        type="button"
        className="button waiter"
        onClick={() => waiter.onClick(true)}
      >
        <TrayIcon height="21" style={{ marginBottom: 8 }} fill="#fff" />
      </button>
    );
  }

  function BillCallButton() {
    return (
      <button
        type="button"
        className="button bill-call"
        onClick={() => billCall.onClick(true)}
      >
        <BillIcon height="21" fill="#fff" />
      </button>
    );
  }

  function CartButton() {
    return (
      <button
        type="button"
        className="button cart"
        onClick={() => cart.onClick(true)}
      >
        <CartIcon height="21" fill="#fff" />
      </button>
    );
  }

  function BillButton() {
    return (
      <button
        type="button"
        className="button bill"
        onClick={() => bill.onClick(true)}
      >
        <BillIcon height="21" fill="#fff" />
      </button>
    );
  }

  return (
    <div id="menu-buttons-component">
      {waiter && <WaiterButton />}

      {billCall && <BillCallButton />}

      {cart && <CartButton />}

      {bill && <BillButton />}
    </div>
  );
}
