import React from 'react';
import { useDispatch } from 'react-redux';

import {
  establishmentSignInRequest,
  customerSignInRequest,
} from '~/store/modules/auth/actions';

import './styles.css';

export default function Home() {
  const dispatch = useDispatch();

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
        <div className="content">
          <h3>Acesso como Estabelecimento (Desktop e Mobile)</h3>
          <button
            type="button"
            className="button"
            onClick={handleEstablishment}
          >
            Acessar
          </button>
        </div>

        <div className="content">
          <h3>
            Acesso como Cliente (Para uma melhor experiência, acesse por meio de
            seu dispositivo celular)
          </h3>
          <button type="button" className="button" onClick={handleCustomer}>
            Acessar
          </button>
        </div>
      </div>
    </div>
  );
}
