import React, { useEffect } from 'react';
import { Router, Switch, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Route from './Route';

import EstablishmentHome from '~/pages/Auth/Establishment/Home';
import EstablishmentSignUp from '~/pages/Auth/Access/Establishment/pages/SignUp';
import EstablishmentSignIn from '~/pages/Auth/Access/Establishment/pages/SignIn';

// import CustomerHome from '~/pages/Auth/Customer/Home';
// import CustomerSignUp from '~/pages/Auth/Customer/SignUp';
// import CustomerSignIn from '~/pages/Auth/Customer/SignIn';

import EstablishmentProfile from '~/pages/Establishment/Profile';
import EstablishmentPicture from '~/pages/Establishment/Profile/pages/Picture';
import EstablishmentAccount from '~/pages/Establishment/Profile/pages/Account';
import EstablishmentPin from '~/pages/Establishment/Profile/pages/Pin';
import EstablishmentAddress from '~/pages/Establishment/Profile/pages/Address';

import Inventory from '~/pages/Establishment/Inventory/Inventory';
import NewItem from '~/pages/Establishment/Inventory/Item/pages/NewItem';
import EditItem from '~/pages/Establishment/Inventory/Item/pages/EditItem';
import NewMenu from '~/pages/Establishment/Inventory/Menu/pages/NewMenu';
import EditMenu from '~/pages/Establishment/Inventory/Menu/pages/EditMenu';

import Dashboard from '~/pages/Establishment/Dashboard';

// import CustomerProfile from '~/pages/Customer/Profile';
// import CustomerAccount from '~/pages/Customer/Profile/Account';

import ServiceMenu from '~/pages/Service/Menu';
import ServiceProduct from '~/pages/Service/Product';

// import CustomerMenu from '~/pages/Service/Menu/CustomerMenu';
// import CustomerProductOrder from '~/pages/Service/Menu/CustomerMenu/ProductOrder';
// import Bill from '~/pages/Service/Menu/CustomerMenu/Bill';
// import Cart from '~/pages/Service/Menu/CustomerMenu/Cart';

// import CustomerSession from '~/pages/Service/Session/CustomerSession';
import BasicSession from '~/pages/Service/Session/BasicSession';

import { refreshState } from '~/store/modules/global/action';

import history from '~/services/history';

export default function Routes() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshState());
  });

  return (
    <Router history={history}>
      <Switch>
        <Route path="/acesso" component={EstablishmentHome} notPrivate />
        <Route path="/cadastro" component={EstablishmentSignUp} notPrivate />
        <Route path="/login" component={EstablishmentSignIn} notPrivate />

        {/* <Route path="/cliente/acesso" component={CustomerHome} notPrivate />
        <Route path="/cliente/cadastro" component={CustomerSignUp} notPrivate />
        <Route path="/cliente/login" component={CustomerSignIn} notPrivate /> */}

        <Route
          path="/estabelecimento"
          exact
          component={EstablishmentProfile}
          establishments
        />
        <Route
          path="/estabelecimento/foto"
          component={EstablishmentPicture}
          establishments
        />
        <Route
          path="/estabelecimento/conta"
          component={EstablishmentAccount}
          establishments
        />
        <Route
          path="/estabelecimento/pin"
          component={EstablishmentPin}
          establishments
        />
        <Route
          path="/estabelecimento/endereco"
          component={EstablishmentAddress}
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
          stateRequired
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
          stateRequired
          component={EditMenu}
          establishments
        />

        <Route path="/dashboard" component={Dashboard} establishments />

        {/* <Route path="/cliente" exact component={CustomerProfile} customers />
        <Route path="/cliente/conta" component={CustomerAccount} customers />

        <Route path="/acesso/sessao" component={CustomerSession} customers />

        <Route
          path="/cardapio"
          exact
          component={CustomerMenu}
          customers
          session
        />
        <Route
          path="/cardapio/produto"
          component={CustomerProductOrder}
          customers
          session
          stateRequired
        />
        <Route
          path="/cardapio/comanda"
          component={Bill}
          customers
          session
          stateRequired
        />
        <Route path="/cardapio/carrinho" component={Cart} customers session /> */}

        <Route path="/" exact component={BasicSession} />
        <Route
          path="/cardapio/produto"
          component={ServiceProduct}
          stateRequired
        />
        <Route path="/cardapio/:code" component={ServiceMenu} />

        <Redirect from="*" to="/" notPrivate />
      </Switch>
    </Router>
  );
}
