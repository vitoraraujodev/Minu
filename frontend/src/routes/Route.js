import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import decode from 'jwt-decode';

import { store } from '~/store';

export default function RouteWrapper({
  component: Component,
  notPrivate = false,
  establishments = false,
  customers = false,
  ...rest
}) {
  const { token } = store.getState().auth;

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

  return <Route {...rest} component={Component} />;
}
