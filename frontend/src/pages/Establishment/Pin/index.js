import React, { useState, useEffect } from 'react';

import Header from '~/components/Header';
import PinCodeInput from '~/components/PinCodeInput';
import PinModal from '~/components/PinModal';

import { ReactComponent as Backward } from '~/assets/images/backward-icon.svg';

import history from '~/services/history';

import './styles.css';

export default function Pin() {
  const [windowWidth, setWindowWidth] = useState(768);
  const [disabled, setDisabled] = useState(true);
  const [pinModalVisible, setPinModalVisible] = useState(false);

  const [pin, setPin] = useState('');

  function handleResize() {
    const pinPage = document.getElementById('pin-page');
    if (pinPage) {
      setWindowWidth(pinPage.offsetWidth);
    }
  }

  useEffect(() => {
    setWindowWidth(window.innerWidth);
  }, []);

  window.addEventListener('resize', handleResize);

  return (
    <div id="pin-page">
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
          <p className={disabled ? 'label-disabled' : 'label'}>
            Novo PIN dos administradores
          </p>
          <p className="sub-label">
            Será necessário para fazer alterações em configurações e cardápios
          </p>

          <PinCodeInput
            adminPin={pin}
            disabled={disabled}
            onChangeAdminPin={setPin}
          />

          {windowWidth >= 768 && !disabled ? (
            <button className="submit-button-disabled" type="button">
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
