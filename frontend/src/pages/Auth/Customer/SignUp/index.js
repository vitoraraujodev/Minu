import React, { useState } from 'react';

import './styles.css';

import ProgressionBar from '~/components/ProgressionBar';

import PhoneNumberForm from './Forms/PhoneNumberForm';
import CodeForm from './Forms/CodeForm';

export default function SignUp() {
  const [step, setStep] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState('');

  function handleNext(page) {
    if (step < 4) {
      setStep(page && step + 1);
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
      </div>
    </div>
  );
}
