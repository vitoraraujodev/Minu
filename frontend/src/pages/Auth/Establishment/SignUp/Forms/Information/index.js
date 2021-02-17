import React, { useState, useEffect } from 'react';

import { ReactComponent as Backward } from '~/assets/icons/backward-icon.svg';
import { ReactComponent as Foward } from '~/assets/icons/foward-icon.svg';

import api from '~/services/api';

import '../styles.css';

export default function Information({
  email,
  onChangeEmail,
  password,
  onChangePassword,
  confirmPassword,
  onChangeConfirmPassword,
  onBackPage,
  onNextPage,
}) {
  const [filled, setFilled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);

  useEffect(() => {
    if (
      email &&
      password &&
      confirmPassword &&
      !invalidEmail &&
      !invalidPassword
    ) {
      setFilled(true);
    } else {
      setFilled(false);
    }
  }, [email, password, confirmPassword, invalidEmail, invalidPassword]);

  useEffect(() => {
    if (invalidEmail) setInvalidEmail(false);
    if (invalidPassword) setInvalidPassword(false);
  }, [email, password, confirmPassword]); //eslint-disable-line

  async function handleNextPage() {
    if (password !== confirmPassword) {
      setInvalidPassword(true);
      alert('Senhas não combinam. Verifique e tente novamente.');
    } else {
      if (loading) return;

      setLoading(true);

      const data = {
        email,
      };

      try {
        await api.post('email-check', data);

        onNextPage();
      } catch (err) {
        setInvalidEmail(true);
        if (err.response) {
          alert(err.response.data.error);
        }
      }
      setLoading(false);
    }
  }

  return (
    <>
      <form id="form">
        <p className="auth-title">Entre para a Minu!</p>
        <p className="input-label">Insira seu e-mail</p>
        <input
          name="email"
          type="email"
          className="form-input"
          value={email}
          style={invalidEmail ? { border: '2px solid #FF3636' } : null}
          autoFocus //eslint-disable-line
          onKeyDown={(e) => {
            if (e.key === ' ') e.preventDefault();
          }}
          onChange={(e) => onChangeEmail(e.target.value)}
          placeholder="exemplo@email.com"
        />
        <p className="input-label">Senha</p>
        <input
          name="password"
          type="password"
          className="form-input"
          value={password}
          onChange={(e) => onChangePassword(e.target.value)}
          placeholder="********"
        />
        <p className="input-label">Confirme sua senha</p>
        <input
          name="confirmPassword"
          type="password"
          style={invalidPassword ? { border: '2px solid #FF3636' } : null}
          value={confirmPassword}
          className="form-input"
          onKeyDown={(e) => {
            if (e.keyCode === 13 && filled) {
              handleNextPage();
            }
          }}
          onChange={(e) => onChangeConfirmPassword(e.target.value)}
          placeholder="********"
        />
      </form>

      <div className="buttons-container">
        <button
          style={{ color: '#606060' }}
          className="page-button"
          type="button"
          onClick={onBackPage}
        >
          <Backward style={{ height: 16, marginRight: 4 }} fill="#606060" />
          Voltar
        </button>
        <button
          style={filled ? { color: '#535BFE' } : { color: '#acacac' }}
          className="page-button"
          type="button"
          disabled={!filled}
          onClick={handleNextPage}
        >
          {loading ? (
            'Carregando...'
          ) : (
            <>
              Avançar
              <Foward
                style={{ height: 16, marginLeft: 4 }}
                fill={filled ? '#535BFE' : '#acacac'}
              />
            </>
          )}
        </button>
      </div>
    </>
  );
}
