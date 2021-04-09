import React, { useState } from 'react';

import ProgressionBar from '~/components/ProgressionBar';

import NameForm from './components/Forms/Name';
import InformationForm from './components/Forms/Information';
import AddressForm from './components/Forms/Address';
import AdmPinForm from './components/Forms/AdmPin';
import EndForm from './components/Forms/End';

import history from '~/services/history';
import api from '~/services/api';

import capitalize from '~/util/capitalize';

import '../../../styles.css';

export default function SignUp() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

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
    if (loading) return;

    setLoading(true);

    const data = {
      establishment_name: capitalize(establishmentName),
      manager_name: capitalize(managerName),
      manager_lastname: capitalize(managerLastName),
      cep,
      address_number: addressNumber,
      complement,
      street: capitalize(street),
      city: capitalize(city),
      state: capitalize(state),
      email,
      password,
      confirm_password: confirmPassword,
      admin_pin: adminPin,
    };

    try {
      await api.post('establishments', data);
      setStep(step + 1);
    } catch (err) {
      if (err.response.data) {
        alert(err.response.data.error);
      } else {
        alert(
          'Houve um erro ao registrar seu restaurante. Tente novamente mais tarde.'
        );
      }
    }
    setLoading(false);
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
      history.push('/acesso');
    }
  }

  return (
    <div id="access-page">
      <div className="container">
        {step < 5 && <ProgressionBar step={step} maxSteps={4} />}

        {step === 1 && (
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
        )}

        {step === 2 && (
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
        )}

        {step === 3 && (
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
        )}

        {step === 4 && (
          <AdmPinForm
            adminPin={adminPin}
            onChangeAdminPin={(pass) => setAdminPin(pass)}
            loading={loading}
            onNextPage={() => handleNext()}
            onBackPage={() => handleBack()}
          />
        )}

        {step === 5 ? <EndForm email={email} password={password} /> : null}
      </div>
    </div>
  );
}
