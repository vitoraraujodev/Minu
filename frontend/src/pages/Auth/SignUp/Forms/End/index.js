import React from 'react';
import { useDispatch } from 'react-redux';

import { signInRequest } from '~/store/modules/auth/actions';

import './styles.css';

export default function End({ email, password }) {
  const dispatch = useDispatch();

  function handleLogin(route) {
    dispatch(signInRequest(email, password, route));
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
            handleLogin('/menus');
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
