import React, { useState, useEffect } from 'react';
import { isValidPhoneNumber } from 'react-phone-number-input';

import PhoneNumberInput from '~/components/PhoneNumberInput';

import { ReactComponent as Backward } from '~/assets/icons/backward-icon.svg';
import { ReactComponent as Foward } from '~/assets/icons/foward-icon.svg';

import './styles.css';

export default function PhoneNumberForm({
  phoneNumber,
  onChangePhoneNumber,
  handleBack,
  handleNext,
  handleSocialMedia,
}) {
  const [filled, setFilled] = useState(false);

  useEffect(() => {
    if (phoneNumber && isValidPhoneNumber(`+${phoneNumber}`)) {
      setFilled(true);
    } else {
      setFilled(false);
    }
  }, [phoneNumber]);

  return (
    <div className="form-container">
      <p className="label">Insira seu número de celular</p>

      <PhoneNumberInput
        phoneNumber={phoneNumber}
        focus={false}
        onChangePhoneNumber={onChangePhoneNumber}
        onSubmit={() => {
          if (filled) handleNext(2);
        }}
      />

      <p className="remember-text">
        Não se esqueça de conferir se o número está correto
      </p>

      <div className="social-media" onClick={handleSocialMedia}>
        <p className="register-link">
          <span className="register-or">ou</span>
          Cadastre-se com uma rede social
        </p>
      </div>

      <div className="buttons-container">
        <button
          style={{ color: '#606060' }}
          className="button"
          type="button"
          onClick={handleBack}
        >
          <Backward style={{ height: 16, marginRight: 4 }} fill="#606060" />
          Voltar
        </button>
        <button
          className="button"
          type="button"
          disabled={!filled}
          onClick={() => {
            if (filled) handleNext(2);
          }}
        >
          Avançar
          <Foward
            style={{ height: 16, marginLeft: 4 }}
            fill={filled ? '#535BFE' : '#acacac'}
          />
        </button>
      </div>
    </div>
  );
}
