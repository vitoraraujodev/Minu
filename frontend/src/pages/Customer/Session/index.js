import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PinInput from 'react-pin-input';

import NavTab from '~/components/NavTabs/Customer';

import waitress from '~/assets/images/waitress.jpg';

import './styles.css';

export default function Session() {
  const [code, setCode] = useState('');
  const [inputs, setInputs] = useState([]);

  function handleCode(code) {}

  useEffect(() => {
    setInputs(document.getElementsByClassName('pincode-input-text'));
    for (let input = 0; input < inputs.length; input += 1) {
      inputs[input].setAttribute('placeholder', '•');
    }
  }, [inputs]);

  return (
    <div id="session-page">
      <NavTab />
      <div className="container">
        <div className="image-container">
          <img src={waitress} className="image" alt="" />
        </div>

        <div className="session-container">
          <p className="text-label">Insira o código da mesa</p>

          <div className="code-container">
            <PinInput
              length={5}
              onChange={(value) => {
                setCode(value);
              }}
              type="custom"
              in
              onComplete={(value) => handleCode(value)}
            />
          </div>
          <p className="qrcode-or">- Ou -</p>

          <Link to="/cliente/cadastro">
            <button type="button" className="qrcode-button">
              Entrar com QR Code
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
