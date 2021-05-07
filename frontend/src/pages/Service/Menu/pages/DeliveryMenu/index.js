import React, { useRef } from 'react';

import history from '~/services/history';

import EstablishmentInfo from '../../components/EstablishmentInfo';
import ProductList from '../../components/ProductList';
import MenuButtons from '../../components/MenuButtons';

function BasicMenu({ establishment, loading }) {
  const pageRef = useRef();

  return (
    <div id="service-menu-page" ref={pageRef}>
      <EstablishmentInfo establishment={establishment} loading={loading} />

      <ProductList
        establishment={establishment}
        loading={loading}
        pageRef={pageRef}
      />

      <MenuButtons
        cart={{
          onClick: () => {
            history.push('/cardapio/carrinho');
          },
        }}
      />
    </div>
  );
}

export default BasicMenu;
