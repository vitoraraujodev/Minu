import React, { useState, useEffect } from 'react';

import Input from '~/components/Input';

import FormButtons from '~/pages/Auth/Access/components/FormButtons';

import api from '~/services/api';

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
  }, [email, password, confirmPassword]);

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
        if (err.response.data.error) {
          alert(err.response.data.error);
        } else {
          alert(
            'Não foi possível realizar a verificação. Verifique sua conexão e tente novamente'
          );
        }
      }
      setLoading(false);
    }
  }

  return (
    <div className="form-container">
      <p className="auth-title">Entre para a Minu!</p>

      <p className="input-label">Insira seu e-mail</p>
      <Input
        type="email"
        value={email}
        variant="tertiary"
        style={invalidEmail ? { border: '2px solid #FF3636' } : null}
        onKeyDown={(e) => {
          if (e.key === ' ') e.preventDefault();
        }}
        onChange={(e) => onChangeEmail(e.target.value)}
        placeholder="exemplo@email.com"
      />

      <p className="input-label">Senha</p>
      <Input
        type="password"
        variant="tertiary"
        value={password}
        onChange={(e) => onChangePassword(e.target.value)}
        placeholder="********"
      />

      <p className="input-label">Confirme sua senha</p>
      <Input
        type="password"
        style={invalidPassword ? { border: '2px solid #FF3636' } : null}
        value={confirmPassword}
        variant="tertiary"
        onKeyDown={(e) => {
          if (e.keyCode === 13 && filled) {
            handleNextPage();
          }
        }}
        onChange={(e) => onChangeConfirmPassword(e.target.value)}
        placeholder="********"
      />

      <FormButtons
        onBack={onBackPage}
        onNext={handleNextPage}
        filled={filled}
        loading={loading}
      />
    </div>
  );
}
