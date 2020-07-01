import React, { useState, useEffect } from 'react';

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

  useEffect(() => {
    if (email && password && password === confirmPassword) {
      setFilled(true);
    } else {
      setFilled(false);
    }
  }, [email, password, confirmPassword]);

  return (
    <>
      <form id="form">
        <p className="auth-title">Entre para a Minu</p>
        <p className="input-label">Insira seu e-mail</p>
        <input
          name="email"
          type="email"
          className="form-input"
          value={email}
        autoFocus //eslint-disable-line
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
          style={
            confirmPassword && password !== confirmPassword
              ? { border: '2px solid #FF3636' }
              : null
          }
          value={confirmPassword}
          className="form-input"
          onKeyDown={(e) => {
            if (e.keyCode === 13 && filled) {
              onNextPage();
            }
          }}
          onChange={(e) => onChangeConfirmPassword(e.target.value)}
          placeholder="********"
        />
      </form>

      <div className="buttons-container">
        <button
          style={{ color: '#9C9C9C' }}
          className="page-button"
          type="button"
          onClick={onBackPage}
        >
          Voltar
        </button>
        <button
          style={filled ? { color: '#535BFE' } : { color: '#9C9C9C' }}
          className="page-button"
          type="button"
          disabled={!filled}
          onClick={onNextPage}
        >
          Avançar
        </button>
      </div>
    </>
  );
}
