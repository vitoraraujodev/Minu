import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import decode from 'jwt-decode';

import { store } from '~/store';

import {
  CreateNotificationListeners,
  DeleteNotificationListeners,
} from '~/assets/notifications/NotificationListeners';

export default function RouteWrapper({
  component: Component,
  location,
  notPrivate = false,
  establishments = false,
  customers = false,
  service = false,
  stateRequired = false,
  ...rest
}) {
  const { token } = store.getState().auth;
  const { eventSourceObject } = store.getState().notification;

  const { establishment, plan } = store.getState().serviceSession;

  const decoded = token && decode(token);

  const { kind } = decoded || '';

  if (service && (!establishment || !plan)) {
    return <Redirect to="/" />;
  }

  if (!notPrivate && !customers && !establishments) {
    return <Route {...rest} component={Component} />;
  }

  if (!kind && establishments) {
    return <Redirect to="/acesso" />;
  }

  if (
    kind === 'establishment' &&
    establishments &&
    (!eventSourceObject || eventSourceObject.readyState !== 1)
  ) {
    CreateNotificationListeners(token);
  }

  if (kind !== 'establishment' && eventSourceObject) {
    /* Close and remove existing listener */
    DeleteNotificationListeners(eventSourceObject);
  }

  if (kind === 'establishment' && !establishments) {
    return <Redirect to="/estabelecimento" />;
  }

  // if (kind === 'customer' && !customers) {
  //   return <Redirect to="/cliente" />;
  // }

  if (stateRequired && !location.state) {
    return <Redirect to="/" />;
  }

  return <Route {...rest} component={Component} />;
}
