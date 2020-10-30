import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { store } from '~/store';

export default function RouteWrapper({
  component: Component,
  notPrivate = false,
  establishments = false,
  customers = false,
  ...rest
}) {
  const { kind } = store.getState().auth;

  if (!kind && !notPrivate) {
    return <Redirect to="/estabelecimento/acesso" />;
  }

  if (kind === 'establishments' && !establishments) {
    return <Redirect to="/estabelecimento" />;
  }

  if (kind === 'customers' && !customers) {
    return <Redirect to="/cliente/menu" />;
  }

  return <Route {...rest} component={Component} />;
}
