import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Header from '~/components/Header';
import StarRating from '~/components/StarRating';

import { signOutRequest } from '~/store/modules/auth/actions';

import defaultPicture from '~/assets/images/default-picture.png';

import './styles.css';

export default function Profile() {
  const dispatch = useDispatch();
  const establishment = useSelector(
    (state) => state.establishment.establishment
  );

  function handleSignOut() {
    dispatch(signOutRequest());
  }

  return (
    <div id="profile">
      <Header />
      <div className="container">
        <div className="info-container">
          <img
            src={establishment.photo ? establishment.photo.url : defaultPicture}
            onError={(e) => {
              e.target.src = defaultPicture;
            }}
            className="establishment-img"
            alt="establishment"
          />
          <div className="info">
            <Link to="/establishment/picture">
              <button className="img-button" type="button">
                Alterar foto
              </button>
            </Link>
            <span className="title">{establishment.establishment_name}</span>
            <StarRating
              rating={establishment.rating}
              raters={establishment.raters}
            />
          </div>
        </div>

        <Link to="/establishment/account">
          <div className="option-area">
            <div className="option">
              <span className="option-text">Editar conta</span>
            </div>
          </div>
        </Link>
        <Link to="/establishment/pin">
          <div className="option-area">
            <div className="option">
              <span className="option-text">Redefinir PIN</span>
            </div>
          </div>
        </Link>
        <Link to="/establishment/address">
          <div className="option-area">
            <div className="option">
              <span className="option-text">Editar endereço</span>
            </div>
          </div>
        </Link>
        <div className="option-area" onClick={handleSignOut}>
          <div style={{ border: 0 }} className="option">
            <span
              className="option-text"
              style={{ color: '#FF3636', border: 'none' }}
            >
              Sair
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
