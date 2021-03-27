import React, { useState } from 'react';

import Orders from './pages/Orders';
import Tables from './pages/Tables';

import DashboardHeader from './components/DashboardHeader';

import Header from '~/components/NavTabs/Establishment';

import { ORDERS_TAB, TABLES_TAB } from './constants';

import './styles.css';

export default function Dashboard() {
  const [selectedTab, setSelectedTab] = useState(ORDERS_TAB);

  return (
    <div id="dashboard-page">
      <Header />

      <div className="container">
        <DashboardHeader
          selectedTab={selectedTab}
          onChangeTab={setSelectedTab}
        />

        {selectedTab === ORDERS_TAB && <Orders />}

        {selectedTab === TABLES_TAB && <Tables />}
      </div>
    </div>
  );
}
