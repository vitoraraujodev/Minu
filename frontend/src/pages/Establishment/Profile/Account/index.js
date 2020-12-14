import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Header from '~/components/NavTabs/Establishment';
import PinModal from '~/components/PinModal';

import { ReactComponent as Backward } from '~/assets/icons/backward-icon.svg';
import { ReactComponent as Lock } from '~/assets/icons/lock-icon.svg';

import { updateEstablishmentRequest } from '~/store/modules/establishment/actions';

import history from '~/services/history';

import './styles.css';

export default function Account() {
  const establishment = useSelector(
    (state) => state.establishment.establishment
  );
  const dispatch = useDispatch();

  const [windowWidth, setWindowWidth] = useState(768);
  const [disabled, setDisabled] = useState(false); // Colocar como true
  const [filled, setFilled] = useState(true);
  const [pinModalVisible, setPinModalVisible] = useState(false);

  const [establishmentName, setEstablishmentName] = useState(
    establishment.establishment_name || ''
  );
  const [managerName, setManagerName] = useState(
    establishment.manager_name || ''
  );
  const [managerLastName, setManagerLastName] = useState(
    establishment.manager_lastname || ''
  );
  const [email, setEmail] = useState(establishment.email || '');
  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  function handleResize() {
    const accountPage = document.getElementById('account-page');
    if (accountPage) {
      setWindowWidth(accountPage.offsetWidth);
    }
  }

  useEffect(() => {
    setWindowWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    if (establishmentName && managerName && managerLastName && email) {
      if (
        ((oldPassword || password || confirmPassword) &&
          !(oldPassword && password && confirmPassword)) ||
        password !== confirmPassword
      ) {
        setFilled(false);
      } else {
        setFilled(true);
      }
    } else {
      setFilled(false);
    }
  }, [
    establishmentName,
    managerName,
    managerLastName,
    email,
    oldPassword,
    password,
    confirmPassword,
  ]);

  window.addEventListener('resize', handleResize);

  function handleSubmit() {
    const data = {
      establishment_name: establishmentName,
      manager_name: managerName,
      manager_lastname: managerLastName,
      email,
    };

    if (oldPassword && password && confirmPassword) {
      data.old_password = oldPassword;
      data.password = password;
      data.confirm_password = confirmPassword;
    }

    dispatch(updateEstablishmentRequest(data));
  }

  return (
    <div id="account-page">
      {windowWidth >= 768 ? <Header /> : null}

      {pinModalVisible && (
        <PinModal
          onClose={() => setPinModalVisible(false)}
          onAccess={() => setDisabled(false)}
        />
      )}

      <div className="container">
        <div className="button-container">
          <button
            style={{ color: '#606060' }}
            className="button"
            type="button"
            onClick={() => history.goBack()}
          >
            <Backward style={{ height: 16, marginRight: 4 }} fill="#606060" />
            Voltar
          </button>
          {disabled && (
            <button
              style={{ color: '#FF3636' }}
              className="button"
              type="button"
              onClick={() => setPinModalVisible(true)}
            >
              Editar
              <Lock style={{ height: 20, marginLeft: 8 }} fill="#FF3636" />
            </button>
          )}
        </div>

        <div className="content">
          <div className="form">
            <p className={disabled ? 'input-label-disabled' : 'input-label'}>
              Nome do estabelecimento
            </p>
            <input
              value={establishmentName}
              className={disabled ? 'input-disabled' : 'input'}
              style={{ textTransform: 'capitalize' }}
              disabled={disabled}
              placeholder="Restaurante X"
              onChange={(e) => setEstablishmentName(e.target.value)}
            />
          </div>
          <div className="form">
            <p className={disabled ? 'input-label-disabled' : 'input-label'}>
              Nome
            </p>
            <input
              value={managerName}
              onChange={(e) => setManagerName(e.target.value)}
              disabled={disabled}
              placeholder="Nome"
              className={disabled ? 'input-disabled' : 'input'}
              style={{ textTransform: 'capitalize' }}
            />
            <p className={disabled ? 'input-label-disabled' : 'input-label'}>
              Sobrenome
            </p>
            <input
              value={managerLastName}
              className={disabled ? 'input-disabled' : 'input'}
              style={{ textTransform: 'capitalize' }}
              disabled={disabled}
              placeholder="Sobrenome"
              onChange={(e) => setManagerLastName(e.target.value)}
            />
          </div>
          <div className="form">
            <p className={disabled ? 'input-label-disabled' : 'input-label'}>
              E-mail
            </p>
            <input
              type="email"
              value={email}
              disabled={disabled}
              className={disabled ? 'input-disabled' : 'input'}
              placeholder="exemplo@email.com"
              onKeyDown={(e) => {
                if (e.key === ' ') e.preventDefault();
              }}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div
            className="form"
            style={{ border: 0, marginBottom: 0, paddingBottom: 0 }}
          >
            <p className={disabled ? 'input-label-disabled' : 'input-label'}>
              Senha atual
            </p>
            <input
              value={oldPassword}
              type="password"
              className={disabled ? 'input-disabled' : 'input'}
              disabled={disabled}
              placeholder="********"
              onChange={(e) => setOldPassword(e.target.value)}
            />
            <p className={disabled ? 'input-label-disabled' : 'input-label'}>
              Nova senha
            </p>
            <input
              value={password}
              type="password"
              className={disabled ? 'input-disabled' : 'input'}
              disabled={disabled}
              placeholder="********"
              onChange={(e) => setPassword(e.target.value)}
            />
            <p className={disabled ? 'input-label-disabled' : 'input-label'}>
              Confirme sua nova senha
            </p>
            <input
              value={confirmPassword}
              type="password"
              className={disabled ? 'input-disabled' : 'input'}
              style={
                confirmPassword && password !== confirmPassword
                  ? { border: '2px solid #FF3636' }
                  : null
              }
              disabled={disabled}
              placeholder="********"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          {windowWidth >= 768 && !disabled ? (
            <button
              type="button"
              className={
                filled ? 'submit-button-enabled' : 'submit-button-disabled'
              }
              onClick={filled ? handleSubmit : null}
            >
              Concluir
            </button>
          ) : null}
        </div>
      </div>
      {windowWidth < 768 && !disabled ? (
        <button
          type="button"
          className={
            filled ? 'submit-button-enabled' : 'submit-button-disabled'
          }
          onClick={filled ? handleSubmit : null}
        >
          Concluir
        </button>
      ) : null}
    </div>
  );
}
