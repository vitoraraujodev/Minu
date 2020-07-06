import React from 'react';
import { Router, Switch } from 'react-router-dom';
import Route from './Route';

import Home from '~/pages/Auth/Home';
import SignUp from '~/pages/Auth/SignUp';
import SignIn from '~/pages/Auth/SignIn';

import Profile from '~/pages/Establishment/Profile';
import Picture from '~/pages/Establishment/Picture';
import Account from '~/pages/Establishment/Account';
import Pin from '~/pages/Establishment/Pin';
import Address from '~/pages/Establishment/Address';

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
        <Route path="/establishment/pin" component={Pin} private />
        <Route path="/establishment/address" component={Address} private />
      </Switch>
    </Router>
  );
}
