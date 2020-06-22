import React, { useState, useEffect, useRef } from 'react';

import '../styles.css';

export default function AdmPin({
  adminPin,
  onChangeAdminPin,
  onBackPage,
  onNextPage,
}) {
  const [filled, setFilled] = useState(false);

  const [firstInput, setFirstInput] = useState('');
  const [secondInput, setSecondInput] = useState('');
  const [thirdInput, setThirdInput] = useState('');
  const [fourthInput, setFourthInput] = useState('');

  const firstInputRef = useRef(null);
  const secondInputRef = useRef(null);
  const thirdInputRef = useRef(null);
  const fourthInputRef = useRef(null);

  function handleInput(value, index) {
    let pin = firstInput + secondInput + thirdInput + fourthInput;
    switch (index) {
      case 0:
        setFirstInput(value[0] || '');
        pin = `${value[0] || ''}${secondInput}${thirdInput}${fourthInput}`;
        break;
      case 1:
        setSecondInput(value[0] || '');
        pin = `${firstInput}${value[0] || ''}${thirdInput}${fourthInput}`;
        break;
      case 2:
        setThirdInput(value[0] || '');
        pin = `${firstInput + secondInput}${value[0] || ''}${fourthInput}`;
        break;
      case 3:
        setFourthInput(value[0] || '');
        pin = `${firstInput + secondInput + thirdInput}${value[0] || ''}`;
        break;
      default:
    }

    onChangeAdminPin(pin);
  }

  useEffect(() => {
    console.tron.log(adminPin);
    if (adminPin.length === 4) {
      setFilled(true);
    } else {
      setFilled(false);
    }
  }, [adminPin]);

  return (
    <>
      <form id="form">
        <p className="label">Para finalizar</p>
        <p style={{ fontWeight: 600, marginTop: 28 }} className="input-label">
          Crie o PIN dos administradores
        </p>
        <p className="sub-label">
          Será necessária para fazer alterações em configurações e cardápios
        </p>
        <div id="pin-input">
          <input
            className="form-input"
            type="number"
            maxLength="1"
            value={firstInput}
            ref={firstInputRef}
            autoFocus //eslint-disable-line
            onChange={(e) => {
              handleInput(e.target.value, 0);
              if (e.target.value) {
                secondInputRef.current.focus();
              }
            }}
            placeholder="0"
          />
          <input
            className="form-input"
            type="number"
            maxLength="1"
            value={secondInput}
            ref={secondInputRef}
            onKeyDown={(e) => {
              if (e.keyCode === 8) {
                if (!secondInput) {
                  handleInput('', 0);
                  firstInputRef.current.focus();
                }
              }
            }}
            onChange={(e) => {
              handleInput(e.target.value, 1);
              if (e.target.value) {
                thirdInputRef.current.focus();
              }
            }}
            placeholder="0"
          />
          <input
            className="form-input"
            type="number"
            maxLength="1"
            value={thirdInput}
            ref={thirdInputRef}
            onKeyDown={(e) => {
              if (e.keyCode === 8) {
                if (!thirdInput) {
                  handleInput('', 1);
                  secondInputRef.current.focus();
                }
              }
            }}
            onChange={(e) => {
              handleInput(e.target.value, 2);
              if (e.target.value) {
                fourthInputRef.current.focus();
              }
            }}
            placeholder="0"
          />
          <input
            className="form-input"
            type="number"
            style={{ marginRight: 0 }}
            maxLength="1"
            value={fourthInput}
            ref={fourthInputRef}
            onKeyDown={(e) => {
              if (e.keyCode === 8) {
                if (!fourthInput) {
                  handleInput('', 2);
                  thirdInputRef.current.focus();
                }
              }
            }}
            onChange={(e) => {
              handleInput(e.target.value, 3);
            }}
            placeholder="0"
          />
        </div>
      </form>

      <div className="buttons-container">
        <button
          style={{ color: '#9C9C9C' }}
          className="page-button"
          type="button"
          onClick={onBackPage}
        >
          Voltar
        </button>
        <button
          style={filled ? { color: '#535BFE' } : { color: '#9C9C9C' }}
          className="page-button"
          type="button"
          disabled={!filled}
          onClick={onNextPage}
        >
          Avançar
        </button>
      </div>
    </>
  );
}
