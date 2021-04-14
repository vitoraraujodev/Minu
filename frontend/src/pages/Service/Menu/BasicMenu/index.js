import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Product from './Product';
import MenuFooter from '~/components/MenuFooter';

import WaiterCallModal from './WaiterCall/Modal';
import WaiterPending from './WaiterCall/Pending';
import BillCallModal from './BillCall/Modal';
import BillPending from './BillCall/Pending';

import { ReactComponent as Logo } from '~/assets/icons/simple-logo.svg';

import defaultPicture from '~/assets/images/default-picture.png';

import { ReactComponent as RatingStar } from '~/assets/icons/rating-star.svg';
import { ReactComponent as Backward } from '~/assets/icons/backward-icon.svg';
import { ReactComponent as TrayIcon } from '~/assets/icons/tray-icon.svg';
import { ReactComponent as BillIcon } from '~/assets/icons/orders-icon.svg';

import api from '~/services/api';
import history from '~/services/history';

import {
  setSessionEstablishment,
  removeSessionEstablishment,
} from '~/store/modules/serviceSession/actions';

import handleEstablishmentAddress from '~/util/handleEstablishmentAddress';

import './styles.css';

export default function BasicMenu() {
  const dispatch = useDispatch();

  const stateEstablishment = useSelector(
    (state) => state.serviceSession.establishment
  );

  const [loading, setLoading] = useState(false);

  const [waiterModalVisible, setWaiterModalVisible] = useState(false);
  const [waiterPendingVisible, setWaiterPendingVisible] = useState(false);
  const [billModalVisible, setBillModalVisible] = useState(false);
  const [billPendingVisible, setBillPendingVisible] = useState(false);

  const [establishment, setEstablishment] = useState({});
  const [starters, setStarters] = useState([]);
  const [mains, setMains] = useState([]);
  const [desserts, setDesserts] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [alcoholics, setAlcoholics] = useState([]);
  const [activeCategory, setActiveCategory] = useState('');

  const containerRef = document.getElementById('container');
  const startersRef = document.getElementById('startersRef');
  const mainsRef = document.getElementById('mainsRef');
  const dessertsRef = document.getElementById('dessertsRef');
  const drinksRef = document.getElementById('drinksRef');
  const alcoholicsRef = document.getElementById('alcoholicsRef');

  // Gets session code from url
  const { code } = useParams();
  const establishmentId = code.substr(0, 3);
  const tableNumber = code.substr(3);

  // Separes products by category
  function handleEstablishment(data) {
    if (data.items && data.items.length > 0) {
      const alcoholicItems = data.items.filter(
        (item) => item.category === 'Bebidas alcoólicas'
      );
      if (alcoholicItems.length > 0) {
        setAlcoholics(alcoholicItems);
        setActiveCategory('alcoholics');
      }

      const drinkItems = data.items.filter(
        (item) => item.category === 'Bebidas'
      );
      if (drinkItems.length > 0) {
        setDrinks(drinkItems);
        setActiveCategory('drinks');
      }

      const dessertItems = data.items.filter(
        (item) => item.category === 'Sobremesas'
      );
      if (dessertItems.length > 0) {
        setDesserts(dessertItems);
        setActiveCategory('desserts');
      }

      const mainItems = data.items.filter(
        (item) => item.category === 'Pratos principais'
      );
      if (mainItems.length > 0) {
        setMains(mainItems);
        setActiveCategory('mains');
      }

      const starterItems = data.items.filter(
        (item) => item.category === 'Entradas'
      );
      if (starterItems.length > 0) {
        setStarters(starterItems);
        setActiveCategory('starters');
      }
    }
  }

  async function loadEstablishment() {
    setLoading(true);

    try {
      const response = await api.get(`establishments/${establishmentId}`);

      setEstablishment(response.data);
      handleEstablishment(response.data);
      dispatch(setSessionEstablishment(response.data));

      setLoading(false);
    } catch (err) {
      setLoading(false);
      history.push('/');
      if (err.response) alert(err.response.data.error);
    }
  }

  useEffect(() => {
    if (stateEstablishment) {
      setEstablishment(stateEstablishment);
      handleEstablishment(stateEstablishment);
    } else {
      loadEstablishment();
    }
  }, [stateEstablishment]); // eslint-disable-line

  function handleScroll() {
    if (containerRef) {
      if (
        containerRef.scrollTop >=
        containerRef.scrollHeight - window.innerHeight - 8
      ) {
        if (alcoholics.length > 0) setActiveCategory('alcoholics');
        else if (drinks.length > 0) setActiveCategory('drinks');
        else if (desserts.length > 0) setActiveCategory('desserts');
        else if (mains.length > 0) setActiveCategory('mains');
        else if (starters.length > 0) setActiveCategory('starters');
      } else if (
        alcoholicsRef &&
        containerRef.scrollTop + 120 >= alcoholicsRef.offsetTop &&
        containerRef.scrollTop + 120 <=
          alcoholicsRef.offsetTop + alcoholicsRef.offsetHeight &&
        activeCategory !== 'alcoholics'
      )
        setActiveCategory('alcoholics');
      else if (
        drinksRef &&
        containerRef.scrollTop + 120 >= drinksRef.offsetTop &&
        containerRef.scrollTop + 120 <
          drinksRef.offsetTop + drinksRef.offsetHeight &&
        activeCategory !== 'drinks'
      )
        setActiveCategory('drinks');
      else if (
        dessertsRef &&
        containerRef.scrollTop + 120 >= dessertsRef.offsetTop &&
        containerRef.scrollTop + 120 <
          dessertsRef.offsetTop + dessertsRef.offsetHeight &&
        activeCategory !== 'desserts'
      )
        setActiveCategory('desserts');
      else if (
        mainsRef &&
        containerRef.scrollTop + 120 >= mainsRef.offsetTop &&
        containerRef.scrollTop + 120 <
          mainsRef.offsetTop + mainsRef.offsetHeight &&
        activeCategory !== 'mains'
      )
        setActiveCategory('mains');
      else if (
        startersRef &&
        containerRef.scrollTop + 120 <
          startersRef.offsetTop + startersRef.offsetHeight &&
        activeCategory !== 'starters'
      )
        setActiveCategory('starters');
    }
  }

  function scrollTo(category) {
    switch (category) {
      case 'starters':
        if (startersRef) startersRef.scrollIntoView();
        setActiveCategory('starters');
        break;
      case 'mains':
        if (mainsRef) mainsRef.scrollIntoView();
        setActiveCategory('mains');
        break;
      case 'desserts':
        if (dessertsRef) dessertsRef.scrollIntoView();
        setActiveCategory('desserts');
        break;
      case 'drinks':
        if (drinksRef) drinksRef.scrollIntoView();
        setActiveCategory('drinks');
        break;
      case 'alcoholics':
        if (alcoholicsRef) alcoholicsRef.scrollIntoView();
        setActiveCategory('alcoholics');
        break;
      default:
    }
  }

  function handleBack() {
    history.push('/');
    dispatch(removeSessionEstablishment());
  }

  return (
    <div id="basic-menu">
      {waiterPendingVisible && (
        <WaiterPending onClose={() => setWaiterPendingVisible(false)} />
      )}
      {billPendingVisible && (
        <BillPending onClose={() => setBillPendingVisible(false)} />
      )}

      {waiterModalVisible && (
        <WaiterCallModal
          establishmentId={establishmentId}
          tableNumber={tableNumber}
          onWaiterCall={() => setWaiterPendingVisible(true)}
          onClose={() => setWaiterModalVisible(false)}
        />
      )}
      {billModalVisible && (
        <BillCallModal
          establishmentId={establishmentId}
          tableNumber={tableNumber}
          onBillCall={() => setBillPendingVisible(true)}
          onClose={() => setBillModalVisible(false)}
        />
      )}

      {!(waiterPendingVisible || billPendingVisible) && (
        <>
          <div onScroll={handleScroll} id="container" className="container">
            <div className="info-container">
              <button
                type="button"
                className="back-button"
                onClick={handleBack}
              >
                <Backward style={{ height: 16, marginRight: 4 }} fill="#fff" />
                Sair
              </button>

              <div className="logo-container">
                <Logo width={48} fill="#fff" />
              </div>

              <div className="img-container">
                <img
                  src={
                    establishment.photo
                      ? establishment.photo.url
                      : defaultPicture
                  }
                  onError={(e) => {
                    e.target.src = defaultPicture;
                  }}
                  className="establishment-img"
                  alt=""
                />
              </div>
              <div className="info-area">
                <div className="info">
                  <div className="title-area">
                    <span className="title">
                      {establishment.establishment_name || 'Carregando...'}
                    </span>
                  </div>
                  {establishment.rating ? (
                    <div className="rating-area">
                      <span className="rating-text">
                        {establishment.rating % 1 > 0
                          ? establishment.rating
                          : `${establishment.rating}.0`}
                      </span>
                      <RatingStar style={{ height: 15, margin: '0 4px' }} />
                      <span className="rating-text">
                        ({establishment.raters})
                      </span>
                    </div>
                  ) : (
                    <span className="establishment-address">
                      {handleEstablishmentAddress(establishment.address)}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {loading && (
              <div className="loader-container">
                <div className="loader" />
              </div>
            )}

            {starters.length === 0 &&
              mains.length === 0 &&
              desserts.length === 0 &&
              drinks.length === 0 &&
              alcoholics.length === 0 &&
              !loading && (
                <h3 className="empty-text">
                  Nenhum cardápio está diponivel agora...
                </h3>
              )}

            <div id="products-container" className="products-container">
              <div className="products">
                {starters.length > 0 && (
                  <div id="startersRef">
                    <p className="category-label">Entradas</p>
                    {starters.map((product) => (
                      <Product
                        establishmentId={establishmentId}
                        product={product}
                        key={product.id}
                      />
                    ))}
                  </div>
                )}

                {mains.length > 0 && (
                  <div id="mainsRef">
                    <p className="category-label">Pratos Principais</p>
                    {mains.map((product) => (
                      <Product
                        establishmentId={establishmentId}
                        product={product}
                        key={product.id}
                      />
                    ))}
                  </div>
                )}

                {desserts.length > 0 && (
                  <div id="dessertsRef">
                    <p className="category-label">Sobremesas</p>
                    {desserts.map((product) => (
                      <Product
                        establishmentId={establishmentId}
                        product={product}
                        key={product.id}
                      />
                    ))}
                  </div>
                )}

                {drinks.length > 0 && (
                  <div id="drinksRef">
                    <p className="category-label">Bebidas</p>
                    {drinks.map((product) => (
                      <Product
                        establishmentId={establishmentId}
                        product={product}
                        key={product.id}
                      />
                    ))}
                  </div>
                )}

                {alcoholics.length > 0 && (
                  <div id="alcoholicsRef">
                    <p className="category-label">Bebidas Alcoólicas</p>
                    {alcoholics.map((product) => (
                      <Product
                        establishmentId={establishmentId}
                        product={product}
                        key={product.id}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {tableNumber && (
            <div className="buttons-container">
              <button
                type="button"
                className="waiter-call-button"
                onClick={() => setWaiterModalVisible(true)}
              >
                <TrayIcon height="21" style={{ marginBottom: 8 }} fill="#fff" />
              </button>
              <button
                type="button"
                className="bill-call-button"
                onClick={() => setBillModalVisible(true)}
              >
                <BillIcon height="21" fill="#fff" />
              </button>
            </div>
          )}

          <MenuFooter
            activeCategory={activeCategory}
            starters={starters.length > 0}
            mains={mains.length > 0}
            desserts={desserts.length > 0}
            drinks={drinks.length > 0}
            alcoholics={alcoholics.length > 0}
            onActiveCategoryChange={(category) => {
              scrollTo(category);
            }}
          />
        </>
      )}
    </div>
  );
}
