import React, { useState, useEffect } from 'react';
import { isValidPhoneNumber } from 'react-phone-number-input';

import PhoneNumberInput from '~/components/PhoneNumberInput';

import { ReactComponent as Backward } from '~/assets/icons/backward-icon.svg';

import history from '~/services/history';

import './styles.css';

export default function AccountForm({
  phoneNumber,
  onChangePhoneNumber,
  password,
  onChangePassword,
  loading,
  handleSubmit,
}) {
  const [filled, setFilled] = useState(false);

  useEffect(() => {
    if (isValidPhoneNumber(`+${phoneNumber}`) && password.length >= 6) {
      setFilled(true);
    } else {
      setFilled(false);
    }
  }, [phoneNumber, password]);

  return (
    <div className="form-container">
      <p className="label">Insira seu número de celular</p>

      <PhoneNumberInput
        phoneNumber={phoneNumber}
        onChangePhoneNumber={onChangePhoneNumber}
      />

      <p className="input-label" style={{ marginTop: 16 }}>
        Senha
      </p>
      <input
        type="password"
        className="input"
        value={password}
        onKeyDown={(e) => {
          if (e.keyCode === 13 && filled) handleSubmit();
        }}
        onChange={(e) => onChangePassword(e.target.value)}
        placeholder="********"
      />

      <div className="social-media" onClick={() => {}}>
        <p className="register-link">
          <span className="register-or">ou</span>
          Acesse com uma rede social
        </p>
      </div>

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
          {loading ? 'Carregando...' : 'Acessar'}
        </button>
      </div>
    </div>
  );
}
