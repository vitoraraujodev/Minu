import React from 'react';
import { Link } from 'react-router-dom';

import PhoneNumberInput from '~/components/PhoneNumberInput';

import waitress from '~/assets/images/waitress.jpg';

import './styles.css';

export default function Home() {
  return (
    <div id="customer-home">
      <div className="container">
        <div className="image-container">
          <img src={waitress} className="image" alt="" />
        </div>

        <div className="account-container">
          <p className="welcome">Seja bem-vindo!</p>
          <Link to="/cliente/login">
            <PhoneNumberInput onChange={() => {}} focus={false} />
          </Link>

          <div className="register-container">
            <span className="register-or">ou</span>

            <Link to="/cliente/cadastro">
              <button type="button" className="register-button">
                Cadastre sua conta
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
