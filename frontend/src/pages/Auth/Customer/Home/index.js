import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './styles.css';

import PhoneNumberInput from '~/components/PhoneNumberInput';

import waitress from '~/assets/images/waitress.jpg';

export default function Intro() {
  const [height, setHeight] = useState(window.innerHeight);

  function handleResize() {
    if (window) {
      setHeight(window.innerHeight);
    }
  }

  window.addEventListener('resize', handleResize);

  return (
    <div id="customer-home">
      <div className="container">
        <div className="image-container">
          <img
            height={height * 0.7 > 660 ? 660 : height * 0.7}
            src={waitress}
            alt="waitress"
          />
        </div>

        <div className="account-container">
          <p className="welcome">Seja bem-vindo!</p>
          <Link to="/cliente/login">
            <PhoneNumberInput focus={false} />
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
