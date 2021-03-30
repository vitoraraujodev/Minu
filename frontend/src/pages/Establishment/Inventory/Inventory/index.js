import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import CurrencyInput from 'react-currency-input';

import Menu from './Menu';
import Item from './Item';
import Additional from './Additional';

import Actions from '~/components/Actions';
import ConfirmationModal from '~/components/ConfirmationModal';
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

import api from '~/services/api';

import { inventoryAccess } from '~/store/modules/establishment/actions';

import './styles.css';

export default function Inventory() {
  // const inventoryAccessed = useSelector(
  //   (state) => state.establishment.inventoryAccessed
  // );

  const inventoryAccessed = true;

  const dispatch = useDispatch();

  const [pinModalVisible, setPinModalVisible] = useState(false);
  const [additionalForm, setAdditionalForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [confirmationModalVisible, setConfirmationModalVisible] = useState(
    false
  );

  const [title, setTitle] = useState('');
  const [price, setPrice] = useState(0.0);
  const [maskedPrice, setMaskedPrice] = useState('R$ 0,00');

  const [starters, setStarters] = useState([]);
  const [mains, setMains] = useState([]);
  const [desserts, setDesserts] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [alcoholics, setAlcoholics] = useState([]);
  const [additionals, setAdditionals] = useState([]);
  const [menus, setMenus] = useState([]);

  async function loadItems() {
    setLoading(true);
    try {
      // Load items and separe by category
      let response = await api.get('items');
      if (response.data && response.data.length > 0) {
        const alcoholicItems = response.data.filter(
          (item) => item.category === 'Bebidas alcoólicas'
        );
        if (alcoholicItems.length > 0) {
          setAlcoholics(alcoholicItems);
        }

        const drinkItems = response.data.filter(
          (item) => item.category === 'Bebidas'
        );
        if (drinkItems.length > 0) {
          setDrinks(drinkItems);
        }

        const dessertItems = response.data.filter(
          (item) => item.category === 'Sobremesas'
        );
        if (dessertItems.length > 0) {
          setDesserts(dessertItems);
        }

        const mainItems = response.data.filter(
          (item) => item.category === 'Pratos principais'
        );
        if (mainItems.length > 0) {
          setMains(mainItems);
        }

        const starterItems = response.data.filter(
          (item) => item.category === 'Entradas'
        );
        if (starterItems.length > 0) {
          setStarters(starterItems);
        }
      }

      // Load Additional
      response = await api.get('additionals');
      setAdditionals(response.data);

      // Load Menus
      response = await api.get('menus');
      setMenus(response.data);
    } catch (err) {
      alert(
        'Não foi possível carregar suas informações. Por favor, tente mais tarde.'
      );
    }
    setLoading(false);
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

  async function handleSubmitAdditional() {
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
      if (err.response && err.response.data) {
        alert(err.response.data.error);
      } else {
        alert(
          'Houve um erro ao criar esse adicional. Verifique sua conexão e tente novamente.'
        );
      }
    }
  }

  return (
    <div id="inventory">
      <Header />

      {pinModalVisible && (
        <PinModal
          onClose={() => setPinModalVisible(false)}
          onAccess={() => {
            dispatch(inventoryAccess(true));
            setPinModalVisible(false);
          }}
        />
      )}

      {confirmationModalVisible && (
        <ConfirmationModal
          title="Deseja deletar?"
          description="Este item será deletado permanentemente"
          onClose={() => setConfirmationModalVisible(false)}
          onConfirm={() => {}}
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
          {/* Menus Accordion */}
          <Accordion
            title="Cardápios"
            loading={loading}
            disabled={!inventoryAccessed}
          >
            <Link to="/inventario/cardapio">
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

          {/* Products Accordion */}
          <Accordion
            title="Produtos"
            loading={loading}
            disabled={!inventoryAccessed}
          >
            <Link to="/inventario/produto">
              <div className="add-item-container">
                <AddIcon
                  style={{ height: 16, marginRight: 8, minWidth: 16 }}
                  fill="#535BFE"
                />
                <p>Novo produto</p>
              </div>
            </Link>

            {starters.length > 0 && (
              <>
                <p className="category-text">Entradas</p>
                {starters.map((item) => (
                  <div key={item.id} className="item-container">
                    <Link
                      to={{
                        pathname: `/inventario/produto/${item.id}`,
                        state: { item },
                      }}
                    >
                      <Item item={item} />
                    </Link>

                    <div className="icon-area">
                      <Actions
                        id={item.id}
                        available={item.available}
                        route="items"
                        onDelete={(id) =>
                          setStarters(
                            starters.filter((product) => product.id !== id)
                          )
                        }
                        onChangeAvailable={(available) =>
                          setStarters(
                            starters.map((product) =>
                              product.id === item.id
                                ? { ...product, available }
                                : product
                            )
                          )
                        }
                        fill="#535BFE"
                      />
                    </div>
                  </div>
                ))}
              </>
            )}

            {mains.length > 0 && (
              <>
                <p className="category-text">Pratos principais</p>
                {mains.map((item) => (
                  <div key={item.id} className="item-container">
                    <Link
                      to={{
                        pathname: `/inventario/produto/${item.id}`,
                        state: { item },
                      }}
                    >
                      <Item item={item} />
                    </Link>

                    <div className="icon-area">
                      <Actions
                        id={item.id}
                        available={item.available}
                        route="items"
                        onDelete={(id) =>
                          setMains(mains.filter((product) => product.id !== id))
                        }
                        fill="#535BFE"
                        onChangeAvailable={(available) =>
                          setMains(
                            mains.map((product) =>
                              product.id === item.id
                                ? { ...product, available }
                                : product
                            )
                          )
                        }
                      />
                    </div>
                  </div>
                ))}
              </>
            )}

            {desserts.length > 0 && (
              <>
                <p className="category-text">Sobremesas</p>
                {desserts.map((item) => (
                  <div key={item.id} className="item-container">
                    <Link
                      to={{
                        pathname: `/inventario/produto/${item.id}`,
                        state: { item },
                      }}
                    >
                      <Item item={item} />
                    </Link>

                    <div className="icon-area">
                      <Actions
                        id={item.id}
                        available={item.available}
                        route="items"
                        onDelete={(id) =>
                          setDesserts(
                            desserts.filter((product) => product.id !== id)
                          )
                        }
                        onChangeAvailable={(available) =>
                          setDesserts(
                            desserts.map((product) =>
                              product.id === item.id
                                ? { ...product, available }
                                : product
                            )
                          )
                        }
                        fill="#535BFE"
                      />
                    </div>
                  </div>
                ))}
              </>
            )}

            {drinks.length > 0 && (
              <>
                <p className="category-text">Bebidas</p>
                {drinks.map((item) => (
                  <div key={item.id} className="item-container">
                    <Link
                      to={{
                        pathname: `/inventario/produto/${item.id}`,
                        state: { item },
                      }}
                    >
                      <Item item={item} />
                    </Link>

                    <div className="icon-area">
                      <Actions
                        id={item.id}
                        available={item.available}
                        route="items"
                        onDelete={(id) =>
                          setDrinks(
                            drinks.filter((product) => product.id !== id)
                          )
                        }
                        onChangeAvailable={(available) =>
                          setDrinks(
                            drinks.map((product) =>
                              product.id === item.id
                                ? { ...product, available }
                                : product
                            )
                          )
                        }
                        fill="#535BFE"
                      />
                    </div>
                  </div>
                ))}
              </>
            )}

            {alcoholics.length > 0 && (
              <>
                <p className="category-text">Bebidas alcoólicas</p>
                {alcoholics.map((item) => (
                  <div key={item.id} className="item-container">
                    <Link
                      to={{
                        pathname: `/inventario/produto/${item.id}`,
                        state: { item },
                      }}
                    >
                      <Item item={item} />
                    </Link>

                    <div className="icon-area">
                      <Actions
                        id={item.id}
                        available={item.available}
                        route="items"
                        onDelete={(id) =>
                          setAlcoholics(
                            alcoholics.filter((product) => product.id !== id)
                          )
                        }
                        onChangeAvailable={(available) =>
                          setAlcoholics(
                            alcoholics.map((product) =>
                              product.id === item.id
                                ? { ...product, available }
                                : product
                            )
                          )
                        }
                        fill="#535BFE"
                      />
                    </div>
                  </div>
                ))}
              </>
            )}
          </Accordion>

          {/* Additional Accordion */}
          <Accordion
            title="Adicionais"
            loading={loading}
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
                    <div className="icon-area" onClick={handleSubmitAdditional}>
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
                onChangeAvailable={(available) => {
                  setAdditionals(
                    additionals.map((add) =>
                      add.id === additional.id ? { ...add, available } : add
                    )
                  );
                }}
                onDelete={(id) =>
                  setAdditionals(additionals.filter((add) => add.id !== id))
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
