import React from 'react';
import { Link } from 'react-router-dom';

import './styles.css';

export default function End() {
  return (
    <>
      <div className="circle-container">
        <div className="circle" />
      </div>
      <div style={{ textAlign: 'center', zIndex: 5 }}>
        <h1 className="done-text">
          Cadastro
          <br />
          Concluído!
        </h1>
        <Link to="/menu/new">
          <button className="menu-button" type="button">
            Faça seu cardápio!
          </button>
        </Link>
        <Link to="/establishment">
          <button className="later-button" type="button">
            Deixar para depois
          </button>
        </Link>
      </div>
    </>
  );
}
