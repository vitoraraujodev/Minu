import React from 'react';
import { Router, Switch, Redirect } from 'react-router-dom';
import Route from './Route';

import Home from '~/pages/Auth/Home';
import SignUp from '~/pages/Auth/SignUp';
import SignIn from '~/pages/Auth/SignIn';

import Profile from '~/pages/Establishment/Profile';
import Picture from '~/pages/Establishment/Picture';
import Account from '~/pages/Establishment/Account';
import Pin from '~/pages/Establishment/Pin';
import Address from '~/pages/Establishment/Address';

import Inventory from '~/pages/Menu/Inventory';
import NewItem from '~/pages/Menu/Item/New';
import EditItem from '~/pages/Menu/Item/Edit';
import NewMenu from '~/pages/Menu/Menu/New';
import EditMenu from '~/pages/Menu/Menu/Edit';

import CustomerMenu from '~/pages/Customer/Menu/Menu';
import ProductOrder from '~/pages/Customer/ProductOrder';
import CustomerBill from '~/pages/Customer/CostumerBill';

import history from '~/services/history';

export default function Routes() {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={Home} notPrivate />
        <Route path="/cadastro" component={SignUp} notPrivate />
        <Route path="/login" component={SignIn} notPrivate />

        <Route path="/estabelecimento" exact component={Profile} private />
        <Route path="/estabelecimento/foto" component={Picture} private />
        <Route path="/estabelecimento/conta" component={Account} private />
        <Route path="/estabelecimento/pin" component={Pin} private />
        <Route path="/estabelecimento/endereco" component={Address} private />

        <Route path="/menus" exact component={Inventory} private />
        <Route path="/menus/produto" exact component={NewItem} private />
        <Route path="/menus/produto/:id" component={EditItem} private />
        <Route path="/menus/cardapio" exact component={NewMenu} private />
        <Route path="/menus/cardapio/:id" component={EditMenu} private />

        <Route path="/cliente/menu" exact component={CustomerMenu} notPrivate />
        <Route
          path="/pedido/produto"
          exact
          component={ProductOrder}
          notPrivate
        />
        <Route
          path="/cliente/conta"
          exact
          component={CustomerBill}
          notPrivate
        />

        <Redirect from="*" to="/" exact />
      </Switch>
    </Router>
  );
}
