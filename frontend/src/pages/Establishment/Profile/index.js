import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import Header from '~/components/Header';
import StarRating from '~/components/StarRating';

import { signOut } from '~/store/modules/auth/actions';

import defaultEstablishement from '~/assets/images/default-establishment.png';

import './styles.css';

export default function Profile() {
  const dispatch = useDispatch();

  function handleSignOut() {
    dispatch(signOut());
  }
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
            <Link to="/establishment/picture">
              <button className="img-button" type="button">
                Adicionar foto
              </button>
            </Link>
            <span className="title">Restaurante X</span>
            <StarRating />
          </div>
        </div>

        <Link to="/establishment/account">
          <div className="option-area">
            <div className="option">
              <span className="option-text">Editar conta</span>
            </div>
          </div>
        </Link>
        <Link to="/establishment/pin">
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
        <div className="option-area" onClick={handleSignOut}>
          <div style={{ border: 0 }} className="option">
            <span
              className="option-text"
              style={{ color: '#FF3636', border: 'none' }}
            >
              Sair
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
