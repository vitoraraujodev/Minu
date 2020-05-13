import React from 'react';
import { Router, Switch } from 'react-router-dom';
import Route from './Route';

import Auth from '~/pages/Establishment/Auth';
import SignUp from '~/pages/Establishment/SignUp';

import history from '~/services/history';

export default function Routes() {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={Auth} notPrivate />
        <Route path="/establishment/new" component={SignUp} notPrivate />
      </Switch>
    </Router>
  );
}