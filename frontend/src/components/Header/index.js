import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import { ReactComponent as Profile } from '~/assets/icons/profile-icon.svg';
import { ReactComponent as Menu } from '~/assets/icons/menu-icon.svg';
import { ReactComponent as Orders } from '~/assets/icons/orders-icon.svg';

import logo from '~/assets/icons/simple-logo.svg';

import './styles.css';

export default function Header() {
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
    if (location.pathname === '/orders') setActive('orders');
    if (location.pathname === '/menus') setActive('menu');
    if (location.pathname === '/establishment') setActive('establishment');
  }, [location.pathname]);

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
              to="/orders"
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
              to="/establishment"
            >
              Conta
            </NavLink>
          </div>
        </div>
      ) : (
        <div style={{ margin: 'auto', maxWidth: 560 }}>
          <div className="header-content">
            <NavLink className="navlink" to="/orders">
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

            <NavLink className="navlink" to="/establishment">
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
