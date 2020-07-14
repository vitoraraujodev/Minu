import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { signInRequest } from '~/store/modules/auth/actions';

import './styles.css';

export default function End({ email, password }) {
  const dispatch = useDispatch();

  function handleLogin() {
    console.tron.log(email, password);
    dispatch(signInRequest(email, password));
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
        <Link to="/menus">
          <button className="menu-button" onClick={handleLogin} type="button">
            Faça seu cardápio!
          </button>
        </Link>
        <Link to="/establishment">
          <button className="later-button" onClick={handleLogin} type="button">
            Deixar para depois
          </button>
        </Link>
      </div>
    </>
  );
}
