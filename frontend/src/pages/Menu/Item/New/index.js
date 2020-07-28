import React, { useState, useEffect } from 'react';
import CurrencyInput from 'react-currency-input';
import { Prompt } from 'react-router-dom';

import CategorySelector from '../CategorySelector';
import Header from '~/components/Header';

import { ReactComponent as Backward } from '~/assets/icons/backward-icon.svg';
import { ReactComponent as ExpandArrow } from '~/assets/icons/expand-arrow.svg';
import { ReactComponent as AddIcon } from '~/assets/icons/add-icon.svg';
import defaultPicture from '~/assets/images/default-picture.png';

import api from '~/services/api';
import history from '~/services/history';

import './styles.css';

export default function NewItem({ location }) {
  const length = location.state.length || '';

  const [windowWidth, setWindowWidth] = useState(768);
  const [submit, setSubmit] = useState(false);
  const [photo, setPhoto] = useState('');
  const [selectorVisible, setSelectorVisible] = useState(false);

  const [file, setFile] = useState();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [preparationTime, setPreparationTime] = useState(1);
  const [category, setCategory] = useState('');
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

  async function handleSubmit() {
    const data = {
      title,
      description,
      price,
      preparation_time: preparationTime,
      category,
      photo_id: file,
    };
    console.tron.log(data);

    try {
      await api.post('items', data);
      setSubmit(true);
      history.push('/menus');
    } catch (err) {
      alert(err.response.data.error);
    }
  }

  return (
    <div id="item-page">
      <Prompt when={file} message={handleDelete} />

      {windowWidth >= 768 ? <Header /> : null}

      <div className="container">
        <div
          className="slider"
          style={
            selectorVisible
              ? { left: 0 }
              : { left: windowWidth >= 432 ? 432 : windowWidth }
          }
        >
          <CategorySelector
            onClose={() => setSelectorVisible(false)}
            windowWidth={windowWidth}
            onChangeCategory={setCategory}
          />
        </div>

        <div
          className="form-container"
          style={
            (windowWidth < 768 ? { width: windowWidth } : null,
            selectorVisible
              ? { left: windowWidth >= 432 ? -432 : -windowWidth }
              : { left: 0 })
          }
        >
          <div className="header">
            <button
              className="back-button"
              type="button"
              onClick={() => history.goBack()}
            >
              <Backward style={{ height: 16, marginRight: 4 }} fill="#fff" />
              Voltar
            </button>

            <p className="product-label">
              {length ? `Produto ${length <= 9 ? `0${length}` : length}` : ''}
            </p>
            <div onClick={handleSubmit}>
              <p>Salvar</p>
            </div>
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
            <input
              className="input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="X-Burger Especial"
            />

            <p className="input-label">
              Descrição{' '}
              <span style={{ color: '#9c9c9c', fontSize: 14 }}>(opcional)</span>
            </p>
            <input
              className="input"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Hamburguer de carne com queijo..."
            />

            <div className="input-group">
              <div>
                <p className="input-label">Preço</p>
                <CurrencyInput
                  inputMode="numeric"
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
            <div
              className="category-input"
              onClick={() => setSelectorVisible(true)}
            >
              <p style={category ? { color: '#444' } : { color: '#9c9c9c' }}>
                {category || 'Selecionar categoria'}
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
    </div>
  );
}
