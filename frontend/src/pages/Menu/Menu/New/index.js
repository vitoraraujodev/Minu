import React, { useState, useEffect } from 'react';

import ItemSelector from '../ItemSelector';
import DaySelector from '../DaySelector';
import Header from '~/components/Header';

import { ReactComponent as Backward } from '~/assets/icons/backward-icon.svg';
import { ReactComponent as ExpandArrow } from '~/assets/icons/expand-arrow.svg';
import defaultPicture from '~/assets/images/default-picture.png';

import api from '~/services/api';
import history from '~/services/history';

import { formatPrice } from '~/util/format';

import './styles.css';

export default function NewMenu({ location }) {
  const length = location.state.length || '';

  const [windowWidth, setWindowWidth] = useState(768);
  const [selectorVisible, setSelectorVisible] = useState(false);
  const [filled, setFilled] = useState(false);

  const [title, setTitle] = useState('');
  const [startAt, setStartAt] = useState('');
  const [endAt, setEndAt] = useState('');
  const [availability, setAvailability] = useState('0000000');
  const [items, setItems] = useState([]);

  function handleResize() {
    const itemPage = document.getElementById('menu-page');
    if (itemPage) {
      setWindowWidth(itemPage.offsetWidth);
    }
  }

  useEffect(() => {
    handleResize();
  }, []);

  window.addEventListener('resize', handleResize);

  useEffect(() => {
    if (title) {
      setFilled(true);
    } else {
      setFilled(false);
    }
  }, [title]);

  async function handleSubmit() {
    const items_id = items.map((item) => item.id);
    const data = {
      title,
      availability,
      startAt,
      endAt,
      items: items_id,
    };

    try {
      await api.post('/menus', data);
      history.push('/menus');
    } catch (err) {
      alert(err.response.data.error);
    }
  }

  return (
    <div id="menu-page">
      {windowWidth >= 768 ? <Header /> : null}

      <div className="container">
        <div
          className="slider"
          style={
            selectorVisible
              ? { left: 0 }
              : { left: windowWidth >= 432 ? 432 : windowWidth }
          }
        >
          <ItemSelector
            onClose={() => setSelectorVisible(0)}
            windowWidth={windowWidth}
            selectedItems={items}
            onChangeItems={(item) => setItems(item)}
          />
        </div>

        <div
          className="form-container"
          style={
            (windowWidth < 768 ? { width: windowWidth } : null,
            selectorVisible > 0
              ? { left: windowWidth >= 432 ? -432 : -windowWidth }
              : { left: 0 })
          }
        >
          <div className="header">
            <button
              className="back-button"
              type="button"
              onClick={() => history.goBack()}
            >
              <Backward style={{ height: 16, marginRight: 4 }} fill="#fff" />
              Voltar
            </button>

            <p className="header-label">
              {length ? `Cardápio ${length <= 9 ? `0${length}` : length}` : ''}
            </p>
          </div>

          <div className="content">
            <p className="input-label">Nome do cardápio</p>
            <input
              className="input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Cardápio principal"
            />

            <p className="input-label">Disponibilidade na semana</p>
            <DaySelector
              availability={availability}
              onChangeAvailability={setAvailability}
            />

            <p className="input-label">Horário</p>

            <p className="input-label">Produtos desse cardápio</p>
            <div
              className="add-item-container"
              onClick={() => {
                setSelectorVisible(true);
              }}
            >
              <p>Adicionar produtos</p>
              <div className="icon-area">
                <ExpandArrow style={{ height: 8 }} fill="#535BFE" />
              </div>
            </div>

            {items.map((item) => (
              <div
                key={item.id}
                className="item-container"
                onClick={() => {
                  setSelectorVisible(true);
                }}
              >
                <div className="img-container">
                  <img
                    src={item.photo ? item.photo.url : defaultPicture}
                    onError={(e) => {
                      e.target.src = defaultPicture;
                    }}
                    className="item-img"
                    alt="item-img"
                  />
                </div>

                <div className="item-info">
                  <p className="item-title">{item.title}</p>
                  <div className="item-sub">
                    {item.code && <p className="item-code">{item.code}</p>}
                    <p className="item-code">{formatPrice(item.price)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {!selectorVisible && (
          <button
            className={
              filled ? 'submit-button-enabled' : 'submit-button-disabled'
            }
            onClick={filled ? handleSubmit : null}
            type="button"
          >
            Concluir
          </button>
        )}
      </div>
    </div>
  );
}
