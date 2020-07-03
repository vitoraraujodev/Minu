import React from 'react';
import { Router, Switch } from 'react-router-dom';
import Route from './Route';

import Home from '~/pages/Auth/Home';
import SignUp from '~/pages/Auth/SignUp';
import SignIn from '~/pages/Auth/SignIn';

import Profile from '~/pages/Establishment/Profile';
import Picture from '~/pages/Establishment/Picture';
import Account from '~/pages/Establishment/Account';

import history from '~/services/history';

export default function Routes() {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={Home} notPrivate />
        <Route path="/signup" component={SignUp} notPrivate />
        <Route path="/login" component={SignIn} notPrivate />
        <Route path="/establishment" exact component={Profile} private />
        <Route path="/establishment/picture" component={Picture} private />
        <Route path="/establishment/account" component={Account} private />
      </Switch>
    </Router>
  );
}
