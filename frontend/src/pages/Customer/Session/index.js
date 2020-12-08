import React, { useState, useEffect } from 'react';
import PinInput from 'react-pin-input';

import NavTab from '~/components/NavTabs/Customer';

import leaflet from '~/assets/images/leaflet.png';

import api from '~/services/api';
import history from '~/services/history';

import './styles.css';

export default function Session() {
  const [code, setCode] = useState('');
  const [inputs, setInputs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [invalid, setInvalid] = useState(false);

  async function handleCode() {
    setLoading(true);
    const establishment_id = parseInt(code.substr(0, 3), 10);
    const table_number = parseInt(code.substr(3, 4), 10);

    if (code.length === 5) {
      try {
        await api.post('service-sessions', {
          establishment_id,
          table_number,
        });
        setLoading(false);
        history.push('/cardapio');
      } catch (err) {
        setInvalid(true);
        if (err.response) alert(err.response.data.error);
        setLoading(false);
      }
    } else {
      setInvalid(true);
      setLoading(false);
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
      <NavTab />

      <div className="container">
        <div className="image-container">
          <img src={leaflet} className="image" alt="" />
        </div>

        <div className="session-container">
          <p className="text-label">Insira o código da mesa</p>

          <div className="code-container">
            <PinInput
              length={5}
              onChange={(value) => {
                if (invalid) setInvalid(false);
                setCode(value);
              }}
              type="custom"
            />
            {invalid && <p className="invalid-text">Código inválido</p>}
          </div>

          <button type="button" className="qrcode-button" onClick={handleCode}>
            {loading ? 'Carregando...' : 'Acessar'}
          </button>
        </div>
      </div>
    </div>
  );
}

// <p className="qrcode-or">- Ou -</p>
