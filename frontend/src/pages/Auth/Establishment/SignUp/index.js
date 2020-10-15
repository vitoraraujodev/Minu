import React, { useState } from 'react';

import './styles.css';

import ProgressionBar from '~/components/ProgressionBar';
import NameForm from './Forms/Name';
import InformationForm from './Forms/Information';
import AddressForm from './Forms/Address';
import AdmPinForm from './Forms/AdmPin';
import EndForm from './Forms/End';

import history from '~/services/history';
import api from '~/services/api';

export default function SignUp() {
  const [step, setStep] = useState(1);

  const [establishmentName, setEstablishmentName] = useState('');
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

  const [adminPin, setAdminPin] = useState('');

  async function handleSubmit() {
    const data = {
      establishment_name: establishmentName,
      manager_name: managerName,
      manager_lastname: managerLastName,
      cep,
      address_number: addressNumber,
      complement,
      street,
      city,
      state,
      email,
      password,
      confirm_password: confirmPassword,
      admin_pin: adminPin,
    };

    try {
      await api.post('establishments', data);
      setStep(step + 1);
    } catch (err) {
      alert(err.response.data.error);
    }
  }

  function handleNext() {
    if (step < 5) {
      if (step === 4) {
        handleSubmit();
      } else {
        setStep(step + 1);
      }
    }
  }

  function handleBack() {
    if (step > 1) {
      setStep(step - 1);
    } else {
      history.goBack();
    }
  }

  return (
    <div id="sign-up">
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
            onNextPage={() => handleNext()}
            onBackPage={() => handleBack()}
          />
        ) : null}

        {step === 2 ? (
          <NameForm
            establishmentName={establishmentName}
            onChangeEstablishmentName={(name) => setEstablishmentName(name)}
            managerName={managerName}
            onChangeManagerName={(name) => setManagerName(name)}
            managerLastName={managerLastName}
            onChangeManagerLastName={(name) => setManagerLastName(name)}
            onNextPage={() => handleNext()}
            onBackPage={() => handleBack()}
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
            onNextPage={() => handleNext()}
            onBackPage={() => handleBack()}
          />
        ) : null}

        {step === 4 ? (
          <AdmPinForm
            adminPin={adminPin}
            onChangeAdminPin={(pass) => setAdminPin(pass)}
            onNextPage={() => handleNext()}
            onBackPage={() => handleBack()}
          />
        ) : null}

        {step === 5 ? <EndForm email={email} password={password} /> : null}
      </div>
    </div>
  );
}
