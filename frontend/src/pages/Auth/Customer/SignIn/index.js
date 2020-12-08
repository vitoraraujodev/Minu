import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './styles.css';

import AccountForm from './Forms/AccountForm';

import ProgressionBar from '~/components/ProgressionBar';

import { customerSignInRequest } from '~/store/modules/auth/actions';

export default function SignIn() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);

  const step = 1;

  const [phone_number, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit() {
    dispatch(
      customerSignInRequest(`+${phone_number}`, password, '/cliente/cardapio')
    );
  }

  return (
    <div id="customer-sign-up">
      <div className="container">
        <ProgressionBar step={step} maxSteps={3} />

        {step === 1 && (
          <AccountForm
            phoneNumber={phone_number}
            onChangePhoneNumber={setPhoneNumber}
            password={password}
            onChangePassword={setPassword}
            loading={loading}
            handleSubmit={handleSubmit}
          />
        )}
      </div>
    </div>
  );
}
