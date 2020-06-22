import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ProgressionBar from '~/components/ProgressionBar';

import history from '~/services/history';

import { signInRequest } from '~/store/modules/auth/actions';

import './styles.css';

export default function SignUp() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit() {
    dispatch(signInRequest(email, password));
  }

  return (
    <div id="sign-in">
      <div className="form">
        <ProgressionBar step={1} />
        <form onSubmit={handleSubmit}>
          <p className="label">Insira seu E-mail</p>
          <input
            name="email"
            type="email"
            className="form-input"
            autoFocus //eslint-disable-line
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail"
          />
          <p className="input-label">Senha</p>
          <input
            name="password"
            type="password"
            className="form-input"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="********"
          />

          <div className="buttons-container">
            <button
              style={{ color: '#9C9C9C' }}
              className="button"
              type="button"
              onClick={() => history.goBack()}
            >
              Voltar
            </button>
            <button
              style={{ color: '#535BFE' }}
              className="button"
              type="submit"
            >
              {loading ? 'Carregando...' : 'Logar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
