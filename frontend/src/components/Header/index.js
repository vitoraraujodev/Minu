import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import logo from '~/assets/images/waitress.jpg';

import './styles.css';

export default function Header() {
  const [windowWidth, setWindowWidth] = useState();

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
        <div className="content">
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
        <div className="content">
          <NavLink
            activeStyle={{ color: '#535BFE' }}
            className="navlink"
            to="/orders"
          >
            Pedidos
          </NavLink>
          <NavLink
            activeStyle={{ color: '#535BFE' }}
            className="navlink"
            to="/menu"
          >
            Cardápios
          </NavLink>
          <NavLink
            activeStyle={{ color: '#535BFE' }}
            className="navlink"
            to="/establishment"
          >
            Conta
          </NavLink>
        </div>
      )}
    </div>
  );
}
