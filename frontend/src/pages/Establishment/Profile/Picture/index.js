import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Header from '~/components/NavTabs/Establishment';
import PinModal from '~/components/PinModal';

import { ReactComponent as Backward } from '~/assets/icons/backward-icon.svg';
import { ReactComponent as Lock } from '~/assets/icons/lock-icon.svg';
import defaultPicture from '~/assets/images/default-picture.png';

import { updateEstablishmentPhoto } from '~/store/modules/establishment/actions';

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

  const [file, setFile] = useState();
  const [photo, setPhoto] = useState(
    establishment.photo ? establishment.photo.url : defaultPicture
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
    setFile(e.target.files[0]);

    setPhoto(URL.createObjectURL(e.target.files[0]));
  }

  async function handleSubmit() {
    const data = new FormData();
    data.append('file', file);

    try {
      const response = await api.post('establishment-photo', data);
      dispatch(updateEstablishmentPhoto(response.data.photo));
    } catch (err) {
      alert(
        'Houve um erro ao atualizar a foto. Por favor, tente novamente mais tarde.'
      );
    }
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
          <p
            className="label"
            style={disabled ? { color: '#acacac' } : { color: '#252525' }}
          >
            Adicione uma foto!
          </p>
          <div
            className={disabled ? 'img-container-disabled' : 'img-container'}
          >
            <img
              src={photo}
              onError={(e) => {
                e.target.src = defaultPicture;
              }}
              className={disabled ? 'image-disabled' : 'image'}
              alt=""
            />
          </div>

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
