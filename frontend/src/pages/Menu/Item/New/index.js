import React, { useState, useEffect } from 'react';
import CurrencyInput from 'react-currency-input';

import Header from '~/components/Header';

import { ReactComponent as Backward } from '~/assets/icons/backward-icon.svg';
import { ReactComponent as ExpandArrow } from '~/assets/icons/expand-arrow.svg';
import defaultPicture from '~/assets/images/default-picture.png';

import history from '~/services/history';

import './styles.css';

function NewItem() {
  const [windowWidth, setWindowWidth] = useState(768);

  const [price, setPrice] = useState('');
  const [maskedPrice, setMaskedPrice] = useState('');

  function handleResize() {
    const newItemPage = document.getElementById('item-page');
    if (newItemPage) {
      setWindowWidth(newItemPage.offsetWidth);
    }
  }

  useEffect(() => {
    setWindowWidth(window.innerWidth);
  }, []);

  window.addEventListener('resize', handleResize);

  useEffect(() => {
    let newPrice = maskedPrice;
    newPrice = newPrice.replace('R', '');
    newPrice = newPrice.replace('$', '');
    newPrice = newPrice.replace(' ', '');
    newPrice = newPrice.replace(',', '.');

    setPrice(newPrice);
  }, [maskedPrice]);

  return (
    <div id="item-page">
      {windowWidth >= 768 ? <Header /> : null}

      <div className="container">
        <div className="header">
          <button
            className="back-button"
            type="button"
            onClick={() => history.goBack()}
          >
            <Backward style={{ height: 16, marginRight: 4 }} fill="#fff" />
            Voltar
          </button>

          <p className="product-label">Produto 01</p>
        </div>

        <div className="content">
          <div className="img-container">
            <img
              src={defaultPicture}
              onError={(e) => {
                e.target.src = defaultPicture;
              }}
              className="item-img"
              alt="item-img"
            />
            <button className="img-button" type="button">
              Adicionar foto
            </button>
          </div>
          <p className="input-label">Nome do produto</p>
          <input className="input" placeholder="X-Burger Especial" />

          <p className="input-label">Descrição</p>
          <input
            className="input"
            placeholder="Hamburguer de carne com queijo..."
          />

          <div className="input-group">
            <div style={{ paddingRight: 8 }}>
              <p className="input-label">Preço</p>

              <CurrencyInput
                value={maskedPrice}
                style={{ color: '#6E6E6E' }}
                decimalSeparator=","
                prefix="R$ "
                className="input"
                thousandSeparator="."
                onChangeEvent={(e) => setMaskedPrice(e.target.value)}
              />
            </div>

            <div style={{ paddingLeft: 8 }}>
              <p className="input-label">Tempo de preparo</p>
              <div className="preparation-time">
                <button type="button" className="circle-button">
                  <ExpandArrow
                    style={{ height: 12, opacity: 0.7 }}
                    fill="#535bfe"
                  />
                </button>

                <div className="preparation-input">
                  <span className="time-text">1-5min</span>
                </div>

                <button type="button" className="circle-button-up">
                  <ExpandArrow
                    style={{ height: 12, opacity: 0.7 }}
                    fill="#535BFE"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewItem;
