import React, { useState, useEffect } from 'react';

import { ReactComponent as Backward } from '~/assets/icons/backward-icon.svg';
import { ReactComponent as Foward } from '~/assets/icons/foward-icon.svg';
import { ReactComponent as Save } from '~/assets/icons/save-icon.svg';

import defaultPicture from '~/assets/images/default-picture.png';

import api from '~/services/api';

import { formatPrice } from '~/util/formatPrice';

import './styles.css';

export default function ItemSelector({
  onClose,
  windowWidth,
  selectedItems,
  onChangeItems,
}) {
  const [loading, setLoading] = useState(true);

  const [items, setItems] = useState([]);

  async function loadItems() {
    setLoading(true);
    try {
      const response = await api.get('items');
      setItems(response.data);
    } catch (err) {
      alert(
        'Não foi possível carregar suas informações. Por favor, tente mais tarde.'
      );
    }
    setLoading(false);
  }

  useEffect(() => {
    loadItems();
  }, []);

  function checkItem(item) {
    const itemExists = selectedItems.filter((i) => i.id === item.id);

    if (itemExists.length !== 0) return true;
    return false;
  }

  function handleSelectedItem(item) {
    if (checkItem(item)) {
      onChangeItems(selectedItems.filter((i) => i.id !== item.id));
    } else {
      onChangeItems([...selectedItems, item]);
    }
  }

  return (
    <div
      id="item-selector"
      style={windowWidth < 768 ? { width: windowWidth } : null}
    >
      <div className="item-selector-content">
        <div className="header">
          <button className="back-button" type="button" onClick={onClose}>
            <Backward style={{ height: 16, marginRight: 4 }} fill="#fff" />
            Voltar
          </button>

          <p className="header-label">Produtos</p>

          {selectedItems.length > 0 && (
            <div className="amount-container">
              <p className="amount">{selectedItems.length}</p>
            </div>
          )}

          <div />
        </div>

        {loading && items.length === 0 && (
          <div className="loader-container">
            <div className="loader" />
          </div>
        )}

        {items.length === 0 && !loading && (
          <h3 className="empty-text">
            Você ainda não possui
            <br />
            produtos cadastrados
          </h3>
        )}

        {items.map((item) => (
          <div
            key={item.id}
            className="item-container"
            style={{ padding: '8px 24px' }}
            onClick={() => handleSelectedItem(item)}
          >
            <div className="img-area">
              <div
                className={
                  checkItem(item) ? 'selected-img-container' : 'img-container'
                }
              >
                <img
                  src={item.photo ? item.photo.url : defaultPicture}
                  onError={(e) => {
                    e.target.src = defaultPicture;
                  }}
                  className="item-img"
                  alt="item-img"
                />
              </div>

              {checkItem(item) && (
                <div className="selected-icon">
                  <Save style={{ height: 16 }} fill="#fff" />
                </div>
              )}
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
      {items.length !== 0 && !loading && (
        <button
          className="submit-item-container"
          onClick={onClose}
          type="button"
        >
          <Foward style={{ height: 25 }} fill="#fff" />
        </button>
      )}
    </div>
  );
}
