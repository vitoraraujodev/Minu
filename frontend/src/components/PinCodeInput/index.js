import React, { useState, useRef } from 'react';

import './styles.css';

export default function PinCodeInput({
  adminPin = '    ',
  onChangeAdminPin,
  disabled = false,
}) {
  const [firstInput, setFirstInput] = useState(adminPin[0]);
  const [secondInput, setSecondInput] = useState(adminPin[1]);
  const [thirdInput, setThirdInput] = useState(adminPin[2]);
  const [fourthInput, setFourthInput] = useState(adminPin[3]);

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

  return (
    <div id="pin-input">
      <input
        className="pin-input"
        type="number"
        maxLength="1"
        value={firstInput}
        ref={firstInputRef}
        disabled={disabled}
        onKeyDown={(e) => {
          if (e.keyCode === 39) {
            secondInputRef.current.focus();
          }
        }}
        onChange={(e) => {
          handleInput(e.target.value, 0);
          if (e.target.value) {
            secondInputRef.current.focus();
          }
        }}
        placeholder="0"
      />
      <input
        className="pin-input"
        type="number"
        maxLength="1"
        value={secondInput}
        ref={secondInputRef}
        disabled={disabled}
        onKeyDown={(e) => {
          if (e.keyCode === 8 && !secondInput) {
            handleInput('', 0);
            firstInputRef.current.focus();
          } else if (e.keyCode === 37) {
            firstInputRef.current.focus();
          } else if (e.keyCode === 39) {
            thirdInputRef.current.focus();
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
        className="pin-input"
        type="number"
        maxLength="1"
        value={thirdInput}
        ref={thirdInputRef}
        disabled={disabled}
        onKeyDown={(e) => {
          if (e.keyCode === 8 && !thirdInput) {
            handleInput('', 1);
            secondInputRef.current.focus();
          } else if (e.keyCode === 37) {
            secondInputRef.current.focus();
          } else if (e.keyCode === 39) {
            fourthInputRef.current.focus();
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
        className="pin-input"
        type="number"
        style={{ marginRight: 0 }}
        maxLength="1"
        value={fourthInput}
        ref={fourthInputRef}
        disabled={disabled}
        onKeyDown={(e) => {
          if (e.keyCode === 8 && !fourthInput) {
            handleInput('', 2);
            thirdInputRef.current.focus();
          } else if (e.keyCode === 37) {
            thirdInputRef.current.focus();
          }
        }}
        onChange={(e) => {
          handleInput(e.target.value, 3);
        }}
        placeholder="0"
      />
    </div>
  );
}
