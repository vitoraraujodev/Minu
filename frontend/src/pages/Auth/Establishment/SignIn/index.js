import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ProgressionBar from '~/components/ProgressionBar';

import { ReactComponent as Backward } from '~/assets/icons/backward-icon.svg';
import { ReactComponent as Foward } from '~/assets/icons/foward-icon.svg';

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
    dispatch(signInRequest(email, password, '/estabelecimento'));
  }

  return (
    <div id="establishment-sign-in">
      <div className="form-area">
        <ProgressionBar step={1} />
        <div className="form">
          <p className="label">Insira seu E-mail</p>
          <input
            name="email"
            type="email"
            className="form-input"
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
              style={{ color: '#606060' }}
              className="button"
              type="button"
              onClick={() => history.goBack()}
            >
              <Backward style={{ height: 16, marginRight: 4 }} fill="#606060" />
              Voltar
            </button>
            <button
              style={filled ? { color: '#535BFE' } : { color: '#acacac' }}
              className="button"
              type="button"
              onClick={filled ? handleSubmit : null}
            >
              {loading ? 'Carregando...' : 'Acessar'}
              <Foward
                style={{ height: 16, marginLeft: 4 }}
                fill={filled ? '#535BFE' : '#acacac'}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
