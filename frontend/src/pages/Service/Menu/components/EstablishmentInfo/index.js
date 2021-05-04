import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import ConfirmationModal from '~/components/ConfirmationModal';

import defaultPicture from '~/assets/images/default-picture.png';

import { ReactComponent as Logo } from '~/assets/icons/simple-logo.svg';
import { ReactComponent as RatingStar } from '~/assets/icons/rating-star.svg';
import { ReactComponent as Backward } from '~/assets/icons/backward-icon.svg';

import { removeSession } from '~/store/modules/serviceSession/actions';

import history from '~/services/history';

import handleEstablishmentAddress from '~/util/handleEstablishmentAddress';

import './styles.css';

export default function EstablishmentInfo({ establishment, loading }) {
  const dispatch = useDispatch();

  const [confirmationModal, setConfirmationModal] = useState(false);

  function handleBack() {
    dispatch(removeSession());
    history.push('/');
  }
  return (
    <div id="menu-establishment-info">
      {confirmationModal && (
        <ConfirmationModal
          title="Deseja fechar o cardápio?"
          onClose={() => setConfirmationModal(false)}
          onConfirm={handleBack}
        />
      )}

      <button
        type="button"
        className="back-button"
        onClick={() => setConfirmationModal(true)}
      >
        <Backward style={{ height: 16, marginRight: 4 }} fill="#fff" />
        Sair
      </button>

      <div className="logo-container">
        <Logo width={48} fill="#fff" />
      </div>

      <div className="img-container">
        <img
          src={establishment.photo ? establishment.photo.url : defaultPicture}
          onError={(e) => {
            e.target.src = defaultPicture;
          }}
          className="establishment-img"
          alt=""
        />
      </div>

      <div className="info-area">
        <div className="info">
          {!loading && (
            <div className="info">
              <div className="title-area">
                <span className="title">
                  {establishment.establishment_name || 'Carregando...'}
                </span>
              </div>

              {establishment.rating ? (
                <div className="rating-area">
                  <span className="rating-text">
                    {establishment.rating % 1 > 0
                      ? establishment.rating
                      : `${establishment.rating}.0`}
                  </span>
                  <RatingStar style={{ height: 15, margin: '0 4px' }} />
                  <span className="rating-text">({establishment.raters})</span>
                </div>
              ) : (
                <span className="establishment-address">
                  {handleEstablishmentAddress(establishment.address)}
                </span>
              )}
            </div>
          )}

          {loading && (
            <div className="info">
              <div className="title-area">
                <span className="title">Carregando...</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
