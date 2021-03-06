import React, { useState, useEffect } from 'react';
import CurrencyInput from 'react-currency-input';

import Actions from '~/components/Actions';

import { ReactComponent as SaveIcon } from '~/assets/icons/save-icon.svg';

import api from '~/services/api';

import capitalize from '~/utils/capitalize';

import './styles.css';

export default function Additional({
  additional,
  onChangeAvailable,
  onDelete,
}) {
  const [title, setTitle] = useState(additional.title);
  const [price, setPrice] = useState(additional.price);
  const [maskedPrice, setMaskedPrice] = useState(
    additional.price.toString().replace('.', ',')
  );
  const [changed, setChanged] = useState(false);

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
      title: capitalize(title),
      price,
    };

    try {
      await api.put(`additionals/${additional.id}`, data);
      setChanged(false);
    } catch (err) {
      if (err.response) alert(err.response.data.error);
    }
  }

  return (
    <div className="item-container">
      <div className="additional-form">
        <input
          className={
            additional.available
              ? 'additional-title-input'
              : 'additional-title-input-disabled'
          }
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setChanged(true);
          }}
          placeholder="Queijo, Bacon.."
        />
        <CurrencyInput
          inputMode="numeric"
          value={maskedPrice}
          decimalSeparator=","
          prefix="R$ "
          className={
            additional.available
              ? 'additional-price-input'
              : 'additional-price-input-disabled'
          }
          thousandSeparator="."
          onChangeEvent={(e) => {
            setMaskedPrice(e.target.value);
            setChanged(true);
          }}
        />
      </div>
      <div className="icon-area" onClick={changed ? handleSubmit : null}>
        {changed ? (
          <SaveIcon style={{ height: 22 }} />
        ) : (
          <Actions
            id={additional.id}
            available={additional.available}
            route="additionals"
            onDelete={onDelete}
            onChangeAvailable={onChangeAvailable}
            fill="#535BFE"
          />
        )}
      </div>
    </div>
  );
}
