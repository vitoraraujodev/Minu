import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import { ReactComponent as Profile } from '~/assets/images/profile-icon.svg';

import { ReactComponent as Menu } from '~/assets/images/menu-icon.svg';
import { ReactComponent as Orders } from '~/assets/images/orders-icon.svg';

import logo from '~/assets/images/simple-logo.svg';

import './styles.css';

export default function Header() {
  const [windowWidth, setWindowWidth] = useState();
  const [active, setActive] = useState('');

  function handleResize() {
    const tabnavigator = document.getElementById('tabnavigator');
    if (tabnavigator) {
      setWindowWidth(tabnavigator.offsetWidth);
    }
  }

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
              to="/menu"
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
            <NavLink
              activeStyle={{ color: '#535BFE' }}
              className="navlink"
              to="/orders"
              isActive={() => {
                setActive('orders');
              }}
            >
              <Orders
                fill={active === 'orders' ? '#535BFE' : '#cfcfcf'}
                className="tab-icon"
              />
            </NavLink>
            <NavLink
              activeStyle={{ color: '#535BFE' }}
              className="navlink"
              to="/menu"
              isActive={() => {
                setActive('menu');
              }}
            >
              <Menu
                fill={active === 'menu' ? '#535BFE' : '#cfcfcf'}
                className="tab-icon"
              />
            </NavLink>
            <NavLink
              activeStyle={{ color: '#535BFE' }}
              className="navlink"
              to="/establishment"
              isActive={() => {
                setActive('profile');
              }}
            >
              <Profile
                fill={active === 'profile' ? '#535BFE' : '#cfcfcf'}
                className="tab-icon"
              />
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
}
