import React, { useEffect, useState } from 'react';
import cepPromise from 'cep-promise';
import Select from 'react-select';

import Input from '~/components/Input';

import FormButtons from '~/pages/Auth/Access/components/FormButtons';

import { estados } from '~/json/states-cities.json';

export default function Address({
  onChangeZip,
  zip,
  onChangeNumber,
  number,
  onChangeStreet,
  street,
  onChangeComplement,
  complement,
  onChangeCity,
  city,
  onChangeState,
  state,
  onBackPage,
  onNextPage,
}) {
  const [filled, setFilled] = useState(false);
  const [validZip, setValidZip] = useState(true);

  const citiesArray = [];
  const statesArray = [];

  estados.forEach((estado) => {
    statesArray.push({ value: estado.sigla, label: estado.sigla });
  });

  const [states] = useState(statesArray);
  const [cities, setCities] = useState([]);

  function handleSelect(data) {
    onChangeState(data.value);
  }

  useEffect(() => {
    estados.forEach((estado) => {
      if (estado.sigla === state) {
        estado.cidades.forEach((cidade) => {
          citiesArray.push({ value: cidade, label: cidade });
        });
      }
      setCities(citiesArray);
    });
  }, [state]); //eslint-disable-line

  function setAddress(addressZip) {
    cepPromise(addressZip)
      .then((address) => {
        onChangeStreet(address.street);
        onChangeCity(address.city);
        onChangeState(address.state);
        setValidZip(true);
      })
      .catch((name) => {
        if (name) {
          setValidZip(false);
        }
      });
  }

  function handleZipValidation(string) {
    const char = string.substr(string.length - 1);

    if (string.length === 5 && zip.length === 6) {
      onChangeZip(string.substring(0, string.length - 1));
      return;
    }
    if (string.length === 6 && zip.length === 7) {
      onChangeZip(string);
      return;
    }

    if (char >= '0' && char <= '9') {
      if (string.length === 5 && !string.includes('-')) {
        onChangeZip(`${string}-`);
      } else {
        onChangeZip(string);
      }
    } else {
      onChangeZip(string.substring(0, string.length - 1));
    }

    if (string.length === 8 && !string.includes('-')) {
      onChangeZip(`${string.substr(0, 5)}-${string.substr(5)}`);
    }

    if (string.length === 9) {
      onChangeZip(string);

      setAddress(string.replace('-', ''));
    } else {
      setValidZip(true);
    }
  }

  const selectStyles = {
    container: (styles, isFocused) => ({
      ...styles,
      border: isFocused ? 0 : 0,
      borderRadius: 5,
      boxShadow: '0 0 4px rgba(0, 0, 0, 0.16)',
    }),
    control: (styles, { isDisabled, isFocused }) => ({
      ...styles,
      backgroundColor: isDisabled ? '#f0f0f0' : 'white',
      fontSize: 15,
      height: 40,
      border: isDisabled ? 0 : 0,
      boxShadow: isFocused ? 0 : 0,
      borderColor: 'none',
    }),
    valueContainer: (styles) => ({
      ...styles,
      height: 40,
    }),
    singleValue: (styles) => ({
      ...styles,
      padding: 12,
      color: '#252525',
    }),
    option: (styles) => ({
      ...styles,
      borderBottom: '1px solid #ddd',
      padding: 12,
      fontSize: 16,
    }),
    dropdownIndicator: (styles) => ({
      ...styles,
      color: '#9C9C9C',
    }),
    indicatorSeparator: () => ({}),
    input: (styles) => ({
      ...styles,
      fontSize: 15,
      paddingLeft: 12,
    }),
    placeholder: (styles) => ({
      ...styles,
      fontSize: 15,
      padding: 12,
      color: '#9C9C9C',
      height: 40,
    }),
    menu: (styles) => ({
      ...styles,
      fontSize: 16,
    }),
  };

  useEffect(() => {
    if (zip && number && street && city && state) {
      setFilled(true);
    } else {
      setFilled(false);
    }
  }, [zip, number, street, city, state]);

  return (
    <div className="form-container">
      <p className="label">Onde fica seu restaurante?</p>

      <div className="input-group">
        <div style={{ flex: 3, marginRight: 8 }}>
          <p className="input-label">CEP</p>
          <Input
            value={zip}
            variant="tertiary"
            inputMode="numeric"
            maxLength={9}
            style={validZip ? null : { border: '2px solid #FF3636' }}
            onFocus={() => {
              if (zip.length !== 9) {
                setValidZip(true);
              }
            }}
            onBlur={() => {
              if (zip.length < 9) {
                setValidZip(false);
              }
            }}
            onChange={(e) => handleZipValidation(e.target.value)}
            placeholder="77777-777"
          />
        </div>

        <div style={{ flex: 2 }}>
          <p className="input-label">Número</p>
          <Input
            variant="tertiary"
            inputMode="numeric"
            type="number"
            value={number}
            className="form-input"
            onChange={(e) => onChangeNumber(e.target.value)}
            placeholder="22"
          />
        </div>
      </div>

      <p className="input-label">Rua</p>
      <Input
        variant="tertiary"
        value={street}
        onChange={(e) => onChangeStreet(e.target.value)}
        placeholder="Rua Oswaldo Cruz"
      />

      <p className="input-label">Complemento</p>
      <Input
        variant="tertiary"
        value={complement}
        onKeyDown={(e) => {
          if (e.keyCode === 13 && filled) {
            onNextPage();
          }
        }}
        onChange={(e) => onChangeComplement(e.target.value)}
        placeholder="Apartamento, bloco, lote..."
      />

      <div className="input-group">
        <div style={{ width: '100%', marginRight: 16 }}>
          <p className="input-label">Estado</p>
          <Select
            styles={selectStyles}
            options={states}
            value={states.filter((estado) => estado.value === state)}
            noOptionsMessage={() => 'Não encontrado...'}
            placeholder="Selecione..."
            onChange={handleSelect}
          />
        </div>

        <div style={{ width: '100%' }}>
          <p className="input-label">Cidade</p>
          <Select
            styles={selectStyles}
            options={cities}
            value={cities.filter((cidade) => cidade.value === city)}
            placeholder="Selecione..."
            noOptionsMessage={() => 'Não encontrado...'}
            isDisabled={!state}
            onChange={(e) => {
              onChangeCity(e.value);
            }}
          />
        </div>
      </div>

      <FormButtons onBack={onBackPage} onNext={onNextPage} filled={filled} />
    </div>
  );
}
