import React, { useEffect, useRef, useState } from 'react';
import Select from 'react-select';

import '../styles.css';

import { estados } from '~/json/states-cities.json';

export default function Address({
  onChangeCep,
  onChangeAddressNumber,
  onChangeStreet,
  onChangeComplement,
  onChangeCity,
  onChangeState,
}) {
  const ref = useRef();

  const [width, setWidth] = useState();
  const citiesArray = [];
  const statesArray = [];

  estados.forEach((estado) => {
    statesArray.push({ value: estado.sigla, label: estado.sigla });
  });

  const [states] = useState(statesArray);
  const [cities, setCities] = useState([]);
  const [selectedState, setSelectedState] = useState('');

  function handleSelect(data) {
    setSelectedState(data.value);
    onChangeState(data.value);
  }

  function handleResize() {
    const form = document.getElementById('address-form');
    if (form) {
      setWidth((form.offsetWidth - 16) / 2);
    }
  }

  window.addEventListener('resize', handleResize);

  useEffect(() => {
    estados.forEach((estado) => {
      if (estado.sigla === selectedState) {
        estado.cidades.forEach((cidade) => {
          citiesArray.push({ value: cidade, label: cidade });
        });
      }
      setCities(citiesArray);
    });
  }, [selectedState]); //eslint-disable-line

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

  return (
    <form id="address-form" ref={ref}>
      <p className="label">Onde fica seu restaurante?</p>
      <div className="input-group">
        <div style={{ marginRight: 8 }} className="group-input">
          <p className="input-label">CEP</p>
          <input
            name="cep"
            type="number"
            className="form-input"
            onChange={(e) => onChangeCep(e.target.value)}
            placeholder="77777-777"
          />
        </div>

        <div>
          <p className="input-label">Número</p>
          <input
            name="addressNumber"
            type="number"
            className="form-input"
            onChange={(e) => onChangeAddressNumber(e.target.value)}
            placeholder="22"
          />
        </div>
      </div>

      <p className="input-label">Rua</p>
      <input
        name="street"
        className="form-input"
        onChange={(e) => onChangeStreet(e.target.value)}
        placeholder="Rua Oswaldo Cruz"
      />

      <p className="input-label">Complemento</p>
      <input
        name="complement"
        className="form-input"
        onChange={(e) => onChangeComplement(e.target.value)}
        placeholder="Apartamento, bloco, lote..."
      />

      <div className="input-group">
        <div className="group-input" style={{ width, marginRight: 16 }}>
          <p className="input-label">Estado</p>
          <Select
            name="state"
            options={states}
            styles={selectStyles}
            noOptionsMessage={() => 'Não encontrado...'}
            placeholder="Selecione..."
            onChange={handleSelect}
          />
        </div>

        <div className="group-input" style={{ width }}>
          <p className="input-label">Cidade</p>
          <Select
            name="cities"
            options={cities}
            styles={selectStyles}
            placeholder="Selecione..."
            noOptionsMessage={() => 'Não encontrado...'}
            isDisabled={!selectedState}
            onChange={(e) => onChangeCity(e.value)}
          />
        </div>
      </div>
    </form>
  );
}
