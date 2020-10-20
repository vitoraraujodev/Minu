import React from 'react';
import PhoneInput from 'react-phone-number-input';

import './styles.css';
import 'react-phone-number-input/style.css';

export default function PhoneNumberInput({
  focus = true,
  phoneNumber,
  onChangePhoneNumber = () => {},
}) {
  return (
    <div id="phone-input">
      <PhoneInput
        placeholder="11 99999-9999"
        value={phoneNumber}
        defaultCountry="BR"
        autoFocus={focus}
        onChange={onChangePhoneNumber}
      />
    </div>
  );
}
