import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Header from '~/components/Header';
import PinModal from '~/components/PinModal';
import Accordion from '~/components/Accordion';

import { ReactComponent as Wave } from '~/assets/icons/wave.svg';
import { ReactComponent as Lock } from '~/assets/icons/edit-lock.svg';
import { ReactComponent as AddIcon } from '~/assets/icons/add-icon.svg';
import defaultPicture from '~/assets/images/default-picture.png';

import api from '~/services/api';

import './styles.css';

export default function Inventory() {
  const [disabled, setDisabled] = useState(false);
  const [pinModalVisible, setPinModalVisible] = useState(false);

  const [items, setItems] = useState([]);

  async function loadItems() {
    try {
      const response = await api.get('items');
      setItems(response.data);
    } catch (err) {
      alert(
        'Não foi possível carregar suas informações. Por favor, tente mais tarde.'
      );
    }
  }

  useEffect(() => {
    loadItems();
  }, []);

  return (
    <div id="inventory">
      <Header />

      {pinModalVisible && (
        <PinModal
          onClose={() => setPinModalVisible(false)}
          onAccess={() => setDisabled(false)}
        />
      )}

      <div className="container">
        <div className="header">
          <p className="header-label">Adicione seus produtos!</p>
          <div className="wave">
            <Wave style={{ height: 104 }} />
          </div>
        </div>

        <div className="content">
          <Accordion title="Cardápios" disabled={disabled}>
            <div className="item-container">
              <AddIcon style={{ height: 16, marginRight: 8 }} />
              <p>Novo cardápio</p>
            </div>
          </Accordion>

          <Accordion title="Produtos" disabled={disabled}>
            <Link to="/menus/product">
              <div className="item-container">
                <AddIcon style={{ height: 16, marginRight: 8 }} />
                <p>Novo produto</p>
              </div>
            </Link>

            {items.map((item) => (
              <div className="item-container">
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
                  {item.code && <p className="item-code">{1234123}</p>}
                </div>
              </div>
            ))}
          </Accordion>

          <Accordion title="Adicionais" disabled={disabled}>
            <div className="item-container">
              <AddIcon style={{ height: 16, marginRight: 8 }} />
              <p>Novo adicional</p>
            </div>
          </Accordion>
        </div>

        {disabled && (
          <div
            className="lock-container"
            onClick={() => {
              setPinModalVisible(true);
            }}
          >
            <Lock style={{ height: 72 }} />
          </div>
        )}
      </div>
    </div>
  );
}
