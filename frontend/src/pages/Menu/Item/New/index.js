import React, { useState, useEffect } from 'react';
import CurrencyInput from 'react-currency-input';
import { Prompt } from 'react-router-dom';

import Header from '~/components/Header';

import { ReactComponent as Backward } from '~/assets/icons/backward-icon.svg';
import { ReactComponent as ExpandArrow } from '~/assets/icons/expand-arrow.svg';
import { ReactComponent as AddIcon } from '~/assets/icons/add-icon.svg';
import defaultPicture from '~/assets/images/default-picture.png';

import api from '~/services/api';
import history from '~/services/history';

import './styles.css';

function NewItem() {
  const [windowWidth, setWindowWidth] = useState(768);
  const [submit, setSubmit] = useState(false);
  const [photo, setPhoto] = useState('');

  const [file, setFile] = useState();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [preparationTime, setPreparationTime] = useState(1);
  const [category, setCategory] = useState('');
  const [additionals, setAdditionals] = useState([]);
  const [maskedPrice, setMaskedPrice] = useState('');

  function handleResize() {
    const newItemPage = document.getElementById('item-page');
    if (newItemPage) {
      setWindowWidth(newItemPage.offsetWidth);
    }
  }

  useEffect(() => {
    setWindowWidth(window.innerWidth);
  }, []);

  window.addEventListener('resize', handleResize);

  useEffect(() => {
    let newPrice = maskedPrice;
    newPrice = newPrice.replace('R', '');
    newPrice = newPrice.replace('$', '');
    newPrice = newPrice.replace(' ', '');
    newPrice = newPrice.replace(',', '.');

    setPrice(newPrice);
  }, [maskedPrice]);

  function handlePreparationTime(value) {
    if (preparationTime + value !== 0)
      setPreparationTime(preparationTime + value);
  }

  async function handleDelete() {
    if (file && !submit) {
      await api.delete(`files/${file}`);
    }
  }

  async function handleChange(e) {
    if (file) handleDelete(file);

    const data = new FormData();

    data.append('file', e.target.files[0]);

    try {
      const response = await api.post('files', data);
      const { id, url } = response.data;

      setFile(id);
      setPhoto(url);
    } catch (err) {
      alert(
        'Houve um erro ao salvar sua foto. Por favor, tente novamente mais tarde...'
      );
    }
  }

  return (
    <div id="item-page">
      {windowWidth >= 768 ? <Header /> : null}

      <Prompt when={file} message={handleDelete} />

      <div className="container">
        <div className="header">
          <button
            className="back-button"
            type="button"
            onClick={() => history.goBack()}
          >
            <Backward style={{ height: 16, marginRight: 4 }} fill="#fff" />
            Voltar
          </button>

          <p className="product-label">Produto 01</p>
        </div>

        <div className="content">
          <div className="img-input">
            <div className="img-container">
              <img
                src={photo || defaultPicture}
                onError={(e) => {
                  e.target.src = defaultPicture;
                }}
                className="item-img"
                alt="item-img"
              />
            </div>
            <button className="img-button" type="button">
              <label className="img-label" htmlFor="photo">
                <input
                  id="photo"
                  type="file"
                  accept="image/*"
                  data-file={file}
                  onChange={handleChange}
                />
                Carregar foto
              </label>
            </button>
          </div>

          <p className="input-label">Nome do produto</p>
          <input className="input" placeholder="X-Burger Especial" />

          <p className="input-label">
            Descrição{' '}
            <span style={{ color: '#9c9c9c', fontSize: 14 }}>(opcional)</span>
          </p>
          <input
            className="input"
            placeholder="Hamburguer de carne com queijo..."
          />

          <div className="input-group">
            <div>
              <p className="input-label">Preço</p>
              <CurrencyInput
                value={maskedPrice}
                style={{ color: '#6E6E6E' }}
                decimalSeparator=","
                prefix="R$ "
                className="input"
                thousandSeparator="."
                onChangeEvent={(e) => setMaskedPrice(e.target.value)}
              />
            </div>

            <div className="preparation-time-container">
              <p className="input-label">Tempo de preparo</p>
              <div className="preparation-time">
                <button
                  type="button"
                  className={
                    preparationTime === 1
                      ? 'circle-button-disabled'
                      : 'circle-button'
                  }
                  onClick={() => handlePreparationTime(-1)}
                >
                  <ExpandArrow
                    style={{ height: 12, opacity: 0.7 }}
                    fill={preparationTime > 1 ? '#535bfe' : '#acacac'}
                  />
                </button>

                <div className="preparation-input">
                  <span className="time-text">
                    {preparationTime === 1
                      ? '1-5min'
                      : `${(preparationTime - 1) * 5}-${
                          preparationTime * 5
                        }min`}
                  </span>
                </div>

                <button
                  type="button"
                  className="circle-button-up"
                  onClick={() => handlePreparationTime(1)}
                >
                  <ExpandArrow
                    style={{ height: 12, opacity: 0.7 }}
                    fill="#535BFE"
                  />
                </button>
              </div>
            </div>
          </div>

          <p className="input-label">Categoria</p>
          <div className="category-input">
            <p style={category ? { color: '#444' } : { color: '#9c9c9c' }}>
              Selecionar categoria
            </p>
            <div className="category-arrow">
              <ExpandArrow style={{ height: 8 }} fill="#444" />
            </div>
          </div>

          <p className="input-label">Adicionais</p>
          <div className="additional-container">
            <AddIcon style={{ height: 15, marginRight: 8 }} />
            <p className="additional-text">Novo adicional</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewItem;