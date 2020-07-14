import React, { useState } from 'react';

import Header from '~/components/Header';
import PinModal from '~/components/PinModal';
import Accordion from '~/components/Accordion';

import { ReactComponent as Wave } from '~/assets/images/wave.svg';
import { ReactComponent as Lock } from '~/assets/images/edit-lock.svg';

import './styles.css';

export default function Inventory() {
  const [disabled, setDisabled] = useState(true);
  const [pinModalVisible, setPinModalVisible] = useState(false);

  return (
    <div id="inventory">
      <Header />

      {pinModalVisible && (
        <PinModal
          onClose={() => setPinModalVisible(false)}
          onAccess={() => setDisabled(false)}
        />
      )}

      <div className="container">
        <div className="header">
          <p className="header-label">Adicione seus produtos!</p>
          <div className="wave">
            <Wave style={{ height: 104 }} />
          </div>
        </div>

        <div className="content">
          <Accordion title="Cardápios" disabled={disabled}>
            <p className="accordion-text">Falae</p>
            <p className="accordion-text">Falae</p>
            <p className="accordion-text">Falae</p>
          </Accordion>

          <Accordion title="Produtos" disabled={disabled}>
            <p className="accordion-text">Falae</p>
            <p className="accordion-text">Falae</p>
            <p className="accordion-text">Falae</p>
          </Accordion>

          <Accordion title="Adicionais" disabled={disabled}>
            <p className="accordion-text">Falae</p>
            <p className="accordion-text">Falae</p>
            <p className="accordion-text">Falae</p>
          </Accordion>
        </div>

        {disabled && (
          <div
            className="lock-container"
            onClick={() => {
              setPinModalVisible(true);
            }}
          >
            <Lock style={{ height: 72 }} />
          </div>
        )}
      </div>
    </div>
  );
}
