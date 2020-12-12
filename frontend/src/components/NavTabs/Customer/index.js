import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { ReactComponent as Profile } from '~/assets/icons/profile-icon.svg';
import { ReactComponent as Establishment } from '~/assets/icons/establishment-icon.svg';

import './styles.css';

export default function CustomerTab() {
  const location = useLocation();

  const session = useSelector((state) => state.session.signed);

  const [active, setActive] = useState('customer');

  useEffect(() => {
    if (location.pathname === '/sessao') setActive('session');
    else if (location.pathname === '/cliente') setActive('customer');
  }, [location.pathname]);

  return (
    <div id="customer-navtab">
      <div className="header-content">
        <NavLink className="navlink" to={session ? '/cardapio' : '/sessao'}>
          <Establishment
            fill={active === 'session' ? '#535BFE' : '#cfcfcf'}
            className="tab-icon"
          />
        </NavLink>

        <NavLink className="navlink" to="/cliente">
          <Profile
            fill={active === 'customer' ? '#535BFE' : '#cfcfcf'}
            stroke={active === 'customer' ? '#535BFE' : '#cfcfcf'}
            className="tab-icon"
          />
        </NavLink>
      </div>
    </div>
  );
}
