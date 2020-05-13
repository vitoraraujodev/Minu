import React, { useState } from 'react';

import './styles.css';

import ProgressionBar from '~/components/Forms/ProgressionBar';
import NameForm from '~/components/Forms/Name';
import InformationForm from '~/components/Forms/Information';
import AddressForm from '~/components/Forms/Address';
import EndForm from '~/components/Forms/End';

import history from '~/services/history';

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
    } else {
      history.push('/');
    }
  }

  function handleNext() {
    if (step < 4) {
      setStep(step + 1);
    }
  }

  return (
    <div className="container">
      <div style={step === 4 ? { margin: 0 } : null} className="form">
        {step < 4 ? <ProgressionBar step={step} /> : null}

        {step === 1 ? (
          <InformationForm
            onChangeEmail={(info) => setEmail(info)}
            onChangePassword={(info) => setPassword(info)}
            onChangeConfirmPassword={(info) => setConfirmPassword(info)}
          />
        ) : null}

        {step === 2 ? (
          <NameForm
            onChangeEstablishmentName={(name) => setEstablishmentName(name)}
            onChangeCnpj={(c) => setCnpj(c)}
            onChangeMangerName={(name) => setManagerName(name)}
            onChangeManagerLastName={(name) => setManagerLastName(name)}
          />
        ) : null}

        {step === 3 ? (
          <AddressForm
            onChangeCep={(address) => setCep(address)}
            onChangeAddressNumber={(address) => setAddressNumber(address)}
            onChangeComplement={(address) => setComplement(address)}
            onChangeStreet={(address) => setStreet(address)}
            onChangeState={(address) => setState(address)}
            onChangeCity={(address) => setCity(address)}
          />
        ) : null}

        {step === 4 ? <EndForm /> : null}

        {step < 4 ? (
          <div className="buttons-container">
            <button
              style={{ color: '#9C9C9C' }}
              className="page-button"
              type="button"
              onClick={handleBack}
            >
              Voltar
            </button>
            <button
              style={{ color: '#535BFE' }}
              className="page-button"
              type="button"
              onClick={handleNext}
            >
              Avançar
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
