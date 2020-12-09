import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CurrencyInput from 'react-currency-input';

import Menu from './Menu';
import Additional from './Additional';
import Actions from '~/components/Actions';

import Header from '~/components/NavTabs/Establishment';
import PinModal from '~/components/PinModal';
import Accordion from '~/components/Accordion';

import { ReactComponent as Wave } from '~/assets/icons/wave.svg';
import { ReactComponent as Lock } from '~/assets/icons/edit-lock.svg';
import {
  ReactComponent as AddIcon,
  ReactComponent as RemoveIcon,
} from '~/assets/icons/add-icon.svg';

import { ReactComponent as SaveIcon } from '~/assets/icons/save-icon.svg';
import defaultPicture from '~/assets/images/default-picture.png';

import api from '~/services/api';

import { inventoryAccess } from '~/store/modules/auth/actions';

import './styles.css';

export default function Inventory() {
  const inventoryAccessed = useSelector(
    (state) => state.auth.inventoryAccessed
  );
  const dispatch = useDispatch();

  const [pinModalVisible, setPinModalVisible] = useState(false);
  const [additionalForm, setAdditionalForm] = useState(false);

  const [title, setTitle] = useState('');
  const [price, setPrice] = useState(0.0);
  const [maskedPrice, setMaskedPrice] = useState('R$ 0,00');

  const [items, setItems] = useState([]);
  const [additionals, setAdditionals] = useState([]);
  const [menus, setMenus] = useState([]);

  async function loadItems() {
    try {
      let response = await api.get('items');
      setItems(response.data);

      response = await api.get('additionals');
      setAdditionals(response.data);

      response = await api.get('menus');
      setMenus(response.data);
    } catch (err) {
      alert(
        'Não foi possível carregar suas informações. Por favor, tente mais tarde.'
      );
    }
  }

  useEffect(() => {
    if (inventoryAccessed) loadItems();
  }, [inventoryAccessed]);

  useEffect(() => {
    let newPrice = maskedPrice;
    newPrice = newPrice.replace('R', '');
    newPrice = newPrice.replace('$', '');
    newPrice = newPrice.replace(' ', '');
    newPrice = newPrice.replace(',', '.');

    setPrice(newPrice);
  }, [maskedPrice]);

  async function handleSubmit() {
    const data = {
      title,
      price,
    };

    try {
      const response = await api.post('additionals', data);
      setAdditionals([response.data, ...additionals]);
      setAdditionalForm(false);
      setTitle('');
      setMaskedPrice('R$ 0,00');
    } catch (err) {
      if (err.response) alert(err.response.data.error);
    }
  }

  return (
    <div id="inventory">
      <Header />

      {pinModalVisible && (
        <PinModal
          onClose={() => setPinModalVisible(false)}
          onAccess={() => dispatch(inventoryAccess(true))}
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
          <Accordion title="Cardápios" disabled={!inventoryAccessed}>
            <Link
              to={{
                pathname: '/inventario/cardapio',
                state: { length: menus.length + 1 },
              }}
            >
              <div className="add-item-container">
                <AddIcon
                  style={{ height: 16, marginRight: 8, minWidth: 16 }}
                  fill="#535BFE"
                />
                <p>Novo cardápio</p>
              </div>
            </Link>

            {menus.map((menu, index) => (
              <Link
                to={{
                  pathname: `/inventario/cardapio/${menu.id}`,
                  state: { menu },
                }}
                key={menu.id}
              >
                <Menu menu={menu} index={index} />
              </Link>
            ))}
          </Accordion>

          <Accordion title="Produtos" disabled={!inventoryAccessed}>
            <Link
              to={{
                pathname: '/inventario/produto',
                state: { length: items.length + 1 },
              }}
            >
              <div className="add-item-container">
                <AddIcon
                  style={{ height: 16, marginRight: 8, minWidth: 16 }}
                  fill="#535BFE"
                />
                <p>Novo produto</p>
              </div>
            </Link>

            {items.map((item) => (
              <div key={item.id} className="item-container">
                <Link
                  to={{
                    pathname: `/inventario/produto/${item.id}`,
                    state: { item },
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
                    {item.code && <p className="item-code">{item.code}</p>}
                  </div>
                </Link>
                <div className="icon-area">
                  <Actions
                    item={item}
                    route="items"
                    onDelete={(id) =>
                      setItems(items.filter((product) => product.id !== id))
                    }
                    fill="#535BFE"
                  />
                </div>
              </div>
            ))}
          </Accordion>

          <Accordion
            title="Adicionais"
            length={additionals.length}
            disabled={!inventoryAccessed}
          >
            {additionalForm ? (
              <div className="item-container">
                <div className="additional-form">
                  <input
                    className="additional-title-input"
                    autoFocus // eslint-disable-line
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Queijo, Bacon.."
                  />
                  <CurrencyInput
                    inputMode="numeric"
                    value={maskedPrice}
                    decimalSeparator=","
                    prefix="R$ "
                    className="additional-price-input"
                    thousandSeparator="."
                    onChangeEvent={(e) => {
                      setMaskedPrice(e.target.value);
                    }}
                  />
                  {title ? (
                    <div className="icon-area" onClick={handleSubmit}>
                      <SaveIcon style={{ height: 20 }} />
                    </div>
                  ) : (
                    <div
                      className="remove-icon-area"
                      onClick={() => setAdditionalForm(false)}
                    >
                      <RemoveIcon fill="#535BFE" />
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div
                className="add-item-container"
                onClick={() => setAdditionalForm(true)}
              >
                <AddIcon
                  style={{ height: 16, marginRight: 8, minWidth: 16 }}
                  fill="#535BFE"
                />
                <p>Novo adicional</p>
              </div>
            )}

            {additionals.map((additional) => (
              <Additional
                key={additional.id}
                additional={additional}
                onDelete={(id) =>
                  setAdditionals(
                    additionals.filter((product) => product.id !== id)
                  )
                }
              />
            ))}
          </Accordion>
        </div>

        {!inventoryAccessed && (
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