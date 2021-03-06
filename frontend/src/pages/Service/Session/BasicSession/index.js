import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PinInput from 'react-pin-input';

import leaflet from '~/assets/images/leaflet.jpg';

import history from '~/services/history';

import { removeSessionEstablishment } from '~/store/modules/session/actions';

import '../styles.css';

export default function Session() {
  const dispatch = useDispatch();

  const stateEstablishment = useSelector(
    (state) => state.session.establishment
  );

  const [code, setCode] = useState('');
  const [inputs, setInputs] = useState([]);
  const [invalid, setInvalid] = useState(false);

  async function handleCode() {
    if (code.length === 5) {
      history.push(`cardapio/${code}`);
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

  useEffect(() => {
    if (stateEstablishment) dispatch(removeSessionEstablishment());
  }, [stateEstablishment]); //eslint-disable-line

  return (
    <div id="session-page">
      <div className="container">
        <div className="image-container">
          <img src={leaflet} className="image" alt="" />
        </div>

        <div className="session-container" style={{ paddingBottom: 32 }}>
          <p className="text-label">Insira o código da sua mesa</p>

          <div className="code-container">
            <PinInput
              id="pin-input"
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
            Acessar
          </button>
        </div>
      </div>
    </div>
  );
}

// <p className="qrcode-or">- Ou -</p>
