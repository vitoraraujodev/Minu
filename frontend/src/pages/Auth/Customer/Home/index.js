import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import PhoneNumberInput from '~/components/PhoneNumberInput';

import waitress from '~/assets/images/waitress.jpg';

import './styles.css';

export default function Home() {
  const [height, setHeight] = useState(window.innerHeight);

  function handleResize() {
    if (window && window.innerHeight !== height) {
      setHeight(window.innerHeight);
    }
  }

  useEffect(() => {
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

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
