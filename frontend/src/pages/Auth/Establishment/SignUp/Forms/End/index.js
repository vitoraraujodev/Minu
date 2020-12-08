import React from 'react';
import { useDispatch } from 'react-redux';

import { establishmentSignInRequest } from '~/store/modules/auth/actions';

import './styles.css';

export default function End({ email, password }) {
  const dispatch = useDispatch();

  function handleLogin(route) {
    dispatch(establishmentSignInRequest(email, password, route));
  }

  return (
    <>
      <div className="circle-container">
        <div className="circle" />
      </div>
      <div style={{ textAlign: 'center', zIndex: 5 }}>
        <h1 className="done-text">
          Cadastro
          <br />
          Concluído!
        </h1>
        <button
          className="menu-button"
          onClick={() => {
            handleLogin('/estabelecimento/inventario');
          }}
          type="button"
        >
          Faça seu cardápio!
        </button>
        <button
          className="later-button"
          onClick={() => {
            handleLogin('/estabelecimento');
          }}
          type="button"
        >
          Deixar para depois
        </button>
      </div>
    </>
  );
}
