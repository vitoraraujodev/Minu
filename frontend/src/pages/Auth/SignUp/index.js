import React, { useState } from 'react';

import './styles.css';

import ProgressionBar from '~/components/Forms/ProgressionBar';
import NameForm from '~/components/Forms/Name';
import InformationForm from '~/components/Forms/Information';
import AddressForm from '~/components/Forms/Address';
import AdmPassForm from '~/components/Forms/AdmPass';
import EndForm from '~/components/Forms/End';

import history from '~/services/history';

export default function SignUp() {
  const [step, setStep] = useState(1);

  const [establishmentName, setEstablishmentName] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [managerName, setManagerName] = useState('');
  const [managerLastName, setManagerLastName] = useState('');

  const [cep, setCep] = useState('');
  const [addressNumber, setAddressNumber] = useState('');
  const [complement, setComplement] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [adminPassword, setAdminPassword] = useState('');

  function handleBack() {
    if (step > 1) {
      setStep(step - 1);
    } else {
      history.push('/');
    }
  }

  function handleNext() {
    if (step < 5) {
      setStep(step + 1);
    }
  }

  return (
    <div className="container">
      <div style={step === 5 ? { margin: 0 } : null} className="form">
        {step < 5 ? <ProgressionBar step={step} /> : null}

        {step === 1 ? (
          <InformationForm
            email={email}
            onChangeEmail={(info) => setEmail(info)}
            password={password}
            onChangePassword={(info) => setPassword(info)}
            confirmPassword={confirmPassword}
            onChangeConfirmPassword={(info) => setConfirmPassword(info)}
          />
        ) : null}

        {step === 2 ? (
          <NameForm
            establishmentName={establishmentName}
            onChangeEstablishmentName={(name) => setEstablishmentName(name)}
            cnpj={cnpj}
            onChangeCnpj={(c) => setCnpj(c)}
            managerName={managerName}
            onChangeManagerName={(name) => setManagerName(name)}
            managerLastName={managerLastName}
            onChangeManagerLastName={(name) => setManagerLastName(name)}
          />
        ) : null}

        {step === 3 ? (
          <AddressForm
            cep={cep}
            onChangeCep={(address) => setCep(address)}
            addressNumber={addressNumber}
            onChangeAddressNumber={(address) => setAddressNumber(address)}
            complement={complement}
            onChangeComplement={(address) => setComplement(address)}
            street={street}
            onChangeStreet={(address) => setStreet(address)}
            state={state}
            onChangeState={(address) => setState(address)}
            city={city}
            onChangeCity={(address) => setCity(address)}
          />
        ) : null}

        {step === 4 ? (
          <AdmPassForm
            adminPassword={adminPassword}
            onChangeAdminPassword={(pass) => setAdminPassword(pass)}
          />
        ) : null}

        {step === 5 ? <EndForm /> : null}

        {step < 5 ? (
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
