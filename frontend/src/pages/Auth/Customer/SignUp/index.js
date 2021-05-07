import React, { useState } from 'react';

import ProgressionBar from '~/components/ProgressionBar';

import PhoneNumberForm from './Forms/PhoneNumberForm';
import CodeForm from './Forms/CodeForm';
import AccountForm from './Forms/AccountForm';
import FinishPage from './Forms/FinishPage';

import api from '~/services/api';
import history from '~/services/history';

import capitalize from '~/utils/capitalize';

import './styles.css';

export default function SignUp() {
  const [step, setStep] = useState(1);

  const [phone_number, setPhoneNumber] = useState('');
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm_password, setConfirmPassword] = useState('');

  async function handleSubmit() {
    try {
      const data = {
        phone_number: `+${phone_number}`,
        name: capitalize(name),
        lastname: capitalize(lastname),
        email,
        password,
        confirm_password,
      };
      await api.post('/customers', data);
      setStep(step + 1);
    } catch (err) {
      alert(err.response.data.error);
    }
  }

  function handleNext(page) {
    if (step < 4) {
      if (page) {
        setStep(page);
      } else {
        setStep(step + 1);
      }
    } else if (step === 4) {
      handleSubmit();
    }
  }

  function handleBack(page) {
    if (step === 1) {
      history.push('/cliente/acesso');
    } else {
      setStep(page && step - 1);
    }
  }

  return (
    <div id="customer-sign-up">
      <div className="container">
        {step < 5 && <ProgressionBar step={step} maxSteps={4} />}

        {step === 1 && (
          <PhoneNumberForm
            phoneNumber={phone_number}
            onChangePhoneNumber={setPhoneNumber}
            handleBack={handleBack}
            handleNext={handleNext}
          />
        )}

        {step === 2 && (
          <CodeForm
            phoneNumber={phone_number}
            handleNext={handleNext}
            handleBack={handleBack}
          />
        )}

        {step === 4 && (
          <AccountForm
            name={name}
            onChangeName={setName}
            lastname={lastname}
            onChangeLastname={setLastname}
            email={email}
            onChangeEmail={setEmail}
            password={password}
            onChangePassword={setPassword}
            confirmPassword={confirm_password}
            onChangeConfirmPassword={setConfirmPassword}
            handleNext={handleNext}
          />
        )}

        {step === 5 && (
          <FinishPage phone_number={phone_number} password={password} />
        )}
      </div>
    </div>
  );
}
