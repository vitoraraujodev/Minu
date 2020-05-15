import React from 'react';

import '../styles.css';

export default function Information({
  email,
  onChangeEmail,
  password,
  onChangePassword,
  confirmPassword,
  onChangeConfirmPassword,
}) {
  return (
    <form>
      <p className="auth-title">Entre para a Minu</p>
      <input
        name="email"
        type="email"
        className="form-input"
        value={email}
        autoFocus //eslint-disable-line
        onChange={(e) => onChangeEmail(e.target.value)}
        placeholder="E-mail"
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
        value={confirmPassword}
        className="form-input"
        onChange={(e) => onChangeConfirmPassword(e.target.value)}
        placeholder="********"
      />
    </form>
  );
}
