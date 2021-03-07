import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Header from '~/components/NavTabs/Establishment';

import { LinkOption, ClickOption } from './components/Options';
import ShareModal from './components/ShareModal';

import { ReactComponent as RatingStar } from '~/assets/icons/rating-star.svg';
import { ReactComponent as Logo } from '~/assets/icons/simple-logo.svg';

import { signOutRequest } from '~/store/modules/auth/actions';

import defaultPicture from '~/assets/images/default-picture.png';

import './styles.css';

export default function Profile() {
  const dispatch = useDispatch();

  const establishment = useSelector(
    (state) => state.establishment.establishment
  );

  const [windowWidth, setWindowWidth] = useState(768);
  const [modalVisible, setModalVisible] = useState(false);

  function handleResize() {
    const profile = document.getElementById('profile');
    if (profile && profile.offsetWidth !== windowWidth) {
      setWindowWidth(profile.offsetWidth);
    }
  }

  useEffect(() => {
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  window.addEventListener('resize', handleResize);

  function handleSignOut() {
    dispatch(signOutRequest());
  }

  useEffect(() => {
    setWindowWidth(window.innerWidth);
  }, []);

  return (
    <div id="profile">
      {modalVisible && (
        <ShareModal
          onClose={() => setModalVisible(false)}
          establishmentId={establishment.id}
        />
      )}

      <Header />
      <div className="container">
        <div className="info-container">
          {windowWidth <= 768 && (
            <div className="logo-container">
              <Logo width={48} fill="#fff" />
            </div>
          )}

          <div className="img-container">
            <img
              src={
                establishment.photo ? establishment.photo.url : defaultPicture
              }
              onError={(e) => {
                e.target.src = defaultPicture;
              }}
              className="establishment-img"
              alt=""
            />
          </div>
          <div className="info">
            <Link to="/estabelecimento/foto">
              <button className="img-button" type="button">
                Alterar foto
              </button>
            </Link>
            <div className="title-area">
              <span className="title">{establishment.establishment_name}</span>
            </div>
            <div className="rating-area">
              <span className="rating-text">
                {establishment.rating ? establishment.rating.toFixed(1) : '0.0'}
              </span>
              <RatingStar style={{ height: 15, margin: '0 4px' }} />
              <span className="rating-text">({establishment.raters || 0})</span>
            </div>
          </div>
        </div>

        <LinkOption route="/estabelecimento/conta" text="Editar conta" />

        <LinkOption route="/estabelecimento/pin" text="Redefinir PIN" />

        <LinkOption route="/estabelecimento/endereco" text="Editar endereço" />

        <ClickOption
          onClick={() => setModalVisible(true)}
          text="Compartilhar cardápio"
        />

        <ClickOption onClick={handleSignOut} text="Sair" color="#FF3636" />
      </div>
    </div>
  );
}
