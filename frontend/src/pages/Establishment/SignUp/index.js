import React, { useState } from 'react';

import './styles.css';

import ProgressionBar from '~/components/ProgressionBar';
import NameForm from '~/components/Forms/Name';
import InformationForm from '~/components/Forms/Information';
import AddressForm from '~/components/Forms/Address';

export default function SignUp() {
  const [step, setStep] = useState(1);

  const [establishmentName, setEstablishmentName] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [managerName, setManagerName] = useState('');
  const [managerLastName, setManagerLastName] = useState('');

  const [cep, setCep] = useState('');
  const [addressNumber, setAddressNumber] = useState(0);
  const [complement, setComplement] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  function handleBack() {
    if (step > 1) {
      setStep(step - 1);
    }
  }

  function handleNext() {
    if (step < 3) {
      setStep(step + 1);
    }
  }

  return (
    <div className="background">
      <div className="container">
        <div className="formContainer">
          <ProgressionBar step={step} />
          <div className="form">
            {step === 1 ? (
              <NameForm
                onChangeEstablishmentName={(name) => setEstablishmentName(name)}
                onChangeCnpj={(c) => setCnpj(c)}
                onChangeMangerName={(name) => setManagerName(name)}
                onChangeManagerLastName={(name) => setManagerLastName(name)}
              />
            ) : null}
            {step === 2 ? <AddressForm /> : null}
            {step === 3 ? <InformationForm /> : null}
          </div>
        </div>

        <div className="buttonArea">
          <div className="buttonContainer">
            <button type="button" onClick={handleBack}>
              <p className="button-text">Voltar</p>
            </button>
            <button type="button" onClick={handleNext}>
              <p className="button-text">Avançar</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
