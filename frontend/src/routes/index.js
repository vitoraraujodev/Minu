import React from 'react';
import { Router, Switch, Redirect } from 'react-router-dom';
import Route from './Route';

import EstablishmentHome from '~/pages/Auth/Establishment/Home';
import EstablishmentSignUp from '~/pages/Auth/Establishment/SignUp';
import EstablishmentSignIn from '~/pages/Auth/Establishment/SignIn';

import CustomerHome from '~/pages/Auth/Customer/Home';
import CustomerSignUp from '~/pages/Auth/Customer/SignUp';
import CustomerSignIn from '~/pages/Auth/Customer/SignIn';

import EstablishmentProfile from '~/pages/Establishment/Profile';
import Picture from '~/pages/Establishment/Profile/Picture';
import Account from '~/pages/Establishment/Profile/Account';
import Pin from '~/pages/Establishment/Profile/Pin';
import Address from '~/pages/Establishment/Profile/Address';

import Inventory from '~/pages/Establishment/Menu/Inventory';
import NewItem from '~/pages/Establishment/Menu/Item/New';
import EditItem from '~/pages/Establishment/Menu/Item/Edit';
import NewMenu from '~/pages/Establishment/Menu/Menu/New';
import EditMenu from '~/pages/Establishment/Menu/Menu/Edit';

import CustomerProfile from '~/pages/Customer/Profile';
import CustomerMenu from '~/pages/Customer/Menu';
import ProductOrder from '~/pages/Customer/Menu/ProductOrder';
import CustomerBill from '~/pages/Customer/Menu/CustomerBill';

import history from '~/services/history';

export default function Routes() {
  return (
    <Router history={history}>
      <Switch>
        <Route
          path="/estabelecimento/acesso"
          component={EstablishmentHome}
          notPrivate
        />
        <Route
          path="/estabelecimento/cadastro"
          component={EstablishmentSignUp}
          notPrivate
        />
        <Route
          path="/estabelecimento/login"
          component={EstablishmentSignIn}
          notPrivate
        />
        <Route path="/cliente/acesso" component={CustomerHome} notPrivate />
        <Route path="/cliente/cadastro" component={CustomerSignUp} notPrivate />
        <Route path="/cliente/login" component={CustomerSignIn} notPrivate />

        <Route
          path="/estabelecimento"
          exact
          component={EstablishmentProfile}
          establishments
        />
        <Route
          path="/estabelecimento/foto"
          component={Picture}
          establishments
        />
        <Route
          path="/estabelecimento/conta"
          component={Account}
          establishments
        />
        <Route path="/estabelecimento/pin" component={Pin} establishments />
        <Route
          path="/estabelecimento/endereco"
          component={Address}
          establishments
        />

        <Route path="/inventario" component={Inventory} exact establishments />
        <Route
          path="/inventario/produto"
          exact
          component={NewItem}
          establishments
        />
        <Route
          path="/inventario/produto/:id"
          component={EditItem}
          establishments
        />
        <Route
          path="/inventario/cardapio"
          exact
          component={NewMenu}
          establishments
        />
        <Route
          path="/inventario/cardapio/:id"
          component={EditMenu}
          establishments
        />

        <Route path="/cliente" exact component={CustomerProfile} customers />
        <Route path="/cliente/perfil" component={CustomerProfile} customers />
        <Route path="/cliente/menu" component={CustomerMenu} customers />
        <Route path="/cliente/produto" component={ProductOrder} customers />
        <Route path="/cliente/conta" component={CustomerBill} customers />

        <Redirect from="*" to="/estabelecimento/acesso" notPrivate />
      </Switch>
    </Router>
  );
}
