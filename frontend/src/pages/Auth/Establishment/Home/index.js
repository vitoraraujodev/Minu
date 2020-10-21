import React from 'react';
import { Link } from 'react-router-dom';

import './styles.css';

import waitress from '~/assets/images/waitress.jpg';

export default function Intro() {
  return (
    <div id="establishment-home">
      <div className="container">
        <div className="image-container">
          <img className="image" src={waitress} alt="" />
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
