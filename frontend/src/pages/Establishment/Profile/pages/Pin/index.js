import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Header from '~/components/NavTabs/Establishment';
import PinCodeInput from '~/components/PinCodeInput';
import PinModal from '~/components/PinModal';

import { ReactComponent as Backward } from '~/assets/icons/backward-icon.svg';
import { ReactComponent as Lock } from '~/assets/icons/lock-icon.svg';

import { updateEstablishmentRequest } from '~/store/modules/establishment/actions';

import history from '~/services/history';

import './styles.css';

export default function Pin() {
  const dispatch = useDispatch();

  const [windowWidth, setWindowWidth] = useState(768);
  const [filled, setFilled] = useState(true);
  const [disabled, setDisabled] = useState(false); // Colocar como true
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

  useEffect(() => {
    if (pin.length === 4) {
      setFilled(true);
    } else {
      setFilled(false);
    }
  }, [pin]);

  function handleSubmit() {
    const data = {
      admin_pin: pin,
    };

    dispatch(updateEstablishmentRequest(data));
  }

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
            <button
              className={
                filled ? 'submit-button-enabled' : 'submit-button-disabled'
              }
              type="button"
              onClick={filled ? handleSubmit : null}
            >
              Concluir
            </button>
          ) : null}
        </div>
      </div>
      {windowWidth < 768 && !disabled ? (
        <button
          className={
            filled ? 'submit-button-enabled' : 'submit-button-disabled'
          }
          type="button"
          onClick={filled ? handleSubmit : null}
        >
          Concluir
        </button>
      ) : null}
    </div>
  );
}
