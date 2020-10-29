import React from 'react';
// import PhoneInput from 'react-phone-number-input';
import PhoneInput from 'react-phone-input-2';

import './styles.css';
// import 'react-phone-number-input/style.css';
import 'react-phone-input-2/lib/style.css';

export default function PhoneNumberInput({
  focus = true,
  phoneNumber,
  onChangePhoneNumber = () => {},
  onSubmit = () => {},
}) {
  return (
    <div id="phone-input">
      <PhoneInput
        inputProps={{
          autoFocus: focus,
        }}
        country="br"
        disableDropdown
        className="phone-number-input"
        placeholder="55 (11) 99999-9999"
        defaultCountry="BR"
        value={phoneNumber}
        onKeyDown={(e) => {
          if (e.keyCode === 13) onSubmit();
        }}
        onChange={onChangePhoneNumber}
      />
    </div>
  );
}

/*
  <PhoneInput
    placeholder="11 99999-9999"
    value={phoneNumber}
    defaultCountry="BR"
    autoFocus={focus}
    onChange={onChangePhoneNumber}
  />
*/
