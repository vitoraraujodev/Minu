import React, { useState, useEffect } from 'react';
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
  const [filled, setFilled] = useState(false);

  useEffect(() => {
    if (email && password.length >= 6) {
      setFilled(true);
    } else {
      setFilled(false);
    }
  }, [email, password]);

  function handleSubmit() {
    dispatch(signInRequest(email, password));
  }

  return (
    <div id="sign-in">
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
            onKeyDown={(e) => {
              if (e.keyCode === 13) {
                handleSubmit();
              }
            }}
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
              style={filled ? { color: '#535BFE' } : { color: '#9C9C9C' }}
              className="button"
              type="button"
              onClick={filled ? handleSubmit : null}
            >
              {loading ? 'Carregando...' : 'Acessar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
