import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './styles.css';

import waitress from '~/assets/images/waitress.jpg';

export default function Intro() {
  const [height, setHeight] = useState(window.innerHeight);

  function handleResize() {
    setHeight(window.innerHeight);
  }

  window.addEventListener('resize', handleResize);

  return (
    <div className="container">
      <div className="auth-container">
        <div className="waitress-img-container">
          <img
            height={height * 0.7 > 660 ? 660 : height * 0.7}
            src={waitress}
            alt="waitress"
          />
        </div>

        <div className="account-container">
          <p className="welcome">Seja bem-vindo!</p>
          <Link to="/establishment/login">
            <button className="login-button" type="button">
              Acesse sua conta
            </button>
          </Link>
          <div className="register-container">
            <span className="register-or">ou</span>

            <Link to="/establishment/new">
              <button type="button" className="register-button">
                Cadastre seu restaurante
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
