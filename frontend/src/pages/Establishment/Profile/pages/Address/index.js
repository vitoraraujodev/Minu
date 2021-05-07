import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cepPromise from 'cep-promise';
import Select from 'react-select';

import Header from '~/components/NavTabs/Establishment';
import PinModal from '~/components/PinModal';

import { ReactComponent as Backward } from '~/assets/icons/backward-icon.svg';
import { ReactComponent as Lock } from '~/assets/icons/lock-icon.svg';

import { updateAddressRequest } from '~/store/modules/establishment/actions';

import history from '~/services/history';

import capitalize from '~/utils/capitalize';

import { estados } from '~/json/states-cities.json';

import './styles.css';

export default function Address() {
  const { establishment, loading } = useSelector(
    (state) => state.establishment
  );
  const address = establishment.address || {};

  const dispatch = useDispatch();

  const [windowWidth, setWindowWidth] = useState(768);
  const [formWidth, setFormWidth] = useState();
  const [pinModalVisible, setPinModalVisible] = useState(false);
  const [disabled, setDisabled] = useState(false); // Colocar como true

  const [validZip, setValidZip] = useState(true);
  const [filled, setFilled] = useState(true);

  const [zip, setZip] = useState(address.zip || '');
  const [number, setNumber] = useState(address.number || '');
  const [street, setStreet] = useState(address.street || '');
  const [complement, setComplement] = useState(address.complement || '');
  const [state, setState] = useState(address.state || '');
  const [city, setCity] = useState(address.city || '');

  const citiesArray = [];
  const statesArray = [];

  estados.forEach((estado) => {
    statesArray.push({ value: estado.sigla, label: estado.sigla });
  });

  const [states] = useState(statesArray);
  const [cities, setCities] = useState([]);

  function handleSelect(data) {
    setState(data.value);
  }

  function handleResize() {
    const addressPage = document.getElementById('address-page');
    if (addressPage) {
      setWindowWidth(addressPage.offsetWidth);
    }
    const form = document.getElementById('form');
    if (form) {
      setFormWidth((form.offsetWidth - 16) / 2);
    }
  }

  useEffect(() => {
    setWindowWidth(window.innerWidth);
  }, []);

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

  function setAddress(addressZip) {
    cepPromise(addressZip)
      .then((result) => {
        setStreet(result.street);
        setCity(result.city);
        setState(result.state);
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
      setZip(string.substring(0, string.length - 1));
      return;
    }
    if (string.length === 6 && zip.length === 7) {
      setZip(string);
      return;
    }

    if (char >= '0' && char <= '9') {
      if (string.length === 5 && !string.includes('-')) {
        setZip(`${string}-`);
      } else {
        setZip(string);
      }
    } else {
      setZip(string.substring(0, string.length - 1));
    }

    if (string.length === 8 && !string.includes('-')) {
      setZip(`${string.substr(0, 5)}-${string.substr(5)}`);
    }

    if (string.length === 9) {
      setZip(string);

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
      boxShadow: '0 0 6px rgba(0, 0, 0, 0.16)',
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
      color: disabled ? '#acacac' : '#252525',
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
    if (zip && number && street && complement && city && state) {
      setFilled(true);
    } else {
      setFilled(false);
    }
  }, [zip, number, street, complement, city, state]);

  function handleSubmit() {
    const data = {
      zip,
      number,
      street: capitalize(street),
      complement,
      state: capitalize(state),
      city: capitalize(city),
    };

    dispatch(updateAddressRequest(data));
  }

  return (
    <div id="address-page">
      {windowWidth >= 768 ? <Header /> : null}

      {pinModalVisible && (
        <PinModal
          onClose={() => setPinModalVisible(false)}
          onAccess={() => setDisabled(false)}
        />
      )}

      <div className="container">
        <div className="button-container">
          <button
            style={{ color: '#606060' }}
            className="button"
            type="button"
            onClick={() => history.goBack()}
          >
            <Backward style={{ height: 16, marginRight: 4 }} fill="#606060" />
            Voltar
          </button>
          {disabled && (
            <button
              style={{ color: '#FF3636' }}
              className="button"
              type="button"
              onClick={() => setPinModalVisible(true)}
            >
              Editar
              <Lock style={{ height: 20, marginLeft: 8 }} fill="#FF3636" />
            </button>
          )}
        </div>

        <div className="content">
          <div className="input-group">
            <div style={{ marginRight: 16 }} className="group-input">
              <p className={disabled ? 'input-label-disabled' : 'input-label'}>
                CEP
              </p>
              <input
                value={zip}
                inputMode="numeric"
                autoFocus //eslint-disable-line
                className={disabled ? 'input-disabled' : 'input'}
                maxLength={9}
                disabled={disabled}
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

            <div>
              <p className={disabled ? 'input-label-disabled' : 'input-label'}>
                Número
              </p>
              <input
                type="number"
                value={number}
                disabled={disabled}
                className={disabled ? 'input-disabled' : 'input'}
                onChange={(e) => setNumber(e.target.value)}
                placeholder="22"
              />
            </div>
          </div>

          <p className={disabled ? 'input-label-disabled' : 'input-label'}>
            Rua
          </p>
          <input
            name="street"
            value={street}
            className={disabled ? 'input-disabled' : 'input'}
            disabled={disabled}
            onChange={(e) => setStreet(e.target.value)}
            placeholder="Rua Oswaldo Cruz"
          />

          <p className={disabled ? 'input-label-disabled' : 'input-label'}>
            Complemento
          </p>
          <input
            name="complement"
            value={complement}
            className={disabled ? 'input-disabled' : 'input'}
            disabled={disabled}
            onChange={(e) => setComplement(e.target.value)}
            placeholder="Apartamento, bloco, lote..."
          />

          <div className="input-group">
            <div className="group-input" style={{ formWidth, marginRight: 16 }}>
              <p className={disabled ? 'input-label-disabled' : 'input-label'}>
                Estado
              </p>
              <Select
                name="state"
                styles={selectStyles}
                options={states}
                value={states.filter((estado) => estado.value === state)}
                isDisabled={disabled}
                noOptionsMessage={() => 'Não encontrado...'}
                placeholder="Selecione..."
                onChange={handleSelect}
              />
            </div>

            <div className="group-input" style={{ formWidth }}>
              <p className={disabled ? 'input-label-disabled' : 'input-label'}>
                Cidade
              </p>
              <Select
                name="cities"
                styles={selectStyles}
                options={cities}
                value={cities.filter((cidade) => cidade.value === city)}
                placeholder="Selecione..."
                noOptionsMessage={() => 'Não encontrado...'}
                isDisabled={!state || disabled}
                onChange={(e) => {
                  setCity(e.value);
                }}
              />
            </div>
          </div>

          {windowWidth >= 768 && !disabled ? (
            <button
              className={
                filled ? 'submit-button-enabled' : 'submit-button-disabled'
              }
              onClick={filled ? handleSubmit : null}
              type="button"
            >
              Concluir
            </button>
          ) : null}
        </div>
      </div>
      {windowWidth < 768 && !disabled ? (
        <button
          className={
            filled ? 'submit-button-enabled' : 'submit-button-disabled'
          }
          onClick={filled && !loading ? handleSubmit : null}
          type="button"
        >
          {loading ? 'Carregando...' : 'Concluir'}
        </button>
      ) : null}
    </div>
  );
}
