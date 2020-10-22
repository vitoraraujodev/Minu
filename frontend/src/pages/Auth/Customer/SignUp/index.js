import React, { useState } from 'react';

import './styles.css';

import ProgressionBar from '~/components/ProgressionBar';

import PhoneNumberForm from './Forms/PhoneNumberForm';
import CodeForm from './Forms/CodeForm';
import AccountForm from './Forms/AccountForm';

export default function SignUp() {
  const [step, setStep] = useState(1);

  const [phoneNumber, setPhoneNumber] = useState('');
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm_password, setConfirmPassword] = useState('');

  function handleSubmit() {}

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
    if (step > 1) {
      setStep(page && step - 1);
    }
  }

  return (
    <div id="customer-sign-up">
      <div className="container">
        <ProgressionBar step={step} maxSteps={4} />

        {step === 1 && (
          <PhoneNumberForm
            phoneNumber={phoneNumber}
            onChangePhoneNumber={setPhoneNumber}
            handleNext={handleNext}
          />
        )}

        {step === 2 && (
          <CodeForm
            phoneNumber={phoneNumber}
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
      </div>
    </div>
  );
}
