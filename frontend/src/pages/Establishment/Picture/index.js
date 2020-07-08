import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Prompt } from 'react-router';
import Header from '~/components/Header';
import PinModal from '~/components/PinModal';

import { ReactComponent as Backward } from '~/assets/images/backward-icon.svg';
import defaultEstablishement from '~/assets/images/default-establishment.png';

import { updateEstablishmentRequest } from '~/store/modules/establishment/actions';

import api from '~/services/api';
import history from '~/services/history';

import './styles.css';

export default function Picture() {
  const establishment = useSelector(
    (state) => state.establishment.establishment
  );
  const dispatch = useDispatch();

  const [windowWidth, setWindowWidth] = useState(768);
  const [disabled, setDisabled] = useState(true);
  const [pinModalVisible, setPinModalVisible] = useState(false);
  const [submit, setSubmit] = useState(false);

  const [file, setFile] = useState();
  const [photo, setPhoto] = useState(
    establishment.photo ? establishment.photo.url : ''
  );

  function handleResize() {
    const picturePage = document.getElementById('picture-page');
    if (picturePage) {
      setWindowWidth(picturePage.offsetWidth);
    }
  }

  useEffect(() => {
    setWindowWidth(window.innerWidth);
  }, []);

  window.addEventListener('resize', handleResize);

  async function handleChange(e) {
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

  async function handleDelete() {
    if (file && !submit) {
      console.tron.log('ow');
      await api.delete(`files/${file}`);
    }
  }

  async function handleSubmit() {
    dispatch(updateEstablishmentRequest({ photo_id: file }));
    setSubmit(true);
  }

  return (
    <div id="picture-page">
      {windowWidth >= 768 ? <Header /> : null}

      {pinModalVisible && (
        <PinModal
          onClose={() => setPinModalVisible(false)}
          onAccess={() => setDisabled(false)}
        />
      )}
      <Prompt when={file} message={handleDelete} />
      <div className="container">
        <div className="button-container">
          <button
            style={{ color: '#6E6E6E' }}
            className="button"
            type="button"
            onClick={() => history.goBack()}
          >
            <Backward style={{ height: 16, marginRight: 4 }} fill="#6E6E6E" />
            Voltar
          </button>

          {disabled && (
            <button
              style={{ color: '#FF3636' }}
              className="button"
              type="button"
              onClick={() => setPinModalVisible(true)}
            >
              Habilitar edição
              <Backward style={{ height: 16, marginLeft: 4 }} fill="#FF3636" />
            </button>
          )}
        </div>

        <div className="content">
          <p
            className="label"
            style={disabled ? { color: '#9c9c9c' } : { color: '#252525' }}
          >
            Adicione uma foto!
          </p>

          <img
            src={photo || defaultEstablishement}
            className={disabled ? 'image-disabled' : 'image'}
            alt=""
          />
          {!disabled && !file && (
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
          )}

          {windowWidth >= 768 && !disabled ? (
            <button
              className={
                file ? 'submit-button-enabled' : 'submit-button-disabled'
              }
              onClick={file ? handleSubmit : null}
              type="button"
            >
              Concluir
            </button>
          ) : null}
        </div>
      </div>
      {windowWidth < 768 && !disabled ? (
        <button
          className={file ? 'submit-button-enabled' : 'submit-button-disabled'}
          onClick={file ? handleSubmit : null}
          type="button"
        >
          Concluir
        </button>
      ) : null}
    </div>
  );
}
