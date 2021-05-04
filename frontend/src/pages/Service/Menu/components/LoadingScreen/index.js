import React from 'react';

import Loader from '~/components/Loader';

import './styles.css';

export default function LoadingScreen() {
  return (
    <div id="loading-screen-component">
      <Loader size={40} />
      <p className="loading-text">Carregando...</p>
    </div>
  );
}
