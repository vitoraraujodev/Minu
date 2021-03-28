import React, { useState, useEffect } from 'react';

import ItemSelector from '../ItemSelector';
import DaySelector from '../DaySelector';

import Header from '~/components/NavTabs/Establishment';
import Input from '~/components/Input';
import Actions from '~/components/Actions';

import { ReactComponent as Backward } from '~/assets/icons/backward-icon.svg';
import { ReactComponent as ExpandArrow } from '~/assets/icons/expand-arrow.svg';
import defaultPicture from '~/assets/images/default-picture.png';

import handleHour from '~/util/handleHour';
import { formatPrice } from '~/util/formatPrice';
import capitalize from '~/util/capitalize';

import history from '~/services/history';

import './styles.css';

export default function MenuForm({ menu, onSubmit, loading }) {
  const [windowWidth, setWindowWidth] = useState(768);
  const [selectorVisible, setSelectorVisible] = useState(false);
  const [filled, setFilled] = useState(false);

  const [title, setTitle] = useState(menu.title || '');
  const [startAt, setStartAt] = useState(String(menu.start_at) || '');
  const [endAt, setEndAt] = useState(String(menu.end_at) || '');
  const [availability, setAvailability] = useState(
    menu.availability || '0000000'
  );
  const [available, setAvailable] = useState(menu.available);
  const [items, setItems] = useState(menu.items || []);

  function handleResize() {
    const menuPage = document.getElementById('menu-page');
    if (menuPage) {
      setWindowWidth(menuPage.offsetWidth);
    }
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  function handleBack() {
    // Order to check if items arrays changed
    const menuItemsId = menu.items.map((item) => item.id).sort();
    const itemsId = items.map((item) => item.id).sort();

    if (
      title !== menu.title ||
      String(startAt) !== String(menu.start_at) ||
      String(endAt) !== String(menu.end_at) ||
      availability !== menu.availability ||
      JSON.stringify(itemsId) !== JSON.stringify(menuItemsId)
    ) {
      if (window.confirm('Deseja descartar as alterações?')) {
        history.goBack();
      }
    } else {
      history.goBack();
    }
  }

  function handleSubmit() {
    const itemsId = items.map((item) => item.id);
    const data = {
      title: capitalize(title),
      start_at: startAt,
      end_at: endAt,
      availability,
      items: itemsId,
    };

    onSubmit(data);
  }

  useEffect(() => {
    if (title && startAt && endAt && availability !== '0000000') {
      setFilled(true);
    } else {
      setFilled(false);
    }
  }, [title, startAt, endAt, availability, items]);

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
              {menu && menu.title ? menu.title : 'Novo Cardápio'}
            </p>

            {menu.id && (
              <div className="icon-area">
                <Actions
                  id={menu.id}
                  available={available}
                  route="menus"
                  onChangeAvailable={setAvailable}
                  onDelete={() => history.push('/inventario')}
                  fill="#fff"
                  position="down"
                  size="20"
                />
              </div>
            )}
          </div>

          <div className="content">
            <p className="input-label">Nome do cardápio</p>
            <Input
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
              <Input
                value={startAt}
                maxLength={2}
                inputMode="number"
                suffix="h"
                maxWidth="64px"
                placeholder="00"
                onKeyDown={(e) => {
                  if (e.key === ' ') e.preventDefault();
                }}
                onChange={(e) =>
                  handleHour(e.target.value) && setStartAt(e.target.value)
                }
              />

              <span
                style={{
                  color: '#9c9c9c',
                  margin: '0 12px',
                  fontSize: 15,
                }}
              >
                Até
              </span>

              <Input
                value={endAt}
                maxLength={2}
                inputMode="number"
                suffix="h"
                maxWidth="64px"
                placeholder="23"
                onKeyDown={(e) => {
                  if (e.key === ' ') e.preventDefault();
                }}
                onChange={(e) =>
                  handleHour(e.target.value) && setEndAt(e.target.value)
                }
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
