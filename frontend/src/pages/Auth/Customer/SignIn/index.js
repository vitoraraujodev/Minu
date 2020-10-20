import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { isValidPhoneNumber } from 'react-phone-number-input';

import ProgressionBar from '~/components/ProgressionBar';
import PhoneNumberInput from '~/components/PhoneNumberInput';

import { ReactComponent as Backward } from '~/assets/icons/backward-icon.svg';
import { ReactComponent as Foward } from '~/assets/icons/foward-icon.svg';

import history from '~/services/history';

import './styles.css';

export default function SignUp() {
  const loading = useSelector((state) => state.auth.loading);
  const [step, setStep] = useState(1);

  const [phoneNumber, setPhoneNumber] = useState('');
  const [filled, setFilled] = useState(false);

  useEffect(() => {
    if (phoneNumber && isValidPhoneNumber(phoneNumber)) {
      setFilled(true);
    } else {
      setFilled(false);
    }
  }, [phoneNumber]);

  function handleSubmit() {}

  return (
    <div id="customer-sign-in">
      <div className="form-area">
        <ProgressionBar step={step} maxSteps={3} />
        <div className="form">
          <p className="label">Insira seu número de celular</p>
          <PhoneNumberInput
            phoneNumber={phoneNumber}
            onChangePhoneNumber={setPhoneNumber}
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
