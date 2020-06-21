import React, { useEffect, useState } from 'react';
import cepPromise from 'cep-promise';
import Select from 'react-select';

import '../styles.css';

import { estados } from '~/json/states-cities.json';

export default function Address({
  onChangeCep,
  cep,
  onChangeAddressNumber,
  addressNumber,
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
  const [width, setWidth] = useState();
  const [filled, setFilled] = useState(false);
  const [validCep, setValidCep] = useState(true);

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

  function handleResize() {
    const form = document.getElementById('form');
    if (form) {
      setWidth((form.offsetWidth - 16) / 2);
    }
  }

  window.addEventListener('resize', handleResize);

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

  function setAddress(addressCep) {
    cepPromise(addressCep)
      .then((address) => {
        onChangeStreet(address.street);
        onChangeCity(address.city);
        onChangeState(address.state);
        setValidCep(true);
      })
      .catch((name) => {
        if (name) {
          setValidCep(false);
        }
      });
  }

  function handleCepValidation(string) {
    const char = string.substr(string.length - 1);

    if (string.length === 5 && cep.length === 6) {
      onChangeCep(string.substring(0, string.length - 1));
      return;
    }
    if (string.length === 6 && cep.length === 7) {
      onChangeCep(string);
      return;
    }

    if (char >= '0' && char <= '9') {
      if (string.length === 5 && !string.includes('-')) {
        onChangeCep(`${string}-`);
      } else {
        onChangeCep(string);
      }
    } else {
      onChangeCep(string.substring(0, string.length - 1));
    }

    if (string.length === 8 && !string.includes('-')) {
      onChangeCep(`${string.substr(0, 5)}-${string.substr(5)}`);
    }

    if (string.length === 9) {
      onChangeCep(string);

      setAddress(string.replace('-', ''));
    }
  }

  const selectStyles = {
    container: (styles, isFocused) => ({
      ...styles,
      border: isFocused ? 0 : 0,
      borderRadius: 5,
      boxShadow: '0 0 6px rgba(0, 0, 0, 0.16)',
    }),
    control: (styles, { isDisabled, isFocused }) => ({
      ...styles,
      backgroundColor: isDisabled ? '#f0f0f0' : 'white',
      fontSize: 14,
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
      fontSize: 14,
      paddingLeft: 12,
    }),
    placeholder: (styles) => ({
      ...styles,
      fontSize: 14,
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
    if (cep && addressNumber && street && complement && city && state) {
      setFilled(true);
    } else {
      setFilled(false);
    }
  }, [cep, addressNumber, street, complement, city, state]);

  return (
    <>
      <form id="form">
        <p className="label">Onde fica seu restaurante?</p>
        <div className="input-group">
          <div style={{ marginRight: 8 }} className="group-input">
            <p className="input-label">CEP</p>
            <input
              name="cep"
              value={cep}
              autoFocus //eslint-disable-line
              className="form-input"
              maxLength={9}
              style={validCep ? null : { border: '2px solid #FF3636' }}
              onChange={(e) => handleCepValidation(e.target.value)}
              placeholder="77777-777"
            />
          </div>

          <div>
            <p className="input-label">Número</p>
            <input
              name="addressNumber"
              type="number"
              value={addressNumber}
              className="form-input"
              onChange={(e) => onChangeAddressNumber(e.target.value)}
              placeholder="22"
            />
          </div>
        </div>

        <p className="input-label">Rua</p>
        <input
          name="street"
          value={street}
          className="form-input"
          onChange={(e) => onChangeStreet(e.target.value)}
          placeholder="Rua Oswaldo Cruz"
        />

        <p className="input-label">Complemento</p>
        <input
          name="complement"
          value={complement}
          className="form-input"
          onChange={(e) => onChangeComplement(e.target.value)}
          placeholder="Apartamento, bloco, lote..."
        />

        <div className="input-group">
          <div className="group-input" style={{ width, marginRight: 16 }}>
            <p className="input-label">Estado</p>
            <Select
              name="state"
              styles={selectStyles}
              options={states}
              value={states.filter((estado) => estado.value === state)}
              noOptionsMessage={() => 'Não encontrado...'}
              placeholder="Selecione..."
              onChange={handleSelect}
            />
          </div>

          <div className="group-input" style={{ width }}>
            <p className="input-label">Cidade</p>
            <Select
              name="cities"
              styles={selectStyles}
              options={cities}
              value={cities.filter((cidade) => cidade.value === city)}
              placeholder="Selecione..."
              noOptionsMessage={() => 'Não encontrado...'}
              isDisabled={!state}
              onChange={(e) => {
                onChangeCity(e.value);
                onChangeCity(e.value);
              }}
            />
          </div>
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
