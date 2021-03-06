import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { ReactComponent as Profile } from '~/assets/icons/profile-icon.svg';
import { ReactComponent as MenuActive } from '~/assets/icons/menu-icon-active.svg';
import { ReactComponent as Menu } from '~/assets/icons/menu-icon.svg';
import { ReactComponent as Orders } from '~/assets/icons/orders-icon.svg';

import { ReactComponent as Logo } from '~/assets/icons/simple-logo.svg';

import { inventoryAccess } from '~/store/modules/establishment/actions';

import './styles.css';

export default function EstablishmentTab() {
  const dispatch = useDispatch();
  const location = useLocation();
  const accessed = useSelector(
    (state) => state.establishment.inventoryAccessed
  );

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [active, setActive] = useState();

  async function handleResize() {
    const tabnavigator = document.getElementById('establishment-navtab');
    if (tabnavigator && tabnavigator.offsetWidth !== windowWidth) {
      setWindowWidth(tabnavigator.offsetWidth);
    }
  }

  useEffect(() => {
    if (location.pathname === '/dashboard') setActive('orders');
    else if (location.pathname === '/inventario') setActive('menu');
    else if (location.pathname === '/estabelecimento')
      setActive('establishment');

    if (location.pathname.substr(0, 11) !== '/inventario' && accessed) {
      dispatch(inventoryAccess(false));
    }
  }, [location.pathname, dispatch, accessed]);

  useEffect(() => {
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  window.addEventListener('resize', handleResize);

  //

  //

  return (
    <div id="establishment-navtab">
      {windowWidth >= 768 ? (
        <div className="header-content">
          <div className="navlink-container">
            <NavLink
              activeStyle={{ borderBottom: '3px solid #fff', fontWeight: 800 }}
              className="navlink"
              to="/dashboard"
            >
              Pedidos
            </NavLink>

            <NavLink
              activeStyle={{ borderBottom: '3px solid #fff', fontWeight: 800 }}
              className="navlink"
              to="/inventario"
            >
              Cardápios
            </NavLink>
          </div>
          <div className="header-logo">
            <Logo width={64} fill="#fff" />
          </div>
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
        <div className="header-content">
          <NavLink className="navlink" to="/dashboard">
            <Orders
              fill={active === 'orders' ? '#535BFE' : '#cfcfcf'}
              className="tab-icon"
            />
          </NavLink>

          <NavLink className="navlink" to="/inventario">
            {active === 'menu' ? (
              <MenuActive className="tab-icon" />
            ) : (
              <Menu className="tab-icon" />
            )}
          </NavLink>

          <NavLink className="navlink" to="/estabelecimento">
            <Profile
              fill={active === 'establishment' ? '#535BFE' : '#cfcfcf'}
              stroke={active === 'establishment' ? '#535BFE' : '#cfcfcf'}
              className="tab-icon"
            />
          </NavLink>
        </div>
      )}
    </div>
  );
}
