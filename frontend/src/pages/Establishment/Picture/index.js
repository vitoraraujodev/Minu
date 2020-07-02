import React, { useState, useEffect } from 'react';
import Header from '~/components/Header';

import { ReactComponent as Backward } from '~/assets/images/backward-icon.svg';
import defaultEstablishement from '~/assets/images/default-establishment.png';

import history from '~/services/history';

import './styles.css';

export default function Picture() {
  const [windowWidth, setWindowWidth] = useState();

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
      <div className="container">
        <div className="back-button-container">
          <button
            style={{ color: '#6E6E6E' }}
            className="back-button"
            type="button"
            onClick={() => history.goBack()}
          >
            <Backward style={{ height: 16, marginRight: 4 }} fill="#6E6E6E" />
            Voltar
          </button>
        </div>

        <div className="content">
          <p className="label">Adicione uma foto!</p>

          <img src={defaultEstablishement} className="image" alt="" />

          <button className="img-button" type="button">
            Carregar foto
          </button>
          {windowWidth >= 768 ? (
            <button className="submit-button-disabled" type="button">
              Concluir
            </button>
          ) : null}
        </div>
      </div>
      {windowWidth < 768 ? (
        <button className="submit-button-enabled" type="button">
          Concluir
        </button>
      ) : null}
    </div>
  );
}
