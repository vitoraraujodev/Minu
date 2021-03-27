import React from 'react';

import { ORDERS_TAB, TABLES_TAB } from '../../constants';

import { ReactComponent as TrayIcon } from '~/assets/icons/tray-icon.svg';
import { ReactComponent as Customer } from '~/assets/icons/profile-icon.svg';

import './styles.css';

export default function DashboardHeader({ selectedTab, onChangeTab }) {
  function handleTabSelection(tab) {
    if (selectedTab !== tab) onChangeTab(tab);
  }

  return (
    <div id="dashboard-header">
      <div className="tab">
        <button
          type="button"
          className={
            selectedTab === ORDERS_TAB ? 'tab-button-selected' : 'tab-button'
          }
          onClick={() => handleTabSelection(ORDERS_TAB)}
        >
          <TrayIcon
            width={32}
            fill={selectedTab === ORDERS_TAB ? '#535BFE' : '#cfcfcf'}
          />
        </button>
      </div>

      <div className="tab">
        <button
          type="button"
          className={
            selectedTab === TABLES_TAB ? 'tab-button-selected' : 'tab-button'
          }
          onClick={() => handleTabSelection(TABLES_TAB)}
        >
          <Customer
            width={24}
            fill={selectedTab === TABLES_TAB ? '#535BFE' : '#cfcfcf'}
          />
        </button>
      </div>
    </div>
  );
}
