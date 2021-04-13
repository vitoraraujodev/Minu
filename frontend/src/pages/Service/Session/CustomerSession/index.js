import React, { useState, useEffect } from 'react';
import PinInput from 'react-pin-input';
import { useDispatch, useSelector } from 'react-redux';

import NavTab from '~/components/NavTabs/Customer';

import leaflet from '~/assets/images/leaflet.jpg';

import { checkInRequest } from '~/store/modules/serviceSession/actions';

import '../styles.css';

export default function CustomerSession() {
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.serviceSession.loading);

  const [code, setCode] = useState('');
  const [inputs, setInputs] = useState([]);
  const [invalid, setInvalid] = useState(false);

  async function handleCode() {
    // const establishment_id = parseInt(code.substr(0, 3), 10);
    // const table_number = parseInt(code.substr(3, 4), 10);

    const establishment_id = 1;
    const table_number = 2;

    if (code.length === 5) {
      dispatch(checkInRequest(establishment_id, table_number));
    } else {
      setInvalid(true);
    }
  }

  // useEffect(() => {
  //   dispatch(checkSession());
  // }, []);

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
          <p className="text-label">Insira o código da sua mesa</p>

          <div className="code-container">
            <PinInput
              length={5}
              type="numeric"
              inputMode="number"
              onChange={(value) => {
                if (invalid) setInvalid(false);
                setCode(value);
              }}
              onComplete={() => {
                if (document.activeElement === inputs[4]) inputs[4].blur();
              }}
            />
            {invalid && <p className="invalid-text">Código inválido</p>}
          </div>

          <button type="button" className="access-button" onClick={handleCode}>
            {loading ? 'Carregando...' : 'Acessar'}
          </button>
        </div>
      </div>
    </div>
  );
}

// <p className="qrcode-or">- Ou -</p>
