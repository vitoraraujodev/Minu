import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ProgressionBar from '~/components/ProgressionBar';
import Input from '~/components/Input';

import FormButtons from '~/pages/Auth/Access/components/FormButtons';

import history from '~/services/history';

import { establishmentSignInRequest } from '~/store/modules/auth/actions';

import './styles.css';

export default function SignUp() {
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.auth.loading);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [filled, setFilled] = useState(false);

  useEffect(() => {
    if (email && password.length >= 6) {
      setFilled(true);
    } else {
      setFilled(false);
    }
  }, [email, password]);

  function handleSubmit() {
    dispatch(establishmentSignInRequest(email, password));
  }

  return (
    <div id="access-page">
      <div className="container">
        <ProgressionBar step={1} maxSteps={3} />

        <div className="form-container">
          <p className="label">Insira seu E-mail</p>
          <Input
            type="email"
            value={email}
            variant="tertiary"
            onKeyDown={(e) => {
              if (e.key === ' ') e.preventDefault();
            }}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="exemplo@email.com"
          />

          <p className="input-label">Senha</p>
          <Input
            type="password"
            variant="tertiary"
            value={password}
            onKeyDown={(e) => {
              if (e.keyCode === 13 && filled) {
                handleSubmit();
              }
            }}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="********"
          />

          <FormButtons
            onBack={() => history.push('/acesso')}
            onNext={handleSubmit}
            filled={filled}
            loading={loading}
            rightButtonText="Acessar"
          />
        </div>
      </div>
    </div>
  );
}
