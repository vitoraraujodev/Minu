import React, { useState, useEffect } from 'react';

import ItemSelector from '../ItemSelector';
import DaySelector from '../DaySelector';
import Header from '~/components/NavTabs/Establishment';

import { ReactComponent as Backward } from '~/assets/icons/backward-icon.svg';
import { ReactComponent as ExpandArrow } from '~/assets/icons/expand-arrow.svg';
import defaultPicture from '~/assets/images/default-picture.png';

import api from '~/services/api';
import history from '~/services/history';

import { formatPrice } from '~/util/format';
import capitalize from '~/util/capitalize';

import './styles.css';

export default function NewMenu({ location }) {
  const length = location.state ? location.state.length : '';

  const [loading, setLoading] = useState(false);
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

  function handleHour(value, input) {
    const hour = value.replace('h', '');

    // Checks if last input was a number between 0 and 9
    // and if its between 0 and 24
    if (
      (hour.slice(-1) >= '0' &&
        hour.slice(-1) <= '9' &&
        parseInt(hour, 10) >= 0 &&
        parseInt(hour, 10) < 24) ||
      hour === ''
    ) {
      if (input === 'start_at') {
        if (hour === '') {
          setStartAt('');
        } else {
          setStartAt(`${hour}h`);
        }
      }
      if (input === 'end_at') {
        if (hour === '') {
          setEndAt('');
        } else {
          setEndAt(`${hour}h`);
        }
      }
    }
  }

  useEffect(() => {
    if (title && startAt && endAt && availability !== '0000000') {
      setFilled(true);
    } else {
      setFilled(false);
    }
  }, [title, startAt, endAt, availability, items]);

  async function handleSubmit() {
    setLoading(true);
    const items_id = items.map((item) => item.id);
    const data = {
      title: capitalize(title),
      availability,
      start_at: startAt.replace('h', ''),
      end_at: endAt.replace('h', ''),
      items: items_id,
    };

    try {
      await api.post('/menus', data);
      setLoading(false);
      history.push('/inventario');
    } catch (err) {
      setLoading(false);
      alert(err.response.data.error);
    }
  }

  function handleBack() {
    if (
      title ||
      startAt ||
      endAt ||
      availability !== '0000000' ||
      items.length > 0
    ) {
      if (window.confirm('Deseja descartar as alterações?')) {
        history.goBack();
      }
    } else {
      history.goBack();
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
            <button className="back-button" type="button" onClick={handleBack}>
              <Backward style={{ height: 16, marginRight: 4 }} fill="#fff" />
              Voltar
            </button>

            <p className="header-label">
              {length
                ? `Cardápio ${length <= 9 ? `0${length}` : length}`
                : 'Novo Cardápio'}
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
            <div className="input-group">
              <input
                inputMode="numeric"
                maxLength="3"
                value={startAt}
                onKeyDown={(e) => {
                  if (e.keyCode === 8) {
                    const index = startAt.indexOf('h');
                    if (index > 0) {
                      handleHour(startAt.substr(0, index - 1), 'start_at');
                    }
                  }
                }}
                onChange={(e) => handleHour(e.target.value, 'start_at')}
                className="input-hour"
                placeholder="18h"
              />
              <span
                style={{
                  color: '#9c9c9c',
                  margin: '0 8px',
                  height: 32,
                  fontSize: 15,
                }}
              >
                Até
              </span>
              <input
                inputMode="numeric"
                maxLength="3"
                value={endAt}
                onKeyDown={(e) => {
                  if (e.keyCode === 8) {
                    const index = endAt.indexOf('h');
                    if (index > 0) {
                      handleHour(endAt.substr(0, index - 1), 'end_at');
                    }
                  }
                }}
                onChange={(e) => handleHour(e.target.value, 'end_at')}
                className="input-hour"
                placeholder="00h"
              />
            </div>

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
            onClick={filled && !loading ? handleSubmit : null}
            type="button"
          >
            {loading ? 'Carregando...' : 'Concluir'}
          </button>
        )}
      </div>
    </div>
  );
}
