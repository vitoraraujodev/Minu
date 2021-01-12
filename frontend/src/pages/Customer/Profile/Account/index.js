import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ReactComponent as Backward } from '~/assets/icons/backward-icon.svg';

import { updateCustomerRequest } from '~/store/modules/customer/actions';

import history from '~/services/history';

import capitalize from '~/util/capitalize';

import './styles.css';

export default function Account() {
  const customer = useSelector((state) => state.customer.customer);
  const dispatch = useDispatch();

  const [windowWidth, setWindowWidth] = useState(768);
  const [filled, setFilled] = useState(true);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState(customer.name || '');
  const [lastname, setLastname] = useState(customer.lastname || '');
  const [email, setEmail] = useState(customer.email || '');
  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  function handleResize() {
    const accountPage = document.getElementById('customer-account-page');
    if (accountPage) {
      setWindowWidth(accountPage.offsetWidth);
    }
  }

  useEffect(() => {
    setWindowWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    if (name && lastname && email) {
      if (
        ((oldPassword || password || confirmPassword) &&
          !(oldPassword && password && confirmPassword)) ||
        password !== confirmPassword
      ) {
        setFilled(false);
      } else {
        setFilled(true);
      }
    } else {
      setFilled(false);
    }
  }, [name, lastname, email, oldPassword, password, confirmPassword]);

  window.addEventListener('resize', handleResize);

  function handleSubmit() {
    if (loading) return;

    setLoading(true);

    const data = {
      name: capitalize(name),
      lastname: capitalize(lastname),
      email,
    };

    if (oldPassword && password && confirmPassword) {
      data.old_password = oldPassword;
      data.password = password;
      data.confirm_password = confirmPassword;
    }
    dispatch(updateCustomerRequest(data));
    setLoading(false);
  }

  return (
    <div id="customer-account-page">
      <div className="container">
        <div className="button-container">
          <button
            style={{ color: '#606060' }}
            className="button"
            type="button"
            onClick={() => history.push('/cliente')}
          >
            <Backward style={{ height: 16, marginRight: 4 }} fill="#606060" />
            Voltar
          </button>
        </div>

        <div className="content">
          <div className="form">
            <p className="input-label">Seu nome</p>
            <input
              value={name}
              className="input"
              style={{ textTransform: 'capitalize' }}
              placeholder="Nome"
              onKeyDown={(e) => {
                if (e.key === ' ' || (e.key >= 0 && e.key <= 9))
                  e.preventDefault();
              }}
              onChange={(e) => setName(e.target.value)}
            />

            <p className="input-label">Sobrenome</p>
            <input
              value={lastname}
              className="input"
              style={{ textTransform: 'capitalize' }}
              placeholder="Sobrenome"
              onKeyDown={(e) => {
                if (e.key === ' ' || (e.key >= 0 && e.key <= 9))
                  e.preventDefault();
              }}
              onChange={(e) => setLastname(e.target.value)}
            />

            <p className="input-label">E-mail</p>
            <input
              type="email"
              value={email}
              className="input"
              placeholder="exemplo@email.com"
              onKeyDown={(e) => {
                if (e.key === ' ' || (e.key >= 0 && e.key <= 9))
                  e.preventDefault();
              }}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div
            className="form"
            style={{ border: 0, marginBottom: 0, paddingBottom: 0 }}
          >
            <p className="input-label">Senha atual</p>
            <input
              value={oldPassword}
              type="password"
              className="input"
              placeholder="********"
              onChange={(e) => setOldPassword(e.target.value)}
            />

            <p className="input-label">Nova senha</p>
            <input
              value={password}
              type="password"
              className="input"
              placeholder="********"
              onChange={(e) => setPassword(e.target.value)}
            />

            <p className="input-label">Confirme sua nova senha</p>
            <input
              value={confirmPassword}
              type="password"
              className="input"
              style={
                confirmPassword && password !== confirmPassword
                  ? { border: '2px solid #FF3636' }
                  : null
              }
              placeholder="********"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          {windowWidth >= 768 ? (
            <button
              type="button"
              className={
                filled ? 'submit-button-enabled' : 'submit-button-disabled'
              }
              onClick={filled ? handleSubmit : null}
            >
              Concluir
            </button>
          ) : null}
        </div>
      </div>
      {windowWidth < 768 ? (
        <button
          type="button"
          className={
            filled ? 'submit-button-enabled' : 'submit-button-disabled'
          }
          onClick={filled ? handleSubmit : null}
        >
          {loading ? 'Carregando...' : 'Concluir'}
        </button>
      ) : null}
    </div>
  );
}
