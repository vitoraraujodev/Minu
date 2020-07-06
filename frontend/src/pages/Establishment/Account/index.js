import React, { useState, useEffect } from 'react';

import Header from '~/components/Header';
import PinModal from '~/components/PinModal';

import { ReactComponent as Backward } from '~/assets/images/backward-icon.svg';

import history from '~/services/history';

import './styles.css';

export default function Account() {
  const [windowWidth, setWindowWidth] = useState(768);
  const [disabled, setDisabled] = useState(true);
  const [pinModalVisible, setPinModalVisible] = useState(false);

  const [establishmentName, setEstablishmentName] = useState('');
  const [managerName, setManagerName] = useState('');
  const [managerLastName, setManagerLastName] = useState('');
  const [email, setEmail] = useState('');
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

  window.addEventListener('resize', handleResize);

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
            style={{ color: '#6E6E6E' }}
            className="button"
            type="button"
            onClick={() => history.goBack()}
          >
            <Backward style={{ height: 16, marginRight: 4 }} fill="#6E6E6E" />
            Voltar
          </button>
          {disabled && (
            <button
              style={{ color: '#FF3636' }}
              className="button"
              type="button"
              onClick={() => setPinModalVisible(true)}
            >
              Habilitar edição
              <Backward style={{ height: 16, marginLeft: 4 }} fill="#FF3636" />
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
              className="input"
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
              className="input"
            />
            <p className={disabled ? 'input-label-disabled' : 'input-label'}>
              Sobrenome
            </p>
            <input
              value={managerLastName}
              className="input"
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
              className="input"
              placeholder="exemplo@email.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div
            className="form"
            style={{ border: 0, marginBottom: 0, paddingBottom: 0 }}
          >
            <p className={disabled ? 'input-label-disabled' : 'input-label'}>
              Senha
            </p>
            <input
              value={password}
              className="input"
              disabled={disabled}
              placeholder="********"
              onChange={(e) => setPassword(e.target.value)}
            />
            <p className={disabled ? 'input-label-disabled' : 'input-label'}>
              Confirme sua senha
            </p>
            <input
              value={confirmPassword}
              className="input"
              disabled={disabled}
              placeholder="********"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          {windowWidth >= 768 && !disabled ? (
            <button className="submit-button-enabled" type="button">
              Concluir
            </button>
          ) : null}
        </div>
      </div>
      {windowWidth < 768 && !disabled ? (
        <button className="submit-button-enabled" type="button">
          Concluir
        </button>
      ) : null}
    </div>
  );
}
