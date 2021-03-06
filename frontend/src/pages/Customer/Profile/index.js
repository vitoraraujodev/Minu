import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import NavTab from '~/components/NavTabs/Customer';

import { ReactComponent as Symbols } from '~/assets/icons/symbols.svg';

import { ReactComponent as Logo } from '~/assets/icons/simple-logo.svg';

import { signOutRequest } from '~/store/modules/auth/actions';
import { updateCustomerRequest } from '~/store/modules/customer/actions';

import defaultPicture from '~/assets/images/default-user.png';

import api from '~/services/api';

import './styles.css';

export default function Profile() {
  const dispatch = useDispatch();
  const customer = useSelector((state) => state.customer.customer);

  const [loading, setLoading] = useState(false);

  const [avatar, setAvatar] = useState(
    customer.avatar ? customer.avatar.url : null
  );

  async function handleChangeAvatar(e) {
    if (loading) return;

    setLoading(true);

    const data = new FormData();

    data.append('file', e.target.files[0]);

    try {
      const response = await api.post('avatar', data);

      if (response.data) {
        setAvatar(response.data.url);
        dispatch(updateCustomerRequest({ avatar_id: response.data.id }));
      }
    } catch (err) {
      alert(
        'Houve um erro ao salvar sua foto. Por favor, tente novamente mais tarde...'
      );
    }

    setLoading(false);
  }

  function handleSignOut() {
    dispatch(signOutRequest());
  }

  return (
    <div id="customer-profile">
      <NavTab />
      <div className="container">
        <div className="info-container">
          <div className="logo-container">
            <Logo width={48} fill="#fff" />
          </div>

          <div className="img-background">
            <div className="symbols-container">
              <Symbols height={96} />
            </div>

            <div className="img-container">
              {loading ? (
                <div className="loader-container">
                  <div className="loader" />
                </div>
              ) : (
                <img
                  src={avatar || defaultPicture}
                  onError={(e) => {
                    e.target.src = defaultPicture;
                  }}
                  className="costumer-img"
                  alt=""
                />
              )}
            </div>
          </div>
          <div className="info">
            <button className="img-button" type="button">
              <label className="img-label" htmlFor="photo">
                <input
                  id="photo"
                  type="file"
                  accept="image/*"
                  data-file={avatar}
                  onChange={handleChangeAvatar}
                />
                Carregar foto
              </label>
            </button>

            <div className="name-area">
              <span className="name">
                {`${customer.name} ${customer.lastname}` || 'Cliente'}
              </span>
            </div>
          </div>
        </div>

        <Link to="/cliente/conta">
          <div className="option-area">
            <div className="option">
              <span className="option-text">Editar conta</span>
            </div>
          </div>
        </Link>

        <div className="option-area" onClick={() => handleSignOut()}>
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
