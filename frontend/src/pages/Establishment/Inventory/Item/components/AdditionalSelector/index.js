import React, { useState, useEffect } from 'react';
import CurrencyInput from 'react-currency-input';

import { ReactComponent as Backward } from '~/assets/icons/backward-icon.svg';
import { ReactComponent as Foward } from '~/assets/icons/foward-icon.svg';
import { ReactComponent as SaveIcon } from '~/assets/icons/save-icon.svg';
import {
  ReactComponent as AddIcon,
  ReactComponent as RemoveIcon,
} from '~/assets/icons/add-icon.svg';

import api from '~/services/api';

import { formatPrice } from '~/util/format';

import './styles.css';

export default function AdditionalSelector({
  onClose,
  windowWidth,
  selectedAdditionals,
  onChangeAdditionals,
}) {
  const [additionalForm, setAdditionalForm] = useState(false);

  const [additionals, setAdditionals] = useState([]);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState(0.0);
  const [maskedPrice, setMaskedPrice] = useState('R$ 0,00');

  async function loadAdditionals() {
    try {
      const response = await api.get('additionals');
      setAdditionals(response.data);
    } catch (err) {
      alert(
        'Não foi possível carregar suas informações. Por favor, tente mais tarde.'
      );
    }
  }

  useEffect(() => {
    loadAdditionals();
  }, []);

  function checkAdditional(additional) {
    const additionalExists = selectedAdditionals.filter(
      (add) => add.id === additional.id
    );

    if (additionalExists.length !== 0) return true;
    return false;
  }

  function handleSelectedAdditional(additional) {
    if (checkAdditional(additional)) {
      onChangeAdditionals(
        selectedAdditionals.filter((add) => add.id !== additional.id)
      );
    } else {
      onChangeAdditionals([...selectedAdditionals, additional]);
    }
  }

  useEffect(() => {
    let newPrice = maskedPrice;
    newPrice = newPrice.replace('R', '');
    newPrice = newPrice.replace('$', '');
    newPrice = newPrice.replace(' ', '');
    newPrice = newPrice.replace(',', '.');

    setPrice(newPrice);
  }, [maskedPrice]);

  async function handleSubmit() {
    const data = {
      title,
      price,
    };

    try {
      const response = await api.post('additionals', data);
      setAdditionals([
        { ...response.data, priceFormatted: formatPrice(response.data.price) },
        ...additionals,
      ]);
      handleSelectedAdditional(response.data);
      setAdditionalForm(false);
      setTitle('');
      setMaskedPrice('R$ 0,00');
    } catch (err) {
      if (err.response) alert(err.response.data.error);
    }
  }

  return (
    <div
      id="additional-selector"
      style={windowWidth < 768 ? { width: windowWidth } : null}
    >
      <div className="additional-content">
        <div className="header">
          <button className="back-button" type="button" onClick={onClose}>
            <Backward style={{ height: 16, marginRight: 4 }} fill="#fff" />
            Voltar
          </button>

          <p className="header-label">Adicionais</p>

          {selectedAdditionals.length > 0 && (
            <div className="amount-container">
              <p className="amount">{selectedAdditionals.length}</p>
            </div>
          )}

          <div />
        </div>

        {additionalForm ? (
          <div className="additional-form">
            <input
              className="additional-title-input"
              autoFocus // eslint-disable-line
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Queijo, Bacon.."
            />
            <CurrencyInput
              inputMode="numeric"
              value={maskedPrice}
              decimalSeparator=","
              prefix="R$ "
              className="additional-price-input"
              thousandSeparator="."
              onChangeEvent={(e) => {
                setMaskedPrice(e.target.value);
              }}
            />
            {title ? (
              <div className="icon-area" onClick={handleSubmit}>
                <SaveIcon style={{ height: 20 }} />
              </div>
            ) : (
              <div
                className="remove-icon-area"
                onClick={() => setAdditionalForm(false)}
              >
                <RemoveIcon fill="#535BFE" />
              </div>
            )}
          </div>
        ) : (
          <div
            className="add-item-container"
            onClick={() => setAdditionalForm(true)}
          >
            <div className="add-item-area">
              <AddIcon
                style={{ height: 16, marginRight: 8, minWidth: 16 }}
                fill="#535BFE"
              />
              <p>Novo adicional</p>
            </div>
          </div>
        )}
        {additionals.length === 0 && (
          <h3 className="empty-text">
            Você ainda não possui
            <br />
            adicionais cadastrados
          </h3>
        )}

        {additionals.map((additional) => (
          <div
            key={additional.id}
            className="additional-area"
            onClick={() => handleSelectedAdditional(additional)}
          >
            <div
              className={
                checkAdditional(additional)
                  ? 'additional-selected'
                  : 'additional'
              }
            >
              <p className="additional-title">{additional.title}</p>
              <p>{formatPrice(additional.price)}</p>
            </div>
          </div>
        ))}
      </div>
      {additionals.length !== 0 && (
        <button
          className="submit-additional-container"
          onClick={onClose}
          type="button"
        >
          <Foward style={{ height: 25 }} fill="#fff" />
        </button>
      )}
    </div>
  );
}
