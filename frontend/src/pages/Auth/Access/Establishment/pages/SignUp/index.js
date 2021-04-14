import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ProgressionBar from '~/components/ProgressionBar';
import SuccessCover from '~/components/SuccessCover';

import NameForm from './components/Forms/Name';
import InformationForm from './components/Forms/Information';
import AddressForm from './components/Forms/Address';
import AdmPinForm from './components/Forms/AdmPin';

import { establishmentSignUpRequest } from '~/store/modules/auth/actions';

import history from '~/services/history';

import capitalize from '~/util/capitalize';

import '../../../styles.css';

export default function SignUp() {
  const dispatch = useDispatch();

  const { loading, token } = useSelector((state) => state.auth);

  const [step, setStep] = useState(1);

  const [establishmentName, setEstablishmentName] = useState('');
  const [managerName, setManagerName] = useState('');
  const [managerLastName, setManagerLastName] = useState('');

  const [zip, setZip] = useState('');
  const [number, setNumber] = useState('');
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

    const data = {
      establishment_name: capitalize(establishmentName),
      manager_name: capitalize(managerName),
      manager_lastname: capitalize(managerLastName),
      email,
      password,
      confirm_password: confirmPassword,
      admin_pin: adminPin,
      address: {
        zip,
        number,
        complement,
        street: capitalize(street),
        city: capitalize(city),
        state: capitalize(state),
      },
    };

    dispatch(establishmentSignUpRequest(data));
  }

  useEffect(() => {
    if (token) setStep(5);
  }, [token]);

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
      {step === 5 && (
        <SuccessCover
          successText="Cadastro Concluído!"
          successButtonText="Customizar cardápio"
          onClick={() => history.push('/inventario')}
          onClose={() => history.push('/estabelecimento')}
        />
      )}

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
            zip={zip}
            onChangeZip={(address) => setZip(address)}
            number={number}
            onChangeNumber={(address) => setNumber(address)}
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
      </div>
    </div>
  );
}
