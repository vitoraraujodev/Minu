import React, { useState, useEffect } from 'react';
import CurrencyInput from 'react-currency-input';

import CategorySelector from '../CategorySelector';
import AdditionalSelector from '../AdditionalSelector';

import Header from '~/components/NavTabs/Establishment';
import Actions from '~/components/Actions';
import ConfirmationModal from '~/components/ConfirmationModal';

import { ReactComponent as Backward } from '~/assets/icons/backward-icon.svg';
import { ReactComponent as ExpandArrow } from '~/assets/icons/expand-arrow.svg';
import { ReactComponent as AddIcon } from '~/assets/icons/add-icon.svg';
import defaultPicture from '~/assets/images/default-picture.png';

import { formatPrice } from '~/utils/formatPrice';
import capitalize from '~/utils/capitalize';

import history from '~/services/history';

import './styles.css';

export default function ItemForm({ item, onSubmit, loading }) {
  const [windowWidth, setWindowWidth] = useState(768);
  const [selectorVisible, setSelectorVisible] = useState(false);
  const [selectorType, setSelectorType] = useState(1); // 1 - category selector, 2 - additional selector
  const [filled, setFilled] = useState(false);
  const [confirmationModalVisible, setConfirmationModalVisible] = useState(
    false
  );

  const [photo, setPhoto] = useState(item.photo ? item.photo.url : '');
  const [file, setFile] = useState();

  const [title, setTitle] = useState(item.title || '');
  const [description, setDescription] = useState(item.description || '');
  const [price, setPrice] = useState(item.price || 0);
  const [preparationTime, setPreparationTime] = useState(
    item.preparation_time || 1
  );
  const [category, setCategory] = useState(item.category || '');
  const [maskedPrice, setMaskedPrice] = useState(
    item.price.toString().replace('.', ',') || 'R$ 0,00'
  );
  const [available, setAvailable] = useState(item.available);
  const [additionals, setAdditionals] = useState(item.additionals || []);

  function handleResize() {
    const itemPage = document.getElementById('item-page');
    if (itemPage) {
      setWindowWidth(itemPage.offsetWidth);
    }
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    let newPrice = maskedPrice;
    newPrice = newPrice.replace('R', '');
    newPrice = newPrice.replace('$', '');
    newPrice = newPrice.replace(' ', '');
    newPrice = newPrice.replace(',', '.');

    setPrice(newPrice);
  }, [maskedPrice]);

  function handleBack() {
    // Order to check if items arrays changed
    const itemAdditionalsId = item.additionals
      .map((additional) => additional.id)
      .sort();
    const additionalId = additionals.map((additional) => additional.id).sort();

    if (
      (file && file !== item.photo_id) ||
      title !== item.title ||
      description !== item.description ||
      String(price) !== String(item.price) ||
      preparationTime !== item.preparation_time ||
      category !== item.category ||
      JSON.stringify(additionalId) !== JSON.stringify(itemAdditionalsId)
    ) {
      setConfirmationModalVisible(true);
    } else {
      history.goBack();
    }
  }

  useEffect(() => {
    if (title && description && price && preparationTime && category) {
      setFilled(true);
    } else {
      setFilled(false);
    }
  }, [title, description, price, preparationTime, category]);

  async function handleChange(e) {
    setFile(e.target.files[0]);

    setPhoto(URL.createObjectURL(e.target.files[0]));
  }

  function handlePreparationTime(value) {
    if (preparationTime + value !== 0)
      setPreparationTime(preparationTime + value);
  }

  function handleSubmit() {
    const additionalsId = additionals.map((additional) => additional.id);

    const data = {
      title: capitalize(title),
      description: capitalize(description),
      price: parseFloat(price),
      preparation_time: preparationTime,
      category,
      additionals: additionalsId,
    };

    onSubmit(data, file);
  }

  return (
    <div id="item-page">
      {windowWidth >= 768 ? <Header /> : null}

      {confirmationModalVisible && (
        <ConfirmationModal
          title="Deseja voltar?"
          description="Sua alterações serão descartadas"
          onClose={() => setConfirmationModalVisible(false)}
          onConfirm={() => history.goBack()}
        />
      )}

      <div className="container">
        <div
          className="slider"
          style={
            selectorVisible
              ? { left: 0 }
              : { left: windowWidth >= 432 ? 432 : windowWidth }
          }
        >
          {selectorType === 1 && (
            <CategorySelector
              onClose={() => setSelectorVisible(0)}
              windowWidth={windowWidth}
              onChangeCategory={setCategory}
            />
          )}

          {selectorType === 2 && (
            <AdditionalSelector
              onClose={() => setSelectorVisible(0)}
              windowWidth={windowWidth}
              selectedAdditionals={additionals}
              onChangeAdditionals={(adds) => setAdditionals(adds)}
            />
          )}
        </div>

        <div
          className="form-container"
          style={
            (windowWidth < 768 ? { width: windowWidth } : null,
            selectorVisible > 0
              ? { left: windowWidth >= 432 ? -432 : -windowWidth }
              : { left: 0 })
          }
        >
          <div className="header">
            <button className="back-button" type="button" onClick={handleBack}>
              <Backward style={{ height: 16, marginRight: 4 }} fill="#fff" />
              Voltar
            </button>

            <p className="header-label">
              {item.title ? item.title : 'Novo Produto'}
            </p>

            {item.id && (
              <div className="icon-area">
                <Actions
                  id={item.id}
                  available={available}
                  route="items"
                  onChangeAvailable={setAvailable}
                  onDelete={() => history.push('/inventario')}
                  fill="#fff"
                  position="down"
                  size="20"
                />
              </div>
            )}
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

            <p className="input-label">Descrição</p>
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
                <p className="input-label">Tempo até entrega</p>
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
              onClick={() => {
                setSelectorVisible(true);
                setSelectorType(1);
              }}
            >
              <p style={category ? { color: '#444' } : { color: '#9c9c9c' }}>
                {category || 'Selecionar categoria'}
              </p>
              <div className="category-arrow">
                <ExpandArrow style={{ height: 8 }} fill="#444" />
              </div>
            </div>

            <p className="input-label">
              Adicionais{' '}
              <span style={{ color: '#9c9c9c', fontSize: 14 }}>
                (para o cliente escolher)
              </span>
            </p>

            <div
              className="add-additional-container"
              onClick={() => {
                setSelectorVisible(true);
                setSelectorType(2);
              }}
            >
              <AddIcon style={{ height: 15, marginRight: 8 }} fill="#535BFE" />
              <p className="additional-text">Novo adicional</p>
            </div>
            {additionals.map((additional) => (
              <div
                key={additional.id}
                className="additional-container"
                onClick={() => {
                  setSelectorVisible(true);
                  setSelectorType(2);
                }}
              >
                <p>{additional.title}</p>
                <p>{formatPrice(additional.price)}</p>
              </div>
            ))}
          </div>
        </div>
        {!selectorVisible && (
          <button
            className={
              filled ? 'submit-button-enabled' : 'submit-button-disabled'
            }
            onClick={filled && !loading ? handleSubmit : null}
            type="button"
          >
            {loading ? 'Carregando...' : 'Concluir'}
          </button>
        )}
      </div>
    </div>
  );
}
