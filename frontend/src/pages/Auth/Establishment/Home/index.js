import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './styles.css';

import waitress from '~/assets/images/waitress.jpg';

export default function Intro() {
  const [height, setHeight] = useState(window.innerHeight);

  function handleResize() {
    if (window) {
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
    <div id="establishment-home">
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
          <Link to="/estabelecimento/login">
            <button className="login-button" type="button">
              Acesse sua conta
            </button>
          </Link>
          <div className="register-container">
            <span className="register-or">ou</span>

            <Link to="/estabelecimento/cadastro">
              <button type="button" className="register-button">
                Cadastre o seu restaurante
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
