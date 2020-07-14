import React from 'react';

import Header from '~/components/Header';
import Accordion from '~/components/Accordion';

import { ReactComponent as Wave } from '~/assets/images/wave.svg';

import './styles.css';

export default function Inventory() {
  return (
    <div id="inventory">
      <Header />
      <div className="container">
        <div className="header">
          <p className="header-label">Adicione seus produtos!</p>
          <div className="wave">
            <Wave style={{ height: 104 }} />
          </div>
        </div>

        <div className="content">
          <Accordion title="Cardápios">
            <p className="accordion-text">Falae</p>
            <p className="accordion-text">Falae</p>
            <p className="accordion-text">Falae</p>
          </Accordion>

          <Accordion title="Produtos">
            <p className="accordion-text">Falae</p>
            <p className="accordion-text">Falae</p>
            <p className="accordion-text">Falae</p>
          </Accordion>

          <Accordion title="Adicionais">
            <p className="accordion-text">Falae</p>
            <p className="accordion-text">Falae</p>
            <p className="accordion-text">Falae</p>
          </Accordion>
        </div>
      </div>
    </div>
  );
}
