import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Header from '~/components/Header';

import logo from '~/assets/icons/simple-logo.svg';

import { signOutRequest } from '~/store/modules/auth/actions';

import defaultPicture from '~/assets/images/default-picture.png';

import './styles.css';

export default function Profile() {
  const dispatch = useDispatch();
  const customer = useSelector((state) => state.customer.customer);

  function handleSignOut() {
    dispatch(signOutRequest());
  }

  return (
    <div id="customer-profile">
      <Header />
      <div className="container">
        <div className="info-container">
          <div className="logo-container">
            <img className="logo" src={logo} alt="minu" />
          </div>

          <div className="img-container">
            <img
              src={defaultPicture}
              onError={(e) => {
                e.target.src = defaultPicture;
              }}
              className="costumer-img"
              alt=""
            />
          </div>
          <div className="info">
            <Link to="/">
              <button className="img-button" type="button">
                Alterar foto
              </button>
            </Link>
            <div className="name-area">
              <span className="name">{customer.name || 'Cliente'}</span>
            </div>
          </div>
        </div>

        <Link to="/estabelecimento/conta">
          <div className="option-area">
            <div className="option">
              <span className="option-text">Editar conta</span>
            </div>
          </div>
        </Link>
        <Link to="/estabelecimento/pin">
          <div className="option-area">
            <div className="option">
              <span className="option-text">Redefinir PIN</span>
            </div>
          </div>
        </Link>
        <Link to="/estabelecimento/endereco">
          <div className="option-area">
            <div className="option">
              <span className="option-text">Editar endereço</span>
            </div>
          </div>
        </Link>
        <div className="option-area" onClick={() => handleSignOut()}>
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
