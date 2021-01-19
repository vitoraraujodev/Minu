import React, { useState, useEffect } from 'react';
import PinInput from 'react-pin-input';

import leaflet from '~/assets/images/leaflet.jpg';

import history from '~/services/history';

import '../styles.css';

export default function Session() {
  const [code, setCode] = useState('');
  const [inputs, setInputs] = useState([]);
  const [invalid, setInvalid] = useState(false);

  async function handleCode() {
    // const establishment_id = parseInt(code.substr(0, 3), 10);
    // const table_number = parseInt(code.substr(3, 4), 10);

    const establishment_id = 1;

    if (code.length === 5) {
      history.push(`cardapio/${establishment_id}`);
    } else {
      setInvalid(true);
    }
  }

  useEffect(() => {
    setInputs(document.getElementsByClassName('pincode-input-text'));
    for (let input = 0; input < inputs.length; input += 1) {
      inputs[input].setAttribute('placeholder', '•');
    }
  }, [inputs]);

  return (
    <div id="session-page">
      <div className="container">
        <div className="image-container">
          <img src={leaflet} className="image" alt="" />
        </div>

        <div className="session-container" style={{ paddingBottom: 32 }}>
          <p className="text-label">Insira o código da mesa</p>

          <div className="code-container">
            <p className="hint-text">Escreva 9-9-9-9-9</p>
            <PinInput
              length={5}
              type="numeric"
              inputMode="number"
              onChange={(value) => {
                if (invalid) setInvalid(false);
                setCode(value);
              }}
            />
            {invalid && <p className="invalid-text">Código inválido</p>}
          </div>

          <button type="button" className="access-button" onClick={handleCode}>
            Acessar
          </button>
        </div>
      </div>
    </div>
  );
}

// <p className="qrcode-or">- Ou -</p>
