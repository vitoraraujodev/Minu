import React from 'react';
import { useDispatch } from 'react-redux';

import { ReactComponent as Close } from '~/assets/icons/close-icon2.svg';
import { ReactComponent as Symbols } from '~/assets/icons/symbols.svg';

import { signInRequest } from '~/store/modules/auth/actions';

import './styles.css';

export default function End({ phone_number, password }) {
  const dispatch = useDispatch();

  function handleLogin(route) {
    dispatch(signInRequest(phone_number, password, 'customers', route));
  }

  return (
    <>
      <div className="finish-background" />

      <div className="finish-page">
        <div>
          <button
            type="button"
            onClick={() => handleLogin('/')}
            className="close-button"
          >
            <Close size={16} />
            <b style={{ marginLeft: 4 }}>Fechar</b>
          </button>
        </div>

        <div className="finish-content">
          <div className="symbols-container1">
            <Symbols height={80} />
          </div>

          <h1 className="finish-text">Cadastro concluído!</h1>

          <div className="symbols-container2">
            <Symbols height={80} />
          </div>
        </div>

        <button
          type="button"
          onClick={() => handleLogin('/')}
          className="session-button"
        >
          Iniciar sessão em restaurante
        </button>
      </div>
    </>
  );
}
