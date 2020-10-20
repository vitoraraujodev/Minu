import React, { useState } from 'react';

import './styles.css';

import ProgressionBar from '~/components/ProgressionBar';

import PhoneNumberForm from './Forms/PhoneNumberForm';

import { ReactComponent as Backward } from '~/assets/icons/backward-icon.svg';
import { ReactComponent as Foward } from '~/assets/icons/foward-icon.svg';

import history from '~/services/history';

export default function SignUp() {
  const [step, setStep] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);

  return (
    <div id="customer-sign-up">
      <div className="container">
        <ProgressionBar step={step} maxSteps={3} />
      </div>
    </div>
  );
}
