import React, { useState, useEffect } from 'react';
import { formatPhoneNumberIntl } from 'react-phone-number-input';

import { ReactComponent as Backward } from '~/assets/icons/backward-icon.svg';
import { ReactComponent as Foward } from '~/assets/icons/foward-icon.svg';

import './styles.css';

export default function CodeForm({ phoneNumber, handleNext, handleBack }) {
  const [filled, setFilled] = useState(false);
  const [code, setCode] = useState('');
  const [invalid, setInvalid] = useState(false);

  useEffect(() => {
    if (code.length >= 5) {
      setFilled(true);
    } else {
      setFilled(false);
    }
  }, [code]);

  function checkCode() {
    if (code === '12345') {
      handleNext(4);
    } else {
      setInvalid(true);
    }
  }

  return (
    <div className="form-container">
      <div className="code-form">
        <p className="label">
          Insira o código enviado para{' '}
          {formatPhoneNumberIntl(`+${phoneNumber}`)}
        </p>

        {invalid && <p className="invalid-text">Código inválido</p>}
        <input
          className="input"
          style={invalid ? { border: '1px solid #fe5f53' } : null}
          value={code}
          inputMode="numeric"
          autoFocus //eslint-disable-line
          onKeyDown={(e) => {
            if (e.key === ' ') e.preventDefault();
            if (e.keyCode === 13) handleNext(4);
          }}
          onChange={(e) => setCode(e.target.value)}
          placeholder="99999"
        />
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
            if (filled) checkCode();
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
