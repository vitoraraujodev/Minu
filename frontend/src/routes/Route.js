import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

import { store } from '~/store';

export default function RouteWrapper({
  component: Component,
  notPrivate,
  ...rest
}) {
  const { signed } = store.getState().auth;

  if (!signed && !notPrivate) {
    return <Redirect to="/" />;
  }

  if (signed && notPrivate) {
    return <Redirect to="/estabelecimento" />;
  }

  return <Route {...rest} component={Component} />;
}

RouteWrapper.propTypes = {
  notPrivate: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
};

RouteWrapper.defaultProps = {
  notPrivate: false,
};
