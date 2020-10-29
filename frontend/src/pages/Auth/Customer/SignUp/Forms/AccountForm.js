import React, { useState, useEffect } from 'react';

import { ReactComponent as Backward } from '~/assets/icons/backward-icon.svg';

import history from '~/services/history';

import './styles.css';

export default function AccountForm({
  name,
  onChangeName,
  lastname,
  onChangeLastname,
  email,
  onChangeEmail,
  password,
  onChangePassword,
  confirmPassword,
  onChangeConfirmPassword,
  handleNext,
}) {
  const [filled, setFilled] = useState(false);
  const [invalid, setInvalid] = useState(false);

  useEffect(() => {
    if (
      name &&
      lastname &&
      email &&
      password.length >= 6 &&
      confirmPassword.length >= 6
    ) {
      setFilled(true);
    } else {
      setFilled(false);
    }
  }, [name, lastname, email, password, confirmPassword]);

  useEffect(() => {
    if (invalid) setInvalid(false);
  }, [password, confirmPassword]); //eslint-disable-line

  function handleSubmit() {
    if (password !== confirmPassword) {
      setInvalid(true);
    } else {
      handleNext();
    }
  }

  return (
    <div className="form-container">
      <p className="label">Para finalizar...</p>

      <p className="input-label">Insira seu nome</p>
      <input
        value={name}
        className="input"
        onKeyDown={(e) => {
          if (e.key === ' ') e.preventDefault();
        }}
        onChange={(e) => onChangeName(e.target.value)}
        placeholder="Nome"
      />

      <input
        value={lastname}
        className="input"
        onKeyDown={(e) => {
          if (e.key === ' ') e.preventDefault();
        }}
        onChange={(e) => onChangeLastname(e.target.value)}
        placeholder="Sobrenome"
      />

      <p className="input-label">Insira seu e-mail</p>
      <input
        type="email"
        className="input"
        value={email}
        onKeyDown={(e) => {
          if (e.key === ' ') e.preventDefault();
        }}
        onChange={(e) => onChangeEmail(e.target.value)}
        placeholder="E-mail"
      />

      <p className="input-label">Senha</p>
      <input
        type="password"
        className="input"
        value={password}
        onChange={(e) => onChangePassword(e.target.value)}
        placeholder="********"
      />
      <p className="input-label">Confirme sua senha</p>
      <input
        type="password"
        className="input"
        style={invalid ? { border: '1px solid #fe5f53' } : null}
        value={confirmPassword}
        onKeyDown={(e) => {
          if (e.keyCode === 13 && filled) handleSubmit();
        }}
        onChange={(e) => onChangeConfirmPassword(e.target.value)}
        placeholder="********"
      />

      <p className="terms-text">
        Ao clicar em concluir, você aceita nossos{' '}
        <span style={{ color: '#535BFE', textDecoration: 'underline' }}>
          termos de serviço
        </span>
      </p>

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
          className={filled ? 'submit-button' : 'submit-button-disabled'}
          type="button"
          onClick={() => {
            if (filled) handleSubmit();
          }}
        >
          Concluir
        </button>
      </div>
    </div>
  );
}
