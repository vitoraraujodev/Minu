import React, { useState, useEffect } from 'react';

import Header from '~/components/Header';
import PinModal from '~/components/PinModal';

import { ReactComponent as Backward } from '~/assets/images/backward-icon.svg';
import defaultEstablishement from '~/assets/images/default-establishment.png';

import history from '~/services/history';

import './styles.css';

export default function Picture() {
  const [windowWidth, setWindowWidth] = useState(768);
  const [disabled, setDisabled] = useState(true);
  const [pinModalVisible, setPinModalVisible] = useState(false);

  function handleResize() {
    const picturePage = document.getElementById('picture-page');
    if (picturePage) {
      setWindowWidth(picturePage.offsetWidth);
    }
  }

  useEffect(() => {
    setWindowWidth(window.innerWidth);
  }, []);

  window.addEventListener('resize', handleResize);

  return (
    <div id="picture-page">
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
          <p
            className="label"
            style={disabled ? { color: '#9c9c9c' } : { color: '#252525' }}
          >
            Adicione uma foto!
          </p>

          <img
            src={defaultEstablishement}
            style={
              disabled
                ? { border: '2px solid #9c9c9c' }
                : { border: '2px solid #535BFE' }
            }
            className="image"
            alt=""
          />
          {!disabled && (
            <button className="img-button" type="button">
              Carregar foto
            </button>
          )}

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
