import React from 'react';
import { Link } from 'react-router-dom';

import Header from '~/components/Header';
import StarRating from '~/components/StarRating';

import defaultEstablishement from '~/assets/images/default-establishment.png';

import './styles.css';

export default function Profile() {
  return (
    <div id="profile">
      <Header />
      <div className="container">
        <div className="info-container">
          <img
            src={defaultEstablishement}
            className="establishment-img"
            alt="establishment"
          />
          <div className="info">
            <Link to="/establishment">
              <button className="img-button" type="button">
                Adicionar foto
              </button>
            </Link>
            <span className="title">Restaurante X</span>
            <StarRating />
          </div>
        </div>

        <div className="options">
          <Link to="/">
            <div className="option-area">
              <div className="option">
                <span className="option-text">Editar conta</span>
              </div>
            </div>
          </Link>
          <Link to="/">
            <div className="option-area">
              <div className="option">
                <span className="option-text">Redefinir PIN</span>
              </div>
            </div>
          </Link>
          <Link to="/">
            <div className="option-area">
              <div className="option">
                <span className="option-text">Editar endereço</span>
              </div>
            </div>
          </Link>
          <Link to="/">
            <div className="option-area">
              <div style={{ border: 0 }} className="option">
                <span
                  className="option-text"
                  style={{ color: '#FF3636', border: 'none' }}
                >
                  Sair
                </span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
