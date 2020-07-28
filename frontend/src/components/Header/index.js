import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { ReactComponent as Profile } from '~/assets/icons/profile-icon.svg';
import { ReactComponent as Menu } from '~/assets/icons/menu-icon.svg';
import { ReactComponent as Orders } from '~/assets/icons/orders-icon.svg';

import logo from '~/assets/icons/simple-logo.svg';

import { inventoryDisable } from '~/store/modules/auth/actions';

import './styles.css';

export default function Header() {
  const dispatch = useDispatch();
  const location = useLocation();

  const [windowWidth, setWindowWidth] = useState(768);
  const [active, setActive] = useState();

  function handleResize() {
    const tabnavigator = document.getElementById('tabnavigator');
    if (tabnavigator) {
      setWindowWidth(tabnavigator.offsetWidth);
    }
  }

  useEffect(() => {
    if (location.pathname === '/pedidos') setActive('orders');
    if (location.pathname === '/menus') setActive('menu');
    if (location.pathname === '/estabelecimento') setActive('establishment');
    if (location.pathname.substr(0, 6) !== '/menus')
      dispatch(inventoryDisable(true));
  }, [location.pathname, dispatch]);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
  }, []);

  window.addEventListener('resize', handleResize);

  return (
    <div id="tabnavigator">
      {windowWidth >= 768 ? (
        <div className="header-content">
          <div className="navlink-container">
            <NavLink
              activeStyle={{ borderBottom: '3px solid #fff', fontWeight: 800 }}
              className="navlink"
              to="/pedidos"
            >
              Pedidos
            </NavLink>
            <NavLink
              activeStyle={{ borderBottom: '3px solid #fff', fontWeight: 800 }}
              className="navlink"
              to="/menus"
            >
              Cardápios
            </NavLink>
          </div>

          <img className="logo" src={logo} alt="minu" />

          <div className="navlink-container">
            <NavLink
              activeStyle={{ borderBottom: '3px solid #fff', fontWeight: 800 }}
              className="navlink"
              to="/estabelecimento"
            >
              Conta
            </NavLink>
          </div>
        </div>
      ) : (
        <div style={{ margin: 'auto', maxWidth: 560 }}>
          <div className="header-content">
            <NavLink className="navlink" to="/pedidos">
              <Orders
                fill={active === 'orders' ? '#535BFE' : '#cfcfcf'}
                className="tab-icon"
              />
            </NavLink>

            <NavLink className="navlink" to="/menus">
              <Menu
                fill={active === 'menu' ? '#535BFE' : '#cfcfcf'}
                className="tab-icon"
              />
            </NavLink>

            <NavLink className="navlink" to="/estabelecimento">
              <Profile
                fill={active === 'establishment' ? '#535BFE' : '#cfcfcf'}
                stroke={active === 'establishment' ? '#535BFE' : '#cfcfcf'}
                className="tab-icon"
              />
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
}
