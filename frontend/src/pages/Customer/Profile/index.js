import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import NavTab from '~/components/NavTabs/Customer';

import { ReactComponent as Symbols } from '~/assets/icons/symbols.svg';

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
      <NavTab />
      <div className="container">
        <div className="info-container">
          <div className="logo-container">
            <img className="logo" src={logo} alt="minu" />
          </div>

          <div className="img-background">
            <div className="symbols-container">
              <div className="symbol1">
                <Symbols height={96} />
              </div>
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
          </div>
          <div className="info">
            <Link to="/cliente">
              <button className="img-button" type="button">
                Alterar foto
              </button>
            </Link>
            <div className="name-area">
              <span className="name">
                {`${customer.name} ${customer.lastname}` || 'Cliente'}
              </span>
            </div>
          </div>
        </div>

        <Link to="/cliente/perfil">
          <div className="option-area">
            <div className="option">
              <span className="option-text">Editar conta</span>
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
