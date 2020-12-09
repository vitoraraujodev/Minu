import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import decode from 'jwt-decode';

import { store } from '~/store';

export default function RouteWrapper({
  component: Component,
  location,
  notPrivate = false,
  establishments = false,
  customers = false,
  session = false,
  stateRequired,
  ...rest
}) {
  const { token } = store.getState().auth;
  const { signed } = store.getState().session;

  const decoded = token && decode(token);

  const { kind } = decoded || '';

  if (!kind && !notPrivate) {
    return <Redirect to="/estabelecimento/acesso" />;
  }

  if (kind === 'establishment' && !establishments) {
    return <Redirect to="/estabelecimento" />;
  }

  if (kind === 'customer' && !customers) {
    return <Redirect to="/cliente" />;
  }

  if (session && !signed) {
    return <Redirect to="/cliente" />;
  }

  if (stateRequired && !location.state) {
    return <Redirect to="/" />;
  }

  return <Route {...rest} component={Component} />;
}
