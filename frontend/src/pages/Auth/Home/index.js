import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import logo from '~/assets/icons/simple-logo.svg';

import {
  establishmentSignInRequest,
  customerSignInRequest,
} from '~/store/modules/auth/actions';

import './styles.css';

export default function Home() {
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.auth.loading);

  function handleEstablishment() {
    const email = 'the.fifties@email.com';
    const password = '123123';
    dispatch(establishmentSignInRequest(email, password));
  }

  function handleCustomer() {
    const phone_number = '+5521987654321';
    const password = '123123';
    dispatch(customerSignInRequest(phone_number, password));
  }

  return (
    <div id="home-page">
      <div className="container">
        <div className="welcome-container">
          {loading && (
            <div className="loader-container">
              <div className="loader" />
            </div>
          )}

          <div className="welcome-content">
            <strong className="welcome">Bem vindo ao nosso protótipo!</strong>
            <p className="hint">Melhor experiência em dispositivos móveis</p>
          </div>
        </div>

        <div className="content">
          <button
            type="button"
            className="button"
            onClick={handleEstablishment}
          >
            Entrar como restaurante
          </button>

          <p className="home-or">- Ou -</p>

          <button type="button" className="button" onClick={handleCustomer}>
            Entrar como consumidor
          </button>
        </div>

        <div className="logo-container">
          <img className="logo" src={logo} alt="minu" />
        </div>
      </div>
    </div>
  );
}
