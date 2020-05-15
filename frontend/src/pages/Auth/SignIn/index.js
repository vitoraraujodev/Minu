import React, { useState } from 'react';

import ProgressionBar from '~/components/Forms/ProgressionBar';

import history from '~/services/history';

import './styles.css';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleLogin(e) {}

  return (
    <div className="container">
      <div className="form">
        <ProgressionBar step={1} />
        <form>
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
        </form>

        <div className="buttons-container">
          <button
            style={{ color: '#9C9C9C' }}
            className="page-button"
            type="button"
            onClick={() => history.goBack()}
          >
            Voltar
          </button>
          <button
            style={{ color: '#535BFE' }}
            className="page-button"
            type="button"
            onClick={handleLogin}
          >
            Logar
          </button>
        </div>
      </div>
    </div>
  );
}
